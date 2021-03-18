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

