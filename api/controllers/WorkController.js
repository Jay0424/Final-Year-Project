/**
 * WorkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

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




  

};

