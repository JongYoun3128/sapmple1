// 스크롤 시 섹션 회전 효과
const sectionObserver = new IntersectionObserver(
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
        sectionObserver.observe(section);
    });

// 패키지 섹션은 즉시 visible 처리
const packagesSection = document.querySelector(".packages-section");
if (packagesSection) {
    packagesSection.classList.add("visible");
}

// 패키지 박스 스크롤 애니메이션
const packageObserver = new IntersectionObserver(
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
    {
        threshold: 0.05,
    }
);

document.querySelectorAll(".package-box").forEach((box) => {
    box.style.opacity = "0";
    box.style.transform = "translateY(30px)";
    box.style.transition = "all 0.6s ease";
    packageObserver.observe(box);
});

// 옵션 행 호버 효과
document.querySelectorAll(".option-row").forEach((row) => {
    row.addEventListener("mouseenter", function () {
        this.style.transform = "translateX(5px)";
    });

    row.addEventListener("mouseleave", function () {
        this.style.transform = "translateX(0)";
    });
});

// 스크롤 시 헤더 스타일 변경
let ticking = false;
const header = document.querySelector(".header");

function updateHeader() {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
    } else {
        header.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        header.style.boxShadow = "none";
    }

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// 페이지 로드 시 히어로 섹션 표시
window.addEventListener("load", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
        setTimeout(() => {
            hero.classList.add("visible");
        }, 100);
    }

    // 마퀴 섹션 표시
    const marquee = document.querySelector(".marquee-section");
    if (marquee) {
        marquee.classList.add("visible");
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
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Numbers 섹션 카운트 애니메이션
const numbersObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = "true";
                const numberValues =
                    entry.target.querySelectorAll(".number-value");
                numberValues.forEach((num) => {
                    const target = parseInt(num.dataset.target);
                    animateValue(num, 0, target, 2000);
                });
            }
        });
    },
    { threshold: 0.3 }
);

const numbersSection = document.querySelector(".numbers-section");
if (numbersSection) {
    numbersObserver.observe(numbersSection);
}

// 프로세스 카드 순차 애니메이션
const processObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 150);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".process-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.5s ease";
    processObserver.observe(card);
});

// 특징 행 순차 애니메이션
const featureObserver = new IntersectionObserver(
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
    { threshold: 0.1 }
);

document.querySelectorAll(".feature-row").forEach((row) => {
    row.style.opacity = "0";
    row.style.transform = "translateX(-30px)";
    row.style.transition = "all 0.6s ease";
    featureObserver.observe(row);
});

// 마퀴 무한 스크롤 - JavaScript 방식
const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) {
    const content = marqueeTrack.querySelector(".marquee-content");
    if (content) {
        const contentHTML = content.outerHTML;
        marqueeTrack.innerHTML = contentHTML + contentHTML + contentHTML;

        marqueeTrack.style.animation = "none";
        let marqueePosition = 0;

        function animateMarquee() {
            const firstContent = marqueeTrack.querySelector(".marquee-content");
            if (!firstContent) return;

            const contentWidth = firstContent.offsetWidth;
            const resetPoint = contentWidth;

            marqueePosition -= 1;

            if (Math.abs(marqueePosition) >= resetPoint) {
                marqueePosition = 0;
            }

            marqueeTrack.style.transform = `translateX(${marqueePosition}px)`;
            requestAnimationFrame(animateMarquee);
        }

        animateMarquee();
    }
}

// 파트너사 무한 스크롤 - JavaScript 방식
const partnersScroll = document.querySelector(".partners-scroll");
if (partnersScroll) {
    const items = partnersScroll.innerHTML;
    partnersScroll.innerHTML = items + items + items;

    partnersScroll.style.animation = "none";
    let partnerPosition = 0;

    function animatePartners() {
        const firstItem = partnersScroll.querySelector(".partner-item");
        if (!firstItem) return;

        const itemWidth =
            firstItem.offsetWidth +
            parseFloat(window.getComputedStyle(firstItem).marginLeft) +
            parseFloat(window.getComputedStyle(firstItem).marginRight);
        const resetPoint = itemWidth * 4;

        partnerPosition -= 0.5;

        if (Math.abs(partnerPosition) >= resetPoint) {
            partnerPosition = 0;
        }

        partnersScroll.style.transform = `translateX(${partnerPosition}px)`;
        requestAnimationFrame(animatePartners);
    }

    animatePartners();
}

// 유튜브 갤러리 무한 루프
const galleryRows = document.querySelectorAll(".gallery-row");
galleryRows.forEach((row) => {
    const cards = row.innerHTML;
    row.innerHTML = cards + cards + cards;

    row.style.animation = "none";
    let position = 0;
    const speed = row.classList.contains("row-left") ? -1 : 1;

    function getCardWidth() {
        const firstCard = row.querySelector(".thumbnail-card");
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
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");

document.addEventListener("click", function (e) {
    const card = e.target.closest(".thumbnail-card");
    if (card) {
        e.preventDefault();
        const videoId = card.getAttribute("data-video-id");
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
        videoFrame.src = videoUrl;
        videoModal.style.display = "flex";
        setTimeout(() => {
            videoModal.classList.add("active");
        }, 10);
        document.body.style.overflow = "hidden";
    }
});

function closeVideoModal() {
    videoModal.classList.remove("active");
    setTimeout(() => {
        videoModal.style.display = "none";
        videoFrame.src = "";
        document.body.style.overflow = "";
    }, 300);
}

modalClose.addEventListener("click", closeVideoModal);
modalOverlay.addEventListener("click", closeVideoModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && videoModal.classList.contains("active")) {
        closeVideoModal();
    }
});
