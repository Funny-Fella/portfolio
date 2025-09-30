const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-description');
const closeBtn = document.getElementById('closeBtn');

document.querySelectorAll('main img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxTitle.textContent = img.dataset.title || img.alt;
    lightboxDesc.textContent = img.dataset.desc || "No description available.";
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const badge = document.getElementById('updates-badge');

  // Check if the user has visited the updates page before
  if (localStorage.getItem('updatesVisited')) {
    badge.style.display = 'none';
  }

  // Add click listener to hide badge when updates is opened
  document.getElementById('updates-link').addEventListener('click', () => {
    localStorage.setItem('updatesVisited', 'true');
    badge.style.display = 'none';
  });
});

