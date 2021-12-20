'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../models')
const { Op } = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let userData ;
    let tempMin = -12; 
    let tempMax = -3; 
        const UserOne = await Diarie.findOne({
          where : {
            userId : 1, 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5] },
            share : true,
          },

          order: [['CreatedAt', 'DESC']],
          limit : 1, 
          nest : true,
        })
        console.log("dsafadfasdfasdfasdf=================================================================", UserOne)              

//     hang.changed('createdAt', true);
//     hang.set('createdAt', yesterday,{raw: true});
//     await hang.save({
//         silent: true,
//         fields: ['createdAt']
//  });    

    // const hasharr = foundHash.map( (ele, idx) =>  ele.name ).join(', ') 
    // TopOne.likeWhether = foundLikes.length
    // TopOne.dataValues.userName = TopOne.dataValues.User.dataValues.userName
    // console.log(TopOne.dataValues.Hashtags)
  },
  down: async (queryInterface, Sequelize) => {
    // where : { 
    //   userId : foundUser.id,
    //   createdAt : { [Op.like] : curDate } 
    // }, 
    // include : { 
    //   model : Hashtag, 
    //   through : {attributes :[]},
    //   attributes : ['name'],
    //   raw:true
    // },
    // order : [['createdAt', 'DESC']], 
    return queryInterface.bulkDelete('Hashtags', null, {})

  }
};
