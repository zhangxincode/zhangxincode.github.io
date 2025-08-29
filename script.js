// 导航功能优化
function optimizeNavigation() {
    // 确保DOM加载完成
    if (document.readyState !== 'loading') {
        initNavigation();
    } else {
        document.addEventListener('DOMContentLoaded', initNavigation);
    }

    function initNavigation() {
        const navItems = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('main > section');
        let currentSection = '';

        // 初始高亮当前页面
        updateActiveNavItem();

        // 监听滚动事件更新导航高亮
        window.addEventListener('scroll', updateActiveNavItem);

        // 为导航项添加平滑滚动
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        function updateActiveNavItem() {
            let scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                }
            });
        }
    }
}

// 导航栏滚动效果
function enhanceNavbarOnScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 滚动超过阈值时改变导航栏样式
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }

        // 隐藏/显示导航栏 (向下滚动时隐藏，向上滚动时显示)
        if (Math.abs(lastScrollTop - scrollTop) > 10) { // 添加小的阈值以避免抖动
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // 向下滚动且已滚动一定距离
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动或在顶部附近
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }
    });
}

// 滚动动画
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;

    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // 初始检查
    checkScroll();
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
}

// 鼠标跟随效果
function addMouseFollowEffect() {
    // 创建跟随元素
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    // 控制跟随效果的变量
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    const speed = 0.1; // 跟随速度 (0-1)

    // 更新跟随元素位置
    function followMouse() {
        posX += (mouseX - posX) * speed;
        posY += (mouseY - posY) * speed;
        
        follower.style.transform = `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0)`;
        
        requestAnimationFrame(followMouse);
    }

    // 监听鼠标移动
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 开始跟随动画
    followMouse();

    // 为可点击元素添加交互效果
    const interactiveElements = document.querySelectorAll('a, button, .card-hover-effect');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            follower.classList.add('interact');
        });
        
        element.addEventListener('mouseleave', function() {
            follower.classList.remove('interact');
        });
    });
}

// 卡片悬停效果增强
function enhanceCardHoverEffects() {
    const cards = document.querySelectorAll('.card-hover-effect');
    
    if (!cards.length) return;

    cards.forEach(card => {
        // 初始状态设置
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        card.addEventListener('mouseenter', function(e) {
            // 计算鼠标在卡片上的位置，创建倾斜效果
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // 鼠标在卡片上的X坐标
            const y = e.clientY - rect.top; // 鼠标在卡片上的Y坐标
            
            const xPos = ((x / rect.width) - 0.5) * 6; // -3到3的范围
            const yPos = ((y / rect.height) - 0.5) * 6; // -3到3的范围
            
            this.style.transform = `perspective(1000px) rotateX(${-yPos}deg) rotateY(${xPos}deg) translateZ(10px)`;
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
}

// 页面加载动画
function addPageLoadAnimation() {
    // 创建加载覆盖层
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>正在加载中...</p>
        </div>
    `;
    document.body.appendChild(loader);

    // 设置加载动画样式
    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        .loader-content {
            text-align: center;
        }
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #ff69b4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .page-loader.fade-out {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // 监听页面加载完成事件
    window.addEventListener('load', function() {
        // 延迟一小段时间后隐藏加载动画
        setTimeout(function() {
            loader.classList.add('fade-out');
            
            // 动画完成后移除加载器
            setTimeout(function() {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 500);
    });
}

// 粒子效果
function createParticles() {
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    // 设置粒子容器样式
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';

    // 根据屏幕尺寸决定粒子数量
    const getParticleCount = () => {
        const screenArea = window.innerWidth * window.innerHeight;
        return Math.max(20, Math.floor(screenArea / 100000));
    };

    // 创建粒子
    function initParticles() {
        // 清空现有粒子
        particleContainer.innerHTML = '';
        
        const particleCount = getParticleCount();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机属性
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.1;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // 设置样式
            particle.style.position = 'absolute';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = '#ff69b4';
            particle.style.borderRadius = '50%';
            particle.style.opacity = opacity;
            particle.style.left = left + 'vw';
            particle.style.top = top + 'vh';
            
            // 添加浮动动画
            particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
            
            particleContainer.appendChild(particle);
        }
    }

    // 添加浮动动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-10px) translateX(5px); }
            50% { transform: translateY(-20px) translateX(0); }
            75% { transform: translateY(-10px) translateX(-5px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    document.head.appendChild(style);

    // 初始化粒子
    initParticles();
    
    // 响应窗口大小变化
    window.addEventListener('resize', initParticles);
}

// 语言切换功能
function addLanguageSwitching() {
    const langSwitcher = document.querySelector('.language-switcher');
    const langBtns = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-en], [data-zh]');
    
    if (!langSwitcher || !langBtns.length) return;

    // 初始化当前语言
    let currentLang = 'en';
    
    // 检查存储的语言首选项
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && ['en', 'zh'].includes(savedLang)) {
        currentLang = savedLang;
        updateLanguage(currentLang);
        updateLangButtons(currentLang);
    }

    // 为语言按钮添加点击事件
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                currentLang = lang;
                updateLanguage(currentLang);
                updateLangButtons(currentLang);
                
                // 保存语言首选项
                localStorage.setItem('preferredLanguage', currentLang);
            }
        });
    });

    // 更新页面语言
    function updateLanguage(lang) {
        elements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // 更新语言按钮状态
    function updateLangButtons(activeLang) {
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === activeLang) {
                btn.classList.add('active');
            }
        });
    }
}

// 平滑滚动
function enableSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 视差效果
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    if (!parallaxElements.length) return;
    
    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 导航激活状态
function updateNavActiveState() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 鼠标悬停效果
function addHoverEffects() {
    const hoverableElements = document.querySelectorAll('a, button, .hover-effect');
    
    hoverableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 键盘快捷键支持
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // 按ESC键返回顶部
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // 按数字键1-6快速导航到各个部分
        if (e.key >= '1' && e.key <= '6') {
            const sectionIndex = parseInt(e.key) - 1;
            const sections = document.querySelectorAll('main > section');
            
            if (sections[sectionIndex]) {
                window.scrollTo({
                    top: sections[sectionIndex].offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// 触摸设备支持
function enhanceTouchSupport() {
    // 检测是否为触摸设备
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // 为触摸设备添加特殊处理
        document.body.classList.add('touch-device');
        
        // 移除鼠标特定的效果
        const mouseFollower = document.querySelector('.mouse-follower');
        if (mouseFollower) {
            mouseFollower.remove();
        }
        
        // 增强触摸交互
        const interactiveElements = document.querySelectorAll('a, button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.97)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// 性能优化
function optimizePerformance() {
    // 使用requestAnimationFrame进行滚动处理
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // 这里可以放置需要在滚动时执行但不那么频繁的代码
        }, 150);
    });
    
    // 延迟加载非关键资源
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        }
    }
    
    // 初始延迟加载
    setTimeout(lazyLoadImages, 500);
    
    // 页面可见性控制
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时，可以暂停一些动画或网络请求
        } else {
            // 页面显示时，恢复动画或网络请求
        }
    });
}

// 主初始化函数
function initPage() {
    // 初始化各项功能
    optimizeNavigation();
    enhanceNavbarOnScroll();
    animateOnScroll();
    addMouseFollowEffect();
    enhanceCardHoverEffects();
    addPageLoadAnimation();
    createParticles();
    addLanguageSwitching();
    enableSmoothScroll();
    addParallaxEffect();
    updateNavActiveState();
    addHoverEffects();
    addKeyboardShortcuts();
    enhanceTouchSupport();
    optimizePerformance();
}

// 启动页面初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}