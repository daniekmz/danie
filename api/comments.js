// Import library untuk koneksi database
const { Pool } = require('pg');

// Konfigurasi koneksi database (ganti dengan connection string Anda)
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

// Handler untuk GET (mengambil komentar)
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM comments ORDER BY timestamp DESC');
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Gagal mengambil komentar' });
        }
    } else if (req.method === 'POST') {
        const { name, comment } = req.body;

        if (!name || !comment) {
            return res.status(400).json({ error: 'Nama dan komentar tidak boleh kosong' });
        }

        try {
            await pool.query(
                'INSERT INTO comments (name, comment, timestamp) VALUES ($1, $2, NOW())',
                [name, comment]
            );
            res.status(201).json({ message: 'Komentar berhasil disimpan!' });
        } catch (error) {
            res.status(500).json({ error: 'Gagal menyimpan komentar' });
        }
    } else {
        res.status(405).json({ error: 'Method tidak diizinkan' });
    }
}