const path = require('path');

const express = require('express');

const tasks = require('../controllers/tasks');

const router = express.Router();


router.get('/tasks/:taskId', tasks.getTask);

router.get('/add-task', tasks.getAddTask);

router.post('/add-task',tasks.postAddTask
)
router.post('/delete-task', tasks.postDeleteTask);

router.get('/edit-task/:taskId', tasks.getEditTask);

router.post('/edit-task', tasks.postEditTask);
router.get('/', tasks.getTasks);





 module.exports = router;
