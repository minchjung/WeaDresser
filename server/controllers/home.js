const { sequelize, Diarie,Hashtag, Like, User } = require('../models')
const { Op } = require('sequelize')
const { isAuthorized, isValid } = require("./tokenfunction/index");
const { findTopLikeById, findLatestById, findRandomOne, findTopLikeOne } = require('./query/query')
module.exports = {
  // * GET  /?tempMin={}&tempMax={}
  findRandom : async (req, res) => {
    console.log("====================================================여기가 endpoint 1")
    const { tempMin, tempMax } = req.query;
    try{
      await sequelize.transaction( async t => { 
        // find random diary 
        const RanOne = await Diarie.findOne({
          where : { 
<<<<<<< HEAD
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
=======
            temp : { [Op.between] : [ tempMin -10, tempMax + 10 ] },
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
            share : true,
          },
          include : [ 
            { model : User, attributes : ['userName'] },
            { model : Hashtag, through : {attributes : []} },
          ],
          order: sequelize.literal('rand()'),
          limit : 1, 
          nest : true,
          transaction : t
        })
        // data setting for hashtags, username 
        let ranData = RanOne.dataValues
        const hashtag = ranData.Hashtags.map(hash => hash.dataValues.name).join(', ')

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
        ranData.hashtag = hashtag
        ranData.userName = ranData.User.dataValues.userName
        delete ranData.Hashtags
        delete ranData.User

        // get Most like diary with username
        const TopOne = await Diarie.findOne({
          where : { 
<<<<<<< HEAD
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
=======
            temp : { [Op.between] : [ tempMin -10, tempMax + 10 ] },
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
            share : true,
          },
          include : [ 
            { model : User, attributes : ['userName'] },
            { model : Hashtag, through : {attributes : []} },
          ],
          order: [['likeCounts', 'DESC']],
          limit : 1, 
          nest : true,
          transaction : t
        })
        // data setting for hashtags, username 
        let topData = TopOne.dataValues
        topData.hashtag = topData.Hashtags.map(hash => hash.dataValues.name).join(', ')
        topData.userName = topData.User.dataValues.userName
        delete topData.Hashtags
        delete topData.User

        console.log('endpoint1=======================',ranData, topData)
        return res.json([ranData, topData])
<<<<<<< HEAD
=======
    const randomQuery = findRandomOne(tempMin, tempMax);
    const topQuery = findTopLikeOne(tempMin, tempMax);
   
    return sequelize.query( randomQuery, { raw : true })
      .then( async randomFound => {
        // random one found OK
        if(randomFound[0].length > 0){
          const topOne = await sequelize.query( topQuery, { raw : true })
          console.log(randomFound[0][0], topOne[0][0])
          return topOne[0].length > 0 // most like found OK
            ? res.status(200).json([ randomFound[0][0], topOne[0][0] ])
            : res.status(201).json([ randomFound[0][0], null ]) 
            //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
        }        
        else{ // !no random => nodata ? x
          const topOne = await sequelize.query( topQuery, { raw : true })
          return topOne[0].length > 0
          ? res.status(202).json([ null, topOne[0][0] ])
          : res.status(404).json([ null, null ]) 
          //! DB no data (미리 넣을거라 가능성 희박) BUT 협의
        }
>>>>>>> f3e3020 (Fixed: query diariesId, hastagsId => 단수)
=======
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
      })
    }
    catch(err) { 
      console.log(err)
      return res.status(500).send("Internal server error")
    }

  }, 

  // * GET  /?tempMax={}&tempMin={}  
  findById : async (req, res) => {
    console.log("====================================================여기가 endpoint 2")
    // validation 
    const { tempMax, tempMin }= req.query
    console.log('======================================================',tempMax, tempMin)
    const userInfo = isAuthorized(req);
    const validUser = await isValid(userInfo.email, userInfo.id);
    if(!validUser){
      return res.status(404).json("not authorized!");
    }
    try{
      await sequelize.transaction( async t => { 
        // get Most like diary with username
        const TopOne = await Diarie.findOne({
          where : { 
<<<<<<< HEAD
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
=======
            temp : { [Op.between] : [ tempMin -10, tempMax + 10 ] },
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
            share : true,
          },
          include : [ 
            { model : User, attributes : ['userName'] },
            { model : Hashtag, through : { attributes : [] } },
          ],
          order: [['likeCounts', 'DESC']],
          limit : 1, 
          nest : true,
          transaction : t
        })
        // like condition for current user on found diary                
        let topData = TopOne.dataValues
        topData.hashtag = topData.Hashtags.map(hash => hash.dataValues.name).join(', ')
<<<<<<< HEAD
        topData.likeWhether = await Like.findOne({ where : 
<<<<<<< HEAD
<<<<<<< HEAD
=======
        topData.likeWether = await Like.findOne({ where : 
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
          { diarieId : TopOne.id, userId : userId},
=======
          { diarieId : TopOne.id },
>>>>>>> b9cb256 (FIX : home landing server bug on left response)
=======
          { diarieId : TopOne.id },
>>>>>>> cab08ae ([task] deploy)
          transaction : t
        }) ? 1 : 0 

        // data setting for hashtags, username 
        topData.userName = topData.User.dataValues.userName
        delete topData.Hashtags
        delete topData.User
        
        // found user Diary 
        let userData ;
        const userId = validUser.id
        const UserOne = await Diarie.findOne({
          where : {
<<<<<<< HEAD
<<<<<<< HEAD
            id : userId, 
<<<<<<< HEAD
<<<<<<< HEAD
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
=======
            temp : { [Op.between] : [ tempMin -10, tempMax + 10 ] },
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
=======
            temp : { [Op.gte] : tempMin -30 },
>>>>>>> 19e8a8d (before to clear for cl)
=======
            userId : userId, 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5] },
>>>>>>> b9cb256 (FIX : home landing server bug on left response)
=======
            userId : userId, 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5] },
>>>>>>> cab08ae ([task] deploy)
            share : true,
          },
          include : [ 
            { model : User, attributes : ['userName'] },
            { model : Hashtag, through : {attributes : []} },
          ],
          order: [['CreatedAt', 'DESC']],
          limit : 1, 
          nest : true,
          transaction : t
        })
<<<<<<< HEAD
=======
        // console.log("dsafadfasdfasdfasdf=================================================================")              
>>>>>>> cab08ae ([task] deploy)

        // if user has diary on that condition where temperature in between tempMin, Max
        if(UserOne){ 
        // like condition for current user on found diary  
          userData = UserOne.dataValues
          userData.hashtag = userData.Hashtags.map(hash => hash.dataValues.name).join(', ')
<<<<<<< HEAD
          userData.likeWhether = await Like.findOne({ where : 
=======
          userData.likeWether = await Like.findOne({ where : 
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
            { diarieId : UserOne.id, userId : userId},
            transaction : t
          }) ? 1 : 0 

        }
        else{ 
        // find random diary 
          const RanOne = await Diarie.findOne({
            where : { 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
=======
              temp : { [Op.between] : [ tempMin -10, tempMax + 10 ] },
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
=======
              temp : { [Op.between] : [ tempMin -200, tempMax + 200 ] },
>>>>>>> 19e8a8d (before to clear for cl)
=======
              temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
>>>>>>> b9cb256 (FIX : home landing server bug on left response)
              share : true,
            },
            include : [ 
              { model : User, attributes : ['userName'] },
              { model : Hashtag, through : {attributes : []} },
            ],
            order: sequelize.literal('rand()'),
            limit : 1, 
            nest : true,
            transaction : t
          })
          // like condition for current user on found diary                
          userData = RanOne.dataValues
<<<<<<< HEAD
          userData.likeWhether = await Like.findOne({ where : { 
=======
          userData.likeWether = await Like.findOne({ where : { 
>>>>>>> 255394d ( Fixed : server landing home page idary data logic all changed by sequelize)
            diarieId : RanOne.id, userId : userId
          },
          transaction : t
          }) ? 1 : 0 
        }

        // data setting for hashtags, username 
        userData.hashtag = userData.Hashtags.map(hash => hash.dataValues.name).join(', ')
        userData.userName = userData.User.dataValues.userName
        delete userData.Hashtags
        delete userData.User
        
<<<<<<< HEAD
=======
        // console.log(topData)
        console.log('endpoint2=======================',userData, topData)
>>>>>>> cab08ae ([task] deploy)
        return res.json([userData, topData])
      })
    }
    catch(err) { 
      console.log(err)
      return res.status(500).send("Internal server error")
    }
  }
}