// <button class="turn-on-lights"><span aria-hidden="true">☀</span> Encender las luces</button>

// The toggle mode button should only makes sense
// if JS is enabled. We can append it to the DOM
// with JS since it shouldn't be visible otherwise.
function renderColorSchemeBtn() {
  const button = document.createElement("button")
  button.classList.add("lights")
  const iconSpan = document.createElement("span")
  iconSpan.setAttribute("aria-hidden", "true")
  iconSpan.textContent = "☀"
  button.appendChild(iconSpan)
  const text = document.createTextNode(" Encender las luces")
  button.appendChild(text)
  const isDesktop = window.matchMedia("(min-width: 768px)")
  isDesktop.addEventListener("change", e => {
    placeButton(button, e.matches)
  })
  placeButton(button, isDesktop.matches)
}

function placeButton(button, isDesktop) {
  if(isDesktop) {
    const sidebar = document.querySelector(".sidebar")
    sidebar.prepend(button)
    console.log("Button should be added to sidebar")
  } else {
    const hero = document.querySelector(".hero")
    hero.appendChild(button)
    console.log("Button should be added to hero")
  }
}

renderColorSchemeBtn()
