const path = require('path');

const express = require('express');

const tasks = require('../controllers/tasks');

const router = express.Router();

// /admin/add-product => GET
router.get('/tasks/:taskId', tasks.getTask);

router.get('/add-task', tasks.getAddTask);

router.post('/add-task',tasks.postAddTask
)
router.post('/delete-task', tasks.postDeleteTask);

router.get('/edit-task/:taskId', tasks.getEditTask);

router.post('/edit-task', tasks.postEditTask);
router.get('/', tasks.getTasks);



// /admin/products => GET
// router.get('/products', tasks.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

 module.exports = router;
