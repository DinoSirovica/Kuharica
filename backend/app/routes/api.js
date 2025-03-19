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
        pool.query('SELECT COUNT(*) AS total FROM recipes', (countError, countResults) => {
            if (countError) {
                return res.status(500).json({ error: countError.message });
            }
    
            const totalRecords = countResults[0].total;
            const baseUrl = 'http://localhost:8081/api'; // Corrected spelling of "beginning"
    
            pool.query("SELECT recipes.recipe_id, recipes.title, recipes.user_id, recipes.description, recipes.category_id, recipes.image_id, users.username, images.image_data FROM recipes INNER JOIN users ON recipes.user_id = users.user_id LEFT JOIN images ON recipes.image_id = images.image_id", (error, results) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                } else {
                    const recipesWithDetails = results.map(recipe => ({
                        recipe_id: recipe.recipe_id,
                        title: recipe.title,
                        user_id: recipe.user_id,
                        username: recipe.username,
                        description: recipe.description,
                        category_id: recipe.category_id,
                        image_id: recipe.image_id,
                        image_data: recipe.image_data, // Include image_data in the response
                        details: `${baseUrl}/recipes/${recipe.recipe_id}`
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
        const { user_id, category_id, title, description, instructions, created_at, image_id } = req.body;
    
        const insertRecipeQuery = 'INSERT INTO recipes (user_id, category_id, title, description, instructions, created_at, image_id) VALUES (?, ?, ?, ?, ?, NOW(), ?)';
        const values = [user_id, category_id, title, description, instructions, image_id];
        
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
        pool.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId], (error, results) => {
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

        // console.log(req.body);

        const updateRecipeQuery = 'UPDATE recipes SET title = ?, description = ?, instructions = ?, category_id = ? WHERE recipe_id = ?';

        pool.query(updateRecipeQuery, [title, description, instructions, category_id, recipeId], (error, results) => {
            if(error){
                return res.status(500).json({error: error.message});
            } else if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Recipe not found'});
            } else {
                res.status(200).end();
                res.status(204).end();
            }
        })
    });

    router.get('/recipe-ingredients', (req, res) => {
        pool.query('SELECT COUNT(*) AS total FROM recipe_ingredients', (countError, countResults) => {
            if (countError) {
                return res.status(500).json({ error: countError.message });
            }

            const totalRecords = countResults[0].total;

            pool.query('SELECT * FROM recipe_ingredients', (error, results) => {
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
        // console.log(ingredients);
        // console.log(req.params);
        // console.log(req.body);
    
        const insertIngredientQuery = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, ?)';
    
        const recipeId = req.body.recipe_id;

        ingredients.forEach(ingredient => {
            const values = [recipeId, ingredient.ingredientId, ingredient.quantity];
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

    router.get('/ingredients', (req, res) => {
        pool.query('SELECT COUNT(*) AS total FROM ingredients', (countError, countResults) => {
            if (countError) {
                return res.status(500).json({ error: countError.message });
            }

            const totalRecords = countResults[0].total;

            pool.query('SELECT * FROM ingredients', (error, results) => {
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
        const query = " SELECT recipes.recipe_id, recipes.title, recipe_ingredients.recipe_id, recipe_ingredients.ingredient_id, ingredients.ingredient_id, ingredients.name, recipe_ingredients.quantity FROM recipes JOIN recipe_ingredients ON recipes.recipe_id = recipe_ingredients.recipe_id JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredient_id WHERE recipes.recipe_id = ?";
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
        const updateIngredientQuery = " UPDATE recipe_ingredients SET quantity = ? WHERE recipe_id = ? AND ingredient_id = ?";

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
        pool.query('SELECT COUNT(*) AS total FROM users', (countError, countResults) => {
            if (countError) {
                return res.status(500).json({ error: countError.message });
            }
    
            const totalRecords = countResults[0].total;
    
            pool.query('SELECT * FROM users', (error, results) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                } else {
                    const usersWithDetails = results.map(user => ({
                        user_id: user.user_id,
                        username: user.username,
                        email: user.email,
                        password_hash: user.password_hash,
                        created_at: user.created_at
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
        const { username, email, password } = req.body;
        const createdAt = new Date();
    
        pool.query('INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)', [username, email, password, createdAt], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ message: 'User added successfully', userId: results.insertId });
        });
    });

    router.get('/users/:id', (req, res) => {
        const userId = req.params.id;
        pool.query('SELECT * FROM users WHERE user_id = ?', [userId], (error, results) => {
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
    
        const updateUserQuery ='UPDATE users SET username = ?, email = ?, password_hash = ? WHERE user_id = ?';
    
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

    router.delete('/users/:id', (req, res) => {
        const userId = req.params.id;
    
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err);
                res.status(500).send('Error getting database connection');
                return;
            }
    
            connection.beginTransaction((err) => {
                if (err) {
                    console.error('Error starting transaction:', err);
                    res.status(500).send('Error starting transaction');
                    return;
                }
    
                const deleteUserQuery = 'DELETE FROM users WHERE user_id = ?';
    
                connection.query(deleteUserQuery, [userId], (error, results) => {
                    if (error) {
                        console.error('Error deleting user:', error);
                        return connection.rollback(() => {
                            res.status(500).send('Error deleting user');
                        });
                    }
    
                    connection.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return connection.rollback(() => {
                                res.status(500).send('Error committing transaction');
                            });
                        }
    
                        res.status(200).send(`User with ID ${userId} deleted successfully`);
                    });
                });
            });
        });
    });    

    router.get('/images', (req, res) => {
        pool.query('SELECT * FROM images', (error, results) => {
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
        const insertImageQuery = 'INSERT INTO images (image_data) VALUES (?)';
        
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

    router.get('/images/:id', (req, res) => {
        const imageId = req.params.id; 
        
        pool.query('SELECT * FROM images WHERE image_id = ?', [imageId], (error, results) => {
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
        const query = 'SELECT * FROM categories';
        
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
        const query = 'SELECT * FROM categories WHERE category_id = ?';
        
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

        const fetchImageIdQuery = 'SELECT image_id FROM recipes WHERE recipe_id = ?';
        pool.query(fetchImageIdQuery, [recipeId], (error, results) => {
            if (error) {
                console.error(`Error fetching image_id for recipe with id ${recipeId}:`, error);
                return res.status(500).json({ error: `Failed to fetch image_id for recipe with id ${recipeId}` });
            }

            const imageId = results[0]?.image_id;
            
            if (!imageId) {
                return res.status(404).json({ error: `Recipe with id ${recipeId} not found` });
            }

            const deleteImageQuery = 'DELETE FROM images WHERE image_id = ?';
            pool.query(deleteImageQuery, [imageId], (error) => {
                if (error) {
                    console.error(`Error deleting image with id ${imageId}:`, error);
                    return res.status(500).json({ error: `Failed to delete image with id ${imageId}` });
                }

                const deleteIngredientsQuery = 'DELETE FROM recipe_ingredients WHERE recipe_id = ?';
                pool.query(deleteIngredientsQuery, [recipeId], (error) => {
                    if (error) {
                        console.error(`Error deleting ingredients for recipe with id ${recipeId}:`, error);
                        return res.status(500).json({ error: `Failed to delete ingredients for recipe with id ${recipeId}` });
                    }

            
                    const deleteRecipeQuery = 'DELETE FROM recipes WHERE recipe_id = ?';
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
    });
    
    return router;
};
