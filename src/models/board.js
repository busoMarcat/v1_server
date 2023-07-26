module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "board",
    {
      boardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(2000),
      },
      price: {
        type: DataTypes.INTEGER,
      },
      uploadDate: {
        type: DataTypes.STRING,
      },
      interests: {
        type: DataTypes.INTEGER,
      },
      views: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "board",
      timestamps: false,
    }
  );

  // Define any associations or additional configurations for the Board model here if needed

  return Board;
};
