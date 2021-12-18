const { sequelize, Diarie,Hashtag, Like, User } = require('../models')
const { Op } = require('sequelize')
const { isAuthorized, isValid } = require("./tokenfunction/index");
const { findTopLikeById, findLatestById, findRandomOne, findTopLikeOne } = require('./query/query')
module.exports = {
  // * GET  /?tempMin={}&tempMax={}
  findRandom : async (req, res) => {
    const { tempMin, tempMax } = req.query;
    try{
      await sequelize.transaction( async t => { 
        // find random diary 
        const RanOne = await Diarie.findOne({
          where : { 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
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
        ranData.hashtag = hashtag
        ranData.userName = ranData.User.dataValues.userName
        delete ranData.Hashtags
        delete ranData.User

        // get Most like diary with username
        const TopOne = await Diarie.findOne({
          where : { 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
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

        // console.log(topData)
        return res.json([ranData, topData])
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
      })
    }
    catch(err) { 
      console.log(err)
      return res.status(500).send("Internal server error")
    }

  }, 

  // * GET  /?tempMax={}&tempMin={}  
  findById : async (req, res) => {
    // validation 
    const { tempMax, tempMin }= req.query
    const userInfo = isAuthorized(req);
    const validUser = await isValid(userInfo.email, userInfo.id);
    if(!validUser){
      return res.status(404).json("not authorized!");
    }
    try{
      await sequelize.transaction( async t => { 
        // get Most like diary with username
        const userId = validUser.id
        const TopOne = await Diarie.findOne({
          where : { 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
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
        // like condition for current user on found diary                
        let topData = TopOne.dataValues
        topData.hashtag = topData.Hashtags.map(hash => hash.dataValues.name).join(', ')
        topData.likeWhether = await Like.findOne({ where : 
          { diarieId : TopOne.id, userId : userId},
          transaction : t
        }) ? 1 : 0 

        // data setting for hashtags, username 
        topData.userName = topData.User.dataValues.userName
        delete topData.Hashtags
        delete topData.User
        
        // found user Diary 
        let userData ;
        const UserOne = await Diarie.findOne({
          where : {
            id : userId, 
            temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
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
        // if user has diary on that condition where temperature in between tempMin, Max
        if(UserOne){ 
        // like condition for current user on found diary                
          userData = UserOne.dataValues
          userData.hashtag = userData.Hashtags.map(hash => hash.dataValues.name).join(', ')
          userData.likeWhether = await Like.findOne({ where : 
            { diarieId : UserOne.id, userId : userId},
            transaction : t
          }) ? 1 : 0 

        }
        else{ 
        // find random diary 
          const RanOne = await Diarie.findOne({
            where : { 
              temp : { [Op.between] : [ tempMin -5, tempMax + 5 ] },
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
          userData.likeWhether = await Like.findOne({ where : { 
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
        
        // console.log(topData)
        return res.json([userData, topData])
      })
    }
    catch(err) { 
      console.log(err)
      return res.status(500).send("Internal server error")
    }
  }
}