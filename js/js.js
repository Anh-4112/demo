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
    let moved = false; // Kiểm tra có di chuyển hay không

    // Ngăn kéo link
    document.querySelectorAll(".carousel-trending a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault(); // Nếu kéo thì chặn click
        });
        a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
    });

    // Khi bắt đầu kéo chuột hoặc cảm ứng
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột hoặc cảm ứng
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    // Khi thả chuột hoặc kết thúc cảm ứng
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

    // Gán sự kiện cho chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cho cảm ứng
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
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
// document.addEventListener("DOMContentLoaded", () => {
//     const carousel = document.querySelector(".carousel-arrivals");
// 	const btnTrending = document.querySelectorAll(".btn-arrivals-prev, .btn-arrivals-next");
//     const firstCard = carousel.querySelector(".card-arrivals");
//     const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
//     let isDragging = false, startX, startScrollLeft;
//     let moved = false; // Kiểm tra có di chuyển chuột hay không

//     // Ngăn kéo link
//     document.querySelectorAll(".carousel-arrivals a").forEach(a => {
//         a.addEventListener("click", (e) => {
//             if (moved) e.preventDefault(); // Nếu kéo thì chặn click
//         });
//         a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
//     });

//     // Khi bắt đầu kéo
//     const dragStart = (e) => {
//         isDragging = true;
//         moved = false;
//         startX = e.pageX;
//         startScrollLeft = carousel.scrollLeft;
//         carousel.classList.add("dragging");
//     };

//     // Khi kéo chuột
//     const dragging = (e) => {
//         if (!isDragging) return;
//         moved = true;
//         carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
//     };

//     // Khi thả chuột
//     const dragStop = () => {
//         isDragging = false;
//         carousel.classList.remove("dragging");
//     };

//     // Scroll mượt khi bấm nút prev/next
//     const scrollSmoothly = (offset) => {
//         carousel.style.scrollBehavior = "smooth";
//         carousel.scrollLeft += offset;
//         setTimeout(() => {
//             carousel.style.scrollBehavior = "auto";
//         }, 500);
//     };

//     // Xử lý khi click nút prev/next
//     btnTrending.forEach(btn => {
//         btn.addEventListener("click", () => {
//             if (btn.classList.contains("btn-arrivals-prev")) {
//                 scrollSmoothly(-firstCardWidth);
//             } else {
//                 scrollSmoothly(firstCardWidth);
//             }
//         });
//     });

//     // Gán sự kiện cho slider
//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("mouseleave", dragStop);
// });
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-arrivals");
    const btnTrending = document.querySelectorAll(".btn-arrivals-prev, .btn-arrivals-next");
    const firstCard = carousel.querySelector(".card-arrivals");
    const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển hay không

    // Ngăn kéo link
    document.querySelectorAll(".carousel-arrivals a").forEach(a => {
        a.addEventListener("click", (e) => {
            if (moved) e.preventDefault(); // Nếu kéo thì chặn click
        });
        a.addEventListener("dragstart", (e) => e.preventDefault()); // Ngăn kéo link
    });

    // Khi bắt đầu kéo chuột hoặc cảm ứng
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột hoặc cảm ứng
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    // Khi thả chuột hoặc kết thúc cảm ứng
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

    // Gán sự kiện cho chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cho cảm ứng
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
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

// ===== Slideshow Feedback ==========================
// document.addEventListener("DOMContentLoaded", () => {
//     const carousel = document.querySelector(".carousel-feedback");
// 	const btnTrending = document.querySelectorAll(".btn-feedback-prev, .btn-feedback-next");
//     const firstCard = carousel.querySelector(".card-feedback");
//     const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
//     let isDragging = false, startX, startScrollLeft;
//     let moved = false; // Kiểm tra có di chuyển chuột hay không

//     // Khi bắt đầu kéo
//     const dragStart = (e) => {
//         isDragging = true;
//         moved = false;
//         startX = e.pageX;
//         startScrollLeft = carousel.scrollLeft;
//         carousel.classList.add("dragging");
//     };

