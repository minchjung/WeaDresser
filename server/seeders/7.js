'use strict';
const { Diarie, sequelize, User, Like, Hashtag, DiariesHashtag  } = require('../models')
const {Op } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const curDate = await diary.createdAt
    const curDate = "%2021-12-17%"
    // const changedData = `%${curDate.getFullYear()}-${curDate.getMonth() + 1}-${curDate.getDate()}%`
    const diary = await Diarie.findAll({ 
      where : { 
        userId : 501,
        createdAt : { [Op.like] : curDate } 
      }, 
      include : { 
        model : Hashtag, 
        through : {attributes :[]},
        attributes : ['name'],
        raw:true
      },
      order : [['createdAt', 'DESC']], 
      nest : true , raw: true
    })
    console.log(diary)

    
    // const users = await User.findByPk(501);
    // const found = await users.getDiaries( { where : 
    //   { createdAt : 
    //     { [Op.like] : curDate } 
    //   }
    //   , raw : true, nest : true 
    // })
    // console.log(found)

  },

  down: async (queryInterface, Sequelize) => {
    /**
    // await diary.addHashtags(hashtags, { through : DiariesHashtag , ignoreDuplicates : true})
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('Hashtags', null, {})

  }
};
