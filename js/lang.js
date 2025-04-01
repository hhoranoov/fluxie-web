document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang");
  const elements = document.querySelectorAll("[data-lang]");
  const savedLang = localStorage.getItem("language") || "ua";
  langSelect.value = savedLang;
  loadLanguage(savedLang);

  langSelect.addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    localStorage.setItem("language", selectedLang);
    loadLanguage(selectedLang);
  });

  function loadLanguage(lang) {
    fetch(`/locales/${lang}.json`)
      .then((response) => response.json())
      .then((translations) => {
        elements.forEach((el) => {
          const key = el.getAttribute("data-lang");
          if (translations[key]) {
            el.textContent = translations[key];
          }
        });
      })
      .catch((error) => console.error("Помилка завантаження мови:", error));
  }
});
