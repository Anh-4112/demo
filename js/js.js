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
    
    let firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    let gap = parseInt(getComputedStyle(carousel).gap) || 0;

    let isDragging = false, startX, startScrollLeft;
    let moved = false;

    // Cập nhật kích thước khi thay đổi màn hình
    const updateSizes = () => {
        firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
        gap = parseInt(getComputedStyle(carousel).gap) || 0;
    };
    window.addEventListener("resize", updateSizes);

    // Ngăn kéo link
    document.querySelectorAll(".carousel-trending a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault();
        });
        a.addEventListener("dragstart", (e) => e.preventDefault());
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Cuộn chính xác đến item, tính cả gap
    const scrollToItem = (direction) => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidthWithGap = firstCardWidth + gap; // Kích thước mỗi item kèm khoảng cách
        const newScrollPosition = direction === "prev"
            ? Math.max(0, Math.floor(scrollLeft / cardWidthWithGap) * cardWidthWithGap - cardWidthWithGap)
            : Math.min(carousel.scrollWidth, Math.ceil(scrollLeft / cardWidthWithGap) * cardWidthWithGap + cardWidthWithGap);

        carousel.style.scrollBehavior = "smooth";
        carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });

        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";
        }, 500);
    };

    // Xử lý khi click nút prev/next
    btnTrending.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-trending-prev")) {
                scrollToItem("prev");
            } else {
                scrollToItem("next");
            }
        });
    });

    // Gán sự kiện kéo chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cảm ứng
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
});
// +-+ Btn-Text-Trending +-+
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-text-trending");

    // Đặt active cho nút đầu tiên khi tải trang
    buttons[0].classList.add("active");

    // Xử lý khi click vào nút
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Ngăn chặn load lại trang nếu href=""

            // Xóa class active khỏi tất cả các nút
            buttons.forEach(btn => btn.classList.remove("active"));

            // Thêm class active vào nút được nhấn
            this.classList.add("active");
        });
    });
});
// +-+ Btn-Change-Color-Trending +-+
function changeImageTrending(element, imageSrc) {    
    let parentDiv = element.closest(".card-trending");
    if (parentDiv) {
        let productImage = parentDiv.querySelector(".productImage"); 
        if (productImage) {
            productImage.src = imageSrc;
        }
    }
}
// +-+ Tooltiptext-Color-Trending +-+
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử tooltip từ DOM
    const tooltipTrending = document.getElementById("tooltiptext-color-trending");

    // Chọn tất cả các nút màu có class .btn-color-trending
    document.querySelectorAll(".btn-color-trending").forEach((btn) => {
        
        // Sự kiện khi di chuột vào nút màu
        btn.addEventListener("mouseenter", function (event) {
            const rect = event.target.getBoundingClientRect(); // Lấy vị trí và kích thước của nút màu
            tooltipTrending.textContent = event.target.dataset.tooltipTrending; // Cập nhật nội dung tooltip từ thuộc tính data-tooltipTrending

            // Tạm thời hiển thị tooltip để đo kích thước chính xác
            tooltipTrending.style.visibility = "hidden"; // Ẩn tooltip trong lúc đo kích thước
            tooltipTrending.style.display = "block"; // Hiển thị để có thể đo kích thước

            requestAnimationFrame(() => {
                const tooltipRect = tooltipTrending.getBoundingClientRect(); // Lấy kích thước thực tế của tooltip

                // Tính toán vị trí để căn giữa tooltip với nút màu
                const top = (rect.top - tooltipRect.height - 8) / 10; // Cách nút 8px (tương đương 0.8rem vì 1rem = 10px)
                const left = (rect.left + rect.width / 2 - tooltipRect.width / 2) / 10; // Căn giữa tooltip với nút màu

                // Cập nhật vị trí tooltip
                tooltipTrending.style.top = `${top}rem`;
                tooltipTrending.style.left = `${left}rem`;

                // Hiển thị tooltip với hiệu ứng mượt mà
                tooltipTrending.style.visibility = "visible";
                tooltipTrending.style.opacity = "1";
            });
        });

        // Sự kiện khi rời chuột khỏi nút màu
        btn.addEventListener("mouseleave", function () {
            // Ẩn tooltip khi không cần thiết để tối ưu hiệu suất
            tooltipTrending.style.visibility = "hidden";
            tooltipTrending.style.opacity = "0";
            tooltipTrending.style.display = "none"; // Đảm bảo tooltip không chiếm không gian khi ẩn
        });
    });
});


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
    const btnArrivals = document.querySelectorAll(".btn-arrivals-prev, .btn-arrivals-next");
    const firstCard = carousel.querySelector(".card-arrivals");
    
    let firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    let gap = parseInt(getComputedStyle(carousel).gap) || 0;

    let isDragging = false, startX, startScrollLeft;
    let moved = false;

    // Cập nhật kích thước khi thay đổi màn hình
    const updateSizes = () => {
        firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
        gap = parseInt(getComputedStyle(carousel).gap) || 0;
    };
    window.addEventListener("resize", updateSizes);

    // Ngăn kéo link
    document.querySelectorAll(".carousel-arrivals a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault();
        });
        a.addEventListener("dragstart", (e) => e.preventDefault());
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Cuộn chính xác đến item, tính cả gap
    const scrollToItem = (direction) => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidthWithGap = firstCardWidth + gap; // Kích thước mỗi item kèm khoảng cách
        const newScrollPosition = direction === "prev"
            ? Math.max(0, Math.floor(scrollLeft / cardWidthWithGap) * cardWidthWithGap - cardWidthWithGap)
            : Math.min(carousel.scrollWidth, Math.ceil(scrollLeft / cardWidthWithGap) * cardWidthWithGap + cardWidthWithGap);

        carousel.style.scrollBehavior = "smooth";
        carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });

        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";
        }, 500);
    };

    // Xử lý khi click nút prev/next
    btnArrivals.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-arrivals-prev")) {
                scrollToItem("prev");
            } else {
                scrollToItem("next");
            }
        });
    });

    // Gán sự kiện kéo chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cảm ứng
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
});

