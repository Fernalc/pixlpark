const sliderSlide = document.querySelectorAll('.slide')
const sliderSlides = document.querySelector('.slider__slides')
const sliderBars = document.querySelectorAll('.slider__bar')
const sliderBtnPrev = document.querySelector('.slider__btn-prev')
const sliderBtnNext = document.querySelector('.slider__btn-next')

let sliderCount = 0
let sliderWidth
let touchStartX = 0
let touchEndX = 0

window.addEventListener('resize', showSlide);

sliderBtnPrev.addEventListener('click', prevSlide)
sliderBtnNext.addEventListener('click', nextSlide)
sliderSlides.addEventListener('touchstart', handleTouchStart)
sliderSlides.addEventListener('touchmove', handleTouchMove)
sliderSlides.addEventListener('touchend', handleTouchEnd)

function showSlide() {
    sliderWidth = document.querySelector('.slider').offsetWidth
    sliderSlides.style.width = sliderWidth * sliderSlide.length + 'px'
    sliderSlide.forEach(item => item.style.width = sliderWidth + 'px')
}

showSlide()

function nextSlide() {
    sliderCount++
    if (sliderCount >= sliderSlide.length) sliderCount = 0;

    rollSlider();
    thisSlide(sliderCount)
}

function prevSlide() {
    sliderCount--
    if (sliderCount < 0) sliderCount = sliderSlide.length - 1;

    rollSlider();
    thisSlide(sliderCount)
}

function rollSlider() {
    sliderSlides.style.transform = `translateX(${-sliderCount * sliderWidth}px)`
}

function thisSlide(index) {
    sliderBars.forEach(item => item.classList.remove('active-bar'))
    sliderBars[index].classList.add('active-bar')
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX
}

function handleTouchEnd() {
    const touchDiff = touchStartX - touchEndX
    const sensitivity = 50

    if (touchDiff > sensitivity) {
        nextSlide()
    } else if (touchDiff < -sensitivity) {
        prevSlide()
    }
}

sliderBars.forEach((bar, index) => {
    bar.addEventListener('click', () => {
        sliderCount = index
        rollSlider();
        thisSlide(sliderCount)
    })
})

const menuBtn = document.querySelector('.menu__btn');
const menuList = document.querySelector('.menu__list');
const logo = document.querySelector('.logo');
const menuShadow = document.querySelector('.menu--close')
const body = document.querySelector('body');
menuBtn.addEventListener('click', () => {
    menuList.classList.toggle('menu__list--open')
    menuBtn.classList.toggle('menu__btn--open')
    logo.classList.toggle('active')
    menuShadow.classList.toggle('menu--open')

    body.style.overflow === 'hidden' ? body.style.overflow = 'auto' : body.style.overflow = 'hidden'
})