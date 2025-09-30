// secret.js
document.addEventListener('DOMContentLoaded', () => {
  const buttonsContainer = document.getElementById('secret-buttons');
  const buttons = Array.from(buttonsContainer.querySelectorAll('button'));
  const message = document.getElementById('secret-message');

  const correctSequence = ['1', '2', '3', '4']; // set your sequence
  const cookieName = 'secretUnlocked';
  const dashboardCookie = 'dashboardAccess';

  // Helper to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Check if already unlocked
  if (document.cookie.split(';').some(c => c.trim().startsWith(`${cookieName}=`))) {
    buttons.forEach(b => {
      b.disabled = true;
      b.style.backgroundColor = 'grey';
    });
    message.style.display = 'block';
    message.style.color = 'green';
    message.textContent = 'Already unlocked!';
  }

  let userSequence = [];

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      userSequence.push(button.dataset.id);

      // Shuffle buttons visually
      const shuffled = shuffleArray(buttons.slice());
      buttonsContainer.innerHTML = '';
      shuffled.forEach(b => buttonsContainer.appendChild(b));

      // Check sequence if length matches
      if (userSequence.length === correctSequence.length) {
        if (userSequence.join('') === correctSequence.join('')) {
          // Success
          document.cookie = `${cookieName}=true; path=/; max-age=31536000`; // 1 year
          document.cookie = `${dashboardCookie}=true; path=/; max-age=31536000`; // unlock dashboard

          message.style.display = 'block';
          message.style.opacity = '1';
          message.style.color = 'green';
          message.textContent = 'Correct! Redirecting...';

          buttons.forEach(b => b.disabled = true);
          buttons.forEach(b => b.style.backgroundColor = 'grey');

          setTimeout(() => {
            window.location.href = 'secret.html';
          }, 1200);
        } else {
          // Wrong sequence
          message.style.display = 'block';
          message.style.opacity = '1';
          message.style.color = 'red';
          message.textContent = 'Wrong sequence! Try again.';
          userSequence = []; // reset
        }
      }
    });
  });

  // --- Dashboard button logic ---
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  if (getCookie(dashboardCookie) === 'true') {
    const secretSection = document.getElementById('secret-section');

    const dashboardBtn = document.createElement('button');
    dashboardBtn.textContent = 'Go to Dashboard';
    dashboardBtn.style.position = 'absolute';
    dashboardBtn.style.top = '10px';
    dashboardBtn.style.right = '10px';
    dashboardBtn.style.padding = '8px 16px';
    dashboardBtn.style.background = '#0f0';
    dashboardBtn.style.color = '#000';
    dashboardBtn.style.border = 'none';
    dashboardBtn.style.cursor = 'pointer';

    dashboardBtn.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });

    secretSection.style.position = 'relative'; // allow absolute positioning
    secretSection.appendChild(dashboardBtn);
  }
});
