const express = require('express');
const passport = require('passport')
const router  = express.Router();

const userController   = require('./controllers/userController')
const signupValidation = require('./utils/signupValidation')
const User = require("./models/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/')

    res.render('auth/signup', { error_msg: null })
})

router.post('/signup', signupValidation, userController.signup)

router.get('/signin', (req, res) => {
    if (req.isAuthenticated()) res.redirect('/')

    res.render('auth/signin')
})

router.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/users/signin',
    failureFlash:    true
}))

router.post('/edit-profile', (req, res) => {
    //body deals with forms
   req.user.profile.name = req.body.name

   req.user.save((err, user) => {
       if(user){
           console.log('user ', user)

           res.redirect('/api/users/edit-profile')
       }
   })
})
router.get('/edit-profile', function (req, res) {
    if (!req.isAuthenticated()) res.redirect('/api/users/signin')

    res.render('account/profile', { errors:  req.flash('errors'),
                                    success: req.flash('success')})
})

router.put('/edit-profile', function (req, res) {
    userController.updateProfile(req.body, req.user._id)
                    .then(user => {
                        req.flash('success', 'Successfully updated profile!')

                        res.redirect('/api/users/edit-profile')
                    })
                    .catch(error => {
                        req.flash('errors', error)

                        res.redirect('/api/users/edit-profile')
                    })
})

router.get('/logout', (req, res) => {
    req.logOut()

    res.redirect('/')
})

module.exports = router;