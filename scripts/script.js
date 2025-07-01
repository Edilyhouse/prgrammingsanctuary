document.addEventListener('DOMContentLoaded', function () {    
    // Menu toggle para mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animación de cards al hacer scroll
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cards.forEach(card => {
        observer.observe(card);
    });

    //              **** Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    async function sendEmail(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const URL = 'https://api.emailjs.com/api/v1.0/email/send'
        const serviceID = 'service_qjxjq39';
        const templateID = 'template_1rp3ymq';

        // console.log('entrando al envio de corroe', name, email, message)        

        if (name === '' || email === '' || name.length <= 3 || email.length <= 5) {
            alert('Todos los campos son obligatorios')
        } else {
            try {
                const response = await fetch( URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        service_id: serviceID,
                        template_id: templateID,
                        user_id: 'lVhoricMISvF8NqF0',
                        template_params: {
                            name,
                            email,
                            message
                        }
                    })
                });
                if (response.ok) {
                    formMessage.textContent = '¡Gracias por tu mensaje! Lo hemos recibido correctamente.';
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                        formMessage.classList.remove('success');
                    }, 3000);
                } else {
                    throw new Error('Error al enviar mensaje');
                }
            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'Ocurrió un problema al enviar tu mensaje.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                contactForm.reset();
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                        formMessage.classList.remove('error');
                    }, 5000);
            }
        }
    }

    // Asegurar que el hero section tenga el tamaño correcto en carga
    function adjustHeroHeight() {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const hero = document.querySelector('.hero');
        hero.style.paddingTop = `${headerHeight}px`;
        hero.style.minHeight = `calc(100vh - ${headerHeight}px)`;
    }

    // Listeners
    window.addEventListener('load', adjustHeroHeight);
    window.addEventListener('resize', adjustHeroHeight);
    contactForm.addEventListener('submit', sendEmail);


});