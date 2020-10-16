module.exports = function sort_tasks(tasks = []) {
  const default_task = tasks.find((task) => task.displayName === "default")

  tasks = tasks.filter((task) => task.displayName !== "default")
  tasks.sort((a, b) => {
    let taskname1 = a.displayName || a.function.name
    let taskname2 = b.displayName || b.function.name

    return taskname1 < taskname2 ? -1 : taskname1 > taskname2 ? 1 : 0
  })

  tasks.unshift(default_task)

  return tasks
}
