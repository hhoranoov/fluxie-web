document.addEventListener("DOMContentLoaded", function () {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <!-- PRELOADER -->
    <div class="preloader">
      <span class="loading-text">флюксі.</span>
    </div>

    <!-- CURSOR -->
    <canvas></canvas>

    <!-- FLAG -->
    <div class="flag-container">
      <a href="https://savelife.in.ua/projects/status/active/">
        <img src="./assets/images/ua.png" alt="ua" class="ukraine-flag" />
      </a>
    </div>

    <!-- TOP -->
    <a href="#top" class="go-top" data-go-top title="Go to Top">
      <i class="bx bx-chevron-up"></i>
    </a>
    `
  );
});
