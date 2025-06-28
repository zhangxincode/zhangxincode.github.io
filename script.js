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