"use strict"
;(function (document) {
  const options = {
    debug: false,
    verbose: true,
  }

  // custom logger
  const msg = (type, ...args) => {
    if (type.toLowerCase() !== "debug" && options.verbose) {
      console[type](`> ${[...args]}`)
    } else if (options.debug) {
      console.warn(`[debug]`, ...args)
    }
  }

  const themeSwitch = document.querySelector(`#theme-switch`)
  const themeSwitches = themeSwitch.querySelectorAll(`[data-theme]`)
  const themeSwitchToggles = themeSwitch.querySelectorAll(`[type="radio"]`)
  const themeRemember = themeSwitch.querySelector(`[type="checkbox"]`)
  const themes = []

  function setCurrentTheme(themeId) {
    msg("debug", `called setCurrentTheme(themeId: "${themeId}")`)

    themeSwitch.dataset.currentTheme = themeId

    if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") !== themeId
    ) {
      // save theme in local storage if not already saved
      attemptSaveTheme()
    } else if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") == themeId
    ) {
      msg("info", `loading saved theme "${themeId}" from local storage`)
    } else {
      msg("info", `loading theme "${themeId}"`)
    }

    return themeId
  }

  function attemptSaveTheme(themeId) {
    themeId = themeId || themeSwitch.dataset.currentTheme

    msg("debug", `called attemptSaveTheme(themeId: "${themeId}")`)

    if (themeRemember.checked) {
      localStorage.setItem("theme", themeId)
      msg("info", `saved theme "${themeId}" to local storage`)
    } else {
      if (localStorage.getItem("theme")) {
        localStorage.removeItem("theme")
        msg("info", `cleared local storage for "theme"`)
      } else {
        msg("debug", `didn't save theme "${themeId}" to local storage`)
      }
    }
  }

  function applyTheme(themeId) {
    msg("debug", `called applyTheme(themeId: "${themeId}")`)

    if (!themes.includes(themeId)) {
      msg("debug", `theme "${themeId}" doesn't exist`)

      // purge local storage for "theme"
      localStorage.removeItem("theme")

      applyTheme(themeSwitch.dataset.defaultTheme)

      return null
    }

    setCurrentTheme(themeId)

    // apply theme class to document
    document.firstElementChild.classList.remove(...themes)
    document.firstElementChild.classList.add(themeId)

    // set appropriate radio input
    themeSwitch.querySelector(`[data-theme="${themeId}"] input`).checked = true

    return themeId
  }

  // register themes
  for (let i = 0; i < themeSwitches.length; i++) {
    const themeSwitchToggle = themeSwitchToggles[i]
    const themeSwitchElement = themeSwitches[i]
    const themeId = themeSwitchElement.dataset.theme

    themes.push(themeId)

    themeSwitchToggle.addEventListener("change", function (e) {
      msg("debug", `theme selected: ${themeId}`)

      applyTheme(themeId)
    })
  }

  // if "themes" doesn't contain a valid default theme,
  // set default theme to first registered theme
  if (!themes.includes(themeSwitch.dataset.defaultTheme)) {
    themeSwitch.dataset.defaultTheme = themes[0]
  }

  // check if user saved theme selection and apply theme
  if (localStorage.getItem("theme") && localStorage.getItem("theme").length) {
    msg("debug", `local storage for "theme" found`)

    themeRemember.checked = true

    applyTheme(localStorage.getItem("theme"))
  } else {
    msg("debug", `local storage for "theme" disabled`)

    // otherwise, apply default theme
    applyTheme(themeSwitch.dataset.defaultTheme)
  }

  // form reset event
  themeSwitch.addEventListener("reset", function (e) {
    msg("debug", `theme switcher form reset`)

    // reset everything
    setTimeout(() => {
      themeRemember.dispatchEvent(new Event("change"))
      themeSwitches.forEach((element, i) => {
        if (element.dataset.theme == themeSwitch.dataset.defaultTheme) {
          themeSwitchToggles[i].dispatchEvent(new Event("change"))
        }
      })
    })
  })

  // "remember" checkbox change event
  themeRemember.addEventListener("change", function (e) {
    msg("debug", `checkbox "remember" changed to: ${this.checked}`)

    // attempt to save current theme to local storage
    attemptSaveTheme()
  })
})(document)
