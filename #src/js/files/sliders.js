
let mainSlider = new Swiper('.main-slider__body', {
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},

	observer: true,
	// observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: false,
	speed: 800,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '.control-main-slider__arrow.control-main-slider__arrow_next',
		prevEl: '.control-main-slider__arrow.control-main-slider__arrow_prev',
	},
});

//slider lot
let sliderLot = new Swiper('.slider-lots__items', {

	observer: false,
	slidesPerView: 3,
	spaceBetween: 90,
	autoHeight: false,
	speed: 800,
	observer: true,
	lazy: {
		loadPrevNext: true,
		loadPrevNextAmount: 10,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	// Arrows
	navigation: {
		nextEl: '.slider-lots__button.slider-lots__button_next',
		prevEl: '.slider-lots__button.slider-lots__button_prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		660: {
			slidesPerView: 2,
			spaceBetween: 50,
		},
		980: {
			slidesPerView: 3,
			spaceBetween: 90,
		},
	},
});

// quotes slider
let quotesSlider = new Swiper('.quotes__slider', {
	autoplay: {
		delay: 10000,
		disableOnInteraction: false,
	},
	spaceBetween: 10,
	autoHeight: true,
	speed: 2000,
	loop: true,
	allowTouchMove: false,
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	// Arrows
	navigation: {
		nextEl: '.quotes__button',
		prevEl: '',
	},
});

let angleButton = 0;
document.querySelector('.quotes__button').addEventListener('click', function () {
	angleButton += 360;
	this.style.transition = 400;
	this.style.transform = `rotate(${angleButton}deg)`;
});
