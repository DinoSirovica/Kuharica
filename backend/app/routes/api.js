module.exports = function(express, pool) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const apiLinks = {
      recipes: `http://localhost:8081/api/recipes`,
      categories: `http://localhost:8081/api/categories`,
      recipeIngredients: `http://localhost:8081/api/recipe-ingredients`,
      ingredients: `http://localhost:8081/api/ingredients`,
      users: `http://localhost:8081/api/users`,
      images: `http://localhost:8081/api/images`
    };

    res.json({ message: 'Welcome to the API!', apiLinks });
  });

  router.get('/recipes', (req, res) => {
    pool.query('SELECT COUNT(*) AS total FROM recept', (countError, countResults) => {
      if (countError) {
        return res.status(500).json({ error: countError.message });
      }

      const totalRecords = countResults[0].total;
      const baseUrl = 'http://localhost:8081/api'; // Corrected spelling of "beginning"

      pool.query("SELECT recept.id, recept.naslov, recept.korisnik_id, recept.opis, recept.kategorija_id, recept.slika_id, korisnik.korisnik_ime, slika.data FROM recept INNER JOIN korisnik ON recept.korisnik_id = korisnik.id LEFT JOIN slika ON recept.slika_id = slika.id", (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          const recipesWithDetails = results.map(recipe => ({
            recipe_id: recipe.id,
            title: recipe.naslov,
            user_id: recipe.korisnik_id,
            username: recipe.korisnik_ime,
            description: recipe.opis,
            category_id: recipe.kategorija_id,
            image_id: recipe.slika_id,
            image_data: recipe.data, // Include image_data in the response
            details: `${baseUrl}/recipes/${recipe.id}`
          }));

          res.json({
            baseUrl,
            totalRecords: totalRecords,
            data: recipesWithDetails
          });
        }
      });
    });
  });

  router.post('/recipes', (req, res) => {
    const { user_id, category_id, title, instructions, image_id } = req.body;
    const insertRecipeQuery = 'INSERT INTO recept (korisnik_id, kategorija_id, naslov, upute, slika_id) VALUES (?, ?, ?, ?, ?)';
    const values = [user_id, category_id, title, instructions, image_id];

    pool.query(insertRecipeQuery, values, (error, results) => {
      if (error) {
        console.error('Error inserting recipe:', error);
        res.status(500).json({ error: 'Failed to insert recipe' });
      } else {
        const recipeId = results.insertId;
        res.status(201).json({ message: 'Recipe added successfully', recipe_id: recipeId });
      }
    });
  });

  router.get('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    pool.query('SELECT * FROM recept WHERE id = ?', [recipeId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      } else if (results.length === 0) {
        return res.status(404).json({ error: 'Recipe not found' });
      } else {
        const recipeDetails = results[0];
        res.json({
          back: `http://localhost:8081/api/recipes`,
          ...recipeDetails
        });
      }
    });
  });

  router.put('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const { title, description, instructions, category_id } = req.body;

    console.log(req.body);

    const updateRecipeQuery = 'UPDATE recept SET naslov = ?,  upute = ?, kategorija_id = ? WHERE id = ?';

    pool.query(updateRecipeQuery, [title, instructions, category_id, recipeId], (error, results) => {
      if(error){
        return res.status(500).json({error: error.message});
      } else if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Recipe not found'});
      } else {
        res.status(200).json({ message: 'Recipe added successfully', recipe_id: recipeId })
      }
    })
  });

  router.get('/recipe-ingredients', (req, res) => {
    pool.query('SELECT COUNT(*) AS total FROM recpt_sastojak', (countError, countResults) => {
      if (countError) {
        return res.status(500).json({ error: countError.message });
      }

      const totalRecords = countResults[0].total;

      pool.query('SELECT * FROM recpt_sastojak', (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          const benigining = `http://localhost:8081/api`;
          res.json({
            back : benigining,
            totalRecords: totalRecords,
            data: results
          });
        }
      });
    });
  });

  router.post('/recipe-ingredients', (req, res) => {
    const ingredients = req.body.ingredients;
    const insertIngredientQuery = 'INSERT INTO recpt_sastojak (recept_id, sastojak_id, kolicina) VALUES (?, ?, ?)';

    const recipeId = req.body.recipe_id;

    console.log('Inserting ingredients for recipe_id:', recipeId, ingredients);
    ingredients.forEach(ingredient => {
      const values = [recipeId, ingredient.id, ingredient.quantity];
      pool.query(insertIngredientQuery, values, (error, results) => {
        if (error) {
          console.error(`Error inserting ingredient for recipe_id ${recipeId}:`, error);
          res.status(500).json({ error: `Failed to insert ingredient for recipe_id ${recipeId}` });
          return;
        }
      });
    });

    res.status(201).json({ message: 'Ingredients added successfully' });
  });

  router.delete('/recipe-ingredients/:recipe_id', (req, res) => {
    const recipeId = req.params.recipe_id;

    const deleteIngredientsQuery = 'DELETE FROM recpt_sastojak WHERE recept_id = ?';
    pool.query(deleteIngredientsQuery, [recipeId], (error) => {
      if (error) {
        console.error(`Error deleting ingredients for recipe with id ${recipeId}:`, error);
        return res.status(500).json({error: `Failed to delete ingredients for recipe with id ${recipeId}`});
      }

      res.status(201).json({message: 'Ingredients deleted successfully'});
    });
  });

  router.get('/ingredients', (req, res) => {
    pool.query('SELECT COUNT(*) AS total FROM sastojak', (countError, countResults) => {
      if (countError) {
        return res.status(500).json({ error: countError.message });
      }

      const totalRecords = countResults[0].total;

      pool.query('SELECT * FROM sastojak', (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          const benigining = 'http://localhost:8081/api';

          res.json({
            back : benigining,
            totalRecords: totalRecords,
            data: results
          });
        }
      });
    });
  });

  router.get('/ingredients-by-recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    const query = " SELECT recept.id, recept.naslov, recpt_sastojak.recept_id, recpt_sastojak.sastojak_id, sastojak.id, sastojak.ime, recpt_sastojak.kolicina FROM recept JOIN recpt_sastojak ON recept.id = recpt_sastojak.recept_id JOIN sastojak ON recpt_sastojak.sastojak_id = sastojak.id WHERE recept.id = ?";
    pool.query(query, [recipeId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      } else if (results.length === 0) {
        return res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.json({
          back: `http://localhost:8081/api`,
          ingredients: results
        });
      }
    });
  });

  router.put('/ingredients-by-recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    const updatedIngredients = req.body;

    console.log(req.params);
    console.log(req.body);
    const updateIngredientQuery = " UPDATE recpt_sastojak SET kolicina = ? WHERE recept_id = ? AND sastojak_id = ?";

    updatedIngredients.forEach(ingredient => {
      pool.query(updateIngredientQuery, [ingredient.quantity, recipeId, ingredient.ingredient_id], (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else if (results.affectedRows === 0) {
          return res.status(404).json({ error: `Ingredient with ID ${ingredient.ingredient_id} not found for recipe ID ${recipeId}` });
        }
      });
    });

    res.status(200).json({ message: 'Ingredients updated successfully' });
  });

  router.get('/users', (req, res) => {
    console.log("Im fetching users")
    pool.query('SELECT COUNT(*) AS total FROM korisnik', (countError, countResults) => {
      if (countError) {
        return res.status(500).json({ error: countError.message });
      }

      const totalRecords = countResults[0].total;

      pool.query('SELECT * FROM korisnik', (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          const usersWithDetails = results.map(user => ({
            user_id: user.id,
            username: user.korisnik_ime,
            email: user.email,
            password_hash: user.lozinka,
            favourites: user.omiljeni_recepti
          }));

          const benigining = 'http://localhost:8081/api';

          res.json({
            back : benigining,
            totalRecords: totalRecords,
            data: usersWithDetails
          });
        }
      });
    });
  });

  router.post('/users', (req, res) => {
    const { username, email, password, favourites } = req.body;

    pool.query('INSERT INTO korisnik (korisnik_ime, email, lozinka, omiljeni_recepti) VALUES (?, ?, ?, ?)', [username, email, password, favourites], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json({ message: 'User added successfully', userId: results.insertId });
    });
  });

  router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM korisnik WHERE id = ?', [userId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      } else if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        const userDetails = results[0];
        res.json({
          back: `http://localhost:8081/api/users`,
          ...userDetails
        });
      }
    });
  });

  router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email, password_hash } = req.body;

    const updateUserQuery ='UPDATE korisnik SET korisnik_ime = ?, email = ?, lozinka = ? WHERE id = ?';

    pool.query(updateUserQuery, [username, email, password_hash, userId], (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
      } else {
        res.status(200).end();
        res.status(204).end();
      }
    });
  });

  router.put('/users/:id/favourites', (req, res) => {
    const userId = req.params.id;
    const { favourites } = req.body;
    console.log('testing update',userId, favourites);
    const updateUserQuery ='UPDATE korisnik SET omiljeni_recepti = ? WHERE id = ?';

    pool.query(updateUserQuery, [favourites, userId], (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
      } else {
        console.log('User updated successfully');
        res.status(200).end();
        res.status(204).end();
      }
    });
  });

  router.get('/images', (req, res) => {
    pool.query('SELECT * FROM slika', (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      } else if (results.length === 0) {
        return res.status(404).json({ error: 'No images found' });
      } else {
        const responseData = {
          back: 'http://localhost:8081/api',
          totalImages: results.length,
          images: results
        };
        res.json(responseData);
      }
    });
  });

  router.post('/images', (req, res) => {
    const imageData = req.body.image_data; // Assuming the base64-encoded image data is sent in the request body
    const insertImageQuery = 'INSERT INTO slika (data) VALUES (?)';

    pool.query(insertImageQuery, [imageData], (error, results) => {
      if (error) {
        console.error('Error inserting image:', error);
        res.status(500).json({ error: 'Failed to insert image' });
      } else {
        const imageId = results.insertId;
        res.status(201).json({ message: 'Image added successfully', image_id: imageId });
      }
    });
  });

  router.put('/images/:image_id', (req, res) => {
    const imageData = req.body.image_data;
    const imageId = req.params.image_id;
    const insertImageQuery = 'UPDATE slika SET data = ? WHERE id = ?';

    pool.query(insertImageQuery, [imageData, imageId], (error, results) => {
      if (error) {
        console.error('Error updating image:', error);
        res.status(500).json({ error: 'Failed to insert image' });
      } else {
        const imageId = results.insertId;
        res.status(201).json({ message: 'Image added successfully', image_id: imageId });
      }
    });
  });

  router.get('/images/:id', (req, res) => {
    const imageId = req.params.id;

    pool.query('SELECT * FROM slika WHERE id = ?', [imageId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      } else if (results.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      } else {
        const imageDetails = results[0];
        const responseData = {
          back: 'http://localhost:8081/api/images',
          image: imageDetails
        };
        res.json(responseData);
      }
    });
  });

  router.get('/categories', (req, res) => {
    const query = 'SELECT * FROM kategorija';

    pool.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching categories:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  router.get('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    const query = 'SELECT * FROM kategorija WHERE id = ?';

    pool.query(query, [categoryId], (err, results) => {
      if (err) {
        console.error('Error fetching category:', err);
        res.status(500).send('Server error');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Category not found');
        return;
      }
      res.json(results[0]);
    });
  });

  router.delete('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    console.log('Deleting recipe with ID:', recipeId);
    const fetchImageIdQuery = 'SELECT slika_id FROM recept WHERE id = ?';
    pool.query(fetchImageIdQuery, [recipeId], (error, results) => {
      if (error) {
        console.error(`Error fetching image_id for recipe with id ${recipeId}:`, error);
        return res.status(500).json({ error: `Failed to fetch image_id for recipe with id ${recipeId}` });
      }

      const imageId = results[0]?.slika_id;

      if (imageId) {

      const deleteImageQuery = 'DELETE FROM slika WHERE id = ?';
      pool.query(deleteImageQuery, [imageId], (error) => {
        if (error) {
          console.error(`Error deleting image with id ${imageId}:`, error);
          return res.status(500).json({ error: `Failed to delete image with id ${imageId}` });
        }
        })
      }

        const deleteIngredientsQuery = 'DELETE FROM recpt_sastojak WHERE recept_id = ?';
        pool.query(deleteIngredientsQuery, [recipeId], (error) => {
          if (error) {
            console.error(`Error deleting ingredients for recipe with id ${recipeId}:`, error);
            return res.status(500).json({ error: `Failed to delete ingredients for recipe with id ${recipeId}` });
          }


          const deleteRecipeQuery = 'DELETE FROM recept WHERE id = ?';
          pool.query(deleteRecipeQuery, [recipeId], (error) => {
            if (error) {
              console.error(`Error deleting recipe with id ${recipeId}:`, error);
              return res.status(500).json({ error: `Failed to delete recipe with id ${recipeId}` });
            }

            return res.status(200).json({ message: `Recipe with id ${recipeId} and related data deleted successfully` });
          });
        });
    });
  });

  return router;
};
