var s = require('./2.js');

let template = Handlebars.compile(s.template.listItem);

let context = {
  items: [
    {
      title: 'title1'
    },
    {
      title: 'title2'
    }
  ]
};

let body = document.querySelector('body');

// body.innerHTML = template(context);
