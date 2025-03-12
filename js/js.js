$(document).ready(function () {
    let currentIndex = 0;
    const slides = $(".slide");
    const totalSlides = slides.length;
    const slider = $(".slider");
    const dotsContainer = $(".slider-dots");

    slides.eq(0).addClass("active"); // Slide đầu tiên sẽ hiển thị ngay từ đầu


    // Thêm dots theo số lượng slide
    for (let i = 0; i < totalSlides; i++) {
        dotsContainer.append(`<span class="dot" data-index="${i}"></span>`);
    }
    let dots = $(".dot");

    function getRemSize(valuePx) {
        let rootFontSize = parseFloat($("html").css("font-size")); // Lấy font-size của thẻ <html>
        return valuePx / rootFontSize; // Chuyển px sang rem
    }

    function updateSlider() {
        let slideWidthRem = getRemSize($(".slider-wrapper").width()); // Lấy chiều rộng slider và đổi sang rem
        slider.css("transform", `translateX(-${currentIndex * slideWidthRem}rem)`);
    
        slides.removeClass("active"); // Xóa lớp active khỏi tất cả slide
        slides.eq(currentIndex).addClass("active"); // Thêm lớp active cho slide hiện tại
    
        dots.removeClass("active");
        dots.eq(currentIndex).addClass("active");
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 3000);
    }

    $(".next").click(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        resetAutoSlide();
    });

    $(".prev").click(function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoSlide();
    });

    dots.click(function () {
        currentIndex = $(this).data("index");
        updateSlider();
        resetAutoSlide();
    });

    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    let slideInterval = setInterval(autoSlide, 3000);

    $(window).resize(function () {
        updateSlider();
    });

    updateSlider();
});

// ===== Slideshow Trending ===================
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-trending");
	const btnTrending = document.querySelectorAll(".btn-trending-prev, .btn-trending-next");
    const firstCard = carousel.querySelector(".card-trending");
    const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển chuột hay không

    // Ngăn kéo link
    document.querySelectorAll(".carousel-trending a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault(); // Nếu kéo thì chặn click
        });
        a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Scroll mượt khi bấm nút prev/next
    const scrollSmoothly = (offset) => {
        carousel.style.scrollBehavior = "smooth";
        carousel.scrollLeft += offset;
        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";
        }, 500);
    };

    // Xử lý khi click nút prev/next
    btnTrending.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-trending-prev")) {
                scrollSmoothly(-firstCardWidth);
            } else {
                scrollSmoothly(firstCardWidth);
            }
        });
    });

    // Gán sự kiện cho slider
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
});

// === Btn-Change-Color-Trending ===
function changeImageTrending(element, imageSrc) {    
    let parentDiv = element.closest(".card-trending");
    if (parentDiv) {
        let productImage = parentDiv.querySelector(".productImage"); 
        if (productImage) {
            productImage.src = imageSrc;
        }
    }
}

// ===== Slideshow Banner ===================
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-banner");
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển chuột hay không

    // Ngăn kéo link
    document.querySelectorAll(".carousel-banner a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault(); // Nếu kéo thì chặn click
        });
        a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Gán sự kiện cho slider
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
});

// ===== Slideshow Arrivals ===============================
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-arrivals");
	const btnTrending = document.querySelectorAll(".btn-arrivals-prev, .btn-arrivals-next");
    const firstCard = carousel.querySelector(".card-arrivals");
    const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển chuột hay không

    // Ngăn kéo link
    document.querySelectorAll(".carousel-arrivals a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault(); // Nếu kéo thì chặn click
        });
        a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Scroll mượt khi bấm nút prev/next
    const scrollSmoothly = (offset) => {
        carousel.style.scrollBehavior = "smooth";
        carousel.scrollLeft += offset;
        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";
        }, 500);
    };

    // Xử lý khi click nút prev/next
    btnTrending.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-arrivals-prev")) {
                scrollSmoothly(-firstCardWidth);
            } else {
                scrollSmoothly(firstCardWidth);
            }
        });
    });

    // Gán sự kiện cho slider
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
});

// === Btn-Change-Color-Arrivals ===
function changeImageArrivals(element, imageSrc) {    
    let parentDiv = element.closest(".card-arrivals");
    if (parentDiv) {
        let productImage = parentDiv.querySelector(".productImage"); 
        if (productImage) {
            productImage.src = imageSrc;
        }
    }
}

// ==================
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-feedback");
	const btnTrending = document.querySelectorAll(".btn-feedback-prev, .btn-feedback-next");
    const firstCard = carousel.querySelector(".card-feedback");
    const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển chuột hay không

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Scroll mượt khi bấm nút prev/next
    const scrollSmoothly = (offset) => {
        carousel.style.scrollBehavior = "smooth";
        carousel.scrollLeft += offset;
        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";
        }, 600);
    };

    // Xử lý khi click nút prev/next
    btnTrending.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-feedback-prev")) {
                scrollSmoothly(-firstCardWidth);
            } else {
                scrollSmoothly(firstCardWidth);
            }
        });
    });

    // Gán sự kiện cho slider
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
});

// ===== Slideshow Ig ==========================
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-ig");
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển chuột hay không

    // Ngăn kéo link
    document.querySelectorAll(".carousel-ig a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault(); // Nếu kéo thì chặn click
        });
        a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Gán sự kiện cho slider
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
});


// ------------------------
// document.addEventListener("DOMContentLoaded", () => {
//     const carousel = document.querySelector(".carousel-ig");
//     let isDragging = false, startX, startScrollLeft, moved = false;

//     // Lấy kích thước của một phần tử trong carousel
//     const getItemWidth = () => {
//         const firstItem = carousel.querySelector(".carousel-item");
//         return firstItem ? firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginRight) : 0;
//     };

//     // Hàm cuộn mượt như nút bấm
//     const scrollSmoothly = (offset) => {
//         carousel.style.scrollBehavior = "smooth";
//         carousel.scrollLeft += offset;
//         setTimeout(() => {
//             carousel.style.scrollBehavior = "auto"; // Tắt smooth sau khi cuộn xong để tránh lỗi kéo tay
//         }, 600);
//     };

//     // Khi bắt đầu kéo
//     const dragStart = (e) => {
//         isDragging = true;
//         moved = false;
//         startX = e.touches ? e.touches[0].pageX : e.pageX;
//         startScrollLeft = carousel.scrollLeft;
//         carousel.classList.add("dragging");
//     };

//     // Khi kéo
//     const dragging = (e) => {
//         if (!isDragging) return;
//         moved = true;
//         const x = e.touches ? e.touches[0].pageX : e.pageX;
//         carousel.scrollLeft = startScrollLeft - (x - startX);
//     };

//     // Khi thả chuột
//     const dragStop = () => {
//         if (!isDragging) return;
//         isDragging = false;
//         carousel.classList.remove("dragging");
//         snapToNearest();
//     };

//     // Hàm tự động cuộn về ảnh gần nhất
//     const snapToNearest = () => {
//         const itemWidth = getItemWidth();
//         if (!itemWidth) return;

//         const nearest = Math.round(carousel.scrollLeft / itemWidth) * itemWidth;
//         const offset = nearest - carousel.scrollLeft;
//         scrollSmoothly(offset);
//     };

//     // Gán sự kiện
//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("mouseleave", dragStop);

//     carousel.addEventListener("touchstart", dragStart);
//     carousel.addEventListener("touchmove", dragging);
//     document.addEventListener("touchend", dragStop);
// });


