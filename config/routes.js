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

  //Login & Logout & Error
  'GET /visitor/login': 'UserController.login',
  'POST /visitor/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  ' /error': 'UserController.error',


  //User Page & Basic
  ' /user/index': 'UserController.userindex',
  ' /user/index2': 'UserController.userindex2',
  ' /user/guide': 'UserController.userguide',
  ' /user/template': 'UserController.usertemplate',
  '/user/papercv/:id': 'UserController.userpapercv',
  '/user/papercv2/:id': 'UserController.userpapercv2',
  '/user/papercv3/:id': 'UserController.userpapercv3',
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

  'POST /user/uploadimage': 'MultimediaController.useruploadimage',
  'POST /user/uploadvideo': 'MultimediaController.useruploadvideo',
  'POST /user/uploadpdf': 'MultimediaController.useruploadpdf',

  'POST /user/photo': 'UserController.userphoto',
  'POST /user/photoupdate': 'UserController.userphotoupdate',
  'POST /user/photoremove': 'UserController.userphotoremove',

  'GET /user/imgupdate': 'MultimediaController.userimgupdate',
  'POST /user/imgupdate/:id': 'MultimediaController.userimgupdate',
  'POST /user/imgdelete/:id': 'MultimediaController.userimgdelete',
  'GET /user/imgadd': 'MultimediaController.userimgadd',
  'POST /user/imgadd': 'MultimediaController.userimgadd',

  'GET /user/videoupdate': 'MultimediaController.uservideoupdate',
  'POST /user/videoupdate/:id': 'MultimediaController.uservideoupdate',
  'POST /user/videodelete/:id': 'MultimediaController.uservideodelete',
  'GET /user/videoadd': 'MultimediaController.uservideoadd',
  'POST /user/videoadd': 'MultimediaController.uservideoadd',

  'GET /user/pdfupdate': 'MultimediaController.userpdfupdate',
  'POST /user/pdfupdate/:id': 'MultimediaController.userpdfupdate',
  'POST /user/pdfdelete/:id': 'MultimediaController.userpdfdelete',
  'GET /user/pdfadd': 'MultimediaController.userpdfadd',
  'POST /user/pdfadd': 'MultimediaController.userpdfadd',
  ' /user/pdfview/:id': 'MultimediaController.userpdfview',

  //Admin Page
  ' /admin/index': 'UserController.adminindex',
  'GET /admin/useradd': 'UserController.adminuseradd',
  'POST /admin/useradd': 'UserController.adminuseradd',
  '/admin/papercv/:id': 'UserController.adminpapercv',
  'POST /admin/userdelete/:id': 'UserController.adminuserdelete',
  'GET /admin/pwupdate': 'UserController.adminpwupdate',
  'POST /admin/pwupdate/:id': 'UserController.adminpwupdate',

  //User Digital CV 1
  ' /user/:id/digitalcv/index': 'UserController.digitalcvindex',
  ' /user/:id/digitalcv/work': 'UserController.digitalcvwork',
  ' /user/:id/digitalcv/skill': 'UserController.digitalcvskill',
  ' /user/:id/digitalcv/multi': 'UserController.digitalcvmulti',
  ' /user/:id/digitalcv/cert': 'UserController.digitalcvcert',
  ' /user/:id/digitalcv/contact': 'UserController.digitalcvcontact',
  ' /user/:id/digitalcv/pdf/:pid': 'UserController.digitalcvpdf',

  //User Digital CV 2
  ' /user/:id/digitalcv2/index': 'UserController.digitalcv2index',
  ' /user/:id/digitalcv2/skill': 'UserController.digitalcv2skill',
  ' /user/:id/digitalcv2/cert': 'UserController.digitalcv2cert',
  ' /user/:id/digitalcv2/pdf/:pid': 'UserController.digitalcv2pdf',

  //User Digital CV 3
  ' /user/:id/digitalcv3/index': 'UserController.digitalcv3index',
  ' /user/:id/digitalcv3/edu': 'UserController.digitalcv3edu',
  ' /user/:id/digitalcv3/work': 'UserController.digitalcv3work',
  ' /user/:id/digitalcv3/skill': 'UserController.digitalcv3skill',
  ' /user/:id/digitalcv3/multi': 'UserController.digitalcv3multi',
  ' /user/:id/digitalcv3/cert': 'UserController.digitalcv3cert',
  ' /user/:id/digitalcv3/pdf/:pid': 'UserController.digitalcv3pdf',
  ' /user/:id/digitalcv3/contact': 'UserController.digitalcv3contact',










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
