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
            return res.redirect("/visitor/registernotok");
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

            return res.redirect("/visitor/login");

        }
    },

    registernotok: async function (req, res) {
        if (req.method == "GET") {
            return res.view('visitor/registernotok');
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

    visitorguide: async function (req, res) {
        return res.view('visitor/guide');
    },

    visitortemplate: async function (req, res) {
        return res.view('visitor/template');
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

    usermultimedia: async function (req, res) {
        if (req.method == "GET") {

            return res.view('user/multimedia');

        }

        if (req.method == "POST") {

            return res.redirect('/user/index2');

        }
    },

    usermultiupdate: async function (req, res) {
        if (req.method == "GET") {

            return res.view('user/multiupdate');

        }

        if (req.method == "POST") {

            return res.redirect('/user/index2');

        }
    },

    usermultiadd: async function (req, res) {
        if (req.method == "GET") {

            return res.view('user/multiadd');

        }

        if (req.method == "POST") {

            return res.redirect('/user/multiadd');

        }
    },



    userpapercv: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        if (!thatUser) return res.notFound();

        return res.view('user/papercv', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
        });

    },

    adminpapercv: async function (req, res) {
        var thatUser = await User.findOne(req.params.id);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        if (!thatUser) return res.notFound();

        return res.view('admin/papercv', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
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
                    salary: req.body.salary,
                    availability: req.body.availability,

                }).fetch();
            }

            return res.redirect('/user/edu');
        }
    },

    adminindex: async function (req, res) {
        var alluser = await User.find({ userrole: "user" })
        if (req.method == "GET") {
            return res.view('admin/index', { user: alluser });
        }
    },

    adminuseradd: async function (req, res) {

        if (req.method == "GET") {
            return res.view('admin/useradd');
        }

        var thatAccount = await User.findOne({ username: req.body.username });

        if (thatAccount) {
            return res.redirect("/admin/useradderror");
        }

        if (req.method == "POST") {

            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            await User.create(
                {
                    userrole: req.body.userrole,
                    username: req.body.username,
                    password: hash,
                });

            return res.redirect("/admin/index");

        }
    },
    
    adminuseradderror: async function (req, res) {
        return res.view('admin/useradderror');
    },


    // action - delete 
    adminuserdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await User.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This user is already deleted", url: '/admin/index' });
        } else {

            return res.redirect('/admin/index');
        }

    },

    userbasicupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {
            return res.view('user/basicupdate', {
                user: thatUser
            });
        }

        if (req.method == "POST") {
            await User.update(req.session.userid).set({
                name: req.body.name,
                email: req.body.email,
                phoneno: req.body.phoneno,
                summary: req.body.summary,
                salary: req.body.salary,
                availability: req.body.availability,

            }).fetch();

            return res.redirect('/user/basicupdate');
        }
    },

    userpwupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {
            return res.view('user/pwupdate', { user: thatUser })
        }

        if (req.method == "POST") {
            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            var models = await User.update(req.params.id).set({
                password: hash,

            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/user/pwupdate");
        }
    },

    adminpwupdate: async function (req, res) {
        var thatAdmin = await User.findOne(req.session.userid);
        if (req.method == "GET") {
            return res.view('admin/pwupdate', { admin: thatAdmin })
        }

        if (req.method == "POST") {
            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            var models = await User.update(req.params.id).set({
                password: hash,

            }).fetch();
            if (models.length == 0) return res.notFound();

            return res.redirect("/admin/pwupdate");
        }
    },

}
