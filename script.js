const birthday = new Date(2025, 02, 19, 7, 0, 0); // Contoh: 19 maret 2023

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

// Event listener untuk form komentar
document.getElementById('commentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        addComment(name, comment);
        document.getElementById('commentForm').reset(); // Reset form
        showPopup(); // Tampilkan pop-up
    } else {
        alert('Nama dan komentar tidak boleh kosong!');
    }
});

// Fungsi untuk menambahkan komentar
function addComment(name, comment) {
    const commentList = document.getElementById('commentList');

    // Buat elemen komentar baru
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment-item');
    commentItem.innerHTML = `
        <strong>${name}</strong>
        <p>${comment}</p>
    `;

    // Tambahkan komentar ke daftar
    commentList.appendChild(commentItem);

    // Simpan komentar ke localStorage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name, comment });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Fungsi untuk menampilkan pop-up
function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000); // Pop-up hilang setelah 3 detik
}

// Muat komentar saat halaman dimuat
window.addEventListener('load', loadComments);

// Fungsi untuk memuat komentar dari localStorage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentList = document.getElementById('commentList');

    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
        commentItem.innerHTML = `
            <strong>${comment.name}</strong>
            <p>${comment.comment}</p>
        `;
        commentList.appendChild(commentItem);
    });
}
}
