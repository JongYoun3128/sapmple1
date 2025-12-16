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
