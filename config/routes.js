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
  ' /visitor/guide': 'UserController.visitorguide',
  ' /visitor/template': 'UserController.visitortemplate',

  //Register
  'GET /visitor/register': 'UserController.register',
  'POST /visitor/register': 'UserController.register',
  'GET /visitor/registernotok': 'UserController.registernotok',

  //Login & Logout
  'GET /visitor/login': 'UserController.login',
  'POST /visitor/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',


  //User Page & Basic
  ' /user/index': 'UserController.userindex',
  ' /user/index2': 'UserController.userindex2',
  '/user/papercv': 'UserController.userpapercv',
  'GET /user/basic': 'UserController.userbasic',
  'POST /user/basic': 'UserController.userbasic',
  'GET /user/basicupdate': 'UserController.userbasicupdate',
  'POST /user/basicupdate': 'UserController.userbasicupdate',
  'GET /user/pwupdate': 'UserController.userpwupdate',
  'POST /user/pwupdate/:id': 'UserController.userpwupdate',

  //User Education
  'GET /user/edu': 'EducationController.useredu',
  'POST /user/edu': 'EducationController.useredu',
  'GET /user/eduupdate': 'EducationController.usereduupdate',
  'POST /user/eduupdate/:id': 'EducationController.usereduupdate',
  'POST /user/edudelete/:id': 'EducationController.useredudelete',
  'GET /user/eduadd': 'EducationController.usereduadd',
  'POST /user/eduadd': 'EducationController.usereduadd',

  //User Work
  'GET /user/work': 'WorkController.userwork',
  'POST /user/work': 'WorkController.userwork',
  'GET /user/workupdate': 'WorkController.userworkupdate',
  'POST /user/workupdate/:id': 'WorkController.userworkupdate',
  'POST /user/workdelete/:id': 'WorkController.userworkdelete',
  'GET /user/workadd': 'WorkController.userworkadd',
  'POST /user/workadd': 'WorkController.userworkadd',

  //User Skill
  'GET /user/skill': 'SkillController.userskill',
  'POST /user/skill': 'SkillController.userskill',
  'GET /user/skillupdate': 'SkillController.userskillupdate',
  'POST /user/skillupdate/:id': 'SkillController.userskillupdate',
  'POST /user/skilldelete/:id': 'SkillController.userskilldelete',
  'GET /user/skilladd': 'SkillController.userskilladd',
  'POST /user/skilladd': 'SkillController.userskilladd',

  //User Language
  'GET /user/language': 'LanguageController.userlanguage',
  'POST /user/language': 'LanguageController.userlanguage',
  'GET /user/languageupdate': 'LanguageController.userlanguageupdate',
  'POST /user/languageupdate/:id': 'LanguageController.userlanguageupdate',
  'POST /user/languagedelete/:id': 'LanguageController.userlanguagedelete',
  'GET /user/languageadd': 'LanguageController.userlanguageadd',
  'POST /user/languageadd': 'LanguageController.userlanguageadd',

  //User Multimedia
  'GET /user/multimedia': 'UserController.usermultimedia',
  'GET /user/multiupdate': 'UserController.usermultiupdate',
  'POST /user/multiupdate/:id': 'UserController.usermultiupdate',
  'POST /user/multidelete/:id': 'UserController.usermultidelete',
  'GET /user/multiadd': 'UserController.usermultiadd',
  'POST /user/multiadd': 'UserController.userlmultiadd',

  //Admin Page
  ' /admin/index': 'UserController.adminindex',
  'GET /admin/useradd': 'UserController.adminuseradd',
  'POST /admin/useradd': 'UserController.adminuseradd',
  ' /admin/useradderror': 'UserController.adminuseradderror',
  '/admin/papercv/:id': 'UserController.adminpapercv',
  'POST /admin/userdelete/:id': 'UserController.adminuserdelete',
  'GET /admin/pwupdate': 'UserController.adminpwupdate',
  'POST /admin/pwupdate/:id': 'UserController.adminpwupdate',



 


  


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
