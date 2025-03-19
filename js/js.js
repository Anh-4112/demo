// $(document).ready(function () {
//     let currentIndex = 0;
//     const slides = $(".slide");
//     const totalSlides = slides.length;
//     const slider = $(".slider");
//     const dotsContainer = $(".slider-dots");

//     slides.eq(0).addClass("active"); // Slide đầu tiên sẽ hiển thị ngay từ đầu


//     // Thêm dots theo số lượng slide
//     for (let i = 0; i < totalSlides; i++) {
//         dotsContainer.append(`<span class="dot" data-index="${i}"></span>`);
//     }
//     let dots = $(".dot");

//     function getRemSize(valuePx) {
//         let rootFontSize = parseFloat($("html").css("font-size")); // Lấy font-size của thẻ <html>
//         return valuePx / rootFontSize; // Chuyển px sang rem
//     }

//     function updateSlider() {
//         let slideWidthRem = getRemSize($(".slider-wrapper").width()); // Lấy chiều rộng slider và đổi sang rem
//         slider.css("transform", `translateX(-${currentIndex * slideWidthRem}rem)`);
    
//         slides.removeClass("active"); // Xóa lớp active khỏi tất cả slide
//         slides.eq(currentIndex).addClass("active"); // Thêm lớp active cho slide hiện tại
    
//         dots.removeClass("active");
//         dots.eq(currentIndex).addClass("active");
//     }

//     function resetAutoSlide() {
//         clearInterval(slideInterval);
//         slideInterval = setInterval(autoSlide, 3000);
//     }

//     $(".next").click(function () {
//         currentIndex = (currentIndex + 1) % totalSlides;
//         updateSlider();
//         resetAutoSlide();
//     });

//     $(".prev").click(function () {
//         currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
//         updateSlider();
//         resetAutoSlide();
//     });

//     dots.click(function () {
//         currentIndex = $(this).data("index");
//         updateSlider();
//         resetAutoSlide();
//     });

//     function autoSlide() {
//         currentIndex = (currentIndex + 1) % totalSlides;
//         updateSlider();
//     }

//     let slideInterval = setInterval(autoSlide, 3000);

//     $(window).resize(function () {
//         updateSlider();
//     });

//     updateSlider();
// });

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
document.addEventListener("DOMContentLoaded", () => {
    // Chọn tất cả phần tử có class "footer-list" (các menu con trong footer)
    document.querySelectorAll(".footer-list").forEach(menu => {
        // Lấy biểu tượng (+/-) từ phần tử liền trước menu
        let icon = menu.previousElementSibling.querySelector(".footer-icon");
        // Kiểm tra xem menu có mở sẵn hay không dựa vào biểu tượng (+/-)
        let isOpen = icon.textContent.trim() === "-";

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
    icon.textContent = isOpen ? "+" : "-";
    // Cập nhật trạng thái mới vào dataset
    menu.dataset.open = !isOpen;
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
        setTimeout(() => overlayCart.classList.remove("show"), 300);
    };

    closeCart.addEventListener("click", closeCartWithAnimation);
    overlayCart.addEventListener("click", closeCartWithAnimation);

    // Thêm sản phẩm vào giỏ hàng
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);
            const image = button.dataset.image;

            const existingItem = cart.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
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
        }

        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
            const cartItem = cartItemTemplate.content.cloneNode(true);

            cartItem.querySelector(".cart-item-img").src = item.image;
            cartItem.querySelector(".cart-item-info h3").textContent = item.name;
            cartItem.querySelector(".cart-item-price").textContent = `$${(item.price * item.quantity).toLocaleString()}`;
            cartItem.querySelector(".cart-item-qty").textContent = item.quantity;

            const increaseBtn = cartItem.querySelector(".cart-item-increase");
            const decreaseBtn = cartItem.querySelector(".cart-item-decrease");
            const removeBtn = cartItem.querySelector(".btn-cart-item-remove");

            increaseBtn.addEventListener("click", () => updateQuantity(item.id, 1));
            decreaseBtn.addEventListener("click", () => updateQuantity(item.id, -1));
            removeBtn.addEventListener("click", () => removeFromCart(item.id));

            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.innerText = `$${total.toLocaleString()}`;
        updateCartCount();
    }

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

    function removeFromCart(id) {
        cart = cart.filter((item) => item.id !== id);
        saveCart();
        renderCart();
    }

    let saveCartTimeout;
    function saveCart() {
        clearTimeout(saveCartTimeout);
        saveCartTimeout = setTimeout(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        }, 300);
    }

    function updateCartCount() {
        if (!cartCount) return;
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalQuantity;
        cartCount.style.visibility = "visible"; // Luôn hiển thị, ngay cả khi số lượng là 0
    }

    renderCart();
});

