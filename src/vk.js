function query(method, options) {
  if (!options.v) {
    options.v = '5.65';
  }

  return new Promise((resolve, reject) => {
    VK.api(method, options, data => {
      if (data.error) {
        reject(new Error(data.error.error_msg));
      } else {
        resolve(data.response);
      }
    });
  });
}

function init() {
  return new Promise((resolve, reject) => {
    VK.init({
      apiId: 6099473
    });

    VK.Auth.login(data => {
      if (data.session) {
        resolve();
      } else {
        reject(new Error('Не удалось авторизоваться'));
      }
    }, 2);
  });
}

export { query, init };