// +-+ Btn-Change-Color-Arrivals +-+
function changeImageArrivals(element, imageSrc) {    
    let parentDiv = element.closest(".card-arrivals");
    if (parentDiv) {
        let productImage = parentDiv.querySelector(".productImage"); 
        if (productImage) {
            productImage.src = imageSrc;
        }
    }
}
// +-+ Tooltiptext-Color-Trending +-+
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử tooltip từ DOM
    const tooltipArrivals = document.getElementById("tooltiptext-color-arrivals");

    // Chọn tất cả các nút màu có class .btn-color-trending
    document.querySelectorAll(".btn-color-arrivals").forEach((btn) => {
        
        // Sự kiện khi di chuột vào nút màu
        btn.addEventListener("mouseenter", function (event) {
            const rect = event.target.getBoundingClientRect(); // Lấy vị trí và kích thước của nút màu
            tooltipArrivals.textContent = event.target.dataset.tooltipArrivals; // Cập nhật nội dung tooltip từ thuộc tính data-tooltip-arrivals

            // Tạm thời hiển thị tooltip để đo kích thước chính xác
            tooltipArrivals.style.visibility = "hidden"; // Ẩn tooltip trong lúc đo kích thước
            tooltipArrivals.style.display = "block"; // Hiển thị để có thể đo kích thước

            requestAnimationFrame(() => {
                const tooltipRect = tooltipArrivals.getBoundingClientRect(); // Lấy kích thước thực tế của tooltip

                // Tính toán vị trí để căn giữa tooltip với nút màu
                const top = (rect.top - tooltipRect.height - 8) / 10; // Cách nút 8px (tương đương 0.8rem vì 1rem = 10px)
                const left = (rect.left + rect.width / 2 - tooltipRect.width / 2) / 10; // Căn giữa tooltip với nút màu

                // Cập nhật vị trí tooltip
                tooltipArrivals.style.top = `${top}rem`;
                tooltipArrivals.style.left = `${left}rem`;

                // Hiển thị tooltip với hiệu ứng mượt mà
                tooltipArrivals.style.visibility = "visible";
                tooltipArrivals.style.opacity = "1";
            });
        });

        // Sự kiện khi rời chuột khỏi nút màu
        btn.addEventListener("mouseleave", function () {
            // Ẩn tooltip khi không cần thiết để tối ưu hiệu suất
            tooltipArrivals.style.visibility = "hidden";
            tooltipArrivals.style.opacity = "0";
            tooltipArrivals.style.display = "none"; // Đảm bảo tooltip không chiếm không gian khi ẩn
        });
    });
});


