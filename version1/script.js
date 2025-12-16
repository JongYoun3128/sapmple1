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

// 모든 섹션에 관찰자 적용 (패키지 섹션, 유튜브 갤러리 섹션 제외)
document.querySelectorAll('section:not(.packages-section):not(.youtube-gallery-section)').forEach(section => {
    observer.observe(section);
});

// 패키지 섹션은 즉시 visible 처리
const packagesSection = document.querySelector('.packages-section');
if (packagesSection) {
    packagesSection.classList.add('visible');
}

// 유튜브 갤러리 섹션은 즉시 visible 처리
const youtubeGallerySection = document.querySelector('.youtube-gallery-section');
if (youtubeGallerySection) {
    youtubeGallerySection.classList.add('visible');
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

// 슬로건 무한 스크롤 - JavaScript 방식
const sloganWrapper = document.querySelector('.slogan-wrapper');
if (sloganWrapper) {
    const sloganItems = sloganWrapper.innerHTML;
    sloganWrapper.innerHTML = sloganItems + sloganItems + sloganItems;
    
    sloganWrapper.style.animation = 'none';
    let sloganPosition = 0;
    
    function animateSlogan() {
        const firstItem = sloganWrapper.querySelector('.slogan-item');
        if (!firstItem) return;
        
        const itemWidth = firstItem.offsetWidth + parseFloat(window.getComputedStyle(firstItem).marginLeft) + parseFloat(window.getComputedStyle(firstItem).marginRight);
        const resetPoint = itemWidth * 3; // 원본 3개
        
        sloganPosition -= 1; // 왼쪽으로 이동
        
        if (Math.abs(sloganPosition) >= resetPoint) {
            sloganPosition = 0;
        }
        
        sloganWrapper.style.transform = `translateX(${sloganPosition}px)`;
        requestAnimationFrame(animateSlogan);
    }
    
    animateSlogan();
}

// 파트너사 로고 무한 스크롤 - JavaScript 방식
const partnersTrack = document.querySelector('.partners-track');
if (partnersTrack) {
    const logos = partnersTrack.innerHTML;
    partnersTrack.innerHTML = logos + logos + logos;
    
    partnersTrack.style.animation = 'none';
    let partnerPosition = 0;
    
    function animatePartners() {
        const firstLogo = partnersTrack.querySelector('.partner-logo');
        if (!firstLogo) return;
        
        const logoWidth = firstLogo.offsetWidth + parseFloat(window.getComputedStyle(firstLogo).marginLeft) + parseFloat(window.getComputedStyle(firstLogo).marginRight);
        const resetPoint = logoWidth * 4; // 원본 4개
        
        partnerPosition -= 0.5; // 천천히 이동
        
        if (Math.abs(partnerPosition) >= resetPoint) {
            partnerPosition = 0;
        }
        
        partnersTrack.style.transform = `translateX(${partnerPosition}px)`;
        requestAnimationFrame(animatePartners);
    }
    
    animatePartners();
}

// 유튜브 갤러리 진짜 무한 루프
const galleryRows = document.querySelectorAll('.gallery-row');
galleryRows.forEach(row => {
    const cards = row.innerHTML;
    // 3세트 복제
    row.innerHTML = cards + cards + cards;
    
    // CSS 애니메이션 제거하고 JS로 직접 제어
    row.style.animation = 'none';
    
    let position = 0;
    const speed = row.classList.contains('row-left') ? -1 : 1; // 왼쪽은 -1, 오른쪽은 1
    
    function getCardWidth() {
        const firstCard = row.querySelector('.thumbnail-card');
        if (firstCard) {
            const style = window.getComputedStyle(firstCard);
            const width = firstCard.offsetWidth;
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            return width + marginLeft + marginRight;
        }
        return 340; // 기본값
    }
    
    function animate() {
        const cardWidth = getCardWidth();
        const resetPoint = cardWidth * 6; // 원본 6개의 너비
        
        position += speed * 1; // 속도 조절 (1픽셀씩)
        
        if (speed < 0) {
            // 왼쪽으로 이동
            if (Math.abs(position) >= resetPoint) {
                position = 0;
            }
        } else {
            // 오른쪽으로 이동
            if (position >= resetPoint) {
                position = 0;
            }
        }
        
        row.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    animate();
});

// 유튜브 영상 모달 기능
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// 썸네일 카드 클릭 시 모달 열기
document.addEventListener('click', function(e) {
    const card = e.target.closest('.thumbnail-card');
    if (card) {
        e.preventDefault();
        const videoId = card.getAttribute('data-video-id');
        
        // 유튜브 쇼츠 URL (일반 영상도 가능)
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
        
        // iframe에 URL 설정
        videoFrame.src = videoUrl;
        
        // 모달 열기
        videoModal.style.display = 'flex';
        setTimeout(() => {
            videoModal.classList.add('active');
        }, 10);
        
        // body 스크롤 방지
        document.body.style.overflow = 'hidden';
    }
});

// 모달 닫기 함수
function closeVideoModal() {
    videoModal.classList.remove('active');
    setTimeout(() => {
        videoModal.style.display = 'none';
        videoFrame.src = ''; // 영상 정지
        document.body.style.overflow = ''; // 스크롤 복원
    }, 300);
}

// X 버튼 클릭 시 모달 닫기
modalClose.addEventListener('click', closeVideoModal);

// 오버레이 클릭 시 모달 닫기
modalOverlay.addEventListener('click', closeVideoModal);

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});
