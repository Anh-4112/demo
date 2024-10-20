let currentIndex = 0;
const slides = document.querySelectorAll('.img-slider img');
const totalSlides = slides.length;

function showSlide(index) {
    const offset = index * -100;
    document.querySelector('.img-slider').style.transform = `translateX(${offset}%)`;
}

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}, 4000); 