// ===== Slideshow Feedback ==========================
// document.addEventListener("DOMContentLoaded", () => {
//     const carousel = document.querySelector(".carousel-feedback");
//     const btnFeedback = document.querySelectorAll(".btn-feedback-prev, .btn-feedback-next");
//     const firstCard = carousel.querySelector(".card-feedback");
    
//     let firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
//     let gap = parseInt(getComputedStyle(carousel).gap) || 0;
    
//     let isDragging = false, startX, startScrollLeft;
//     let moved = false;
//     let scrollTimeout;
    
//     // Cập nhật kích thước khi thay đổi màn hình
//     const updateSizes = () => {
//         firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
//         gap = parseInt(getComputedStyle(carousel).gap) || 0;
//     };
//     window.addEventListener("resize", updateSizes);
    
//     // Khi bắt đầu kéo
//     const dragStart = (e) => {
//         isDragging = true;
//         moved = false;
//         startX = e.pageX || e.touches[0].pageX;
//         startScrollLeft = carousel.scrollLeft;
//         carousel.classList.add("dragging");
//     };
    
//     // Khi kéo
//     const dragging = (e) => {
//         if (!isDragging) return;
//         moved = true;
//         const x = e.pageX || e.touches[0].pageX;
//         carousel.scrollLeft = startScrollLeft - (x - startX);
//     };
    
//     // Khi thả chuột hoặc dừng kéo
//     const dragStop = () => {
//         isDragging = false;
//         carousel.classList.remove("dragging");
    
//         if (moved) {
//             const cardWidthWithGap = firstCardWidth + gap;
//             const scrollLeft = carousel.scrollLeft;
            
//             // Làm tròn vị trí cuộn để về đúng vị trí gần nhất của item
//             const closestIndex = Math.round(scrollLeft / cardWidthWithGap);
//             const newScrollPosition = closestIndex * cardWidthWithGap;
    
//             carousel.style.scrollBehavior = "smooth";
//             carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    
//             // Đặt lại scrollBehavior để tránh lỗi khi kéo
//             clearTimeout(scrollTimeout);
//             scrollTimeout = setTimeout(() => {
//                 carousel.style.scrollBehavior = "auto";
//             }, 300);
//         }
//     };
    
//     // Xử lý khi click nút prev/next
//     const scrollToItem = (direction) => {
//         const scrollLeft = carousel.scrollLeft;
//         const cardWidthWithGap = firstCardWidth + gap; // Kích thước mỗi item kèm khoảng cách
        
//         // Dùng Math.round() thay vì Math.floor()/Math.ceil() để tránh cuộn lỗi
//         const closestIndex = Math.round(scrollLeft / cardWidthWithGap);
//         const newScrollPosition = direction === "prev"
//             ? Math.max(0, (closestIndex - 1) * cardWidthWithGap)
//             : Math.min(carousel.scrollWidth, (closestIndex + 1) * cardWidthWithGap);
    
//         carousel.style.scrollBehavior = "smooth";
//         carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    
//         // Đặt lại scrollBehavior sau khi cuộn xong
//         clearTimeout(scrollTimeout);
//         scrollTimeout = setTimeout(() => {
//             carousel.style.scrollBehavior = "auto";
//         }, 500);
//     };
    
//     // Gán sự kiện khi nhấn nút prev/next
//     btnFeedback.forEach(btn => {
//         btn.addEventListener("click", () => {
//             if (btn.classList.contains("btn-feedback-prev")) {
//                 scrollToItem("prev");
//             } else {
//                 scrollToItem("next");
//             }
//         });
//     });
    
//     // Gán sự kiện kéo chuột
//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("mouseleave", dragStop);
    
//     // Gán sự kiện cảm ứng trên mobile
//     carousel.addEventListener("touchstart", dragStart);
//     carousel.addEventListener("touchmove", dragging);
//     carousel.addEventListener("touchend", dragStop);
    
