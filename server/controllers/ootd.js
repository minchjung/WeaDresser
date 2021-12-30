const { User, Diarie, Like, sequelize } = require("../models");
const { isAuthorized, isValid } = require("./tokenfunction/index");
const { Op } = require("sequelize");
module.exports = {
  // * GET  /ootd   또는   /ootd?offset= & limit= 
  findTopLike :async (req, res) => {
    let ootdResult;
    let { offset, limit, tempMax, tempMin } = req.query;
    let id;
    if(!isAuthorized(req)){
      null;
    }else {
      id = isAuthorized(req).id;
    }
    if(req.query.hashtag){
      let hashtag = req.query.hashtag
      if(!id){
        ootdResult = await sequelize.query(
          `SELECT OOTD.*
          from (SELECT A.id as diariesId, A.image as diariesImage, A.share, A.likeCounts as likeCounts, B.userName, group_concat( ',',H.name,',') as hashtag
          from (SELECT Diaries.id, Diaries.image, Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts
              from Diaries) A Left join Users B on A.diarayUserId = B.Id Left join DiariesHashtags DH on A.id = DH.diarieId Left join Hashtags H on DH.hashtagId = H.id
              where A.share = true Group by A.id) OOTD where OOTD.hashtag LIKE '%,${hashtag},%' ORDER BY OOTD.likeCounts DESC limit ${limit} offset ${offset}
          `,
          { raw: true }
        )
          .catch(err => {
            console.log(err)
            return res.status(500).send("Internal server error")
          })
      }else{
        ootdResult = await sequelize.query(
          `SELECT OOTD.* 
          from (SELECT A.id as diariesId, A.image as diariesImage, A.likeWhether as likeWhether, A.share, A.likeCounts as likeCounts, B.userName, group_concat( ',',H.name,',') as hashtag 
          from (SELECT Diaries.id, Diaries.image, Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts,
              CASE WHEN Likes.id is null then false else true end as likeWhether
              from Diaries LEFT join Likes
              on Diaries.id = Likes.diarieId and Likes.userId = ${id}) A Left join Users B on A.diarayUserId = B.Id Left join DiariesHashtags DH on A.id = DH.diarieId Left join Hashtags H on DH.hashtagId = H.id 
              where A.share = true Group by A.id, A.likeWhether) OOTD where OOTD.hashtag LIKE '%,${hashtag},%' ORDER BY OOTD.likeCounts DESC limit ${limit} offset ${offset}
          `,
          { raw: true }
        )
          .catch(err => {
            console.log(err)
            return res.status(500).send("Internal server error")
          })
      }  
        console.log(ootdResult) 
        res.status(200).send(ootdResult)
        return;
    }
    tempMax = Number(tempMax) + 5;
    tempMin -= 5;
    if(!id){
      ootdResult = await sequelize.query(
        `SELECT OOTD.* from (SELECT A.id as diariesId, A.image as diariesImage, A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, group_concat(H.name separator ', ') as hashtag 
        from (SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts
                from Diaries)
                A Left join Users B on A.diarayUserId = B.Id Left join DiariesHashtags DH on A.id = DH.diarieId Left join Hashtags H on DH.hashtagId = H.id where A.share = true
                Group by A.id) OOTD where ${tempMax}  >= OOTD.tempMax And OOTD.tempMin >= ${tempMin} ORDER BY OOTD.likeCounts DESC limit ${limit} offset ${offset}
        `,
        { raw: true }
      )
        .catch(err => {
          console.log(err)
          res.status(500).send("Internal server error")
        })
    }else{
      ootdResult = await sequelize.query(
        `SELECT OOTD.* from (SELECT A.id as diariesId, A.image as diariesImage, A.likeWhether as likeWhether, A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, group_concat(H.name separator ', ') as hashtag 
        from (SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts,
                CASE WHEN Likes.id is null then false else true end as likeWhether
                from Diaries LEFT join Likes on Diaries.id = Likes.diarieId and Likes.userId = ${id})
                A Left join Users B on A.diarayUserId = B.Id Left join DiariesHashtags DH on A.id = DH.diarieId Left join Hashtags H on DH.hashtagId = H.id where A.share = true
                Group by A.id, A.likeWhether) OOTD where ${tempMax} >= OOTD.tempMax And OOTD.tempMin >= ${tempMin} ORDER BY OOTD.likeCounts DESC limit ${limit} offset ${offset}
        `,
        { raw: true }
      )
        .catch(err => {
          console.log(err)
          res.status(500).send("Internal server error")
        })
    }
      
      console.log(ootdResult)    
      res.status(200).send(ootdResult)
  }, 

  // * POST  /ootd/like
  addLike: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { diariesId, like} = req.body;
    const validUser = await isValid(userInfo.email, userInfo.id);
    console.log("---------------------------")
    console.log(req.body);
    console.log("---------------------------")
    if (!diariesId) {
      return res.status(400).send("Bad Request");
    }
    if (!validUser) {
      return res.status(401).json({ message: "unauthorized" });
    }
    console.log(validUser.dataValues.id);
    if(like === true){
      await Like.create({
        userId: validUser.dataValues.id,
        diarieId: diariesId
      }).then(() => {
        res.status(200).send()
      }).catch(err => {
        console.log(err)
        res.status(500).send("server error");
      })
    }else{
      await Like.destroy(
        {where: {userId: validUser.dataValues.id, diarieId: diariesId}}
        ).then(() => {
          res.status(200).send()
        }).catch(err => {
        console.log(err)
        res.status(500).send("server error");
      })
    } 
  },

  handleLike: async (req, res) => {
    const { diariesId, like } = req.body;
    const userInfo = isAuthorized(req);
    const validUser = await isValid(userInfo.email, userInfo.id);
    if (!diariesId) {
      return res.status(400).send("Bad Request");
    }
    if (!validUser) {
      return res.status(401).json({ message: "unauthorized" });
    }

    if(like === true){
      await Diarie.update({likeCounts: sequelize.literal('likeCounts + 1')},{
        where: {
          id: diariesId
        }
      }).then(() => {
        res.status(200).send()
      }).catch(err => {
        console.log(err)
        res.status(500).send("server error");
      })
    }else{
      await Diarie.update({likeCounts: sequelize.literal('likeCounts - 1')},{
          where: {
            id: diariesId
          }
      }).then(() => {
        res.status(200).send()
      }).catch(err => {
        console.log(err)
        res.status(500).send("server error");
      })
    }
  }
};
