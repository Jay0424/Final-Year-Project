/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    register: async function (req, res) {
        if (req.method == "GET")
            return res.view('user/register');


    }


};

