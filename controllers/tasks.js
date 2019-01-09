const Task = require('../models/task');

exports.getAddTask = (req, res, next) => {
  res.render('add-task', {
    pageTitle: 'Add Task',
    path: '/add-task',
    editing: false
  });
};
exports.postAddTask = (req, res, next) => {
  const { title } = req.body;
  const { description } = req.body;
  const task = new Task(title, description, null);
  task.save();
  res.redirect('/');
};

exports.getTasks = (req, res, next) => {
  Task.fetchAll(tasks => {
    res.render('tasks', {
      tasks,
      pageTitle: 'Tasks',
      path: '/'
    });
  });
};
exports.getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId, task => {
    res.render('task-details', {
      task,
      pageTitle: task.title,
      path: '/tasks'
    });
  });
};

exports.postDeleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  Task.fetchAll(tasks => {
    Task.deleteTask(taskId, tasks);
    res.redirect('/');
  });
};

exports.getEditTask = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const taskId = req.params.taskId;
  Task.findById(taskId, task => {
    if (!task) {
      return res.redirect('/');
    }
    res.render('add-task', {
      pageTitle: 'Edit Task',
      path: '/edit-task',
      editing: editMode,
      task: task
    });
  });
};
exports.postEditTask = (req, res, next) => {
  const { taskId } = req.body;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;
  const { dateMachineReadable } = req.body;
  const { dateHumanReadable } = req.body;
  const date = {
    dateMachineReadable,
    dateHumanReadable
  };
  const updatedTask = new Task(updatedTitle, updatedDesc, taskId, date);
  updatedTask.save();
  res.redirect('/');
};
