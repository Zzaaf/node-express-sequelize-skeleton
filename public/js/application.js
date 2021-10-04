const form = document.querySelector('#formRegistration');
const pass = document.querySelector('#regPassword');
const confPass = document.querySelector('#regConfirmPassword');
const feedback = document.querySelector('#feedback');
const deleteBtn = document.querySelector('#deleteBtn');

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

if (form) {
  form.addEventListener('submit', async (event) => {
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
