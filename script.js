function getCurrentLang() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

function addLanguageSwitching() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-en], [data-zh]');
    if (!langBtns.length) return;

    let currentLang = getCurrentLang();

    function updateLanguage(lang) {
        elements.forEach((element) => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        restartTerminalSequence();
    }

    function updateButtons(lang) {
        langBtns.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    updateLanguage(currentLang);
    updateButtons(currentLang);

    langBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;
            currentLang = lang;
            localStorage.setItem('preferredLanguage', lang);
            updateLanguage(lang);
            updateButtons(lang);
        });
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-block');
    if (!navLinks.length || !sections.length) return;

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            const top = target.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === id));
        });
    }, { rootMargin: '-35% 0px -45% 0px', threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));
}

function setupScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll, .section-block');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.08 });

    elements.forEach((element) => {
        if (element.classList.contains('section-block') && !element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-on-scroll');
        }
        observer.observe(element);
    });
}

function setupGlowCards() {
    const cards = document.querySelectorAll('.section-block, .paper-box, .education-item, .award-item, .research-areas li, .profile-box');
    cards.forEach((card) => {
        card.classList.add('glow-card');
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        });
    });
}

let terminalRunId = 0;
let terminalTimers = [];

function clearTerminalTimers() {
    terminalTimers.forEach((timer) => clearTimeout(timer));
    terminalTimers = [];
}

function schedule(fn, delay) {
    const id = setTimeout(fn, delay);
    terminalTimers.push(id);
}

function buildTerminalSequence() {
    const lang = getCurrentLang();
    return [
        { type: 'command-typed', text: 'whoami' },
        { type: 'output', text: lang === 'zh' ? '张鑫 · 人工智能研究生 · 图学习 / LLM 研究者' : 'Xin Zhang · AI Graduate Student · Graph / LLM Researcher' },
        { type: 'command-typed', text: 'cat focus.txt' },
        { type: 'output', text: lang === 'zh' ? '聚焦图学习、多智能体系统与 FairLLM，探索更可靠的 AI 系统。' : 'Building reliable AI systems with graph learning, multi-agent systems, and FairLLM exploration.' },
        { type: 'command-typed', text: 'ls skills/' },
        { type: 'output', text: 'graph_ml/  mas/  llm_systems/  fairness/' }
    ];
}

function typeText(target, text, speed, runId, done) {
    let index = 0;
    function step() {
        if (runId !== terminalRunId) return;
        target.textContent = text.slice(0, index);
        index += 1;
        if (index <= text.length) {
            schedule(step, speed);
        } else if (done) {
            done();
        }
    }
    step();
}

function restartTerminalSequence() {
    const container = document.getElementById('terminal-output');
    if (!container) return;

    terminalRunId += 1;
    const runId = terminalRunId;
    clearTerminalTimers();
    container.innerHTML = '';

    const sequence = buildTerminalSequence();
    let delay = 150;

    sequence.forEach((item) => {
        schedule(() => {
            if (runId !== terminalRunId) return;
            if (item.type === 'command-typed') {
                const line = document.createElement('div');
                line.className = 'terminal-line visible';
                line.innerHTML = '<span class="prompt">$</span> <span class="command-inline"></span><span class="cursor-inline"></span>';
                container.appendChild(line);
                const target = line.querySelector('.command-inline');
                typeText(target, item.text, 85, runId);
            } else {
                const line = document.createElement('div');
                line.className = `terminal-line ${item.type === 'output' ? 'output' : ''} visible`;
                if (item.type === 'command') {
                    line.innerHTML = `<span class="prompt">$</span> <span class="command-inline">${item.text}</span>`;
                } else {
                    line.textContent = item.text;
                }
                container.appendChild(line);
            }
        }, delay);
        delay += item.type === 'command-typed' ? 1350 : 650;
    });

    schedule(() => {
        if (runId !== terminalRunId) return;
        restartTerminalSequence();
    }, delay + 2600);
}

function drawMeteorCodeRain() {
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = '01<>/*+-=[]{}/#@$%^&*';
    let columns = [];

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const fontSize = 15;
        const count = Math.ceil(window.innerWidth / 22);
        columns = Array.from({ length: count }, (_, i) => ({
            x: i * 22 + Math.random() * 8,
            y: Math.random() * -window.innerHeight,
            speed: 1.8 + Math.random() * 2.2,
            trail: 7 + Math.floor(Math.random() * 7),
            tail: 18 + Math.random() * 26,
            glow: 12 + Math.random() * 10,
            fontSize
        }));
    }

    function drawStarShape(centerX, centerY, outerRadius, innerRadius) {
        ctx.beginPath();
        for (let i = 0; i < 10; i += 1) {
            const angle = (-Math.PI / 2) + i * (Math.PI / 5);
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
    }

    function draw() {
        ctx.fillStyle = 'rgba(245, 247, 251, 0.09)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        columns.forEach((drop) => {
            for (let i = 0; i < drop.trail; i += 1) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const y = drop.y - i * drop.fontSize;
                const alpha = Math.max(0, 0.22 - i * 0.024);
                ctx.font = `${drop.fontSize}px JetBrains Mono, monospace`;
                ctx.fillStyle = `rgba(138, 166, 255, ${alpha})`;
                ctx.fillText(char, drop.x, y);
            }

            const starY = drop.y;
            const starX = drop.x + 6;

            const glow = ctx.createRadialGradient(starX, starY, 0, starX, starY, drop.glow + 3);
            glow.addColorStop(0, 'rgba(255, 252, 232, 0.99)');
            glow.addColorStop(0.2, 'rgba(255, 230, 158, 0.98)');
            glow.addColorStop(0.45, 'rgba(255, 206, 122, 0.82)');
            glow.addColorStop(0.68, 'rgba(255, 189, 214, 0.34)');
            glow.addColorStop(1, 'rgba(255, 189, 214, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(starX, starY, drop.glow - 1, 0, Math.PI * 2);
            ctx.fill();

            const tailGradient = ctx.createLinearGradient(starX, starY - drop.tail, starX, starY + 8);
            tailGradient.addColorStop(0, 'rgba(255, 189, 214, 0)');
            tailGradient.addColorStop(0.22, 'rgba(255, 189, 214, 0.22)');
            tailGradient.addColorStop(0.68, 'rgba(255, 216, 131, 0.64)');
            tailGradient.addColorStop(1, 'rgba(255, 249, 235, 0.99)');
            ctx.strokeStyle = tailGradient;
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(starX, starY - drop.tail);
            ctx.lineTo(starX, starY + 2);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(255, 240, 176, 0.96)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(starX, starY - drop.tail * 0.74);
            ctx.lineTo(starX, starY + 1);
            ctx.stroke();

            // actual star icon
            drawStarShape(starX, starY, 7.2, 3.0);
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(255, 217, 112, 0.95)';
            ctx.fillStyle = 'rgba(255, 247, 214, 0.99)';
            ctx.fill();
            ctx.shadowBlur = 0;

            drawStarShape(starX, starY, 4.6, 1.9);
            ctx.fillStyle = 'rgba(255,255,255,0.99)';
            ctx.fill();

            drop.y += drop.speed;
            if (drop.y - drop.tail > window.innerHeight + 30) {
                drop.y = -30 - Math.random() * 260;
            }
        });
        window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

function initPage() {
    addLanguageSwitching();
    setupNavigation();
    setupScrollAnimation();
    setupGlowCards();
    addKeyboardShortcuts();
    restartTerminalSequence();
    drawMeteorCodeRain();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
