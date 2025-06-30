import express from 'express';
import { promises as fs } from 'fs';

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        console.log(req);

        console.log("Headers:", req.headers);
        console.log("URL:", req.url);
        console.log("Method:", req.method);
        console.log("Query parameters:", req.query);

        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);
        res.json(jsonObj);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

// get socks of certain color
app.get('/socks/:color', async (req, res) => {
    try {
        const color = req.params.color;

        const data = await fs.readFile('../data/socks.json', 'utf8');
        const jsonObj = JSON.parse(data);
        const socks = jsonObj.filter((sock) => sock.color.toLowerCase() === color.toLowerCase())
        if (socks.length === 0) {
            res.status(404).send("No socks found with that color.");
        }
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.post('/socks', async (req, res) => {
    try {
        console.log("If POST Malone were a sock, he'd be the one with the most colorful pattern.");
        // Simulate creating a user
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).send({ error: 'Username and email are required.' });
        }

        res.status(201).send({
            status: 'success',
            location: 'http://localhost:3000/users/1234',
            message: 'User created successfully.'
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmm, something smells... No socks for you! ☹");
    }
})

app.delete('/socks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting sock with ID:", id);
        res.status(200).send('Sock deleted successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log('Updating email for user with ID:', id);
        res.status(200).send({
            status: 'success',
            data: email,
            message: 'User updated successfully.'
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
    }
})

// pagination
app.get('/socks/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        limit = +limit; // The + converts limit from a string to integer.
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).skip((page - 1) * limit).limit(limit).toArray();
        res.json(socks);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching socks');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});