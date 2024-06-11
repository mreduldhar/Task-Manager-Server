const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const {requireSignIn} = require('../middlewares/authMiddleware')

// User Register
router.post('/register', userController.register)

// User Login
router.post('/login', userController.login)

// Profile Update
router.post('/profile-update',requireSignIn, userController.profileUpdate)



// Task CRUD
router.post('/createTask/:id', requireSignIn, taskController.createTask)
router.delete('/deleteTask/:id', requireSignIn, taskController.deleteTask)
router.put('/updateTaskStatus/:id/:status', requireSignIn, taskController.updateTaskStatus)
router.get('/listTaskByStatus/:status', requireSignIn, taskController.listTaskByStatus)
router.get('/taskStatusCount', requireSignIn, taskController.taskStatusCount)

module.exports = router;