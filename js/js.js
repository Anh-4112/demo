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
	const btnTrending = document.querySelectorAll(".btn-slideshow-trending .btn-trending-prev, .btn-slideshow-trending .btn-trending-next");
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
function changeImage(element, imageSrc) {    
    let parentDiv = element.closest(".card-trending");// Tìm phần tử cha chứa ảnh của nút bấm    
    let productImage = parentDiv.querySelector(".productImage");// Tìm ảnh cần thay đổi trong phần tử cha    
    productImage.src = imageSrc;// Cập nhật ảnh
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
	const btnTrending = document.querySelectorAll(".btn-slideshow-arrivals .btn-arrivals-prev, .btn-slideshow-arrivals .btn-arrivals-next");
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
function changeImage(element, imageSrc) {    
    let parentDiv = element.closest(".card-arrivals");// Tìm phần tử cha chứa ảnh của nút bấm    
    let productImage = parentDiv.querySelector(".productImage");// Tìm ảnh cần thay đổi trong phần tử cha    
    productImage.src = imageSrc;// Cập nhật ảnh
}