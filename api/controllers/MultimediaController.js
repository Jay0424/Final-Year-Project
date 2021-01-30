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
                name: req.body.name,
            }).fetch();

        await User.addToCollection(thatUser.id, "ownMultimedia").members(image.id);

        req.file('avatarfile').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
            if (err) { return res.serverError(err); }
            if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

            const datauri = require('datauri');
            await Multimedia.update(image.id).set({
                filePath: uploadedFiles[0].fd,
                file: await datauri(uploadedFiles[0].fd)
            }).fetch();

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
            req.file('avatarfile').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

                const datauri = require('datauri');
                await Multimedia.update(image.id).set({
                    name: req.body.imgname,
                    filePath: uploadedFiles[0].fd,
                    file: await datauri(uploadedFiles[0].fd)
                });
                return res.redirect('/user/imgupdate');
            });
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
                    name: req.body.imgname,
                }).fetch();

            await User.addToCollection(thatUser.id, "ownMultimedia").members(image.id);

            req.file('avatarfile').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
                if (err) { return res.serverError(err); }
                if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

                const datauri = require('datauri');
                await Multimedia.update(image.id).set({
                    filePath: uploadedFiles[0].fd,
                    file: await datauri(uploadedFiles[0].fd)
                }).fetch();

                return res.redirect('/user/imgadd');
            });
        }
    },





};

