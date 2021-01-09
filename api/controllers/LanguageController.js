/**
 * LanguageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

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
        return res.redirect('/user/multimedia');
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
  

};

