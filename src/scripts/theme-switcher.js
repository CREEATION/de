"use strict"
;(function (document) {
  const debugMode = false
  const themeSwitch = document.querySelector(`#theme-switch`)
  const themeSwitches = themeSwitch.querySelectorAll(`input[type="radio"]`)
  const themeRemember = themeSwitch.querySelector(`input[type="checkbox"]`)
  const themes = []

  function setCurrentTheme(themeId) {
    themeSwitch.dataset.currentTheme = themeId

    //- save theme in local storage if user wants to
    attemptSaveTheme()

    return themeId
  }

  function attemptSaveTheme(themeId) {
    const currentTheme = themeSwitch.dataset.currentTheme || themeId

    if (themeRemember.checked) {
      localStorage.setItem("theme", currentTheme)
    } else {
      if (debugMode)
        console.log(
          `local storage for "theme" disabled.`,
          `\n> didn't save theme "${currentTheme}" to local storage`
        )

      localStorage.removeItem("theme")
      if (debugMode) console.log(`cleared local storage`)
    }
  }

  function applyTheme(themeId) {
    if (debugMode) console.log(`called applyTheme(themeId: "${themeId}")`)

    setCurrentTheme(themeId)

    //- apply theme class to document body
    document.body.classList.remove(...themes)
    document.body.classList.add(themeId)

    //- set appropriate radio input
    themeSwitch.querySelector(`input[data-theme="${themeId}"]`).checked = true

    return themeId
  }

  //- check if user saved theme selection and apply theme
  if (localStorage.getItem("theme") && localStorage.getItem("theme").length) {
    console.log(
      `local storage for "theme" found.`,
      `\n> applying theme: "${localStorage.getItem("theme")}"`
    )

    themeRemember.checked = true
    applyTheme(localStorage.getItem("theme"))
  } else {
    console.warn(
      `local storage for "theme" disabled.`,
      `\n> applying default theme: "${themeSwitch.dataset.defaultTheme}"`
    )

    //- otherwise, apply default theme
    applyTheme(themeSwitch.dataset.defaultTheme)
  }

  //- form reset event
  themeSwitch.addEventListener("reset", function (e) {
    console.warn(
      `theme switcher form reset.`,
      `\n> applying default theme: "${themeSwitch.dataset.defaultTheme}"`,
      `\n> cleared local storage for "theme"`
    )

    //- reset everything
    setTimeout(() => {
      themeRemember.dispatchEvent(new Event("change"))
      themeSwitches.forEach((element) => {
        if (element.checked) {
          element.dispatchEvent(new Event("change"))
        }
      })
    })
  })

  //- "remember" checkbox change event
  themeRemember.addEventListener("change", function (e) {
    if (debugMode)
      console.log(`checkbox "remember" changed to: ${this.checked}`)

    //- attempt to save current theme to local storage
    attemptSaveTheme()
  })

  //- register themes
  for (let i = 0; i < themeSwitches.length; i++) {
    const themeSwitchElement = themeSwitches[i]
    const themeId = themeSwitchElement.dataset.theme

    themes.push(themeId)

    themeSwitchElement.addEventListener("change", function (e) {
      if (debugMode) console.log(`theme selected: ${themeId}`)

      applyTheme(themeId)
    })
  }
})(document)
