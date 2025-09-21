var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  loopedSlides: 5,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: true,
  }
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  loopedSlides: 5,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: true,
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const players = Array.from(document.querySelectorAll('.music-player'));
  let currentAudio = null;
  let currentPlayer = null;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // 初始化所有 audio
  players.forEach(player => {
    const audio = player.querySelector('.audio-player');
    const progressBar = player.querySelector('.progress-bar');
    const currentTimeEl = player.querySelector('.current-time');
    const durationEl = player.querySelector('.duration');

    audio.addEventListener('loadedmetadata', () => {
      progressBar.max = Math.floor(audio.duration);
      durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      progressBar.value = Math.floor(audio.currentTime);
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    progressBar.addEventListener('input', () => {
      audio.currentTime = progressBar.value;
    });

    audio.addEventListener('ended', () => {
      player.querySelector('.play-icon').style.display = 'block';
      player.querySelector('.pause-icon').style.display = 'none';
      progressBar.value = 0;
      currentTimeEl.textContent = '0:00';
      if (currentAudio === audio) currentAudio = null;
      currentPlayer = null;
    });
  });

  // 暫停上一首音樂
  swiper.on('slideChange', () => {
    if (currentAudio) {
      currentAudio.pause();
      if (currentPlayer) {
        currentPlayer.querySelector('.play-icon').style.display = 'block';
        currentPlayer.querySelector('.pause-icon').style.display = 'none';
      }
      currentAudio = null;
      currentPlayer = null;
    }
  });

  // Play/Pause 和快進/倒退 10 秒
  swiper.slides.forEach(slide => {
    const playBtn = slide.querySelector('.play-btn');
    const forwardBtn = slide.querySelector('.forward-btn');
    const backwardBtn = slide.querySelector('.backward-btn');
    const player = slide.querySelector('.music-player') || slide;
    const audio = player.querySelector('.audio-player');

    // 播放/暫停
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (!slide.classList.contains('swiper-slide-active')) return;

        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');

        if (audio.paused) {
          if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            if (currentPlayer) {
              currentPlayer.querySelector('.play-icon').style.display = 'block';
              currentPlayer.querySelector('.pause-icon').style.display = 'none';
            }
          }
          audio.play();
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
          currentAudio = audio;
          currentPlayer = player;
        } else {
          audio.pause();
          playIcon.style.display = 'block';
          pauseIcon.style.display = 'none';
          currentAudio = null;
          currentPlayer = null;
        }
      });
    }

    // 快進 10 秒
    if (forwardBtn) {
      forwardBtn.addEventListener('click', () => {
        if (!slide.classList.contains('swiper-slide-active')) return;
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
      });
    }

    // 倒退 10 秒
    if (backwardBtn) {
      backwardBtn.addEventListener('click', () => {
        if (!slide.classList.contains('swiper-slide-active')) return;
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
      });
    }
  });
});
