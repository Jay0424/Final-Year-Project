/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {
  //Use bcrypt to encrypt pasword
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;
  const hash = await sails.bcrypt.hash('Password123', saltRounds);


  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  //User Sample Data
  if (await User.count() > 0) {
    return;
  }

  await User.createEach([
    {username:"jay01", password:hash, userrole:"user", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"jay02", password:hash, userrole:"user", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"jay03", password:hash, userrole:"user", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"jay04", password:hash, userrole:"user", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"jay05", password:hash, userrole:"user", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"jay06", password:hash, userrole:"user", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"admin01", password:hash, userrole:"admin", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},
    {username:"admin02", password:hash, userrole:"admin", photo: "https://upload.cc/i1/2021/01/28/v4gpxB.png"},

    // etc.
  ]);
  

};
