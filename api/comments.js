// Simpan komentar dalam array (sementara)
let comments = [];

// Handler untuk GET (mengambil komentar)
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Gagal mengambil komentar' });
        }
    } else if (req.method === 'POST') {
        const { name, comment } = req.body;

        if (!name || !comment) {
            return res.status(400).json({ error: 'Nama dan komentar tidak boleh kosong' });
        }

        try {
            const newComment = {
                name,
                comment,
                timestamp: new Date().toISOString(),
            };
            comments.push(newComment); // Simpan komentar ke array
            res.status(201).json({ message: 'Komentar berhasil disimpan!' });
        } catch (error) {
            res.status(500).json({ error: 'Gagal menyimpan komentar' });
        }
    } else {
        res.status(405).json({ error: 'Method tidak diizinkan' });
    }
}
