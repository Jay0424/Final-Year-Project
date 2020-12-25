/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    username: {
      type: "string",
      unique: true,
      required: true,
    },

    password: {
      type: "string"
    },

    userrole: {
      type: "string",
      defaultsTo: "user",
    },

    name: {
      type: "string",
      defaultsTo: "",
    },

    email: {
      type: "string",
      defaultsTo: "",
    },

    phoneno: {
      type: "string",
      defaultsTo: "",
    },

    availability: {
      type: "string",
      defaultsTo: "",
    },

    salary: {
      type: "number",
    },

    ownEdu: {
      collection: "Education",
      via: "EduownBy"
    },

    ownWork: {
      collection: "Work",
      via: "WorkownBy"
    },

    ownSkill: {
      collection: "Skill",
      via: "SkillownBy"
    },

    ownLanguage: {
      collection: "Language",
      via: "LanguageownBy"
    },

    paperstatus: {
      type: "string",
      defaultsTo: "notsubmit"
    },

    summary: {
      type: "string",
    }








  },

};