//     // Lắng nghe sự kiện cuộn để đặt lại scrollBehavior
//     carousel.addEventListener("scroll", () => {
//         clearTimeout(scrollTimeout);
//         scrollTimeout = setTimeout(() => {
//             carousel.style.scrollBehavior = "auto";
//         }, 500);
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-feedback");
    const btnFeedback = document.querySelectorAll(".btn-feedback-prev, .btn-feedback-next");
    const firstCard = carousel.querySelector(".card-feedback");
    
    let firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    let gap = parseInt(getComputedStyle(carousel).gap) || 0;
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false;
    let scrollTimeout;
    const threshold = 3; // Ngưỡng tối thiểu để nhận diện kéo
    
    // Cập nhật kích thước khi thay đổi màn hình
    const updateSizes = () => {
        firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
        gap = parseInt(getComputedStyle(carousel).gap) || 0;
    };
    window.addEventListener("resize", updateSizes);
    
    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };
    
    // Khi kéo
    const dragging = (e) => {
        if (!isDragging) return;
        const x = e.pageX || e.touches[0].pageX;
        const moveDistance = Math.abs(x - startX);
        
        if (moveDistance > threshold) {
            moved = true;
            const speedFactor = 3; // Điều chỉnh tốc độ di chuyển, càng lớn thì càng mượt
        carousel.scrollLeft += (startX - x) / speedFactor;
        }
    };
    
    // Khi thả chuột hoặc dừng kéo
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    
        if (moved) {
            const cardWidthWithGap = firstCardWidth + gap;
            const scrollLeft = carousel.scrollLeft;
            
            // Làm tròn vị trí cuộn để về đúng vị trí gần nhất của item
            const closestIndex = Math.round(scrollLeft / cardWidthWithGap);
            const newScrollPosition = closestIndex * cardWidthWithGap;
    
            carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });
        }
    };
    
    // Xử lý khi click nút prev/next
    const scrollToItem = (direction) => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidthWithGap = firstCardWidth + gap;
        
        const closestIndex = Math.round(scrollLeft / cardWidthWithGap);
        const newScrollPosition = direction === "prev"
            ? Math.max(0, (closestIndex - 1) * cardWidthWithGap)
            : Math.min(carousel.scrollWidth, (closestIndex + 1) * cardWidthWithGap);
    
        carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });
    };
    
    // Gán sự kiện khi nhấn nút prev/next
    btnFeedback.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-feedback-prev")) {
                scrollToItem("prev");
            } else {
                scrollToItem("next");
            }
        });
    });
    
    // Gán sự kiện kéo chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    
    // Gán sự kiện cảm ứng trên mobile
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
});


// ===== Slideshow Ig ==========================
// document.addEventListener("DOMContentLoaded", () => {
//     const carousel = document.querySelector(".carousel-ig");
    
//     let isDragging = false, startX, startScrollLeft;
//     let moved = false; // Kiểm tra có di chuyển chuột hay không

//     // Ngăn kéo link
//     document.querySelectorAll(".carousel-ig a").forEach(a => {
//         a.addEventListener("click", (e) => {
//             if (moved) e.preventDefault(); // Nếu kéo thì chặn click
//         });
//         a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
//     });

//     // Khi bắt đầu kéo chuột hoặc cảm ứng
//     const dragStart = (e) => {
//         isDragging = true;
//         moved = false;
//         startX = e.pageX || e.touches[0].pageX;
//         startScrollLeft = carousel.scrollLeft;
//         carousel.classList.add("dragging");
//     };

//     // Khi kéo chuột hoặc cảm ứng
//     const dragging = (e) => {
//         if (!isDragging) return;
//         moved = true;
//         let x = e.pageX || e.touches[0].pageX;
//         carousel.scrollLeft = startScrollLeft - (x - startX);
//     };

//     // Khi thả chuột hoặc kết thúc cảm ứng
//     const dragStop = () => {
//         isDragging = false;
//         carousel.classList.remove("dragging");
//     };

//     // Gán sự kiện cho chuột
//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("mouseleave", dragStop);

//     // Gán sự kiện cho cảm ứng
//     carousel.addEventListener("touchstart", dragStart);
//     carousel.addEventListener("touchmove", dragging);
//     carousel.addEventListener("touchend", dragStop);
// });

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-ig");
    if (!carousel) return; // Nếu không tìm thấy carousel thì dừng script

    const firstCard = carousel.querySelector(".card-ig"); // Thẻ đầu tiên trong carousel
    let firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    let gap = parseInt(getComputedStyle(carousel).gap) || 0;

    let isDragging = false, startX, startScrollLeft;
    let moved = false;

    // Cập nhật kích thước khi thay đổi màn hình
    const updateSizes = () => {
        if (!firstCard) return;
        firstCardWidth = firstCard.offsetWidth;
        gap = parseInt(getComputedStyle(carousel).gap) || 0;
    };
    window.addEventListener("resize", updateSizes);

    // Ngăn kéo link
    document.querySelectorAll(".carousel-ig a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault();
        });
        a.addEventListener("dragstart", (e) => e.preventDefault());
    });

    // Khi bắt đầu kéo
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    // Khi thả chuột
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");

        if (moved) {
            const cardWidthWithGap = firstCardWidth + gap;
            const scrollLeft = carousel.scrollLeft;
            const closestIndex = Math.round(scrollLeft / cardWidthWithGap);
            const newScrollPosition = closestIndex * cardWidthWithGap;

            carousel.style.scrollBehavior = "smooth";
            carousel.scrollTo({ left: newScrollPosition, behavior: "smooth" });

            setTimeout(() => {
                carousel.style.scrollBehavior = "auto";
            }, 500);
        }
    };

    // Gán sự kiện kéo chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cảm ứng
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
});

