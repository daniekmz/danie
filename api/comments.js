// Import library MongoDB
const { MongoClient } = require('mongodb');

// Connection string MongoDB (ganti dengan connection string Anda)
const uri = process.env.MONGODB_URI;

// Handler untuk GET (mengambil komentar)
export default async function handler(req, res) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('ulangtahun');
        const collection = database.collection('comments');

        if (req.method === 'GET') {
            const comments = await collection.find().sort({ timestamp: -1 }).toArray();
            res.status(200).json(comments);
        } else if (req.method === 'POST') {
            const { name, comment } = req.body;

            if (!name || !comment) {
                return res.status(400).json({ error: 'Nama dan komentar tidak boleh kosong' });
            }

            const newComment = {
                name,
                comment,
                timestamp: new Date().toISOString(),
            };

            await collection.insertOne(newComment);
            res.status(201).json({ message: 'Komentar berhasil disimpan!' });
        } else {
            res.status(405).json({ error: 'Method tidak diizinkan' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    } finally {
        await client.close();
    }
}
