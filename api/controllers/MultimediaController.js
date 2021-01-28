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

            const  datauri = require('datauri');
            await Multimedia.update(image.id).set({
                filePath: uploadedFiles[0].fd,
                file: await datauri(uploadedFiles[0].fd)
            }).fetch();

            return res.redirect('/user/multimedia');
        });
    },


};

