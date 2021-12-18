require("dotenv").config();

module.exports = {
  //! share false 교체해야함
  findLatestById: (userId, minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diarieId, A.image as diariesImage,A.likeWhether as likeWhether,
        A.createdAt as createdAt, A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.createdAt,
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts,
            CASE WHEN Likes.id is null then false else true end as likeWhether
          from Diaries 
<<<<<<< HEAD
          LEFT join Likes on Diaries.id = Likes.diariesId
          )A 
        Left join Users B on A.diarayUserId = B.Id 
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = false AND A.diarayUserId = ${parseInt(userId)}
=======
          LEFT join Likes on Diaries.id = Likes.diarieId and Likes.userId = ${parseInt(userId)}
          )A 
        Left join Users B on A.diarayUserId = B.Id 
        Left join DiariesHashtags DH on A.id = DH.diarieId 
        Left join Hashtags H on DH.hashtagId = H.id 
        where A.share = true AND A.diarayUserId = ${parseInt(userId)}
>>>>>>> f3e3020 (Fixed: query diariesId, hastagsId => 단수)
        Group by A.id, A.likeWhether) OOTD 
      where ${parseFloat(maxTem)} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem)} 
      ORDER BY OOTD.createdAt DESC
      LIMIT 1;
    `;
    return query
  },

  //! share false 교체해야함
  findTopLikeById :(userId, minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diarieId, A.image as diariesImage, A.likeWhether as likeWhether, 
          A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, 
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts,
              CASE WHEN Likes.id is null then false else true end as likeWhether
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diarieId and Likes.userId = ${parseInt(userId)}
          )A 
        Left join Users B on A.diarayUserId = B.Id 
<<<<<<< HEAD
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = false
=======
        Left join DiariesHashtags DH on A.id = DH.diarieId 
        Left join Hashtags H on DH.hashtagId = H.id 
        where A.share = true
>>>>>>> f3e3020 (Fixed: query diariesId, hastagsId => 단수)
        Group by A.id, A.likeWhether) OOTD 
      where ${parseFloat(maxTem)} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem)} 
      ORDER BY OOTD.likeCounts DESC
      LIMIT 10;
    `;
    return query
  },

  findRandomOne : (minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diarieId, A.image as diariesImage, A.createdAt as createdAt,
          A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.createdAt,
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diarieId
          )A 
        Left join Users B on A.diarayUserId = B.Id 
<<<<<<< HEAD
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = false 
=======
        Left join DiariesHashtags DH on A.id = DH.diarieId 
        Left join Hashtags H on DH.hashtagId = H.id 
        where A.share = true 
>>>>>>> f3e3020 (Fixed: query diariesId, hastagsId => 단수)
        Group by A.id) OOTD 
      where ${parseFloat(maxTem)} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem)} 
      ORDER BY rand()
      LIMIT 10
    `;
    return query
  },
  findTopLikeOne : (minTem, maxTem) => {
    const query = `
      SELECT OOTD.* 
      from (
        SELECT A.id as diarieId, A.image as diariesImage, A.createdAt as createdAt,
          A.tempMax, A.tempMin, A.share, A.likeCounts as likeCounts, B.userName, 
        group_concat(H.name separator ', ') as hashtag
        from (
          SELECT Diaries.id, Diaries.image, Diaries.tempMax, Diaries.tempMin, Diaries.createdAt,
            Diaries.content, Diaries.share, Diaries.userId as diarayUserId, Diaries.likeCounts
          from Diaries 
          LEFT join Likes on Diaries.id = Likes.diarieId
          )A 
        Left join Users B on A.diarayUserId = B.Id 
<<<<<<< HEAD
        Left join DiariesHashtags DH on A.id = DH.diariesId 
        Left join Hashtags H on DH.hashtagsId = H.id 
        where A.share = false 
=======
        Left join DiariesHashtags DH on A.id = DH.diarieId 
        Left join Hashtags H on DH.hashtagId = H.id 
        where A.share = true 
>>>>>>> f3e3020 (Fixed: query diariesId, hastagsId => 단수)
        Group by A.id) OOTD 
      where ${parseFloat(maxTem)} >= OOTD.tempMax And OOTD.tempMin >= ${parseFloat(minTem)} 
      ORDER BY OOTD.likeCounts DESC
      LIMIT 1;
    `;
    return query
  }

};
