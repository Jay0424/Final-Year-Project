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
            req.addFlash('error1', 'Username is already used');
            return res.redirect('/visitor/register');
        }

        if (req.method == "POST") {

            const salt = await sails.bcrypt.genSalt(10);

            const password = await req.body.password;

            const hash = await sails.bcrypt.hash(password, salt);

            await User.create(
                {
                    username: req.body.username,
                    password: hash,
                    photo: "https://upload.cc/i1/2021/01/28/SyUtXK.png"
                });

            return res.redirect("/visitor/login");

        }
    },

    login: async function (req, res) {
        if (req.method == "GET") {
            return res.view('visitor/login');
        }

        if (req.method == "POST") {
            if (!req.body.username || !req.body.password) return res.badRequest();

            var user = await User.findOne({ username: req.body.username });

            if (!user) {
                req.addFlash('error1', 'User not found');
                return res.redirect('/visitor/login');
            }

            const match = await sails.bcrypt.compare(req.body.password, user.password);

            if (!match) {
                req.addFlash('error2', 'Wrong password');
                return res.redirect('/visitor/login');
            }

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

        if (thatUser.submitform==true) {
            return res.view('user/index2', {
                user: thatUser,
            });
        }
        else {
            return res.view('user/index')
        }
    },

    userindex2: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        return res.view('user/index2', {
            user: thatUser,
        });

    },

    userguide: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        return res.view('user/guide', {
            user: thatUser,
        });

    },

    usermultimedia: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        var name = thatUser.name;
        if (req.method == "GET") {

            return res.view('user/multimedia');

        }

        if (req.method == "POST") {

            return res.redirect('/user/index2');

        }
    },

    usermultiupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {

            return res.view('user/multiupdate', { user: thatUser });

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
        var thatUser = await User.findOne(req.params.id);

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
            req.addFlash('error1', 'Username is already used');
            return res.redirect('/admin/useradd');
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
                    photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"
                });

            return res.redirect("/admin/index");

        }
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

    userphoto: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        req.file('avatarfile').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            const datauri = require('datauri');
            await User.update(thatUser.id).set({
                photoPath: uploadedFiles[0].fd,
                photo: await datauri(uploadedFiles[0].fd)
            });

            return res.redirect('/user/multimedia');
        });
    },

    userphotoupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        req.file('avatarfile').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            const datauri = require('datauri');
            await User.update(thatUser.id).set({
                photoPath: uploadedFiles[0].fd,
                photo: await datauri(uploadedFiles[0].fd)
            });

            return res.redirect('/user/multiupdate');
        });
    },

    userphotoremove: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        await User.update(thatUser.id).set({
            photoPath: "",
            photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"

        });

        return res.redirect('/user/multiupdate');

    },

    digitalcvindex: async function (req, res) {
        var thatUser = await User.findOne(req.params.id);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        var images = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "image"
            },
            sort: 'id DESC'
        });

        var videos = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "video"
            },
            sort: 'id DESC'
        });
        
        var pdfs = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "pdf"
            },
            sort: 'id DESC'
        });

        return res.view('user/digitalcv/index', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
            image: images.ownMultimedia,
            video: videos.ownMultimedia,
            pdf: pdfs.ownMultimedia,
        });
    },

    digitalcvskill: async function (req, res) {
        var thatUser = await User.findOne(req.params.id);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        var images = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "image"
            },
            sort: 'id DESC'
        });

        var videos = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "video"
            },
            sort: 'id DESC'
        });
        
        var pdfs = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "pdf"
            },
            sort: 'id DESC'
        });

        return res.view('user/digitalcv/skill', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
            image: images.ownMultimedia,
            video: videos.ownMultimedia,
            pdf: pdfs.ownMultimedia,
        });
    },

    digitalcvmulti: async function (req, res) {
        var thatUser = await User.findOne(req.params.id);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        var images = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "image"
            },
            sort: 'id DESC'
        });

        var videos = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "video"
            },
            sort: 'id DESC'
        });
        
        var pdfs = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "pdf"
            },
            sort: 'id DESC'
        });


        return res.view('user/digitalcv/multi', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
            image: images.ownMultimedia,
            video: videos.ownMultimedia,
            pdf: pdfs.ownMultimedia,
        });
    },

    digitalcvcert: async function (req, res) {
        var thatUser = await User.findOne(req.params.id);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        var images = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "image"
            },
            sort: 'id DESC'
        });

        var videos = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "video"
            },
            sort: 'id DESC'
        });
        
        var pdfs = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "pdf"
            },
            sort: 'id DESC'
        });


        return res.view('user/digitalcv/cert', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
            image: images.ownMultimedia,
            video: videos.ownMultimedia,
            pdf: pdfs.ownMultimedia,
        });
    },

    digitalcvcontact: async function (req, res) {
        var thatUser = await User.findOne(req.params.id);

        var userid = thatUser.id;

        var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

        var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

        var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

        var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

        var images = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "image"
            },
            sort: 'id DESC'
        });

        var videos = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "video"
            },
            sort: 'id DESC'
        });
        
        var pdfs = await User.findOne(userid).populate("ownMultimedia", {
            where: {
                type: "pdf"
            },
            sort: 'id DESC'
        });


        return res.view('user/digitalcv/contact', {
            user: thatUser,
            education: educations.ownEdu,
            work: works.ownWork,
            skill: skills.ownSkill,
            language: languages.ownLanguage,
            image: images.ownMultimedia,
            video: videos.ownMultimedia,
            pdf: pdfs.ownMultimedia,
        });
    },

    digitalcvpdf: async function (req, res) {

        var thisPDF = await Multimedia.findOne(req.params.pid)

        return res.view('user/digitalcv/pdf', {
            pdf: thisPDF,
        });

    },


}
