const pages = Array.from(document.querySelectorAll(".page"));
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const counter = document.getElementById("counter");
let currentPage = 0;

function renderBook() {
  pages.forEach((page, index) => {
    const flipped = index < currentPage;
    page.classList.toggle("flipped", flipped);
    page.style.zIndex = flipped ? index + 1 : pages.length - index;
    page.setAttribute("aria-hidden", index !== currentPage && index !== currentPage - 1 ? "true" : "false");
  });

  prevButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === pages.length;
  if (currentPage === 0) counter.textContent = `Capa · 1 de ${pages.length}`;
  else if (currentPage === pages.length) counter.textContent = `Fim do álbum · ${pages.length} de ${pages.length}`;
  else counter.textContent = `Página ${currentPage} de ${pages.length}`;
  nextButton.querySelector("span").textContent = currentPage === pages.length - 1 ? "Última página" : "Virar página";
}

nextButton.addEventListener("click", () => {
  if (currentPage < pages.length) {
    currentPage++;
    renderBook();
  }
});
prevButton.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderBook();
  }
});
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" && currentPage < pages.length) {
    currentPage++;
    renderBook();
  }
  if (event.key === "ArrowLeft" && currentPage > 0) {
    currentPage--;
    renderBook();
  }
});

// Swipe gestures make page turning comfortable on phones.
let touchStartX = null;
const book = document.getElementById("book");
book.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
book.addEventListener("touchend", event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 55) {
    if (delta < 0 && currentPage < pages.length) currentPage++;
    if (delta > 0 && currentPage > 0) currentPage--;
    renderBook();
  }
  touchStartX = null;
}, { passive: true });

renderBook();
