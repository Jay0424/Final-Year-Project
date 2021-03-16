/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  UserController:{
    usertemplate:'isUser',
    userindex:'isUser',
    userindex2:'isUser',
    userguide:'isUser',
    usermultimedia:'isUser',
    usermultiupdate:'isUser',
    userbasic:'isUser',
    userbasicupdate:'isUser',
    userpwupdate:'isUser',
    userphoto:'isUser',
    userphotoupdate:'isUser',
    adminpapercv:'isAdmin',
    adminindex:'isAdmin',
    adminuseradd:'isAdmin',
    adminuserdelete:'isAdmin',
    adminpwupdate:'isAdmin',
  },

  EducationController:{
    useredu:'isUser',
    usereduupdate:'isUser',
    useredudelete:'isUser',
    usereduadd:'isUser',
  },

  WorkController:{
    userwork:'isUser',
    userworkupdate:'isUser',
    userworkdelete:'isUser',
    userworkadd:'isUser',
  },

  SkillController:{
    userskill:'isUser',
    userskillupdate:'isUser',
    userskilldelete:'isUser',
    userskilladd:'isUser',
  },

  LanguageController:{
    userlanguage:'isUser',
    userlanguageupdate:'isUser',
    userlanguagedelete:'isUser',
    userlanguageadd:'isUser',
  },

  MultimediaController:{
    useruploadimage:'isUser',
    userimgupdate:'isUser',
    userimgdelete:'isUser',
    userimgadd:'isUser',

    useruploadvideo:'isUser',
    uservideoupdate:'isUser',
    uservideodelete:'isUser',
    uservideoadd:'isUser',

    useruploadpdf:'isUser',
    userpdfupdate:'isUser',
    userpdfdelete:'isUser',
    userpdfview:'isUser',
    userpdfadd:'isUser',
  },



};
