/**
 * MultimediaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    useruploadimage: async function (req, res) {

        var thatUser = await User.findOne(req.session.userid);

        var image = await Multimedia.create(
            {
                type: "image",
                description: req.body.description,
            }).fetch();

        await User.addToCollection(thatUser.id, "ownMultimedia").members(image.id);

        req.file('avatarfile').upload({ maxBytes: 1048576 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            const datauri = require('datauri');
            await Multimedia.update(image.id).set({
                file: await datauri(uploadedFiles[0].fd)
            }).fetch();


            const fs = require('fs');

            fs.unlink(uploadedFiles[0].fd, function (err) {
                if (err) return console.log(err);
            });

            return res.redirect('/user/multimedia');
        });
    },

    userimgupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var images = await User.findOne(userid).populate("ownMultimedia", {
                where: {
                    type: "image"
                },
                sort: 'id DESC'
            });

            return res.view('user/imgupdate', {
                image: images.ownMultimedia,
            });
        }


        if (req.method == "POST") {
            var image = await Multimedia.findOne(req.params.id);

            await Multimedia.update(image.id).set({
                description: req.body.description,
            });

            req.file('avatarfile').upload({ maxBytes: 1048576 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return }

                const datauri = require('datauri');
                await Multimedia.update(image.id).set({
                    file: await datauri(uploadedFiles[0].fd)
                });

                const fs = require('fs');

                fs.unlink(uploadedFiles[0].fd, function (err) {
                    if (err) return console.log(err);
                });
            });
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);
            return res.redirect('/user/imgupdate');

        }
    },

    userimgdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Multimedia.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This image is already deleted", url: '/user/imgupdate' });
        } else {

            return res.redirect("/user/imgupdate");
        }

    },

    userimgadd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/imgadd')
        }

        if (req.method == "POST") {
            var thatUser = await User.findOne(req.session.userid);

            var image = await Multimedia.create(
                {
                    type: "image",
                    description: req.body.description,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownMultimedia").members(image.id);

            req.file('avatarfile').upload({ maxBytes: 1048576 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

                const datauri = require('datauri');
                await Multimedia.update(image.id).set({
                    file: await datauri(uploadedFiles[0].fd)
                }).fetch();

                const fs = require('fs');

                fs.unlink(uploadedFiles[0].fd, function (err) {
                    if (err) return console.log(err);
                });

                return res.redirect('/user/imgadd');
            });
        }
    },

    useruploadvideo: async function (req, res) {

        var thatUser = await User.findOne(req.session.userid);

        var video = await Multimedia.create(
            {
                type: "video",
                description: req.body.description,
            }).fetch();

        await User.addToCollection(thatUser.id, "ownMultimedia").members(video.id);

        req.file('avatarfile').upload({ maxBytes: 5368706371 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            const datauri = require('datauri');
            await Multimedia.update(video.id).set({
                file: await datauri(uploadedFiles[0].fd)
            }).fetch();

            const fs = require('fs');

            fs.unlink(uploadedFiles[0].fd, function (err) {
                if (err) return console.log(err);
            });

            return res.redirect('/user/multimedia');
        });
    },

    uservideoupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var videos = await User.findOne(userid).populate("ownMultimedia", {
                where: {
                    type: "video"
                },
                sort: 'id DESC'
            });

            return res.view('user/videoupdate', {
                video: videos.ownMultimedia,
            });
        }

        if (req.method == "POST") {
            var video = await Multimedia.findOne(req.params.id);

            await Multimedia.update(video.id).set({
                description: req.body.description,
            }).fetch();

            req.file('avatarfile').upload({ maxBytes: 5368706371 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return }

                const datauri = require('datauri');
                await Multimedia.update(video.id).set({
                    file: await datauri(uploadedFiles[0].fd),
                });

                const fs = require('fs');

                fs.unlink(uploadedFiles[0].fd, function (err) {
                    if (err) return console.log(err);
                });
            });
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);
            return res.redirect('/user/videoupdate');
        }
    },

    uservideodelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Multimedia.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This video is already deleted", url: '/user/videoupdate' });
        } else {

            return res.redirect("/user/videoupdate");
        }

    },

    uservideoadd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/videoadd')
        }

        if (req.method == "POST") {
            var thatUser = await User.findOne(req.session.userid);

            var video = await Multimedia.create(
                {
                    type: "video",
                    description: req.body.description,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownMultimedia").members(video.id);

            req.file('avatarfile').upload({ maxBytes: 5368706371 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

                const datauri = require('datauri');
                await Multimedia.update(video.id).set({
                    file: await datauri(uploadedFiles[0].fd)
                }).fetch();

                const fs = require('fs');

                fs.unlink(uploadedFiles[0].fd, function (err) {
                    if (err) return console.log(err);
                });

                return res.redirect('/user/videoadd');
            });
        }
    },

    useruploadpdf: async function (req, res) {

        var thatUser = await User.findOne(req.session.userid);

        var pdf = await Multimedia.create(
            {
                type: "pdf",
                name: req.body.name,
            }).fetch();

        await User.addToCollection(thatUser.id, "ownMultimedia").members(pdf.id);

        req.file('avatarfile').upload({ maxBytes: 1048576 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            const datauri = require('datauri');
            await Multimedia.update(pdf.id).set({
                file: await datauri(uploadedFiles[0].fd)
            }).fetch();

            const fs = require('fs');

            fs.unlink(uploadedFiles[0].fd, function (err) {
                if (err) return console.log(err);
            });

            return res.redirect('/user/multimedia');
        });
    },

    userpdfupdate: async function (req, res) {
        var thatUser = await User.findOne(req.session.userid);
        if (req.method == "GET") {

            var thatUser = await User.findOne(req.session.userid);

            var userid = thatUser.id;

            var pdfs = await User.findOne(userid).populate("ownMultimedia", {
                where: {
                    type: "pdf"
                },
                sort: 'id DESC'
            });

            return res.view('user/pdfupdate', {
                pdf: pdfs.ownMultimedia,
            });
        }

        if (req.method == "POST") {
            var pdf = await Multimedia.findOne(req.params.id);

            await Multimedia.update(pdf.id).set({
                name: req.body.pdfname,
            });

            req.file('avatarfile').upload({ maxBytes: 1048576 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return }

                const datauri = require('datauri');
                await Multimedia.update(pdf.id).set({
                    file: await datauri(uploadedFiles[0].fd)
                });

                const fs = require('fs');

                fs.unlink(uploadedFiles[0].fd, function (err) {
                    if (err) return console.log(err);
                });
            });
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);
            return res.redirect('/user/pdfupdate');
        }

    },

    userpdfdelete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Multimedia.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "This PDF is already deleted", url: '/user/pdfupdate' });
        } else {

            return res.redirect("/user/pdfupdate");
        }

    },

    userpdfview: async function (req, res) {

        var thisPDF = await Multimedia.findOne(req.params.id)

        return res.view('user/pdfview', {
            pdf: thisPDF,
        });

    },

    userpdfadd: async function (req, res) {
        if (req.method == "GET") {
            return res.view('user/pdfadd')
        }

        if (req.method == "POST") {
            var thatUser = await User.findOne(req.session.userid);

            var pdf = await Multimedia.create(
                {
                    type: "pdf",
                    name: req.body.pdfname,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownMultimedia").members(pdf.id);

            req.file('avatarfile').upload({ maxBytes: 1048576 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

                const datauri = require('datauri');
                await Multimedia.update(pdf.id).set({
                    file: await datauri(uploadedFiles[0].fd)
                }).fetch();

                const fs = require('fs');

                fs.unlink(uploadedFiles[0].fd, function (err) {
                    if (err) return console.log(err);
                });

                return res.redirect('/user/pdfadd');
            });
        }
    },









};

