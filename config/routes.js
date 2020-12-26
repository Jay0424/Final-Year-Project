/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },

  //Visitor
  '/': { view: 'visitor/index' },

  //Register
  'GET /visitor/register': 'UserController.register',
  'POST /visitor/register': 'UserController.register',

  //Login
  'GET /visitor/login': 'UserController.login',
  'POST /visitor/login': 'UserController.login',


  //Userindex
  ' /user/index': 'UserController.userindex',
  ' /user/index2': 'UserController.userindex2',
  ' /user/papercv': 'UserController.userpapercv',
  'GET /user/basic': 'UserController.userbasic',
  'POST /user/basic': 'UserController.userbasic',
  'GET /user/edu': 'UserController.useredu',
  'POST /user/edu': 'UserController.useredu',
  'GET /user/work': 'UserController.userwork',
  'POST /user/work': 'UserController.userwork',
  'GET /user/skill': 'UserController.userskill',
  'POST /user/skill': 'UserController.userskill',
  'GET /user/language': 'UserController.userlanguage',
  'POST /user/language': 'UserController.userlanguage',
  'GET /user/basicupdate': 'UserController.userbasicupdate',
  'POST /user/basicupdate': 'UserController.userbasicupdate',
  'GET /user/eduupdate': 'UserController.usereduupdate',
  'POST /user/eduupdate/:id': 'UserController.usereduupdate',
  'POST /user/edudelete/:id': 'UserController.useredudelete',

  //Adminindex
  ' /admin/index': 'UserController.adminindex',


  


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
