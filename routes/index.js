var express = require('express');
const Sequelize = require("sequelize");
var router = express.Router();

router.post('/getQuertData', function (req, res, next) {

  let dbName = "prosperoware_io_dev"
  let instanceInfo = {
    username: "prospadmin",
    password: "security4cam",
    endpoint: "devrdsmain-cluster.cluster-cvvwultysrvn.us-east-1.rds.amazonaws.com"
  }
  const sequelize = new Sequelize(
    dbName,
    instanceInfo.username,
    instanceInfo.password,
    {
      host: instanceInfo.endpoint,
      dialect: "mysql"
    }
  );

  try {
    let result = await queryExecutor(`select * from document limit 5`, sequelize);
    res.send({ data: result })
  } catch (err) {
    console.log("error occured", JSON.stringify(err))
    res.send({ data: err })
  }
});

function queryExecutor(query, sequelize) {
  return new Promise((resolve, reject) => {
    sequelize
      .query(query)
      .then(users => {
        resolve({ data: users || 0 });
      })
      .catch(err => {
        reject({ data: err });
      });
  });
};

module.exports = router;
