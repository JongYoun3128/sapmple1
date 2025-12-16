// 스크롤 시 섹션 회전 효과
const scrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.05,
        rootMargin: "0px 0px 0px 0px",
    }
);

// 모든 섹션 관찰 (패키지 섹션 제외)
document
    .querySelectorAll("section:not(.packages-section)")
    .forEach((section) => {
        scrollObserver.observe(section);
    });

// 패키지 섹션은 즉시 visible 처리
const packagesSection = document.querySelector(".packages-section");
if (packagesSection) {
    packagesSection.classList.add("visible");
}

// 패키지 아이템 스크롤 애니메이션
const packageObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                }, index * 150);
            }
        });
    },
    {
        threshold: 0.05,
    }
);

document.querySelectorAll(".package-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-50px)";
    item.style.transition = "all 0.6s ease";
    packageObserver.observe(item);
});

// 옵션 카드 호버 효과
document.querySelectorAll(".option-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// 가격 카드 애니메이션
const pricingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "scale(1)";
                }, index * 100);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

document.querySelectorAll(".pricing-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";
    card.style.transition = "all 0.5s ease";
    pricingObserver.observe(card);
});

// 스크롤 시 헤더 스타일 변경
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
        header.style.backgroundColor = "#fff";
        header.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
    }

    lastScrollTop = scrollTop;
});

// 페이지 로드 시 히어로 섹션 표시
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
        setTimeout(() => {
            hero.classList.add("visible");
        }, 200);
    }

    // 배너 섹션 표시
    const banner = document.querySelector(".banner-section");
    if (banner) {
        banner.classList.add("visible");
    }
});

// FAQ 토글 기능
document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", function () {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains("active");

        // 모든 FAQ 닫기
        document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("active");
        });

        // 클릭한 것만 열기
        if (!isActive) {
            faqItem.classList.add("active");
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

// Metrics 섹션 카운트 애니메이션
const metricsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = "true";
                const metricValues =
                    entry.target.querySelectorAll(".metric-value");
                metricValues.forEach((num) => {
                    const target = parseInt(num.dataset.target);
                    animateCounter(num, target);
                });
            }
        });
    },
    { threshold: 0.3 }
);

const metricsSection = document.querySelector(".metrics-section");
if (metricsSection) {
    metricsObserver.observe(metricsSection);
}

// 패키지 아이템 클릭 효과
document.querySelectorAll(".package-item").forEach((item) => {
    item.addEventListener("click", function () {
        this.style.transform = "translateX(10px) scale(0.98)";
        setTimeout(() => {
            this.style.transform = "translateX(10px)";
        }, 150);
    });
});

// 월간 기능 리스트 애니메이션
const featureObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                }, index * 100);
            }
        });
    },
    {
        threshold: 0.3,
    }
);

document.querySelectorAll(".monthly-features li").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "all 0.5s ease";
    featureObserver.observe(item);
});

// 옵션 카드 순차 애니메이션
const optionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 80);
            }
        });
    },
    {
        threshold: 0.1,
    }
);

document.querySelectorAll(".option-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.5s ease";
    optionObserver.observe(card);
});

// 장점 카드 순차 애니메이션
const benefitObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 100);
            }
        });
    },
    { threshold: 0.05 }
);

document.querySelectorAll(".benefit-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.5s ease";
    benefitObserver.observe(card);
});

// 워크플로우 스텝 순차 애니메이션
const workflowObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                }, index * 200);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".workflow-step").forEach((step) => {
    step.style.opacity = "0";
    step.style.transform = "translateX(-30px)";
    step.style.transition = "all 0.6s ease";
    workflowObserver.observe(step);
});

// 배너 무한 스크롤 - JavaScript 방식
const bannerTrack = document.querySelector('.banner-track');
if (bannerTrack) {
    const items = bannerTrack.innerHTML;
    bannerTrack.innerHTML = items + items;
    
    bannerTrack.style.animation = 'none';
    let bannerPosition = 0;
    
    function animateBanner() {
        const firstItem = bannerTrack.querySelector('.banner-item');
        if (!firstItem) return;
        
        const itemWidth = firstItem.offsetWidth + parseFloat(window.getComputedStyle(firstItem).marginLeft) + parseFloat(window.getComputedStyle(firstItem).marginRight);
        const resetPoint = itemWidth * 4;
        
        bannerPosition -= 1;
        
        if (Math.abs(bannerPosition) >= resetPoint) {
            bannerPosition = 0;
        }
        
        bannerTrack.style.transform = `translateX(${bannerPosition}px)`;
        requestAnimationFrame(animateBanner);
    }
    
    animateBanner();
}

// 파트너사 무한 스크롤 - JavaScript 방식
const partnersFlow = document.querySelector('.partners-flow');
if (partnersFlow) {
    const boxes = partnersFlow.innerHTML;
    partnersFlow.innerHTML = boxes + boxes + boxes;
    
    partnersFlow.style.animation = 'none';
    let partnerPosition = 0;
    
    function animatePartners() {
        const firstBox = partnersFlow.querySelector('.partner-box');
        if (!firstBox) return;
        
        const boxWidth = firstBox.offsetWidth + parseFloat(window.getComputedStyle(firstBox).marginLeft) + parseFloat(window.getComputedStyle(firstBox).marginRight);
        const resetPoint = boxWidth * 4;
        
        partnerPosition -= 0.5;
        
        if (Math.abs(partnerPosition) >= resetPoint) {
            partnerPosition = 0;
        }
        
        partnersFlow.style.transform = `translateX(${partnerPosition}px)`;
        requestAnimationFrame(animatePartners);
    }
    
    animatePartners();
}

// 유튜브 갤러리 무한 루프
const galleryRows = document.querySelectorAll('.gallery-row');
galleryRows.forEach(row => {
    const cards = row.innerHTML;
    row.innerHTML = cards + cards + cards;
    
    row.style.animation = 'none';
    let position = 0;
    const speed = row.classList.contains('row-left') ? -1 : 1;
    
    function getCardWidth() {
        const firstCard = row.querySelector('.thumbnail-card');
        if (firstCard) {
            const style = window.getComputedStyle(firstCard);
            const width = firstCard.offsetWidth;
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            return width + marginLeft + marginRight;
        }
        return 340;
    }
    
    function animate() {
        const cardWidth = getCardWidth();
        const resetPoint = cardWidth * 6;
        
        position += speed * 1;
        
        if (speed < 0) {
            if (Math.abs(position) >= resetPoint) {
                position = 0;
            }
        } else {
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

document.addEventListener('click', function(e) {
    const card = e.target.closest('.thumbnail-card');
    if (card) {
        e.preventDefault();
        const videoId = card.getAttribute('data-video-id');
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
        videoFrame.src = videoUrl;
        videoModal.style.display = 'flex';
        setTimeout(() => {
            videoModal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
});

function closeVideoModal() {
    videoModal.classList.remove('active');
    setTimeout(() => {
        videoModal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = '';
    }, 300);
}

modalClose.addEventListener('click', closeVideoModal);
modalOverlay.addEventListener('click', closeVideoModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});
