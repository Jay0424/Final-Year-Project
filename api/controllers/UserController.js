/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    register: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/register');
        }

        var thatAccount = await User.findOne({ username: req.body.username });

        if (thatAccount) {
            return res.status(409).send("The username has been used. Please use other username.");
        }

        if (req.method == "POST") {

            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            await User.create(
                {
                    username: req.body.username,
                    password: hash,

                });

            return res.redirect("/");

        }



    },

    login: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/login');
        }

        if (req.method == "POST") {
            if (!req.body.username || !req.body.password) return res.badRequest();

            var user = await User.findOne({ username: req.body.username });

            if (!user) return res.status(401).send("User not found");

            const match = await sails.bcrypt.compare(req.body.password, user.password);

            if (!match) return res.status(401).send("Wrong Password");

            req.session.regenerate(function (err) {

                if (err) return res.serverError(err);

                req.session.username = req.body.username;

                req.session.userid = user.id;

                req.session.userrole = user.userrole;

                sails.log("[Session] ", req.session);

                // return res.ok("Login successfully.");
                if (req.session.userrole == "admin") {
                    return res.redirect("/user/adminindex");
                }
                else if (req.session.userrole == "user") {
                    return res.redirect("/user/userindex");
                }

            });
        }

    },

    userindex: async function (req, res) {
        return res.view('user/userindex');
    },

    adminindex: async function (req, res) {
        return res.view('user/adminindex');
    },


};

