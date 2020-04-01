const THEME_KEY = "theme"
const THEME_CUSTOM_PROP = "--colorMode"

const button = renderColorSchemeBtn()

button.addEventListener("click", e => {
  const currentSetting = document.body.dataset.colorScheme
  const theme = toggleTheme(currentSetting)
  localStorage.setItem(THEME_KEY, theme)
  const span = button.querySelector("span")
  span.removeChild(span.lastChild) // text node
  const icon = button.querySelector("img")
  icon.src = theme === "dark" ? "./img/turn-on.svg" : "./img/turn-off.svg"
  const text = document.createTextNode(buttonTextForTheme(theme))
  span.appendChild(text)
})

// The toggle mode button should only makes sense
// if JS is enabled. We can append it to the DOM
// with JS since it shouldn't be visible otherwise.
function renderColorSchemeBtn() {
  const button = document.createElement("button")
  button.classList.add("lights")
  const span = document.createElement("span")
  span.style.display = "flex"
  span.style.alignItems = "center"
  const icon = document.createElement("img")
  icon.style.width = "1rem";
  icon.style.height = "1rem";
  icon.style.paddingRight = "0.5ch";
  icon.setAttribute("aria-hidden", "true")
  icon.setAttribute("alt", "")

  // set colorScheme data attribute based on localStorage or
  // prefers-color-scheme
  const theme = localStorage.getItem(THEME_KEY) || getOSTheme()
  document.body.dataset.colorScheme = theme
  const text = document.createTextNode(buttonTextForTheme(theme))
  icon.src = theme === "dark" ? "./img/turn-on.svg" : "./img/turn-off.svg"
  span.appendChild(icon)
  span.appendChild(text)
  button.appendChild(span)
  
  const isDesktop = window.matchMedia("(min-width: 768px)")
  isDesktop.addListener(e => {
    placeButton(button, e.matches)
  })
  placeButton(button, isDesktop.matches)
  return button
}

function placeButton(button, isDesktop) {
  if(isDesktop) {
    const sidebarTitle = document.getElementById("sidebar-title-link")
    console.log(sidebarTitle.nextSibling)
    const sidebar = document.querySelector(".sidebar")
    sidebar.insertBefore(button, sidebarTitle.nextSibling)
  } else {
    const hero = document.querySelector(".hero")
    hero.appendChild(button)
  }
}

function buttonTextForTheme(theme) {
  return theme === "dark" ? " Encender las luces" : " Apagar las luces"
}


function toggleTheme(toggleFromTheme) {
  const osScheme = getOSTheme()
  const oldTheme = toggleFromTheme || osScheme

  const newTheme = oldTheme === "dark" ? "light" : "dark"

  document.body.dataset.colorScheme = newTheme
  return newTheme
}

function getOSTheme() {
  return getComputedStyle(document.body).getPropertyValue(THEME_CUSTOM_PROP).replace(/\"/g, '').trim()
}
