//checks name, email, and password to give message and indicate the field should not be left empty
//keep gettting errors here saying that checkbody is not a functiom

function userValidation(req, res) {
    req.checkBody('name',     'name is required').notEmpty()
    req.checkBody('email',    'email is required').notEmpty()
    req.checkBody('password', 'password is required').notEmpty()

    next()
}


module.exports = userValidation