// ===== Menu Mobile ======================
// document.addEventListener("DOMContentLoaded", function () {
//     const menuMobileIcon = document.getElementById("menuMobileIcon");
//     const menuMobileBlock = document.getElementById("menuMobileBlock");
//     const closeMenuMobile = document.getElementById("closeMenuMobile");
//     const overlayMenuMobile = document.getElementById("overlayMenuMobile");

//     const subHome = document.getElementById("subHome");
//     const subHomeBlock = document.getElementById("subHomeBlock");
//     const subHomeBack = document.getElementById("subHomeBack");
//     const closeSubHome = document.getElementById("closeSubHome");

//     const subShop = document.getElementById("subShop");
//     const subShopBlock = document.getElementById("subShopBlock");
//     const subShopBack = document.getElementById("subShopBack");
//     const closeSubShop = document.getElementById("closeSubShop");

//     const subShopLayout = document.getElementById("subShopLayout");
//     const subShopLayoutBlock = document.getElementById("subShopLayoutBlock");
//     const subShopLayoutBack = document.getElementById("subShopLayoutBack");
//     const closeSubShopLayout = document.getElementById("closeSubShopLayout");

//     if (menuMobileIcon) {
//         menuMobileIcon.addEventListener("click", () => {
//             menuMobileBlock.classList.add("open");
//             overlayMenuMobile.classList.add("show");
//         });
//     }

//     const closeMenuMobileWithAnimation = () => {
//         menuMobileBlock.classList.remove("open");
//         subHomeBlock.classList.remove("open"); // Đóng luôn sub-home
//         subShopBlock.classList.remove("open"); // Đóng luôn sub-shop
//         subShopLayoutBlock.classList.remove("open"); // Đóng luôn sub-shop-layout
//         setTimeout(() => overlayMenuMobile.classList.remove("show"), 400);
//     };    

//     if (subHome) {
//         subHome.addEventListener("click", () => {
//             subHomeBlock.classList.add("open");
//         });
//     }

//     const closeSubHomeWithAnimation = () => {
//         subHomeBlock.classList.remove("open");
//     };

    
//     if (subShop) {
//         subShop.addEventListener("click", () => {
//             subShopBlock.classList.add("open");
//         });
//     }

//     const closeSubShopWithAnimation = () => {
//         subShopBlock.classList.remove("open");
//     };

//     if (subShopLayout) {
//         subShopLayout.addEventListener("click", () => {
//             subShopLayoutBlock.classList.add("open");
//         });
//     }

//     const closeSubShopLayoutWithAnimation = () => {
//         subShopLayoutBlock.classList.remove("open");
//     };

//     // Đóng hoàn toàn menu khi click vào dấu "x" của sub-home
//     if (closeSubHome) {
//         closeSubHome.addEventListener("click", closeMenuMobileWithAnimation);
//     }

//     // Đóng hoàn toàn menu khi click vào dấu "x" của sub-shop
//     if (closeSubShop) {
//         closeSubShop.addEventListener("click", closeMenuMobileWithAnimation);
//     }

//         // Đóng hoàn toàn menu khi click vào dấu "x" của sub-shop-layout
//         if (closeSubShopLayout) {
//             closeSubShopLayout.addEventListener("click", closeMenuMobileWithAnimation);
//         }

//     // Đóng menu mobile khi nhấn overlay
//     if (overlayMenuMobile) {
//         overlayMenuMobile.addEventListener("click", closeMenuMobileWithAnimation);
//     }

//     if (closeMenuMobile) {
//         closeMenuMobile.addEventListener("click", closeMenuMobileWithAnimation);
//     }

//     if (subHomeBack) {
//         subHomeBack.addEventListener("click", closeSubHomeWithAnimation);
//     }

//     if (subShopBack) {
//         subShopBack.addEventListener("click", closeSubShopWithAnimation);
//     }

