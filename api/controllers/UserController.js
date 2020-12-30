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

    userwork: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/work');
        }

        if (req.method == "POST") {
            {
                var thatUser = await User.findOne(req.session.userid);

                var work1 = await Work.create(
                    {
                        company: req.body.company1,
                        job: req.body.job1,
                        start: req.body.start1,
                        end: req.body.end1,
                        description: req.body.description1,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownWork").members(work1.id);

                if (req.body.company2 != "" && req.body.job2 != "" && req.body.start2 != 0 && req.body.end2 != 0 && req.body.description2 != 0) {
                    var work2 = await Work.create(
                        {
                            company: req.body.company2,
                            job: req.body.job2,
                            start: req.body.start2,
                            end: req.body.end2,
                            description: req.body.description2,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownWork").members(work2.id);
                }

                // if (req.body.company3 != "" && req.body.job3 != "" && req.body.start3 != 0 && req.body.end3 != 0 && req.body.description3 != 0) {
                //     var work3 = await Work.create(
                //         {
                //             company: req.body.company3,
                //             job: req.body.job2,
                //             start: req.body.start3,
                //             end: req.body.end3,
                //             description: req.body.description3,
                //         }).fetch();

                //     await User.addToCollection(thatUser.id, "ownWork").members(work3.id);
                // }


            }
        }

        return res.redirect('/user/skill');
    },

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

    userlanguage: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/language');
        }

        if (req.method == "POST") {
            {
                var thatUser = await User.findOne(req.session.userid);

                let degree1 = 0;
                if (req.body.level1 == "Native") {
                    degree1 = 5;
                } else if (req.body.level1 == "Fluent") {
                    degree1 = 4;
                } else if (req.body.level1 == "Proficient") {
                    degree1 = 3;
                } else if (req.body.level1 == "Intermediate") {
                    degree1 = 2;
                } else if (req.body.level1 == "Basic") {
                    degree1 = 1;
                }

                var language1 = await Language.create(
                    {
                        type: req.body.type1,
                        level: req.body.level1,
                        degree: degree1,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownLanguage").members(language1.id);

                if (req.body.type2 != "" && req.body.level2 != "") {
                    let degree2;
                    if (req.body.level2 == "Native") {
                        degree2 = 5;
                    } else if (req.body.level2 == "Fluent") {
                        degree2 = 4;
                    } else if (req.body.level2 == "Proficient") {
                        degree2 = 3;
                    } else if (req.body.level2 == "Intermediate") {
                        degree2 = 2;
                    } else if (req.body.level2 == "Basic") {
                        degree2 = 1;
                    }
                    var language2 = await Language.create(
                        {
                            type: req.body.type2,
                            level: req.body.level2,
                            degree: degree2,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownLanguage").members(language2.id);
                }

                if (req.body.type3 != "" && req.body.level3 != "") {
                    let degree3;
                    if (req.body.level3 == "Native") {
                        degree3 = 5;
                    } else if (req.body.level3 == "Fluent") {
                        degree3 = 4;
                    } else if (req.body.level3 == "Proficient") {
                        degree3 = 3;
                    } else if (req.body.level3 == "Intermediate") {
                        degree3 = 2;
                    } else if (req.body.level3 == "Basic") {
                        degree3 = 1;
                    }
                    var language3 = await Language.create(
                        {
                            type: req.body.type3,
                            level: req.body.level3,
                            degree: degree3,
                        }).fetch();

                    await User.addToCollection(thatUser.id, "ownLanguage").members(language3.id);
                }

                await User.update(thatUser.id).set({
                    paperstatus: "submit"
                }).fetch();
            }
        }
        return res.redirect('/user/index2');
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

    // action - delete 
    userworkdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Work.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This work experience record is already deleted", url: '/user/workupdate' });
        } else {

            return res.redirect("/user/workupdate");
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

    // action - delete 
    userlanguagedelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Language.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This language record is already deleted", url: '/user/languageupdate' });
        } else {

            return res.redirect("/user/languageupdate");
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

    userworkadd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/workadd')
        }

        if (req.method == "POST") {

            var thatUser = await User.findOne(req.session.userid);

            var work1 = await Work.create(
                {
                    company: req.body.company1,
                    job: req.body.job1,
                    start: req.body.start1,
                    end: req.body.end1,
                    description: req.body.description1,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownWork").members(work1.id);

            if (req.body.company2 != "" && req.body.job2 != "" && req.body.start2 != 0 && req.body.end2 != 0 && req.body.description2 != 0) {
                var work2 = await Work.create(
                    {
                        company: req.body.company2,
                        job: req.body.job2,
                        start: req.body.start2,
                        end: req.body.end2,
                        description: req.body.description2,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownWork").members(work2.id);
            }

            // if (req.body.company3 != "" && req.body.job3 != "" && req.body.start3 != 0 && req.body.end3 != 0 && req.body.description3 != 0) {
            //     var work3 = await Work.create(
            //         {
            //             company: req.body.company3,
            //             job: req.body.job2,
            //             start: req.body.start3,
            //             end: req.body.end3,
            //             description: req.body.description3,
            //         }).fetch();

            //     await User.addToCollection(thatUser.id, "ownWork").members(work3.id);
            // }

            return res.redirect('/user/workupdate');
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

    userlanguageadd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/languageadd')
        }

        if (req.method == "POST") {
            var thatUser = await User.findOne(req.session.userid);

            let degree1 = 0;
            if (req.body.level1 == "Native") {
                degree1 = 5;
            } else if (req.body.level1 == "Fluent") {
                degree1 = 4;
            } else if (req.body.level1 == "Proficient") {
                degree1 = 3;
            } else if (req.body.level1 == "Intermediate") {
                degree1 = 2;
            } else if (req.body.level1 == "Basic") {
                degree1 = 1;
            }

            var language1 = await Language.create(
                {
                    type: req.body.type1,
                    level: req.body.level1,
                    degree: degree1,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownLanguage").members(language1.id);

            if (req.body.type2 != "" && req.body.level2 != "") {
                let degree2;
                if (req.body.level2 == "Native") {
                    degree2 = 5;
                } else if (req.body.level2 == "Fluent") {
                    degree2 = 4;
                } else if (req.body.level2 == "Proficient") {
                    degree2 = 3;
                } else if (req.body.level2 == "Intermediate") {
                    degree2 = 2;
                } else if (req.body.level2 == "Basic") {
                    degree2 = 1;
                }
                var language2 = await Language.create(
                    {
                        type: req.body.type2,
                        level: req.body.level2,
                        degree: degree2,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownLanguage").members(language2.id);
            }

            if (req.body.type3 != "" && req.body.level3 != "") {
                let degree3;
                if (req.body.level3 == "Native") {
                    degree3 = 5;
                } else if (req.body.level3 == "Fluent") {
                    degree3 = 4;
                } else if (req.body.level3 == "Proficient") {
                    degree3 = 3;
                } else if (req.body.level3 == "Intermediate") {
                    degree3 = 2;
                } else if (req.body.level3 == "Basic") {
                    degree3 = 1;
                }
                var language3 = await Language.create(
                    {
                        type: req.body.type3,
                        level: req.body.level3,
                        degree: degree3,
                    }).fetch();

                await User.addToCollection(thatUser.id, "ownLanguage").members(language3.id);
            }
            return res.redirect("/user/languageupdate")
        }

    },



    userworkupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);

        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var works = await User.findOne(userid).populate("ownWork", { sort: "start DESC" });

            return res.view('user/workupdate', {
                work: works.ownWork,
            });
        }

        if (req.method == "POST") {
            await Work.update(req.params.id).set({
                company: req.body.company,
                job: req.body.job,
                start: req.body.start,
                end: req.body.end,
                description: req.body.description,

            }).fetch();

            return res.redirect('/user/workupdate');
        }
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

    userlanguageupdate: async function (req, res) {
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var languages = await User.findOne(userid).populate("ownLanguage", { sort: "degree DESC" });

            return res.view('user/languageupdate', {
                language: languages.ownLanguage,
            });
        }

        if (req.method == "POST") {
            let degree;
            if (req.body.level == "Native") {
                degree = 5;
            } else if (req.body.level == "Fluent") {
                degree = 4;
            } else if (req.body.level == "Proficient") {
                degree = 3;
            } else if (req.body.level == "Intermediate") {
                degree = 2;
            } else if (req.body.level == "Basic") {
                degree = 1;
            }

            await Language.update(req.params.id).set({
                type: req.body.type,
                level: req.body.level,
                degree: degree,

            }).fetch();

            return res.redirect('/user/languageupdate');

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

}
