import * as events from './event.js';
function addListeners(target) {
  function dragStart(e) {
    e.target.style.opacity = '0.4';
  }
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    return false;
  }
  function dragEnd(e) {
    let rightList = document.querySelector('.friends__right'),
      leftToWorkspace = rightList.getBoundingClientRect().left,
      rightToWorkspace = rightList.getBoundingClientRect().right,
      topToWorkspace = rightList.getBoundingClientRect().top,
      bottomToWorkspace = rightList.getBoundingClientRect().bottom,
      searchRight = document.querySelector('#search-right');

    if (e.clientX > leftToWorkspace && e.clientX < rightToWorkspace) {
      if (e.clientY > topToWorkspace && e.clientY < bottomToWorkspace) {
        rightList.appendChild(e.target);
        events.actualize([e.target], searchRight.value);
      }
    }
    e.target.style.opacity = '1';
  }

  target.addEventListener('dragstart', dragStart, false);
  target.addEventListener('dragover', dragOver, false);
  target.addEventListener('dragend', dragEnd, false);
}

function init() {
  let leftList = document.querySelector('.friends__left'),
    rightList = document.querySelector('.friends__right');

  for (let item of leftList.querySelectorAll('.item')) {
    item.setAttribute('draggable', 'true');
    addListeners(item);
  }
  for (let item of rightList.querySelectorAll('.item')) {
    item.setAttribute('draggable', 'true');
    addListeners(item);
  }
}
export { init };