// ===== List Footer =============================
document.addEventListener("DOMContentLoaded", () => {
    // Chọn tất cả phần tử có class "footer-list" (các menu con trong footer)
    document.querySelectorAll(".footer-list").forEach(menu => {
        // Lấy biểu tượng (+/-) từ phần tử liền trước menu
        let icon = menu.previousElementSibling.querySelector(".footer-icon");
        // Kiểm tra xem menu có mở sẵn hay không dựa vào biểu tượng (+/-)
        let isOpen = icon.textContent.trim() === "−";

        if (isOpen) {
            // Nếu biểu tượng là "-", mở sẵn menu với chiều cao thực tế
            requestAnimationFrame(() => {
                menu.style.maxHeight = menu.scrollHeight / 10 + "rem";
            });
        } else {
            // Nếu biểu tượng là "+", giữ menu đóng với maxHeight = 0
            menu.style.maxHeight = "0rem";
        }
        // Lưu trạng thái mở/đóng của menu vào thuộc tính dataset
        menu.dataset.open = isOpen;
    });
});
// Hàm xử lý khi người dùng nhấn vào menu để mở hoặc đóng
function toggleMenu(id) {
    // Lấy menu theo ID
    let menu = document.getElementById(id);
    // Lấy biểu tượng (+/-) từ phần tử liền trước menu
    let icon = menu.previousElementSibling.querySelector(".footer-icon");
    // Kiểm tra trạng thái hiện tại của menu
    let isOpen = menu.dataset.open === "true";

    // Nếu menu đang mở, thu gọn lại, nếu đang đóng, mở rộng ra
    menu.style.maxHeight = isOpen ? "0rem" : menu.scrollHeight / 10 + "rem";
    // Cập nhật biểu tượng tương ứng
    icon.textContent = isOpen ? "+" : "−";
    // Cập nhật trạng thái mới vào dataset
    menu.dataset.open = !isOpen;
}


