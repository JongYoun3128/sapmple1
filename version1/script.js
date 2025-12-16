// 스크롤 시 섹션 회전 효과
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 모든 섹션에 관찰자 적용 (패키지 섹션 제외)
document.querySelectorAll('section:not(.packages-section)').forEach(section => {
    observer.observe(section);
});

// 패키지 섹션은 즉시 visible 처리
const packagesSection = document.querySelector('.packages-section');
if (packagesSection) {
    packagesSection.classList.add('visible');
}

// 패키지 카드 호버 효과 강화
document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateY(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
    });
});

// 스크롤 시 헤더 배경 변화
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// 페이지 로드 시 첫 번째 섹션 즉시 표시
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('visible');
    }
    
    // 슬로건 섹션도 표시
    const slogan = document.querySelector('.slogan-section');
    if (slogan) {
        slogan.classList.add('visible');
    }
});

// FAQ 토글 기능
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // 모든 FAQ 닫기
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 클릭한 것만 열기 (이미 열려있었으면 닫힌 상태 유지)
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// 숫자 카운트 애니메이션
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

// Stats 섹션 관찰
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const target = parseInt(num.dataset.target);
                animateCounter(num, target);
            });
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 장점 카드 순차 애니메이션
const advantageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.advantage-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    advantageObserver.observe(card);
});

// 프로세스 스텝 순차 애니메이션
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.process-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = 'all 0.6s ease';
    processObserver.observe(step);
});

// 슬로건 무한 스크롤을 위한 복제
const sloganWrapper = document.querySelector('.slogan-wrapper');
if (sloganWrapper) {
    const sloganItems = sloganWrapper.innerHTML;
    sloganWrapper.innerHTML = sloganItems + sloganItems + sloganItems;
}
