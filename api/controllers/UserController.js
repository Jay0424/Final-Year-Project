/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    register: async function (req, res) {

        if (req.method == "GET") {
            return res.view('visitor/register');
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
            return res.view('visitor/login');
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
                    return res.redirect("/admin/index");
                }
                else if (req.session.userrole == "user") {
                    return res.redirect("/user/index");
                }

            });
        }

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");

        });
    },

    userindex: async function (req, res) {

        var thatUser = await User.findOne(req.session.userid);

        if (thatUser.paperstatus == "submit") {
            return res.view('user/index2');
        }
        else {
            return res.view('user/index')
        }
    },

    userindex2: async function (req, res) {


        return res.view('user/index2');
    
    },



    userpapercv: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        if (!thatUser) return res.notFound();

        return res.view('user/papercv', {
            user: thatUser,
            education: educations.ownEdu
        });

    },



    userbasic: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/basic')
        }

        if (req.method == "POST") {
            {
                await User.update(req.session.userid).set({
                    name: req.body.name,
                    email: req.body.email,
                    phoneno: req.body.phoneno,
                    summary: req.body.summary,

                }).fetch();
            }

            return res.redirect('/user/edu');
        }
    },

    adminindex: async function (req, res) {
        return res.view('admin/index');
    },

    useredu: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/edu');
        }

        if (req.method == "POST") {
            {
                var thatUser = await User.findOne(req.session.userid);

                var edu1 = await Education.create(
                    {
                        school: req.body.school1,
                        certification: req.body.certification1,
                        syear: req.body.syear1,
                        eyear: req.body.eyear1,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownEdu").members(edu1.id);



                if (req.body.schoo2 != "" && req.body.certification2 != "" && req.body.syear2 != 0 && req.body.eyear2 != 0) {
                    var edu2 = await Education.create(
                        {
                            school: req.body.school2,
                            certification: req.body.certification2,
                            syear: req.body.syear2,
                            eyear: req.body.eyear2,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownEdu").members(edu2.id);
                }

                if (req.body.schoo3 != "" && req.body.certification3 != "" && req.body.syear3 != 0 && req.body.eyear3 != 0) {
                    var edu3 = await Education.create(
                        {
                            school: req.body.school3,
                            certification: req.body.certification3,
                            syear: req.body.syear3,
                            eyear: req.body.eyear3,
                        }).fetch();
                    await User.addToCollection(thatUser.id, "ownEdu").members(edu3.id);
                }

                await User.update(thatUser.id).set({
                    paperstatus: "submit"

                }).fetch();


            }

            return res.redirect('/user/index');
        }

    },


};

