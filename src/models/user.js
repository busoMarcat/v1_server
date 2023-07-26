module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.STRING(100),
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );

  User.associate = (db) => {};
  return User;
};