//     if (subShopLayoutBack) {
//         subShopLayoutBack.addEventListener("click", closeSubShopLayoutWithAnimation);
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
    // Khai báo các phần tử HTML cần sử dụng
    const elements = {
        menuMobileIcon: "menuMobileIcon",
        menuMobileBlock: "menuMobileBlock",
        closeMenuMobile: "closeMenuMobile",
        overlayMenuMobile: "overlayMenuMobile",
        subHome: "subHome",
        subHomeBlock: "subHomeBlock",
        subHomeBack: "subHomeBack",
        closeSubHome: "closeSubHome",
        subShop: "subShop",
        subShopBlock: "subShopBlock",
        subShopBack: "subShopBack",
        closeSubShop: "closeSubShop",
        subShopLayout: "subShopLayout",
        subShopLayoutBlock: "subShopLayoutBlock",
        subShopLayoutBack: "subShopLayoutBack",
        closeSubShopLayout: "closeSubShopLayout"
    };

    // Gán các phần tử HTML vào đối tượng elements
    Object.keys(elements).forEach(key => {
        elements[key] = document.getElementById(elements[key]);
    });

    // Hàm thêm hoặc xóa class từ một phần tử
    const toggleClass = (element, className, action) => {
        if (element) element.classList[action](className);
    };

    // Hàm đóng menu mobile với hiệu ứng
    const closeMenuMobileWithAnimation = () => {
        [elements.menuMobileBlock,
        elements.subHomeBlock,
        elements.subShopBlock,
        elements.subShopLayoutBlock].forEach(el => toggleClass(el, "open", "remove"));
        setTimeout(() => toggleClass(elements.overlayMenuMobile, "show", "remove"), 400);
    };

    // Hàm thiết lập sự kiện click cho các phần tử
    const setupClickEvent = (trigger, target, className = "open", action = "add") => {
        if (trigger && target) {
            trigger.addEventListener("click", () => {
                toggleClass(target, className, action);
                // Nếu mở menu mobile, hiển thị overlay
                if (action === "add" && target === elements.menuMobileBlock) {
                    toggleClass(elements.overlayMenuMobile, "show", "add");
                }
            });
        }
    };

    // Thiết lập sự kiện mở menu và submenu
    setupClickEvent(elements.menuMobileIcon, elements.menuMobileBlock);
    setupClickEvent(elements.subHome, elements.subHomeBlock);
    setupClickEvent(elements.subShop, elements.subShopBlock);
    setupClickEvent(elements.subShopLayout, elements.subShopLayoutBlock);

    // Thiết lập sự kiện đóng menu mobile khi nhấn vào overlay hoặc nút đóng
    [elements.closeMenuMobile, 
    elements.overlayMenuMobile, 
    elements.closeSubHome, 
    elements.closeSubShop, 
    elements.closeSubShopLayout].forEach(el => {
        if (el) el.addEventListener("click", closeMenuMobileWithAnimation);
    });

    // Thiết lập sự kiện nút back để đóng submenu
    setupClickEvent(elements.subHomeBack, elements.subHomeBlock, "open", "remove");
    setupClickEvent(elements.subShopBack, elements.subShopBlock, "open", "remove");
    setupClickEvent(elements.subShopLayoutBack, elements.subShopLayoutBlock, "open", "remove");
});

// =============================
document.addEventListener("DOMContentLoaded", function () {
    const goToTopButton = document.querySelector(".go-to-top");

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

// document.addEventListener("DOMContentLoaded", function () {
//     const goToTopButton = document.querySelector(".go-to-top");
//     goToTopButton.style.backgroundColor = "white"; // Màu trắng ban đầu
//     goToTopButton.style.transition = "background-color 0.5s ease-in-out";

//     // Hiển thị hoặc ẩn nút khi cuộn
//     window.addEventListener("scroll", function () {
//         if (window.scrollY > 500) {
//             goToTopButton.style.display = "block";
//             let scrollPercentage = Math.min(window.scrollY / document.documentElement.scrollHeight, 1);
//             let blackIntensity = Math.floor(scrollPercentage * 255);
//             goToTopButton.style.backgroundColor = `rgb(${255 - blackIntensity}, ${255 - blackIntensity}, ${255 - blackIntensity})`;
//         } else {
//             goToTopButton.style.display = "none";
//         }
//     });

//     // Cuộn lên đầu khi click
//     goToTopButton.addEventListener("click", function () {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         });
//     });
// });

// ===== Sticky ======================
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = window.scrollY; // Lưu vị trí cuộn trước đó
    const stickyBottom = document.querySelector(".sticky-bottom"); // Lấy sticky

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY; // Lấy vị trí cuộn hiện tại
        let documentHeight = document.documentElement.scrollHeight; // Chiều cao toàn bộ trang
        let windowHeight = window.innerHeight; // Chiều cao vùng hiển thị

        if (scrollTop > lastScrollTop) {
            // Nếu cuộn xuống, hiển thị thanh điều hướng
            stickyBottom.classList.add("show");
        } else {
            // Nếu cuộn lên, ẩn thanh điều hướng
            stickyBottom.classList.remove("show");
        }

        if (scrollTop + windowHeight >= documentHeight - 5) {
            // Nếu cuộn đến cuối trang, luôn hiển thị thanh điều hướng
            stickyBottom.classList.add("show");
        }

        lastScrollTop = scrollTop; // Cập nhật vị trí cuộn trước đó
    });
});






