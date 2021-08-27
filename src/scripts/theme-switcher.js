"use strict"
;(function (document) {
  //- theme switcher
  const themeSelector = "input[name=color_scheme]"
  const colorSchemes = document
    .querySelector('meta[name="color-scheme"]')
    .content.split(" ")
  const defaultTheme = colorSchemes[0]
  const currentTheme = () => localStorage.getItem("theme") || defaultTheme
  const otherTheme = () =>
    colorSchemes.find((theme) => theme !== currentTheme())

  let root = document.querySelector(":root")

  function updateTheme(theme, initial = false, cb) {
    let oldTheme = currentTheme()

    localStorage.setItem("theme", theme)

    if (initial) {
      document.querySelector(`${themeSelector}[value=${theme}]`).checked = true
    }

    root.classList.replace(
      `theme\:${!initial ? oldTheme : defaultTheme}`,
      `theme\:${theme}`,
    )

    document
      .querySelector(`#toggle-color_scheme-${oldTheme}`)
      .removeAttribute("hidden")
    document
      .querySelector(`#toggle-color_scheme-${theme}`)
      .setAttribute("hidden", true)

    if (cb) cb(theme, oldTheme, initial)
  }

  document
    .querySelector(`#toggle-color_scheme-${otherTheme()}`)
    .removeAttribute("hidden")

  if (currentTheme() !== defaultTheme) {
    updateTheme(currentTheme(), true, (theme, oldTheme, initial) => {
      console.info(
        `Color Scheme set to previously saved "${theme}"`,
        `default: "${defaultTheme}"`,
        `initial: "${initial}"`,
      )
    })
  } else {
    updateTheme(currentTheme(), true, (theme, oldTheme, initial) => {
      console.info(
        `Color Scheme set to default "${defaultTheme}"`,
        `initial: "${initial}"`,
      )
    })
  }

  document.querySelectorAll(themeSelector).forEach((input) => {
    input.addEventListener("change", (event) => {
      updateTheme(event.target.value, false, (theme, oldTheme, initial) => {
        console.info(
          `Changed Color Scheme from "${oldTheme}" to "${theme}"`,
          `default: "${defaultTheme}"`,
          `initial: "${initial}"`,
        )
      })
    })
  })
})(document)
