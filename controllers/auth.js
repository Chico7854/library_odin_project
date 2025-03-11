const User = require("../models/user");

exports.getSignup = (req, res, next) => {
    res.render("auth/signup");
}

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.save()
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        })
}