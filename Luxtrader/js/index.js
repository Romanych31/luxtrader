"use strict"

function email_test(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let forms = document.querySelectorAll('.form');

if (forms.length > 0) {
   for (let index = 0; index < forms.length; index++) {
      const form = forms[index];
      let email = form.querySelector('.input-form__email');
      let submit = form.querySelector('button[type="submit"]');
      let dataError = email.getAttribute('data-error');
      let errMessage = null;

      if (dataError) {
         errMessage = errMessageCreate(dataError);
      }

      if (email) {
         email.addEventListener('focus', function (e) {
            this.parentElement.classList.add('_focus');
         });

         email.addEventListener('blur', function (e) {
            this.parentElement.classList.remove('_focus');
            email.parentElement.classList.remove('_err');
            email.classList.remove('_err');
            errMessageRemove(this);
         });

         email.addEventListener('input', function (e) {
            if (!email_test(email)) {
               email.parentElement.classList.remove('_err');
               email.classList.remove('_err');
               errMessageRemove(this);
            }
         });
      }

      if (email.classList.contains('js-req')) {
         form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (email_test(email)) {
               email.parentElement.classList.add('_err');
               email.classList.add('_err');
               if (errMessage) {
                  email.after(errMessage);
               }
               email.focus();
            } else {
               form.submit();
            }
         });
      }
   }
}

function errMessageCreate(dataError) {
   let span = document.createElement('span');
   span.classList.add('_err-message');
   span.innerHTML = dataError;
   return span;
}

function errMessageRemove(elem) {
   let nextElem = elem.nextElementSibling;
   if (nextElem.classList.contains('_err-message')) {
      nextElem.remove();
   }
}
let ua = window.navigator.userAgent;
let msie = ua.indexOf("MSIE");
let isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i); },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
   any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
function isIE() {
   ua = navigator.userAgent;
   let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
   return is_ie;
}
if (isIE()) {
   document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
   document.querySelector('html').classList.add('_touch');
}

//web-p supported
function testWebP(callback) {
   let webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});

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

/* user-submenu accesibility */
const userSubmenu = document.querySelector('.user-submenu');
const menuContainer = document.querySelector('.user-submenu__container');
const userSubmenuButton = document.querySelector('.user-submenu__button');
const userSubmenuItems = document.querySelectorAll('.user-submenu__link');
let indexNextFocus = 0;
let indexCurentFocus = null;

if (!!isMobile.any()) {
   userSubmenuButton.addEventListener('click', function (e) {
      e.preventDefault;
      userSubmenu.classList.toggle('_active');
      console.log('click');
   });

} else {
   document.addEventListener('mouseup', function (e) {
      if (e.target != menuContainer) {
         submenuClose();
      }
      for (const submenuItem of userSubmenuItems) {
         noFocusedClick(e, submenuItem)
      }
      noFocusedClick(e, userSubmenuButton)
   });

   userSubmenu.addEventListener('keydown', function (e) {
      console.log(e.which);
      if (e.which === 9 || e.which === 27) {
         submenuClose();
      }

      if (e.which === 32 || e.which === 13) {
         this.classList.toggle('_active');
      }

      if (this.classList.contains('_active')) {
         if (e.which === 40) {
            submenuPagingDown();
         } else if (e.which === 38) {
            submenuPagingUp();
         }
      }
   });


   function submenuPagingDown() {
      if (indexCurentFocus === (userSubmenuItems.length - 1)) {
         indexNextFocus = 0;
      } else if (indexCurentFocus !== null) {
         indexNextFocus = indexCurentFocus + 1;
      }
      userSubmenuItems[indexNextFocus].focus();
      indexCurentFocus = indexNextFocus;
   }

   function submenuPagingUp() {
      if (!indexCurentFocus) {
         indexNextFocus = (userSubmenuItems.length - 1);
      } else if (indexCurentFocus) {
         indexNextFocus = indexCurentFocus - 1;
      }
      userSubmenuItems[indexNextFocus].focus();
      indexCurentFocus = indexNextFocus;
   }
}

function submenuClose() {
   if (userSubmenu.classList.contains('_active')) {
      userSubmenu.classList.remove('_active');
   }
}

function noFocusedClick(e, elem) {
   if (e.target === elem) {
      elem.blur();
   }
}
//==================================================================================
/* menu-burger */
const mainMenuBody = document.querySelector('.main-menu__body');
const body = document.querySelector('body');
const burgerIcon = document.querySelector('.main-menu__burger-icon');

burgerIcon.addEventListener('click', function () {
   this.classList.toggle('_active');
   mainMenuBody.classList.toggle('_active');
   body.classList.toggle('_lock');
});
//===============================================================================
/* move in user-submenu */
window.addEventListener('resize', dynamicAdaptive);

let adressMovedNodes = [];
let moveItems = document.querySelectorAll('*[data-move]');

if (moveItems.length) {
   for (let i = 0; i < moveItems.length; i++) {
      const moveItem = moveItems[i];
      moveItem.setAttribute('data-move-index', i);
      indexNode(moveItem);
      adressMovedNodes[i] = {
         'parent': moveItem.parentElement,
         'position': indexNode(moveItem),
      }
   }
}

function indexNode(node) {
   let index = 0
   while (node.previousElementSibling) {
      node = node.previousElementSibling;
      index++;
   }
   return index;
}

function dynamicAdaptive() {
   let screenWidth = window.outerWidth;

   if (moveItems.length) {
      for (let i = 0; i < moveItems.length; i++) {
         const moveItem = moveItems[i]

         const dataMoveValue = moveItem.dataset.move.split(',');
         const parentClass = '.' + dataMoveValue[0];
         const positionIndex = + dataMoveValue[1];
         const breakPoint = dataMoveValue[2];
         const tag = dataMoveValue[3] || 'div';

         if (screenWidth < breakPoint) {
            if (!moveItem.classList.contains('js-moved_' + breakPoint)) {
               var container = document.createElement(tag);
               let parentNode = document.querySelector(parentClass);

               moveItem.classList.add('js-moved_' + breakPoint)
               container.classList.add(`_moved-node`);
               container.append(moveItem);

               if (positionIndex === 1 || positionIndex === 0) {
                  parentNode.prepend(container);
               } else if (positionIndex === -1) {
                  parentNode.append(container);
               } else {
                  const child = parentNode.children[positionIndex - 1];
                  child.before(container);
               }
            }
         } else {
            backMove(breakPoint);
         }

      }
   }
}
dynamicAdaptive();

function backMove(breakPoint) {
   const movedNodes = document.querySelectorAll('.js-moved_' + breakPoint);

   if (movedNodes.length) {
      for (const movedNode of movedNodes) {
         const dataIndex = movedNode.getAttribute('data-move-index');
         const adressMovedNode = adressMovedNodes[dataIndex];
         const parentNode = adressMovedNode.parent;
         const position = adressMovedNode.position;

         movedNode.parentElement.remove();

         if (position == 0) {
            parentNode.prepend(movedNode)
         } else {
            parentNode.children[position - 1].after(movedNode);
         }
         movedNode.classList.remove('js-moved_' + breakPoint);
      }
   }


}



