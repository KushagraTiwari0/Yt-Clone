document.addEventListener('DOMContentLoaded', () => {
    // Array definition containing data structured to support dynamic loop processing
    const dataset = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
            author: "-Mr. John Geller"
        },
        {
            text: "Excellent operational frameworks and strategic advisory tracking models. Our implementation infrastructure across front-facing channels accelerated scaling metrics by substantial margins inside single fiscal execution loops.",
            author: "-Corporate Operations Director"
        }
    ];

    let cursor = 0;
    const txtNode = document.querySelector('.testimonial-box p');
    const authNode = document.querySelector('.testimonial-author');
    const backBtn = document.querySelector('.carousel-arrow.prev');
    const fwdBtn = document.querySelector('.carousel-arrow.next');

    if (txtNode && authNode && backBtn && fwdBtn) {
        function render() {
            txtNode.textContent = dataset[cursor].text;
            authNode.textContent = dataset[cursor].author;
        }

        function nextSlide() {
            cursor = (cursor === dataset.length - 1) ? 0 : cursor + 1;
            render();
        }

        let rotateInterval = setInterval(nextSlide, 5000);

        function resetInterval() {
            clearInterval(rotateInterval);
            rotateInterval = setInterval(nextSlide, 5000);
        }

        backBtn.addEventListener('click', () => {
            cursor = (cursor === 0) ? dataset.length - 1 : cursor - 1;
            render();
            resetInterval();
        });

        fwdBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    // ---------- HAMBURGER MENU ----------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active', isActive);
            hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ---------- POPUP MODAL ----------
    const overlay = document.getElementById('popup-overlay');
    const popupIcon = document.getElementById('popup-icon');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');

    function showPopup(type, title, message) {
        popupIcon.className = 'popup-icon ' + type;
        popupIcon.textContent = type === 'success' ? '✓' : '!';
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        overlay.classList.add('visible');
    }

    function hidePopup() {
        overlay.classList.remove('visible');
    }

    if (popupClose) popupClose.addEventListener('click', hidePopup);
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) hidePopup();
        });
    }

    // ---------- VALIDATION HELPERS ----------
    const emailPattern = /^[^\s@]+@gmail\.com$/i;
    const phonePattern = /^[0-9]{10}$/;

    function setFieldError(input, errorEl, message) {
        const container = input.closest('.input-container');
        if (container) {
            container.classList.add('input-invalid');
        } else {
            input.classList.add('input-invalid');
        }
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }

    function clearFieldError(input, errorEl) {
        const container = input.closest('.input-container');
        if (container) {
            container.classList.remove('input-invalid');
        } else {
            input.classList.remove('input-invalid');
        }
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('visible');
        }
    }

    // ---------- CONTACT FORM ----------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const phoneInput = document.getElementById('contact-phone');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        const phoneError = document.getElementById('contact-phone-error');
        const emailError = document.getElementById('contact-email-error');
        const messageError = document.getElementById('contact-message-error');

        // Sanitize phone input to only allow digits
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, '');
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            if (!phoneInput.value.trim()) {
                setFieldError(phoneInput, phoneError, 'Phone number is required.');
                isValid = false;
            } else if (!phonePattern.test(phoneInput.value.trim())) {
                setFieldError(phoneInput, phoneError, 'Enter a valid 10 digit phone number.');
                isValid = false;
            } else {
                clearFieldError(phoneInput, phoneError);
            }

            if (!emailInput.value.trim()) {
                setFieldError(emailInput, emailError, 'Email is required.');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                setFieldError(emailInput, emailError, 'Enter a valid Gmail address (ending in @gmail.com).');
                isValid = false;
            } else {
                clearFieldError(emailInput, emailError);
            }

            clearFieldError(messageInput, messageError);

            if (!isValid) {
                showPopup('error', 'Check your details', 'Some fields need your attention before we can send this.');
                return;
            }

            showPopup('success', 'Message sent', 'Thanks for reaching out — we\'ll get back to you shortly.');
            contactForm.reset();
        });

        [phoneInput, emailInput, messageInput].forEach((input) => {
            input.addEventListener('input', () => {
                const container = input.closest('.input-container');
                if (container && container.classList.contains('input-invalid')) {
                    const errorEl = input === phoneInput ? phoneError : input === emailInput ? emailError : messageError;
                    clearFieldError(input, errorEl);
                }
            });
        });
    }

    // ---------- NEWSLETTER FORM ----------
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        const newsletterEmail = document.getElementById('newsletter-email');
        const newsletterError = document.getElementById('newsletter-email-error');

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!newsletterEmail.value.trim()) {
                setFieldError(newsletterEmail, newsletterError, 'Email is required.');
                showPopup('error', 'Almost there', 'Please enter your email address to subscribe.');
                return;
            }
            if (!emailPattern.test(newsletterEmail.value.trim())) {
                setFieldError(newsletterEmail, newsletterError, 'Enter a valid Gmail address (ending in @gmail.com).');
                showPopup('error', 'Invalid email', 'A Gmail address is required (ending in @gmail.com).');
                return;
            }

            clearFieldError(newsletterEmail, newsletterError);
            showPopup('success', 'Subscribed!', 'You\'re on the list — thanks for signing up.');
            newsletterForm.reset();
        });

        newsletterEmail.addEventListener('input', () => {
            clearFieldError(newsletterEmail, newsletterError);
        });
    }
});