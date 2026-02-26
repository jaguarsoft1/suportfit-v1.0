// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {

    // ==================== SWIPER - TRANSFORMAÇÕES ====================
    const swiper = new Swiper('.transformations-swiper', {
        loop: false, // 👈 desativa loop
        speed: 600,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    // ==================== SWIPER - DEPOIMENTOS (CARROSSEL DE IMAGENS) ====================
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 15000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        spaceBetween: 0,
    });

    // ==================== MENU MOBILE (HAMBURGUER) ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // ==================== LINK ATIVO NO SCROLL ====================
    const sections = document.querySelectorAll('section[id]');

    function activateNavLinkOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // ajuste se header for fixo
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });

                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLinkOnScroll);


    // ==================== FECHAR MENU AO CLICAR ====================
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // ==================== DROPDOWN MOBILE (MEDICAMENTOS) ====================
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    // Fechar dropdown ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isDropdown = e.target.closest('.dropdown');
            document.querySelectorAll('.dropdown.active').forEach(drop => {
                if (!isDropdown || !drop.contains(e.target)) {
                    drop.classList.remove('active');
                }
            });
        }
    });

    // ==================== FAQ ACCORDION ====================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Fechar todas as outras
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });

            // Abrir a atual, se não estiver ativa
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });

   // ==================== FUNÇÕES WHATSAPP ====================
function openWhatsApp(plan = '', person = '') {
    const phoneNumber = '5511960238252'; // Número correto
    let message = 'Olá! Gostaria de saber mais sobre os tratamentos e agendar uma consulta.';

    if (plan) {
        message += ` Estou interessado(a) no plano: ${plan}.`;
    }
    if (person) {
        message += ` Vi os resultados incríveis da ${person} e quero resultados similares!`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Anexar a todos os botões de WhatsApp (exceto o flutuante, que tem link direto)
const whatsappButtons = document.querySelectorAll('.whatsapp-nav-btn, .cta-button, .plan-button-original, .footer-btn, .whatsapp-btn-small');
whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Se for um link com destino real (diferente de âncora), deixa o navegador seguir
        if (this.tagName === 'A' && this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
            return; // não faz nada, o link funcionará normalmente
        }

        e.preventDefault();
        const plan = this.dataset.plano || '';
        const person = this.dataset.person || '';
        openWhatsApp(plan, person);
    });
});
// Botão flutuante do WhatsApp (link direto)
const floatButton = document.querySelector('.whatsapp-float a');
if (floatButton) {
    // Garantir que o link use o número correto e mensagem padrão
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os tratamentos e agendar uma consulta.');
    floatButton.href = `https://wa.me/5511960238252?text=${message}`;
}
    // ==================== EFEITO DE SCROLL NA NAVBAR ====================
    let lastScrollTop = 0;
    const navbar = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }

        // Esconder/mostrar navbar ao rolar
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;

        // Classe adicional para estilos
        navbar.classList.toggle('scrolled', scrollTop > 50);
    });


    // ==================== SCROLL SUAVE PARA ÂNCORAS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== ANIMAÇÃO DOS CONTADORES (HERO) ====================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start) + '%';

            if (start >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            }
        }, 16);
    }

    // ==================== INTERSECTION OBSERVER PARA ANIMAÇÕES ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                if (entry.target.id === 'home') {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach((stat, index) => {
                        const target = index === 0 ? 26.6 : index === 1 ? 4 : 100;
                        setTimeout(() => {
                            animateCounter(stat, target);
                        }, index * 300);
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ==================== LOADING ANIMATION ====================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ==================== ATUALIZAR ANO NO RODAPÉ ====================
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p:first-child');
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2023', yearSpan.textContent);
    }

    // ==================== TABS PARA PLANOS ====================
const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".plan-card-original");

if (tabs.length > 0 && cards.length > 0) {
    // Função para filtrar cards
    function filterCards(category) {
        cards.forEach(card => {
            if (card.getAttribute("data-category") === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
    // Adiciona evento de clique em cada aba
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove classe active de todas e adiciona na clicada
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Filtra os cards pela categoria
            const category = tab.getAttribute("data-tab");
            filterCards(category);
        });
    });

    // Inicializa mostrando apenas os cards da primeira aba (Tirzepatida)
    const firstTab = document.querySelector(".tab-btn.active");
    if (firstTab) {
        filterCards(firstTab.getAttribute("data-tab"));
    } else {
        // Fallback: se nenhuma tiver active, ativa a primeira e filtra
        tabs[0].classList.add("active");
        filterCards(tabs[0].getAttribute("data-tab"));
    }
}
}); // Fim do DOMContentLoaded

// ==================== FUNÇÃO UTILITÁRIA (DEBOUNCE) ====================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}