function sendMessage() {
  var contactMethod = document.querySelector('input[name="contact-method"]:checked').value;
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  function showError(inputId, message) {
    var inputWrapper = document.getElementById(inputId).closest('.form-wrapper');
    var errorMessage = inputWrapper.querySelector('.error-message');

    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      inputWrapper.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
    inputWrapper.classList.add('has-error');
  }

  function removeError(inputId) {
    var inputWrapper = document.getElementById(inputId).closest('.form-wrapper');
    var errorMessage = inputWrapper.querySelector('.error-message');

    if (errorMessage) {
      errorMessage.remove();
    }

    inputWrapper.classList.remove('has-error');
  }

  var isValid = true;

  if (!name) {
    showError('name', "Будь ласка, введіть ваше ім'я.");
    isValid = false;
  } else {
    removeError('name');
  }

  if (!phone) {
    showError('phone', 'Будь ласка, введіть номер телефону.');
    isValid = false;
  } else {
    removeError('phone');
  }

  if (!email) {
    showError('email', 'Будь ласка, введіть вашу поштову скриньку.');
    isValid = false;
  } else {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      showError('email', 'Будь ласка, введіть правильну поштову скриньку.');
      isValid = false;
    } else {
      removeError('email');
    }
  }

  if (!message) {
    showError('message', 'Будь ласка, введіть повідомлення.');
    isValid = false;
  } else {
    removeError('message');
  }

  if (!isValid) {
    return;
  }

  var fullMessage = `
<strong>Ім'я:</strong> ${name} <br>
<strong>Номер телефону:</strong> ${phone} <br>
<strong>Поштова скринька:</strong> ${email} <br>
<strong>Запит:</strong> ${message}
`;

  var myEmail = 'horranovv@gmail.com';

  if (contactMethod === 'email') {
    var emailSubject = 'Запит з сайту';
    var emailBody = `Інформація про користувача: <br><br> ${fullMessage}`;
    var emailUrl = `mailto:${myEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailUrl;
  } else if (contactMethod === 'telegram') {
    var telegramUsername = 'horanov';
    var telegramMessage = `Інформація про користувача:\n\nІм'я: ${name}\nНомер телефону: ${phone}\nПоштова скринька: ${email}\nЗапит: ${message}`;
    var telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(telegramMessage)}`;
    window.open(telegramUrl, '_blank');
  }

  document.querySelector('.contact-form').reset();

  setTimeout(function () {
    window.location.reload();
  }, 1000);
}