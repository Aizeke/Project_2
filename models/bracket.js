module.exports = function (sequelize, DataTypes) {
    var Bracket = sequelize.define("Bracket", {
      bracketName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      teamNames: {
        type: DataTypes.JSON,
        allowNull: false
      }
    });
  
    // Work to associate the bracket to the model.User, with foreginKey.


    return Bracket;
  };  