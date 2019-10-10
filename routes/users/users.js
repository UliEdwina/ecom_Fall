const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController')
let signupValidation = require('./utils/signupValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('/');
});

router.get('/signup', (req, res) => {

    if (req.isAuthenticated) {
        return res.redirect('/')
    }

    res.render('auth/signup', { errors: [] })
})

router.post('/signup', signupValidation, userController.signup)

router.get('/signin', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }

    res.render('auth/signin', { errors: req.flash('loginMessage') })
})

module.exports = router;