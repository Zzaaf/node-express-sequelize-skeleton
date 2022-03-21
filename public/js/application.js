const formRegistration = document.querySelector('#formRegistration');
const formEdit = document.querySelector('#formEdit');
const pass = document.querySelector('#regPassword');
const confPass = document.querySelector('#regConfirmPassword');
const feedback = document.querySelector('#feedback');
const deleteBtn = document.querySelector('#deleteBtn');
const iconEye = document.querySelector('#iconEye');
const wrapIcon = document.querySelector('#wrapIcon');
const loginPassword = document.querySelector('#loginPassword');

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
        window.location.href = data.message;
      } else {
        feedback.textContent = data.message;
        feedback.style.display = 'block';
      }
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
      window.location.href = data.message;
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
      window.location.href = data.message;
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
