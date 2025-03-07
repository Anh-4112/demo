$(document).ready(function () {
    let currentIndex = 0;
    const slides = $(".slide");
    const totalSlides = slides.length;
    const slider = $(".slider");
    const dotsContainer = $(".slider-dots");

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
        dots.removeClass("active");
        dots.eq(currentIndex).addClass("active");
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 3000);
    }

    $(".slider-next").click(function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
        resetAutoSlide();
    });

    $(".slider-prev").click(function () {
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