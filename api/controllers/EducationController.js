/**
 * EducationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

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



                if (req.body.school2 != "" && req.body.certification2 != "" && req.body.syear2 != 0 && req.body.eyear2 != 0) {
                    var edu2 = await Education.create(
                        {
                            school: req.body.school2,
                            certification: req.body.certification2,
                            syear: req.body.syear2,
                            eyear: req.body.eyear2,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownEdu").members(edu2.id);
                }

                if (req.body.school3 != "" && req.body.certification3 != "" && req.body.syear3 != 0 && req.body.eyear3 != 0) {
                    var edu3 = await Education.create(
                        {
                            school: req.body.school3,
                            certification: req.body.certification3,
                            syear: req.body.syear3,
                            eyear: req.body.eyear3,
                        }).fetch();
                    await User.addToCollection(thatUser.id, "ownEdu").members(edu3.id);
                }

                // await User.update(thatUser.id).set({
                //     paperstatus: "submit"

                // }).fetch();


            }

            return res.redirect('/user/work');
        }

    },

    usereduupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var educations = await User.findOne(userid).populate("ownEdu", { sort: "syear DESC" });

            return res.view('user/eduupdate', {
                education: educations.ownEdu,
            });
        }

        if (req.method == "POST") {
            await Education.update(req.params.id).set({
                school: req.body.school,
                certification: req.body.certification,
                syear: req.body.syear,
                eyear: req.body.eyear,

            }).fetch();

            return res.redirect('/user/eduupdate');
        }
    },

    // action - delete 
    useredudelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Education.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This education record is already deleted", url: '/user/eduupdate' });
        } else {

            return res.redirect("/user/eduupdate");
        }

    },

    usereduadd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/eduadd')
        }

        if (req.method == "POST") {
            var thatUser = await User.findOne(req.session.userid);

            var edu1 = await Education.create(
                {
                    school: req.body.school1,
                    certification: req.body.certification1,
                    syear: req.body.syear1,
                    eyear: req.body.eyear1,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownEdu").members(edu1.id);



            if (req.body.school2 != "" && req.body.certification2 != "" && req.body.syear2 != 0 && req.body.eyear2 != 0) {
                var edu2 = await Education.create(
                    {
                        school: req.body.school2,
                        certification: req.body.certification2,
                        syear: req.body.syear2,
                        eyear: req.body.eyear2,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownEdu").members(edu2.id);
            }

            if (req.body.school3 != "" && req.body.certification3 != "" && req.body.syear3 != 0 && req.body.eyear3 != 0) {
                var edu3 = await Education.create(
                    {
                        school: req.body.school3,
                        certification: req.body.certification3,
                        syear: req.body.syear3,
                        eyear: req.body.eyear3,
                    }).fetch();
                await User.addToCollection(thatUser.id, "ownEdu").members(edu3.id);
            }
            return res.redirect("/user/eduupdate");
        }
    },




  

};

