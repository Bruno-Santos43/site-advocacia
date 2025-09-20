// Modern JavaScript for Law Office Website

class LawOfficeWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupFormHandling();
        this.setupSmoothScrolling();
        this.setupToastNotifications();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile menu links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.scrollToSection(target);
                this.closeMobileMenu();
            });
        });

        // Desktop navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.scrollToSection(target);
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => this.scrollToTop());
        }

        // Service cards click handlers
        const serviceButtons = document.querySelectorAll('.service-btn');
        serviceButtons.forEach(btn => {
            btn.addEventListener('click', () => this.scrollToSection('#contact'));
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    setupScrollEffects() {
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section links
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupMobileMenu() {
        this.createMobileMenuOverlay();
    }

    createMobileMenuOverlay() {
        if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.addEventListener('click', () => this.closeMobileMenu());
            document.body.appendChild(overlay);
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenu && overlay) {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenu && overlay) {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenu && overlay) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setupFormHandling() {
        // Add form validation and enhancement
        const form = document.getElementById('contactForm');
        if (form) {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Add floating label effect
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling
        if ('scrollBehavior' in document.documentElement.style) {
            // Browser supports smooth scrolling
            return;
        }
        
        // Polyfill for smooth scrolling
        this.setupSmoothScrollPolyfill();
    }

    setupSmoothScrollPolyfill() {
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        window.smoothScrollTo = (target, duration = 800) => {
            const startPosition = window.pageYOffset;
            const targetPosition = target.offsetTop - 80; // Account for fixed header
            const distance = targetPosition - startPosition;
            let startTime = null;

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };
            
            requestAnimationFrame(animation);
        };
    }

    setupToastNotifications() {
        this.toastContainer = document.getElementById('toast');
    }

    scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleScroll() {
        const header = document.getElementById('header');
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }

        // Show/hide back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        }

        // Trigger animations for elements coming into view
        this.triggerScrollAnimations();
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            this.closeMobileMenu();
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');

        // Coletar dados do formulário
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        // Validação dos campos
        const validationErrors = this.validateFormData(formData);
        if (validationErrors.length > 0) {
            this.showToast('Erro de validação', validationErrors.join('<br>'), 'error');
            this.highlightInvalidFields(form, validationErrors);
            return;
        }

        // Mostrar estado de carregamento
        this.setLoadingState(submitBtn, true);

        try {
            console.log('📤 Enviando formulário para o servidor...');

            const response = await fetch('contato.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                console.log('✅ Formulário enviado com sucesso:', result);
                this.showToast(
                    'Mensagem enviada com sucesso!',
                    result.message || 'Entraremos em contato em até 24 horas.',
                    'success'
                );
                form.reset();
                this.clearFieldHighlights(form);
            } else {
                console.error('❌ Erro na resposta do servidor:', result);
                this.showToast(
                    'Erro ao enviar',
                    result.error || 'Ocorreu um erro inesperado. Tente novamente.',
                    'error'
                );
            }

        } catch (error) {
            console.error('❌ Erro na requisição:', error);
            this.showToast(
                'Erro de conexão',
                'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
                'error'
            );
        } finally {
            // Restaurar estado do botão
            this.setLoadingState(submitBtn, false);
        }
    }

    simulateFormSubmission(formData) {
        // Show loading state
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Re-initialize icons for the loader
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Re-initialize icons
            if (window.lucide) {
                lucide.createIcons();
            }
            
            // Show success message
            this.showToast(
                'Mensagem enviada com sucesso!', 
                'Entraremos em contato em até 24 horas.',
                'success'
            );
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Log form data (in real implementation, this would be sent to server)
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
        }, 2000);
    }

    showToast(title, description, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        // Update toast content
        const titleElement = toast.querySelector('.toast-title');
        const descriptionElement = toast.querySelector('.toast-description');
        const iconElement = toast.querySelector('i');
        
        if (titleElement) titleElement.textContent = title;
        if (descriptionElement) descriptionElement.textContent = description;
        
        // Update icon based on type
        if (iconElement) {
            iconElement.setAttribute('data-lucide', type === 'success' ? 'check-circle' : 'x-circle');
            iconElement.style.color = type === 'success' ? '#22c55e' : '#ef4444';
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Re-initialize icons
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    initializeAnimations() {
        // Set up intersection observer for fade-in animations
        const animatedElements = document.querySelectorAll('.fade-in-up');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    triggerScrollAnimations() {
        // Additional scroll-based animations can be added here
        const elements = document.querySelectorAll('.service-card, .team-card, .value-card');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Validação de dados do formulário
    validateFormData(formData) {
        const errors = [];

        // Validação do nome
        if (!formData.name || formData.name.length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }

        // Validação do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.push('E-mail inválido');
        }

        // Validação do telefone (opcional, mas se preenchido deve ser válido)
        if (formData.phone) {
            const phoneRegex = /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                errors.push('Telefone deve estar no formato (XX) XXXXX-XXXX');
            }
        }

        // Validação do assunto
        if (!formData.subject || formData.subject.length < 3) {
            errors.push('Assunto deve ter pelo menos 3 caracteres');
        }

        // Validação da mensagem
        if (!formData.message || formData.message.length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres');
        }

        return errors;
    }

    // Destacar campos inválidos
    highlightInvalidFields(form, errors) {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const fieldName = input.name;
            const hasError = errors.some(error =>
                error.toLowerCase().includes(fieldName.toLowerCase().replace('email', 'e-mail'))
            );

            if (hasError) {
                input.style.borderColor = '#ef4444';
                input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                input.style.borderColor = '#cbd5e1';
                input.style.boxShadow = 'none';
            }
        });
    }

    // Limpar destaques dos campos
    clearFieldHighlights(form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#cbd5e1';
            input.style.boxShadow = 'none';
        });
    }

    // Controlar estado de carregamento do botão
    setLoadingState(button, isLoading) {
        if (!button) return;

        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i data-lucide="loader-2"></i> Enviando...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.innerHTML = 'Enviar Mensagem';
            button.style.opacity = '1';
        }

        // Re-inicializar ícones
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Global functions for inline event handlers
window.scrollToSection = function(selector) {
    const target = document.querySelector(selector);
    if (target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.lawOfficeWebsite = new LawOfficeWebsite();
    
    // Initialize Lucide icons if available
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
        // Re-initialize any necessary components
        if (window.lucide) {
            lucide.createIcons();
        }
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}