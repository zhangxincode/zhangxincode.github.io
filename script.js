// 导航功能优化
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const anchors = document.querySelectorAll('.anchor');
    
    // 防抖函数
    function debounce(func, wait) {
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
    
    // 立即跳转函数
    function instantScrollTo(target) {
        if (target) {
            // 使用更简单的计算方法
            const navHeight = 100; // 导航栏高度
            const offsetTop = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'auto'
            });
        }
    }
    
    // 为导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                console.log('点击导航链接:', targetId, '目标元素:', target);
                instantScrollTo(target);
            } else {
                console.error('未找到目标元素:', targetId);
            }
        });
    });
    
    // 监听滚动事件，更新导航栏活动状态
    const updateActiveNav = debounce(() => {
        let current = '';
        const navHeight = 100;
        const scrollPosition = window.scrollY + navHeight;
        
        anchors.forEach(anchor => {
            const anchorTop = anchor.offsetTop;
            const anchorBottom = anchorTop + 200; // 给每个区域200px的高度
            
            if (scrollPosition >= anchorTop && scrollPosition < anchorBottom) {
                current = anchor.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 10);
    
    window.addEventListener('scroll', updateActiveNav);
    
    // 页面加载时初始化活动状态
    updateActiveNav();
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.2)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// 简单导航栏功能
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                // 平滑滚动到目标位置
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-block, .paper-box, .patent-item, .award-item, .education-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 鼠标跟随效果
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: cursorFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// 添加光标轨迹动画
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// 卡片悬停效果增强
document.querySelectorAll('.paper-box, .patent-item, .award-item, .education-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// 研究领域悬停效果
document.querySelectorAll('.research-areas li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 8px 20px rgba(0, 255, 255, 0.4)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// 头像动画
document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.querySelector('.avatar-placeholder');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// 社交链接悬停效果
document.querySelectorAll('.author-urls a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.textShadow = '0 0 15px #00ffff';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
        this.style.textShadow = 'none';
    });
});

// 论文卡片特殊效果
document.querySelectorAll('.paper-box').forEach(paper => {
    paper.addEventListener('mouseenter', function() {
        const image = this.querySelector('.paper-box-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
            image.style.filter = 'brightness(1.2)';
        }
    });
    
    paper.addEventListener('mouseleave', function() {
        const image = this.querySelector('.paper-box-image');
        if (image) {
            image.style.transform = 'scale(1)';
            image.style.filter = 'brightness(1)';
        }
    });
});

// 状态标签动画
document.querySelectorAll('.status').forEach(status => {
    status.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 15px currentColor';
    });
    
    status.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// 教育经历项动画
document.querySelectorAll('.education-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const header = this.querySelector('.education-header');
        if (header) {
            header.style.transform = 'translateX(10px)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const header = this.querySelector('.education-header');
        if (header) {
            header.style.transform = 'translateX(0)';
        }
    });
});