//     // Khi kéo chuột
//     const dragging = (e) => {
//         if (!isDragging) return;
//         moved = true;
//         carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
//     };

//     // Khi thả chuột
//     const dragStop = () => {
//         isDragging = false;
//         carousel.classList.remove("dragging");
//     };

//     // Scroll mượt khi bấm nút prev/next
//     const scrollSmoothly = (offset) => {
//         carousel.style.scrollBehavior = "smooth";
//         carousel.scrollLeft += offset;
//         setTimeout(() => {
//             carousel.style.scrollBehavior = "auto";
//         }, 600);
//     };

//     // Xử lý khi click nút prev/next
//     btnTrending.forEach(btn => {
//         btn.addEventListener("click", () => {
//             if (btn.classList.contains("btn-feedback-prev")) {
//                 scrollSmoothly(-firstCardWidth);
//             } else {
//                 scrollSmoothly(firstCardWidth);
//             }
//         });
//     });

//     // Gán sự kiện cho slider
//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("mouseleave", dragStop);
// });
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-feedback");
    const btnTrending = document.querySelectorAll(".btn-feedback-prev, .btn-feedback-next");
    const firstCard = carousel.querySelector(".card-feedback");
    const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
    
    let isDragging = false, startX, startScrollLeft;
    let moved = false; // Kiểm tra có di chuyển chuột hay không

    // Scroll mượt
    const enableSmoothScroll = () => {
        carousel.style.scrollBehavior = "smooth";
        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";
        }, 600);
    };

    // Khi bắt đầu kéo chuột hoặc cảm ứng
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột hoặc cảm ứng
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
        enableSmoothScroll();
    };

    // Khi thả chuột hoặc kết thúc cảm ứng
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Scroll mượt khi bấm nút prev/next
    const scrollSmoothly = (offset) => {
        enableSmoothScroll();
        carousel.scrollLeft += offset;
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

    // Gán sự kiện cho chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cho cảm ứng
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

//     // Hàm cuộn mượt
//     const scrollSmoothly = (offset) => {
//         let start = carousel.scrollLeft;
//         let end = start + offset;
//         let startTime = null;

//         const animateScroll = (time) => {
//             if (!startTime) startTime = time;
//             let progress = Math.min((time - startTime) / 500, 1);
//             carousel.scrollLeft = start + (end - start) * progress;

//             if (progress < 1) {
//                 requestAnimationFrame(animateScroll);
//             } else {
//                 carousel.style.scrollBehavior = "auto";
//             }
//         };

//         requestAnimationFrame(animateScroll);
//     };

//     // Khi bắt đầu kéo
//     const dragStart = (e) => {
//         isDragging = true;
//         moved = false;
//         startX = e.pageX;
//         startScrollLeft = carousel.scrollLeft;
//         carousel.classList.add("dragging");
//     };

//     // Khi kéo chuột
//     const dragging = (e) => {
//         if (!isDragging) return;
//         moved = true;
//         let offset = startScrollLeft - (e.pageX - startX);
//         scrollSmoothly(offset - carousel.scrollLeft);
//     };

//     // Khi thả chuột
//     const dragStop = () => {
//         isDragging = false;
//         carousel.classList.remove("dragging");
//     };

//     // Gán sự kiện cho slider
//     carousel.addEventListener("mousedown", dragStart);
//     carousel.addEventListener("mousemove", dragging);
//     document.addEventListener("mouseup", dragStop);
//     carousel.addEventListener("mouseleave", dragStop);
// });
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

    // Khi bắt đầu kéo chuột hoặc cảm ứng
    const dragStart = (e) => {
        isDragging = true;
        moved = false;
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
        carousel.classList.add("dragging");
    };

    // Khi kéo chuột hoặc cảm ứng
    const dragging = (e) => {
        if (!isDragging) return;
        moved = true;
        let x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    // Khi thả chuột hoặc kết thúc cảm ứng
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Gán sự kiện cho chuột
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Gán sự kiện cho cảm ứng
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
});

