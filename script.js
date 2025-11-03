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

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        // Disable button during submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Send form data to Google Apps Script
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          showSuccessMessage(contactForm, "✅ Thank you! Your message has been sent successfully.");
          contactForm.reset();
        } else {
          showSuccessMessage(contactForm, "⚠️ Something went wrong. Please try again later.", true);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        showSuccessMessage(contactForm, "❌ Network error. Please try again.", true);
      } finally {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Request";
      }
    });

    // Reset Button Functionality
    const resetBtn = contactForm.querySelector('button[type="reset"]');
    resetBtn.addEventListener("click", () => {
      contactForm.reset();
      const msg = contactForm.querySelector(".success-message");
      if (msg) msg.remove();
    });
  }

  // Helper Function: Show success or error message
  function showSuccessMessage(form, message, isError = false) {
    // Remove previous messages
    const oldMsg = form.querySelector(".success-message");
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement("div");
    msg.classList.add("success-message");
    msg.textContent = message;

    if (isError) msg.classList.add("error");

    form.appendChild(msg);

    // Auto fade out
    setTimeout(() => {
      msg.classList.add("fade-out");
      setTimeout(() => msg.remove(), 600);
    }, 4000);
  }
});
