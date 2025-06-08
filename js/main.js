document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("side-menu");
  const buttons = document.querySelectorAll("#side-menu button");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
});