// ===== Mini Cart ======================
document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử DOM cần sử dụng
    const cartIcon = document.getElementById("cartIcon");
    const cartBlock = document.getElementById("cartBlock");
    const closeCart = document.getElementById("closeCart");
    const overlayCart = document.getElementById("overlayCart");
    const cartItemsContainer = document.getElementById("cartItemList");
    const cartTotal = document.getElementById("cartTotal");
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    const cartItemTemplate = document.getElementById("cartItem");
    const cartCount = document.getElementById("cartCount");
    const freeShippingThreshold = 120; // Ngưỡng miễn phí vận chuyển

    // Lấy giỏ hàng từ localStorage (nếu có) hoặc khởi tạo mảng trống
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Sự kiện mở giỏ hàng
    cartIcon.addEventListener("click", () => toggleCart(true));
    window.toggleCart = function (isOpen) {
        cartBlock.classList.toggle("open", isOpen);
        overlayCart.classList.toggle("show", isOpen);
    };

    // Sự kiện đóng giỏ hàng
    const closeCartWithAnimation = () => toggleCart(false);
    closeCart.addEventListener("click", closeCartWithAnimation);
    overlayCart.addEventListener("click", closeCartWithAnimation);

    // Cập nhật tiến trình miễn phí vận chuyển
    function updateShippingProgress(total) {
        const progressFill = document.getElementById("progressFill");
        const progressIcon = document.getElementById("progressIcon");
        const shippingMessage = document.getElementById("shippingMessage");

        let progress = Math.min((total / freeShippingThreshold) * 100, 100);
        progressFill.style.width = `${progress}%`;
        progressIcon.style.left = `${progress}%`;

        shippingMessage.innerHTML = total >= freeShippingThreshold
            ? `<span class="fs-14 color-green">Congratulations! You've got free shipping!</span>`
            : `Spend $${(freeShippingThreshold - total).toFixed(2)} more and get <span class="fs-14 fw-600 color-orange-red">FREE SHIPPING!</span>`;
    }

    // Thêm sản phẩm vào giỏ hàng
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const { id, name, price, image } = button.dataset;
            addToCart(id, name, parseFloat(price), image);
        });
    });

    function addToCart(id, name, price, image) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }
        saveCart();
        renderCart();
        toggleCart(true); // Mở giỏ hàng sau khi thêm sản phẩm
    }

    // Hiển thị giỏ hàng
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            const cartItem = cartItemTemplate.content.cloneNode(true);

            cartItem.querySelector(".cart-item-img").src = item.image;
            cartItem.querySelector(".cart-item-info h3").textContent = item.name;
            cartItem.querySelector(".cart-item-price").textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            cartItem.querySelector(".cart-item-qty").textContent = item.quantity;

            cartItem.querySelector(".cart-item-increase").addEventListener("click", () => updateQuantity(item.id, 1));
            cartItem.querySelector(".cart-item-decrease").addEventListener("click", () => updateQuantity(item.id, -1));
            cartItem.querySelector(".btn-cart-item-remove").addEventListener("click", () => removeFromCart(item.id));

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
        updateShippingProgress(total);
        updateCartCount();
    }

    // Cập nhật số lượng sản phẩm
    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCart();
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    }

    // Lưu giỏ hàng vào localStorage
    let saveCartTimeout;
    function saveCart() {
        clearTimeout(saveCartTimeout);
        saveCartTimeout = setTimeout(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        }, 300);
    }

    // Cập nhật số lượng hiển thị trên icon giỏ hàng
    function updateCartCount() {
        // Kiểm tra nếu cart là một mảng, nếu không thì gán giá trị mặc định là []
        let totalQuantity = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0;
    
        // Cập nhật số lượng trên icon giỏ hàng
        const cartCountIcon = document.getElementById("cartCount");
        if (cartCountIcon) {
            cartCountIcon.innerText = totalQuantity;
            cartCountIcon.style.visibility = "visible"; // Luôn hiển thị
        }
    
        // Cập nhật số lượng trên sticky cart
        const cartCountSticky = document.querySelector(".cart-count-sticky");
        if (cartCountSticky) {
            cartCountSticky.innerText = totalQuantity;
            cartCountSticky.style.visibility = "visible"; // Luôn hiển thị
        }
    }
    
    
    // Hiển thị lại giỏ hàng khi trang tải lại
    renderCart();
    updateCartCount();
});


// ===== Go to top ========================
document.addEventListener("DOMContentLoaded", function () {
    const goToTopButton = document.querySelector(".go-to-top");

    // Kiểm tra ngay khi trang vừa load
    if (window.scrollY > 600) {
        goToTopButton.style.display = "block";
    } else {
        goToTopButton.style.display = "none";
    }

    // Hiển thị hoặc ẩn nút khi cuộn
    window.addEventListener("scroll", function () {
        if (window.scrollY > 600) {
            goToTopButton.style.display = "block";
        } else {
            goToTopButton.style.display = "none";
        }
    });

    // Cuộn lên đầu khi click
    goToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


// ===== Sticky ======================
// document.addEventListener("DOMContentLoaded", function () {
//     let lastScrollTop = window.scrollY; // Lưu vị trí cuộn trước đó
//     const stickyBottom = document.querySelector(".sticky-bottom"); // Lấy sticky

//     window.addEventListener("scroll", function () {
//         let scrollTop = window.scrollY; // Lấy vị trí cuộn hiện tại
//         let documentHeight = document.documentElement.scrollHeight; // Chiều cao toàn bộ trang
//         let windowHeight = window.innerHeight; // Chiều cao vùng hiển thị

//         if (scrollTop > lastScrollTop) {
//             // Nếu cuộn xuống, hiển thị thanh điều hướng
//             stickyBottom.classList.add("show");
//         } else {
//             // Nếu cuộn lên, ẩn thanh điều hướng
//             stickyBottom.classList.remove("show");
//         }

//         if (scrollTop + windowHeight >= documentHeight - 5) {
//             // Nếu cuộn đến cuối trang, luôn hiển thị thanh điều hướng
//             stickyBottom.classList.add("show");
//         }

//         lastScrollTop = scrollTop; // Cập nhật vị trí cuộn trước đó
//     });
// });

