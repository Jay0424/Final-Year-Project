//isUser.js
module.exports = async function (req, res, proceed) {

    if(req.session.userrole=="user"){
        return proceed();   //proceed to the next policy,
    }
    
    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.view('error');

};