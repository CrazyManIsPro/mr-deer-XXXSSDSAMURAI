const startBtn = document.getElementById('start-btn');
const settingsBtn = document.getElementById('settings-btn');
const gameStart = document.getElementById('game-start');
const gameScene = document.getElementById('game-scene');
const question = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const glitch = document.getElementById('glitch');
const blackout = document.getElementById('blackout');
const timer = document.getElementById('timer');
const pauseBtn = document.getElementById('pause-btn');
const pauseMenu = document.getElementById('pause-menu');
const confirmExit = document.getElementById('confirm-exit');
const leaveBtn = document.getElementById('leave-btn');
const yesExit = document.getElementById('yes-exit');
const noExit = document.getElementById('no-exit');

let timerInterval;

startBtn.addEventListener('click', () => {
  gameStart.style.transition = 'opacity 1s';
  gameStart.style.opacity = 0;
  setTimeout(() => {
    gameStart.classList.add('hidden');
    gameScene.classList.remove('hidden');
    gameScene.style.opacity = 1;
    setTimeout(() => {
      question.textContent = "Hello, would you like a tour?";
      question.classList.add('typing');
      setTimeout(() => addOptions(), 3500);
    }, 1000);
  }, 1000);
});

pauseBtn.addEventListener('click', () => {
  gameScene.style.opacity = 0.3;
  pauseMenu.style.display = 'flex';
  clearInterval(timerInterval);
});

leaveBtn.addEventListener('click', () => {
  pauseMenu.style.display = 'none';
  confirmExit.style.display = 'flex';
});

noExit.addEventListener('click', () => {
  confirmExit.style.display = 'none';
  pauseMenu.style.display = 'flex';
});

yesExit.addEventListener('click', () => {
  confirmExit.style.display = 'none';
  gameScene.classList.add('hidden');
  gameStart.classList.remove('hidden');
  gameStart.style.opacity = 1;
  gameScene.style.opacity = 1;
  question.textContent = '';
  optionsContainer.innerHTML = '';
});

function addOptions() {
  const texts = ["Okay, can I do it alone?", "Can I go home.", "Can you show me around?"];
  texts.forEach((text, i) => {
    setTimeout(() => {
      const btn = document.createElement('button');
      btn.classList.add('option');
      btn.textContent = text;
      optionsContainer.appendChild(btn);

      if (text === "Okay, can I do it alone?") {
        btn.addEventListener('click', () => {
          gameScene.style.opacity = 0;
          clearInterval(timerInterval);
          setTimeout(() => {
            blackout.textContent = "You found a room. Here's Mr Ghost.";
            blackout.style.display = 'flex';
            blackout.style.opacity = 1;
            setTimeout(() => {
              blackout.style.opacity = 0;
              gameScene.style.backgroundImage = "url('mrghost.png')";
              gameScene.style.opacity = 1;
              optionsContainer.innerHTML = '';
              question.textContent = '...';
              setTimeout(() => triggerGlitch(), 800);
            }, 2500);
          }, 1200);
        });
      }

      if (i === texts.length - 1) {
        setTimeout(() => {
          startTimer();
          setTimeout(triggerGlitch, Math.random() * 8000 + 2000);
        }, 500);
      }
    }, i * 1000);
  });
}

function startTimer() {
  let time = 10;
  timer.textContent = time;
  timerInterval = setInterval(() => {
    time--;
    timer.textContent = time;
    if (time <= 0) clearInterval(timerInterval);
  }, 1000);
}

function triggerGlitch() {
  glitch.style.display = 'block';
  setTimeout(() => {
    glitch.style.display = 'none';
  }, 80);
}
