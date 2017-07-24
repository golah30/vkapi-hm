import { listItem as template } from './template.js';
import * as vk from './vk.js';
import * as events from './event.js';
import { init as dndInit } from './drag.js';

let _template = Handlebars.compile(template),
  container = document.querySelector('.friends');
console.log(2 + 2);
new Promise(resolve => (window.onload = resolve))
  .then(() => events.init())
  .then(() => vk.init())
  .then(() => vk.query('users.get', { name_case: 'nom' }))
  .then(response => {
    container.dataset.id = response[0].id;
  })
  .then(() => vk.query('friends.get', { fields: 'photo_200', order: 'random' }))
  .then(response => {
    verifyLists(response);
  })
  .then(() => dndInit())
  .catch(e => alert('Ошибка: ' + e.message));

function verifyLists(response) {
  let exc = localStorage[container.dataset.id],
    leftList = document.querySelector('.friends__left'),
    rightList = document.querySelector('.friends__right');

  for (let item of response.items) {
    if (typeof exc === 'undefined') {
      leftList.innerHTML += _template(item);
    } else {
      if (isItemMatching(item, exc)) {
        rightList.innerHTML += _template(item);
      } else {
        leftList.innerHTML += _template(item);
      }
    }
  }
}

function isItemMatching(item, exc) {
  exc = JSON.parse(exc);

  for (let examplar of exc.friends) {
    if (examplar == item.id) {
      return true;
    }
  }

  return false;
}
