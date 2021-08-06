const jwt = require("jsonwebtoken");

const isUserAllowed = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.split(" ")[1], "gizli kelime", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.json({
          message: "İznin Yok",
        });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.json({
      message: "Token Yok",
    });
  }
};
module.exports = {
  isUserAllowed,
};
