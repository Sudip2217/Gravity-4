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

