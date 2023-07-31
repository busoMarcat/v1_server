const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

//아래 설정을 통해 sequelize 가 노드랑 sql을 연결해준다.
//연결에 성공하면 sequelize에 연결정보가 담기게 된다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 만들어논 Models을 불러와 sequilize 해준다.
db.board = require("./board")(sequelize, Sequelize);
db.chattings = require("./chattings")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.search_log = require("./search_log")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
