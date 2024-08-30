const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'medicine_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});


// Fetch medicine by real medicine name
router.get('/medicines/:real_medicine_name', (req, res) => {
    const realMedicineName = req.params.real_medicine_name;
    const query = 'SELECT * FROM medicines WHERE real_medicine_name = ?';

    db.query(query, [realMedicineName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        res.status(200).json(result[0]);
    });
});

// Add a new medicine
router.post('/medicines', (req, res) => {
    const {
        real_medicine_name,
        real_manufacturer_name,
        price,
        expiry_date,
        description,
        drug_contents,
        stock_available,
        image_url
    } = req.body;

    const query = `
        INSERT INTO medicines (real_medicine_name, real_manufacturer_name, price, expiry_date, description, drug_contents, stock_available, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [real_medicine_name, real_manufacturer_name, price, expiry_date, description, drug_contents, stock_available, image_url], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insertion error' });
        }
        res.status(201).json({ message: 'Medicine added successfully', id: result.insertId });
    });
});



// Route to purchase a medicine
router.post('/purchase', (req, res) => {
    const { real_medicine_name, quantity } = req.body;

    // SQL query to check and update stock
    const checkStockQuery = `
        CALL PurchaseMedicine(?, ?);
    `;

    db.query(checkStockQuery, [real_medicine_name, quantity], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error during purchase' });
        }

        // Sending back the message from the stored procedure
        const message = results[0][0].Message;
        res.status(200).json({ message });
    });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});