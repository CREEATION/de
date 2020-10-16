function t(search = "") {
  let task_function

  try {
    task_function = gulp.find(
      (task) => search == (task.displayName || task.function.name)
    ).function
  } catch (err) {
    throw log.error(gulp, `task "${search}" not found`)
  } finally {
    return task_function || series(search)
  }
}
