/**
 * SkillController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    userskill: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/skill');
        }

        if (req.method == "POST") {
            {
                var thatUser = await User.findOne(req.session.userid);

                var skill1 = await Skill.create(
                    {
                        type: req.body.type1,
                        content: req.body.content1,

                    }).fetch();

                await User.addToCollection(thatUser.id, "ownSkill").members(skill1.id);

                if (req.body.type2 != "" && req.body.content2 != "") {
                    var skill2 = await Skill.create(
                        {
                            type: req.body.type2,
                            content: req.body.content2,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownSkill").members(skill2.id);
                }

                if (req.body.type3 != "" && req.body.content3 != "") {
                    var skill3 = await Skill.create(
                        {
                            type: req.body.type3,
                            content: req.body.content3,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownSkill").members(skill3.id);
                }


            }
        }

        return res.redirect('/user/language');

    },

    userskillupdate: async function (req, res) {
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var skills = await User.findOne(userid).populate("ownSkill", { sort: "id ASC" });

            return res.view('user/skillupdate', {
                skill: skills.ownSkill,
            });
        }

        if (req.method == "POST") {

            await Skill.update(req.params.id).set({
                type: req.body.type,
                content: req.body.content,

            }).fetch();

            return res.redirect('/user/skillupdate');

        }
    },

    // action - delete 
    userskilldelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Skill.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This skill record is already deleted", url: '/user/skillupdate' });
        } else {

            return res.redirect("/user/skillupdate");
        }

    },

    userskilladd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/skilladd')
        }

        if (req.method == "POST") {
            {
                var thatUser = await User.findOne(req.session.userid);

                var skill1 = await Skill.create(
                    {
                        type: req.body.type1,
                        content: req.body.content1,

                    }).fetch();

                await User.addToCollection(thatUser.id, "ownSkill").members(skill1.id);

                if (req.body.type2 != "" && req.body.content2 != "") {
                    var skill2 = await Skill.create(
                        {
                            type: req.body.type2,
                            content: req.body.content2,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownSkill").members(skill2.id);
                }

                if (req.body.type3 != "" && req.body.content3 != "") {
                    var skill3 = await Skill.create(
                        {
                            type: req.body.type3,
                            content: req.body.content3,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownSkill").members(skill3.id);
                }

                return res.redirect('/user/skillupdate');
            }
        }

    },


  

};