// ===== List Footer =============================
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".footer-list").forEach(menu => {
        let icon = menu.previousElementSibling.querySelector('.footer-icon');
        if (menu.id === "newsletter") {
            menu.style.maxHeight = menu.scrollHeight + "px";
            icon.textContent = '-';
        } else {
            menu.style.maxHeight = "0px";
            icon.textContent = '+';
        }
    });
});

function toggleMenu(id) {
    let menu = document.getElementById(id);
    let icon = menu.previousElementSibling.querySelector('.footer-icon');
    let isOpen = menu.style.maxHeight && menu.style.maxHeight !== "0px";

    if (isOpen) {
        menu.style.maxHeight = "0px";
        icon.textContent = '+';
    } else {
        menu.style.maxHeight = menu.scrollHeight + "px";
        icon.textContent = '-';
    }
}

// ===== Mini Cart ======================
document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cartIcon");
    const cartBlock = document.getElementById("cartBlock");
    const closeCart = document.getElementById("closeCart");
    const overlayCart = document.getElementById("overlayCart");
    const cartItemsContainer = document.getElementById("cartItemList");
    const cartTotal = document.getElementById("cartTotal");
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    const cartItemTemplate = document.getElementById("cartItem");
    const cartCount = document.getElementById("cartCount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Hiển thị giỏ hàng
    cartIcon.addEventListener("click", () => {
        cartBlock.classList.add("open");
        overlayCart.classList.add("show");
    });

    // Đóng giỏ hàng
    const closeCartWithAnimation = () => {
        cartBlock.classList.remove("open");
        setTimeout(() => {
            overlayCart.classList.remove("show");
        }, 400);
    };

    closeCart.addEventListener("click", closeCartWithAnimation);
    overlayCart.addEventListener("click", closeCartWithAnimation);

    // Thêm sản phẩm vào giỏ hàng
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const name = button.getAttribute("data-name");
            const price = parseInt(button.getAttribute("data-price"));
            const image = button.getAttribute("data-image");

            const existingItem = cart.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            saveCart();
            renderCart();
        });
    });

    // Hiển thị danh sách sản phẩm trong giỏ hàng
    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartTotal.innerText = "$0.00";
            return;
        }

        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;

            // Clone template
            const cartItem = cartItemTemplate.content.cloneNode(true);

            // Gán dữ liệu sản phẩm
            cartItem.querySelector(".cart-item-img").src = item.image;
            cartItem.querySelector(".cart-item-img").alt = item.name;
            cartItem.querySelector(".cart-item-info h3").textContent = item.name;
            cartItem.querySelector(".cart-item-price").textContent = `$${(item.price * item.quantity).toLocaleString()}`;
            cartItem.querySelector(".cart-item-qty").textContent = item.quantity;

            // Xử lý nút tăng/giảm số lượng
            const increaseBtn = cartItem.querySelector(".cart-item-increase");
            const decreaseBtn = cartItem.querySelector(".cart-item-decrease");
            const removeBtn = cartItem.querySelector(".btn-cart-item-remove");

            increaseBtn.addEventListener("click", () => updateQuantity(item.id, 1));
            decreaseBtn.addEventListener("click", () => updateQuantity(item.id, -1));
            removeBtn.addEventListener("click", () => removeFromCart(item.id));

            // Thêm vào danh sách giỏ hàng
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.innerText = `$${total.toLocaleString()}`;
        updateCartCount();
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    function updateQuantity(id, change) {
        const item = cart.find((item) => item.id === id);
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
        cart = cart.filter((item) => item.id !== id);
        saveCart();
        renderCart();
    }

    // Lưu giỏ hàng vào localStorage và cập nhật số lượng trên icon
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng trên biểu tượng giỏ hàng
    function updateCartCount() {
        if (!cartCount) return;

        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalQuantity;
        cartCount.style.visibility = "visible"; // Luôn hiển thị, ngay cả khi số lượng là 0
    }

    // Hiển thị giỏ hàng và cập nhật số lượng khi trang tải lại
    renderCart();
});

