'use strict';
const { Diarie, sequelize, User, Like  } = require('../models')
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nameArr = ['minch', 'donghk', 'yoonhw', 'yow','ciara', 'clare', 'Moody', 'Sun', 'Jungmin', 'Dongmin', 
    'Yoonmin', 'Keymin', 'Samhwan', 'Sehwan', 'Soo', 'Sea', 'Lay', 'Kasom', 'Siara', 'Suji', 'Leina', 
    , 'samanda', 'Sangjin', 'toha', 'sehee', 'weadresse', 'ml', 'TK', 'MK', 'AK' , "LK"
    ] 
    const getImageFiles = () => {
      let imgArr = []
      let lenArr = []
      const path = fs.readdirSync(__dirname + "/image")
      path.forEach(dir => {
        if(dir !== '.DS_Store'){
          const nnon = fs.readdirSync(__dirname + "/image/" + dir)
          imgArr.push(nnon)
          lenArr.push(...nnon)
        } 
      });
      return [imgArr, lenArr.length]
    }

    const getRandonNumber = (min, max) => Math.floor( Math.random()* max ) + min 
    const getDiaryData = (userid, idx, img) => {
      const arr = [ [0, 20], [0, 15], [0, 10], [12, 10] ]
      let minus = idx < 2 ? -1 : 1 ;
      let [a, b] = [ minus * getRandonNumber(arr[idx][0], arr[idx][1]),  minus * getRandonNumber(arr[idx][0], arr[idx][1]) ] 
      const maxT = Math.max(a,b)      
      const minT = Math.min(a,b)     

      const yesterday = ( d => new Date(d.setDate(d.getDate()-getRandonNumber(0,5))) )(new Date);
      return {
        image : "https://s3.us-east-2.amazonaws.com/gathercoding.co/" + (img),
        content : 'dummy content' + (userid),
        weather : 'weather' + (userid),
        temp : (maxT + minT)/2, 
        tempMax : maxT, 
        tempMin : minT,
        share : true,
        userId : userid,
        likeCounts : 0,
        createdAt : yesterday + (getRandonNumber(1,3))*(-1)
      }
    }
    const createUserData = async (userLen) => {
      const userData = new Array(userLen ).fill(0).map( (ele, idx) => {
        const name = nameArr[idx] ? nameArr[idx] : nameArr[getRandonNumber(0,10)]
        // console.log(name)
        const data =   { 
          userName : name,
          email : `abc${idx+1}@email.com`,
          password : `1234`,
          gender : getRandonNumber(0,100)%2 ? 'male' : 'female',
          social : false,
          
        }
        return data
      })
      return await queryInterface.bulkInsert( 'Users' ,userData, { returning : true })
    }


    const createDiaryData = async (userLen, idx, imgFile) => {
      const userid = getRandonNumber(1, userLen)
      const data = getDiaryData( userid , idx, imgFile) // userid
      const user = await User.findByPk(userid);
      return await user.createDiarie(data)
    }

    const user_len = 30
    const [imgArr , diary_len] = getImageFiles()
    await createUserData(user_len)
    for(let i = 0 ; i < imgArr.length ; i ++){
      // console.log(i)
      imgArr[i].forEach( async imgFile => { 
        await createDiaryData(user_len, i, imgFile)
      })
    }
    // const diaryLikes = await Like.findAll({ where : { diarieId : 1 } })
    // const before = await diary.getLikes({ raw :true, nest : true })
    // console.log(before)

    // 연ㅕ 삭ㅔ 
    // await diary.removeLikes(diaryLikes)
    // const after = await diary.getLikes({ raw :true, nest : true })
    // console.log(after)

    // await diary.removeLikes(diaryLikes)
    // await diary.destroy()

    //실제 라이크 테블 
    // const result = await Like.findAll({ where : { diarieId : 1 }, raw : true, nest : true })
    // console.log(result)
  },
  down: async (queryInterface, Sequelize) => {
    /**
    // await diary.addHashtags(hashtags, { through : DiariesHashtag , ignoreDuplicates : true})
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    return queryInterface.bulkDelete('Diaries', null, {})

  }
};
    // let data ={
    //   image:"image" ,
    //   content:"content",
    //   weather: 'cloud',
    //   temp: 12,
    //   tempMax: 17,
    //   tempMin: 2 ,
    //   likeCounts: 0,
    //   share:  true ,
    // } 
    // let hashArr = ["짜자자asdfasdf", "adsf짬뽕", "크asdfsadf크"];
    // let hashtags = hashArr.map( (ele) => { 
    //   let obj = { name : ele }
    //   return obj
    // })
    // const diary = await Diarie.findByPk(11, { include : { model : Hashtag, through : {attributes:[]} }})   
    // console.log("original diary", JSON.stringify(diary))
    // const createHash = await Hashtag.bulkCreate(hashtags, { through : DiariesHashtag, ignoreDuplicates : true })
    // const foundHash = await Hashtag.findAll({ where : { name : hashArr} }) 
    // await diary.setHashtags(foundHash);
    // const getRe = await diary.getHashtags({through : { attributes : []}})
    // console.log("createdHash", JSON.stringify(createHash))
    // // console.log("foundHash", JSON.stringify(foundHash))
    // console.log("get diary hash after set", JSON.stringify(getRe) )
    // const found = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found))
    // await diary.addHashtag(foundHash)

    // const found2 = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found2))

    // return sequelize.transaction(function (t) {

        // const f = await Diarie.findByPk(221, { include : {model : Hashtag,  through : { attribuets : [] }} })
    // console.log(JSON.stringify(f))

    // const createdDiary = await Diarie.create(data)

    // return sequelize.transaction( (t) => { 
    //   return Hashtag.bulkCreate( hashtags, 
    //         { through : DiariesHashtag, ignoreDuplicates : true , transaction : t })
    //   .then( async createdHashtag => {
    //     console.log('created Hsh===', JSON.stringify(createdHashtag))
    //     const foundHash = await Hashtag.findAll({ where : { name : hashArr } })
    //     return createdDiary.setHashtags(foundHash, { transaction : t })
    //   })
    // })
    // .then( async finalResult => { 
    //   console.log(finalResult)
    // })
    // .catch( err => { 
    //   console.log(err)
    // })




    // let data ={
    //   image:"image" ,
    //   content:"content",
    //   weather: 'cloud',
    //   temp: 12,
    //   tempMax: 17,
    //   tempMin: 2 ,
    //   likeCounts: 0,
    //   share:  true ,
    // } 
    // let hashArr = ["짜자자asdfasdf", "adsf짬뽕", "크asdfsadf크"];
    // let hashtags = hashArr.map( (ele) => { 
    //   let obj = { name : ele }
    //   return obj
    // })
    // const diary = await Diarie.findByPk(11, { include : { model : Hashtag, through : {attributes:[]} }})   
    // console.log("original diary", JSON.stringify(diary))
    // const createHash = await Hashtag.bulkCreate(hashtags, { through : DiariesHashtag, ignoreDuplicates : true })
    // const foundHash = await Hashtag.findAll({ where : { name : hashArr} }) 
    // await diary.setHashtags(foundHash);
    // const getRe = await diary.getHashtags({through : { attributes : []}})
    // console.log("createdHash", JSON.stringify(createHash))
    // // console.log("foundHash", JSON.stringify(foundHash))
    // console.log("get diary hash after set", JSON.stringify(getRe) )
    // const found = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found))
    // await diary.addHashtag(foundHash)

    // const found2 = await Diarie.findAll({ where : { id : 11 }, include: { model : Hashtag, through : {attributes:[]} } }    ); 
    // console.log(JSON.stringify(found2))

    // return sequelize.transaction(function (t) {

        // const f = await Diarie.findByPk(221, { include : {model : Hashtag,  through : { attribuets : [] }} })
    // console.log(JSON.stringify(f))

    // const createdDiary = await Diarie.create(data)

    // return sequelize.transaction( (t) => { 
    //   return Hashtag.bulkCreate( hashtags, 
    //         { through : DiariesHashtag, ignoreDuplicates : true , transaction : t })
    //   .then( async createdHashtag => {
    //     console.log('created Hsh===', JSON.stringify(createdHashtag))
    //     const foundHash = await Hashtag.findAll({ where : { name : hashArr } })
    //     return createdDiary.setHashtags(foundHash, { transaction : t })
    //   })
    // })
    // .then( async finalResult => { 
    //   console.log(finalResult)
    // })
    // .catch( err => { 
    //   console.log(err)
    // })


        
    // const getTemper = () => {
    //   let [a, b] = [getRandonNumber(0,20)*(-1), getRandonNumber(0, 20)*(-1)]
    //   let [oneMin, oneMax] = [Math.min(a,b), Math.max(a,b)]

    //   [a, b] = [getRandonNumber(0,15)*(-1), getRandonNumber(0, 15)*(-1)]
    //   let [twoMin, twoMax] = [Math.min(a,b), Math.max(a,b)]
      
    //   [a, b] = [getRandonNumber(0,15)*(-1), getRandonNumber(0, 5)]
    //   let [threeMin, threeMax] = [Math.min(a,b), Math.max(a,b)]
 
    //   [a, b] = [getRandonNumber(0,17)*(-1), getRandonNumber(0, 9)]
    //   let [fourMin, fourMax] = [Math.min(a,b), Math.max(a,b)]
     
    //   [a, b] = [getRandonNumber(0,5)*(-1), getRandonNumber(0, 10)]
    //   let [fiveMin, fiveMax] = [Math.min(a,b), Math.max(a,b)]

    //   [a, b] = [getRandonNumber(12,22), getRandonNumber(12, 22)]
    //   let [sixMin, sixMax] = [Math.min(a,b), Math.max(a,b)]

    //   return [ [oneMin, oneMax], [twoMin, twoMax], [threeMin, threeMax], [fourMin, fourMax], [fiveMin, fiveMax], [sixMin, sixMax], ]
    // }
