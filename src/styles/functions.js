// helpers
const getUnit = (a) => [...a].filter((num) => !isFinite(num)).join("")

exports.mod = function mod(x, y, preserveUnits = false) {
  const result = parseInt(x, 10) % parseInt(y, 10)
  const unit = getUnit(x) == getUnit(y) ? getUnit(x) : result

  return !preserveUnits ? result : `${result}${unit}`
}

exports.q = function q(x, preserveUnits = false) {
  const result = parseInt(
    [...(x) => [...x].filter((num) => isFinite(num)).join("")].reduce(
      (a, b) => a + b
    ),
    10
  )

  return !preserveUnits ? result : `${result}${getUnit(x)}`
}

exports.steps = function steps(min, max, step, preserveUnits = false) {
  let result = []
  let result_units = []

  for (let i = q(max); i >= q(min); i -= q(step)) {
    result.push(i)
    result_units.push(getUnit(min) || getUnit(max) || getUnit(step))
  }

  return !preserveUnits
    ? result.join()
    : result.map((x, i) => `${x}${result_units[i]}`).join()
}
