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
        if (req.method == "GET")
            return res.view('user/login');


    }


};

