//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

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
	//touchRatio: 0,
	//simulateTouch: false,
	loop: true,
	//preloadImages: false,

	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.control-main-slider__arrow.control-main-slider__arrow_next',
		prevEl: '.control-main-slider__arrow.control-main-slider__arrow_prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	// on: {
	// 	lazyImageReady: function () {
	// 		ibg();
	// 	},
	// }
	// And if we need scrollbar
	//scrollbar: {
	//	el: '.swiper-scrollbar',
	//},
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
