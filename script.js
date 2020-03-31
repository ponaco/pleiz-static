const THEME_KEY = "theme"
const THEME_CUSTOM_PROP = "--colorMode"

const button = renderColorSchemeBtn()

button.addEventListener("click", e => {
  const currentSetting = document.body.dataset.colorScheme
  const theme = toggleTheme(currentSetting)
  localStorage.setItem(THEME_KEY, theme)
  button.removeChild(button.lastChild) // text node
  const text = document.createTextNode(buttonTextForTheme(theme))
  button.appendChild(text)
})

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

  // set colorScheme data attribute based on localStorage or
  // prefers-color-scheme
  const theme = localStorage.getItem(THEME_KEY) || getOSTheme()
  document.body.dataset.colorScheme = theme
  const text = document.createTextNode(buttonTextForTheme(theme))
  button.appendChild(text)
  
  const isDesktop = window.matchMedia("(min-width: 768px)")
  isDesktop.addEventListener("change", e => {
    placeButton(button, e.matches)
  })
  placeButton(button, isDesktop.matches)
  return button
}

function placeButton(button, isDesktop) {
  if(isDesktop) {
    const sidebar = document.querySelector(".sidebar")
    sidebar.prepend(button)
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
