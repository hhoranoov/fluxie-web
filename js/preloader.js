window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 2000);

  const textElement = document.querySelector('.loading-text');
  const text = textElement.innerText;
  textElement.innerHTML = '';

  let i = 0;
  const interval = setInterval(() => {
    textElement.innerHTML += text.charAt(i);
    i++;
    if (i === text.length) {
      clearInterval(interval);
    }
  }, 100);
});
