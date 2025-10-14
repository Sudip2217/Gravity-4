document.addEventListener('DOMContentLoaded', () => {
//NAVBAR TOGGLE (Responsive)
   
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    nav.classList.toggle('show');
  });

  document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      nav.classList.remove('show');
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      menuBtn.classList.remove('active');
      nav.classList.remove('show');
    }
  });

  /* ==========================
     MODAL FUNCTIONALITY
     ========================== */
  const modal = document.getElementById('propertyModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalSize = document.getElementById('modalSize');
  const modalBed = document.getElementById('modalBed');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const modalDownload = document.getElementById('modalDownload');
  const modalContact = document.getElementById('modalContact');
  const modalClose = document.querySelector('.modal-close');

  const cardButtons = document.querySelectorAll('.card-more');

  cardButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      const img = card.querySelector('img').src;
      const title = card.querySelector('h3').textContent;
      const size = card.getAttribute('data-size') || 'N/A';
      const bed = card.getAttribute('data-bed') || 'N/A';
      const desc = card.querySelector('p').textContent;
      const price = card.querySelector('.card-badge')?.textContent || 'N/A';

      // Fill modal content
      modalImg.src = img;
      modalTitle.textContent = title;
      modalSize.textContent = size;
      modalBed.textContent = bed;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;

      // placeholder download link (user can replace with actual PDF)
      modalDownload.href = img.replace(/\.(jpg|jpeg|png)$/i, '.pdf');

      // contact link scrolls to contact
      modalContact.href = '#contact';

      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  /* ==========================
     FILTER BUTTONS
     ========================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove "active" from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-type') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
