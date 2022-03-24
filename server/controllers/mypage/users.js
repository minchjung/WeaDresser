const { User, Diarie, Like, sequelize } = require("../../models");
const { isAuthorized } = require("../tokenfunction/index");

module.exports = {
  // * GET mypage/users
  findOne: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(401).send("not authorized");
    }

    const userInfo = await User.findOne({
      where: {
        email: accessTokenData.email,
      },
    }).catch((err) => {
      console.log(err);
    });
    res.status(200).send({ data: { userName: userInfo.userName, social: userInfo.social } });
  },
  // * PATCH mypage/users
  update: async (req, res) => {
    const { password, editPassword, userName } = req.body;
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).send("not authorized");
    }

    const checkUserPassword = await User.findOne({
      where: {
        email: accessTokenData.email,
        password: password,
      },
    }).catch((err) => {
      console.log(err);
    });
    let result;
    if (!checkUserPassword) {
      return res.status(401).send("not authorized");
    }
    if (userName && !editPassword) {
      result = await User.update({
        userName: userName,
      }).catch((err) => {
        console.log(err);
      });
    } else if (!userName && editPassword) {
      result = await User.update({
        password: editPassword,
      }).catch((err) => {
        console.log(err);
      });
    } else if (userName && editPassword) {
      result = await User.update({
        password: editPassword,
        userName: userName,
      }).catch((err) => {
        console.log(err);
      });
    }

    res.status(201).send({ data: result.userName });
  },
  // * DELETE  mypage/users 회원탈퇴
  delete: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(401).send("not authorized");
    }
    
    await User.destroy({
      where: {
        id: accessTokenData.id,
      },
    }).then(() =>{
      res
      .clearCookie("authorization", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        domain: "weadresser.ml",
      });
      res.status(200).send("ok");
    }).catch((err) => {
      console.log(err);
    });
  },
};
