// URL API Vercel (ganti dengan URL deployment Anda)
const API_URL = 'https://danie-xi.vercel.app/api/comments';

// Tanggal ulang tahun (format: Tahun, Bulan-1, Hari, Jam, Menit, Detik)
const birthday = new Date(2025, 01, 19, 7, 0, 0); // Contoh: 19 maret 2023

function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
        clearInterval(interval);
        // Sembunyikan hitung mundur
        document.getElementById('countdown').classList.add('hidden');
        // Tampilkan tombol "Buka Ucapan Ulang Tahun"
        document.getElementById('openBirthdayTab').classList.remove('hidden');
        // Aktifkan form komentar
        document.getElementById('name').disabled = false;
        document.getElementById('comment').disabled = false;
        document.getElementById('submitButton').disabled = false;
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// Event listener untuk tombol
document.getElementById('openBirthdayTab').addEventListener('click', () => {
    window.open('danie.html', '_blank');
});

// Fungsi untuk mengambil komentar dari API
async function loadComments() {
    try {
        const response = await fetch(API_URL);
        const comments = await response.json();
        const commentList = document.getElementById('commentList');
        commentList.innerHTML = ''; // Kosongkan daftar sebelum menambahkan komentar baru
        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.innerHTML = `
                <strong>${comment.name}:</strong>
                <p>${comment.comment}</p>
            `;
            commentList.appendChild(commentItem);
        });
    } catch (error) {
        console.error('Gagal mengambil komentar: ', error);
    }
}

// Fungsi untuk mengirim komentar ke API
async function addComment(name, comment) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, comment }),
        });
        const result = await response.json();
        console.log(result.message);
        loadComments(); // Muat ulang komentar setelah mengirim
    } catch (error) {
        console.error('Gagal menyimpan komentar: ', error);
    }
}

// Event listener untuk form komentar
document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        addComment(name, comment);
        document.getElementById('commentForm').reset();
    } else {
        alert('Nama dan komentar tidak boleh kosong!');
    }
});

// Muat komentar saat halaman dimuat
window.addEventListener('load', loadComments);
