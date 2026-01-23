const config = require('../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const SALT_ROUNDS = 10;
const googleClient = new OAuth2Client(config.google.clientId);

module.exports = function (express, pool) {
  const router = express.Router();

  const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

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
      const baseUrl = 'http://localhost:8081/api';

      pool.query("SELECT recept.id, recept.naslov, recept.korisnik_id, recept.upute, recept.kategorija_id, recept.slika_id, korisnik.korisnik_ime, slika.data FROM recept INNER JOIN korisnik ON recept.korisnik_id = korisnik.id LEFT JOIN slika ON recept.slika_id = slika.id", (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          const recipesWithDetails = results.map(recipe => ({
            recipe_id: recipe.id,
            title: recipe.naslov,
            user_id: recipe.korisnik_id,
            username: recipe.korisnik_ime,
            description: recipe.upute,
            category_id: recipe.kategorija_id,
            image_id: recipe.slika_id,
            image_data: recipe.data,
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
      if (error) {
        return res.status(500).json({ error: error.message });
      } else if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Recipe not found' });
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
            back: benigining,
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
        return res.status(500).json({ error: `Failed to delete ingredients for recipe with id ${recipeId}` });
      }

      res.status(201).json({ message: 'Ingredients deleted successfully' });
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
            back: benigining,
            totalRecords: totalRecords,
            data: results
          });
        }
      });
    });
  });

  router.get('/ingredients-by-recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    const queryStr = " SELECT recept.id, recept.naslov, recpt_sastojak.recept_id, recpt_sastojak.sastojak_id, sastojak.id, sastojak.ime, recpt_sastojak.kolicina FROM recept JOIN recpt_sastojak ON recept.id = recpt_sastojak.recept_id JOIN sastojak ON recpt_sastojak.sastojak_id = sastojak.id WHERE recept.id = ?";
    pool.query(queryStr, [recipeId], (error, results) => {
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
            favourites: user.omiljeni_recepti,
            role: user.rola
          }));

          const benigining = 'http://localhost:8081/api';

          res.json({
            back: benigining,
            totalRecords: totalRecords,
            data: usersWithDetails
          });
        }
      });
    });
  });

  router.post('/users', async (req, res) => {
    const { username, email, password, favourites } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      pool.query('INSERT INTO korisnik (korisnik_ime, email, lozinka, omiljeni_recepti) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, favourites], (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'User added successfully', userId: results.insertId });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  });

  router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      const users = await query('SELECT * FROM korisnik WHERE korisnik_ime = ?', [username]);

      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(password, user.lozinka);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { user_id: user.id, role: user.rola },
        config.jwtSecret,
        { expiresIn: '2h' }
      );

      return res.json({
        message: 'Login successful',
        token: token,
        user: {
          user_id: user.id,
          username: user.korisnik_ime,
          email: user.email,
          favourites: user.omiljeni_recepti,
          role: user.rola
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Login failed' });
    }
  });

  router.get('/auth/me', authenticateToken, (req, res) => {
    const userId = req.user.user_id;

    pool.query('SELECT * FROM korisnik WHERE id = ?', [userId], (error, results) => {
      if (error) return res.status(500).json({ error: error.message });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });

      const user = results[0];
      return res.json({
        user: {
          user_id: user.id,
          username: user.korisnik_ime,
          email: user.email,
          favourites: user.omiljeni_recepti,
          role: user.rola
        }
      });
    });
  });

  router.post('/auth/google', async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' });
    }

    try {
      // Verify  token
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: config.google.clientId
      });

      const payload = ticket.getPayload();
      const googleId = payload['sub'];
      const email = payload['email'];
      const name = payload['name'] || email.split('@')[0];
      const emailVerified = payload['email_verified'];

      if (!emailVerified) {
        return res.status(401).json({ error: 'Google email not verified' });
      }

      const existingUsers = await query(
        'SELECT * FROM korisnik WHERE google_id = ? OR email = ?',
        [googleId, email]
      );

      let user;

      if (existingUsers.length > 0) {
        user = existingUsers[0];

        if (!user.google_id) {
          await query('UPDATE korisnik SET google_id = ? WHERE id = ?', [googleId, user.id]);
        }
      } else {
        const result = await query(
          'INSERT INTO korisnik (korisnik_ime, email, google_id, lozinka) VALUES (?, ?, ?, ?)',
          [name, email, googleId, '']
        );

        const newUsers = await query('SELECT * FROM korisnik WHERE id = ?', [result.insertId]);
        user = newUsers[0];
      }

      const token = jwt.sign(
        { user_id: user.id, role: user.rola },
        config.jwtSecret,
        { expiresIn: '2h' }
      );

      return res.json({
        message: 'Google login successful',
        token: token,
        user: {
          user_id: user.id,
          username: user.korisnik_ime,
          email: user.email,
          favourites: user.omiljeni_recepti || '',
          role: user.rola
        }
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      return res.status(401).json({ error: 'Invalid Google credential' });
    }
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

  router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password_hash } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password_hash, SALT_ROUNDS);

      const updateUserQuery = 'UPDATE korisnik SET korisnik_ime = ?, email = ?, lozinka = ? WHERE id = ?';

      pool.query(updateUserQuery, [username, email, hashedPassword, userId], (error, results) => {
        if (error) {
          console.error('Error updating user:', error);
          res.status(500).send('Error updating user');
        } else {
          res.status(200).json({ message: 'User updated successfully' });
        }
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).send('Error updating user');
    }
  });

  router.put('/users/:id/favourites', (req, res) => {
    const userId = req.params.id;
    const { favourites } = req.body;
    console.log('testing update', userId, favourites);
    const updateUserQuery = 'UPDATE korisnik SET omiljeni_recepti = ? WHERE id = ?';

    pool.query(updateUserQuery, [favourites, userId], (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
      } else {
        console.log('User updated successfully');
        res.status(200).json({ message: 'Favourites updated successfully' });
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
    const imageData = req.body.image_data;
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
    const queryStr = 'SELECT * FROM kategorija';

    pool.query(queryStr, (err, results) => {
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
    const queryStr = 'SELECT * FROM kategorija WHERE id = ?';

    pool.query(queryStr, [categoryId], (err, results) => {
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

  router.delete('/recipes/:id', authenticateToken, (req, res) => {
    const recipeId = req.params.id;
    const userId = req.user.user_id; // Securely obtained from token

    console.log('Deleting recipe with ID:', recipeId, 'User:', userId);

    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const checkQuery = `
      SELECT r.korisnik_id AS owner_id, u.rola 
      FROM recept r 
      JOIN korisnik u ON u.id = ? 
      WHERE r.id = ?`;

    pool.query(checkQuery, [userId, recipeId], (checkError, checkResults) => {
      if (checkError) return res.status(500).json({ error: checkError.message });
      if (checkResults.length === 0) return res.status(404).json({ error: 'Recipe or user not found' });

      const { owner_id, rola } = checkResults[0];

      if (rola !== 'admin' && parseInt(owner_id) !== parseInt(userId)) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

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

            res.status(204).end();
          });
        });
      });
    });
  });

  router.get('/comments/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    const queryStr = `
      SELECT k.id, k.tekst, k.datum, u.korisnik_ime, u.id as korisnik_id
      FROM komentar k
      JOIN korisnik u ON k.korisnik_id = u.id
      WHERE k.recept_id = ?
      ORDER BY k.datum DESC
    `;

    pool.query(queryStr, [recipeId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  });

  router.post('/comments', (req, res) => {
    const { recipe_id, user_id, text } = req.body;

    if (!text || !user_id || !recipe_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const insertQuery = 'INSERT INTO komentar (recept_id, korisnik_id, tekst) VALUES (?, ?, ?)';

    pool.query(insertQuery, [recipe_id, user_id, text], (error, results) => {
      if (error) {
        console.error('Error inserting comment:', error);
        return res.status(500).json({ error: 'Failed to add comment' });
      }

      const newCommentId = results.insertId;
      const selectQuery = `
        SELECT k.id, k.tekst, k.datum, u.korisnik_ime, u.id as korisnik_id
        FROM komentar k
        JOIN korisnik u ON k.korisnik_id = u.id
        WHERE k.id = ?
      `;

      pool.query(selectQuery, [newCommentId], (err, newCommentResults) => {
        if (err) {
          return res.status(201).json({ message: 'Comment added', commentId: newCommentId });
        }
        res.status(201).json(newCommentResults[0]);
      });
    });
  });

  router.put('/comments/:id', (req, res) => {
    const commentId = req.params.id;
    const { text, user_id } = req.body;

    pool.query('SELECT korisnik_id FROM komentar WHERE id = ?', [commentId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      if (results[0].korisnik_id !== user_id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const updateQuery = 'UPDATE komentar SET tekst = ? WHERE id = ?';
      pool.query(updateQuery, [text, commentId], (err, updateResults) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Comment updated', id: commentId, text });
      });
    });
  });

  router.delete('/comments/:id', authenticateToken, (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.user_id; // Securely obtained from token

    console.log(`[DELETE] Request received for comment ${commentId}. Provided UserID: ${userId}`);

    if (!userId) {
      console.error('[DELETE] Failed: No user ID provided');
      return res.status(400).json({ error: "User ID required for deletion verification" });
    }

    pool.query('SELECT korisnik_id FROM komentar WHERE id = ?', [commentId], (error, results) => {
      if (error) {
        console.error('[DELETE] Database error fetching comment:', error);
        return res.status(500).json({ error: error.message });
      }
      if (results.length === 0) {
        console.error(`[DELETE] Failed: Comment ${commentId} not found`);
        return res.status(404).json({ error: 'Comment not found' });
      }

      console.log(`[DELETE] Comment found. Owner in DB: ${results[0].korisnik_id}, Requesting User: ${userId}`);

      pool.query('SELECT rola FROM korisnik WHERE id = ?', [userId], (roleError, roleResults) => {
        if (roleError) return res.status(500).json({ error: roleError.message });

        const userRole = roleResults[0]?.rola;

        if (userRole !== 'admin' && parseInt(results[0].korisnik_id) !== parseInt(userId)) {
          console.error('[DELETE] Failed: Unauthorized mismatch');
          return res.status(403).json({ error: 'Unauthorized function' });
        }

        const deleteQuery = 'DELETE FROM komentar WHERE id = ?';
        pool.query(deleteQuery, [commentId], (err, deleteResults) => {
          if (err) {
            console.error('[DELETE] Database error executing delete:', err);
            return res.status(500).json({ error: err.message });
          }
          console.log(`[DELETE] Successfully deleted comment ${commentId}`);
          res.json({ message: 'Comment deleted' });
        });
      });
    });
  });

  return router;
};
