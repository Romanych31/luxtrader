/* adaptive function */
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
         console.log(breakPoint);

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
//=======================================================
