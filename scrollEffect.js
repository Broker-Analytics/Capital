// Seleccionamos el header y el footer
const header = document.querySelector(".header");

let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Si hacemos scroll hacia abajo, ocultar header y footer
    header.style.top = "-100px"; // Ajusta este valor a la altura de tu header
    footer.style.bottom = "-100px"; // Ajusta este valor a la altura de tu footer
  } else {
    // Si hacemos scroll hacia arriba, mostrar header y footer
    header.style.top = "0";
  }

  lastScrollTop = scrollTop;
});
