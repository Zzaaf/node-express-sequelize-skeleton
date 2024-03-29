// Forms
const formRegistration = document.querySelector('#formRegistration');
const formEdit = document.querySelector('#formEdit');
const formLogin = document.querySelector('#formLogin');
const formForgot = document.querySelector('#formForgot');
const formAddCard = document.querySelector('#formAddCard');

// Inputs
const pass = document.querySelector('#regPassword');
const confPass = document.querySelector('#regConfirmPassword');
const loginPassword = document.querySelector('#loginPassword');

// Modals
const modal = document.querySelector('.modal');

// Buttons
const deleteBtn = document.querySelector('#deleteBtn');
const iconEye = document.querySelector('#iconEye');
const wrapIcon = document.querySelector('#wrapIcon');
const addCard = document.querySelector('.add-card');
const closeBtn = document.querySelector('.btn-close');

// Sectoins
const feedback = document.querySelector('#feedback');
const cardList = document.querySelector('#cardList');

function validate() {
  if (pass.value !== confPass.value) {
    pass.classList.add('invalid-input');
    confPass.classList.add('invalid-input');
    feedback.textContent = 'Passwords are not the same';
    feedback.style.display = 'block';
    return false;
  }

  pass.classList.remove('invalid-input');
  confPass.classList.remove('invalid-input');
  feedback.style.display = 'none';
  return true;
}

if (formRegistration) {
  formRegistration.addEventListener('submit', async (event) => {
    // отмена дефолтного поведения формы
    event.preventDefault();

    // формирование переменных через деструктуризацию
    const {
      method, action, username, email, password,
    } = event.target;

    // условие при прохождении валидации
    if (validate()) {
      // инициализация запроса и формирование ответа
      const response = await fetch(action, {
        method,
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
        }),
      });

      // распаковка ответа в формате JSON
      const data = await response.json();

      // клиентский редиект на URL полученный из ответа сервера + обработка ошибки дубликата почты
      if (data.registration) {
        window.location.href = data.url;
      } else {
        feedback.textContent = data.message;
        feedback.style.display = 'block';
      }
    }
  });
}

if (formLogin) {
  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    // формирование переменных через деструктуризацию
    const {
      method, action, email, password,
    } = event.target;

    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    // распаковка ответа в формате JSON
    const data = await response.json();

    // клиентский редирект на URL полученный из ответа сервера + обработка ошибки отсутствия почты в БД
    if (!data.login) {
      feedback.textContent = data.message;
      feedback.style.display = 'block';
    } else {
      window.location.href = data.url;
    }
  });
}

if (formEdit) {
  formEdit.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { action, username, email } = event.target;

    const response = await fetch(action, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, email: email.value }),
    });

    const data = await response.json();

    if (data.updated) {
      window.location.href = data.url;
    }
  });
}

if (formForgot) {
  formForgot.addEventListener('submit', async (event) => {
    event.preventDefault();

    // формирование переменных через деструктуризацию
    const { method, action, email } = event.target;

    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        email: email.value,
      }),
    });

    // распаковка ответа в формате JSON
    const data = await response.json();

    // информирования клиента о сбросе пароля
    if (!data.reset) {
      feedback.textContent = data.message;
      feedback.style.display = 'block';
    } else {
      feedback.textContent = data.message;
      feedback.style.color = '#198754';
      feedback.style.display = 'block';
    }
  });
}

if (formAddCard) {
  formAddCard.addEventListener('submit', async (event) => {
    event.preventDefault();

    // формирование переменных через деструктуризацию
    const {
      method, action, title, content,
    } = event.target;

    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
    });

    const html = await response.text();

    if (response.status === 201) {
      modal.style.display = 'none';
      cardList.insertAdjacentHTML('beforeend', html);
    }
  });
}

if (deleteBtn) {
  deleteBtn.addEventListener('click', async (event) => {
    const { url } = event.target.dataset;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'Application/json' },
    });

    const data = await response.json();

    if (data.delete) {
      window.location.href = data.url;
    }
  });
}

if (wrapIcon) {
  wrapIcon.addEventListener('click', () => {
    if (iconEye.classList.contains('bi-eye')) {
      iconEye.classList.remove('bi-eye');
      iconEye.classList.add('bi-eye-slash');
      loginPassword.setAttribute('type', 'text');
    } else {
      iconEye.classList.add('bi-eye');
      iconEye.classList.remove('bi-eye-slash');
      loginPassword.setAttribute('type', 'password');
    }
  });
}

if (addCard) {
  addCard.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.style.height = '100vh';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
  });
}

if (cardList) {
  cardList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-danger')) {
      const deleteElement = document.querySelector(`#card-${event.target.dataset.id}`);

      fetch(`/cards/${event.target.dataset.id}`, { method: 'delete' })
        .then(() => deleteElement.remove());
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}
