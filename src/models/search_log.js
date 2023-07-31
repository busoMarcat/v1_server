module.exports = (sequelize, DataTypes) => {
  const Search_log = sequelize.define(
    "search_log", 
    {
        search_word: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    },
    {
        tableName: "search_log",
        timestamps: false,
    }
  );

  return Search_log;
};
