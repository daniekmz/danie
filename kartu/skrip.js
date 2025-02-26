document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');

  // audio
  const playAudio = () => {
      audio.play().catch(error => {
          // 
          console.log('Auto-play blocked. Please interact with the page to start the music.');
      });
  };

  // 
  document.addEventListener('click', playAudio);

  // 
  playAudio();
});

// Ambil elemen cursor love
const cursorLove = document.querySelector('.cursor-love');

// Gerakkan cursor love sesuai posisi mouse
document.addEventListener('mousemove', (e) => {
    cursorLove.style.left = `${e.pageX}px`;
    cursorLove.style.top = `${e.pageY}px`;
});

// Efek saat mengklik
document.addEventListener('mousedown', () => {
    cursorLove.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursorLove.style.transform = 'translate(-50%, -50%) scale(1)';
});