// 获奖经历项动画
document.querySelectorAll('.award-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const header = this.querySelector('.award-header');
        if (header) {
            header.style.transform = 'translateX(10px)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const header = this.querySelector('.award-header');
        if (header) {
            header.style.transform = 'translateX(0)';
        }
    });
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 初始化所有动画元素
    const animatedElements = document.querySelectorAll('.section-block, .paper-box, .patent-item, .award-item, .education-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 延迟显示动画元素
    setTimeout(() => {
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// 粒子效果
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particlesContainer.appendChild(particle);
    }
}

// 添加粒子动画
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// 页面加载时创建粒子
document.addEventListener('DOMContentLoaded', createParticles); 

// 语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取语言切换按钮
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // 当前语言状态（默认为英文）
    let currentLang = 'en';
    
    // 语言切换函数
    function switchLanguage(lang) {
        currentLang = lang;
        
        // 更新按钮状态
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // 更新页面语言属性
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        
        // 更新所有带有data-en和data-zh属性的元素
        const elements = document.querySelectorAll('[data-en][data-zh]');
        elements.forEach(element => {
            if (lang === 'zh') {
                element.textContent = element.dataset.zh;
            } else {
                element.textContent = element.dataset.en;
            }
        });
        
        // 更新页面标题
        const title = document.querySelector('title');
        if (lang === 'zh') {
            title.textContent = '张鑫 - 学术主页';
        } else {
            title.textContent = 'Xin Zhang - Academic Homepage';
        }
        
        // 保存语言偏好到本地存储
        localStorage.setItem('preferredLanguage', lang);
        
        // 添加切换动画效果
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }
    
    // 为每个语言按钮添加点击事件
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
        });
    });
    
    // 页面加载时检查本地存储的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
        switchLanguage(savedLang);
    } else {
        // 默认设置为英文
        switchLanguage('en');
    }
    
    // 平滑滚动功能
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sidebarHeight = document.querySelector('.sidebar').offsetHeight;
                const targetPosition = targetSection.offsetTop - 100;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // 添加滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.stars, .twinkling');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // 添加导航栏激活状态
    const sections = document.querySelectorAll('.section-block');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // 添加鼠标悬停效果
    const interactiveElements = document.querySelectorAll('.nav-item, .author-urls li, .research-areas li, .education-item, .paper-box, .award-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + L 切换语言
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            switchLanguage(newLang);
        }
        
        // 数字键快速导航
        if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const sections = ['about', 'education', 'publications', 'awards'];
            const targetSection = sections[parseInt(e.key) - 1];
            const targetElement = document.querySelector(`#${targetSection}`);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // 添加触摸设备支持
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向上滑动 - 可以添加一些交互
                console.log('Swiped up');
            } else {
                // 向下滑动 - 可以添加一些交互
                console.log('Swiped down');
            }
        }
    }
    
    // 添加性能优化
    let ticking = false;
    
    function updateOnScroll() {
        // 这里可以添加滚动时的性能优化代码
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
    });
    
    // 添加页面可见性API支持
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时的处理
            console.log('页面已隐藏');
        } else {
            // 页面显示时的处理
            console.log('页面已显示');
        }
    });
});

// 添加一些额外的工具函数
const Utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
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
    },
    
    // 格式化日期
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }
};

// 导出工具函数供全局使用
window.Utils = Utils;

// 樱花效果
function initSakuraEffect() {
    console.log('初始化樱花效果');
    
    const sakuraContainer = document.getElementById('sakuraContainer');
    if (!sakuraContainer) {
        console.error('樱花容器未找到');
        return;
    }
    
    console.log('找到樱花容器:', sakuraContainer);
    
    let sakuraCount = 0;
    const maxSakura = 6; // 减少樱花数量
    
                // 创建樱花
            function createSakura() {
                if (sakuraCount >= maxSakura) return;
                
                const sakura = document.createElement('div');
                sakura.className = 'sakura';
                
                // 随机位置
                const startX = Math.random() * window.innerWidth;
                const fallDuration = Math.random() * 6 + 4; // 飘落时间 4-10秒
                
                sakura.style.left = startX + 'px';
                sakura.style.animationDuration = fallDuration + 's';
                sakura.style.animationDelay = Math.random() * 2 + 's';
                
                sakuraContainer.appendChild(sakura);
                sakuraCount++;
                
                console.log('创建樱花', sakuraCount);
                
                // 樱花落地后移除
                setTimeout(() => {
                    if (sakura.parentNode) {
                        sakura.parentNode.removeChild(sakura);
                        sakuraCount--;
                    }
                }, fallDuration * 1000);
            }
    
    // 立即创建一些樱花进行测试
    setTimeout(() => {
        console.log('开始创建樱花');
        createSakura();
        createSakura();
        createSakura();
    }, 500);
    
    // 定期创建樱花
    setInterval(() => {
        if (sakuraCount < maxSakura) {
            createSakura();
        }
    }, 2000);
}

// 在DOM加载完成后初始化樱花效果
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化樱花效果');
    initSakuraEffect();
});

// 如果DOM已经加载完成，立即初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSakuraEffect);
} else {
    initSakuraEffect();
} 