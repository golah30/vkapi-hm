function addListeners() {
  addSearchListener();
  addSaveListener();
  addListListener();
}

function addSearchListener() {
  let searchLeft = document.querySelector('#search-left'),
    searchRight = document.querySelector('#search-right');

  searchLeft.addEventListener('keyup', () => {
    let container = document.querySelector('.friends__left'),
      items = container.querySelectorAll('.item'),
      value = searchLeft.value;

    actualize(items, value);
  });

  searchRight.addEventListener('keyup', () => {
    let container = document.querySelector('.friends__right'),
      items = container.querySelectorAll('.item'),
      value = searchRight.value;

    actualize(items, value);
  });
}

function addSaveListener() {
  let save = document.querySelector('.save');

  save.addEventListener('click', e => {
    let container = document.querySelector('.friends__right'),
      items = container.querySelectorAll('.item'),
      idBox = document.querySelector('.friends'),
      data = { userId: idBox.dataset.id, friends: [] };

    for (let item of items) {
      data.friends.push(item.dataset.id);
    }
    localStorage[data.userId] = JSON.stringify(data);
  });
}

function addListListener() {
  let leftList = document.querySelector('.friends__left'),
    rightList = document.querySelector('.friends__right');

  leftList.addEventListener('click', e => {
    if (e.target.classList.contains('switch')) {
      let item = e.target.closest('li'),
        searchRight = document.querySelector('#search-right');

      rightList.appendChild(item);
      actualize([item], searchRight.value);
    }
  });
  rightList.addEventListener('click', e => {
    if (e.target.classList.contains('switch')) {
      let item = e.target.closest('li'),
        searchLeft = document.querySelector('#search-left');

      leftList.appendChild(item);
      actualize([item], searchLeft.value);
    }
  });
}

function actualize(items, value) {
  if (value.length != 0) {
    let name, lastName;

    for (let item of items) {
      name = item.querySelector('.name');
      lastName = item.querySelector('.subname');
      if (isMatching(name.textContent + ' ' + lastName.textContent, value)) {
        if (item.classList.contains('hide')) {
          item.classList.remove('hide');
        }
      } else {
        if (!item.classList.contains('hide')) {
          item.classList.add('hide');
        }
      }
    }
  } else {
    for (let item of items) {
      if (item.classList.contains('hide')) {
        item.classList.remove('hide');
      }
    }
  }
}

function isMatching(full, chunk) {
  var reg = new RegExp(chunk, 'i'),
    res;

  res = full.search(reg);

  if (res < 0) {
    return false;
  }

  return true;
}

export { addListeners as init, actualize };
