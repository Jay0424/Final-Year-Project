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
      defaultsTo: "Not submitted",
    },

    email: {
      type: "string",
      defaultsTo: "Not submitted",
    },

    phoneno: {
      type: "string",
      defaultsTo: "Not submitted",
    },

    availability: {
      type: "string",
      defaultsTo: "Not submitted",
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

    ownMultimedia: {
      collection: "Multimedia",
      via: "MultimediaownBy"
    },

    submitform: {
      type:"boolean",
      defaultsTo:false,
    },

    summary: {
      type: "string",
      defaultsTo: "Not submitted",
    },

    photo:{
      type:"string",
    },

    photoname:{
      defaultsTo:"Default Photo",
      type:"string",
    }

  },

};

