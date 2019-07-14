module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      burger_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate:{
              len: [1, 140]
          }
        },
      devoured: DataTypes.BOOLEAN
    });
    return Burger;
  };