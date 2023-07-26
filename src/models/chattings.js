module.exports = (sequelize, DataTypes) => {
  const Chattings = sequelize.define(
    "chattings",
    {
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chatHistory: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      tableName: "chattings",
      timestamps: false,
    }
  );

  // Define any associations or additional configurations for the Chattings model here if needed

  return Chattings;
};
