module.exports = function(express, pool) {
    const router = express.Router();

    router.get('/', (req, res) => {
        const apiLinks = {
            users: `http://localhost:8081/api/users`,
        };

        res.json({ message: 'Welcome to the API!', apiLinks });
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

    return router;
};
