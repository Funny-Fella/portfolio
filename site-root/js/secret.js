// secret.js
document.addEventListener('DOMContentLoaded', () => {
  const buttonsContainer = document.getElementById('secret-buttons');
  const buttons = Array.from(buttonsContainer.querySelectorAll('button'));
  const message = document.getElementById('secret-message');

  const correctSequence = ['3', '4', '1', '2']; 
  const cookieName = 'secretUnlocked';
  const dashboardCookie = 'dashboardAccess';

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Cookie helper
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function refreshDashboardButton() {
    const secretSection = document.getElementById('secret-section');
    const existingBtn = document.getElementById('dashboard-btn');

    if (getCookie(dashboardCookie) === 'true') {
      if (!existingBtn) {
        const dashboardBtn = document.createElement('button');
        dashboardBtn.id = 'dashboard-btn';
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

        secretSection.style.position = 'relative';
        secretSection.appendChild(dashboardBtn);
      }
    } else {
      if (existingBtn) existingBtn.remove();
    }
  }

  // Check if already unlocked
  if (getCookie(cookieName) === 'true') {
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

      const shuffled = shuffleArray(buttons.slice());
      buttonsContainer.innerHTML = '';
      shuffled.forEach(b => buttonsContainer.appendChild(b));

      if (userSequence.length === correctSequence.length) {
        if (userSequence.join('') === correctSequence.join('')) {
          document.cookie = `${cookieName}=true; path=/; max-age=31536000`;
          document.cookie = `${dashboardCookie}=true; path=/; max-age=31536000`;

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
          message.style.display = 'block';
          message.style.opacity = '1';
          message.style.color = 'red';
          message.textContent = 'Wrong sequence! Try again.';
          userSequence = [];
        }
      }
    });
  });

  // Ensure dashboard button is synced with cookies
  refreshDashboardButton();
});
