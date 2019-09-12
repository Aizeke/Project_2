module.exports = function (sequelize, DataTypes) {
    var Bracket = sequelize.define("Bracket", {
      bracketName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      bracketType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[1]
        }
      },
      gameInfo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      teamNames: {
        type: DataTypes.JSON,
        allowNull: false
      },
      scores: {
        type: DataTypes.JSON,
        allowNull: false
      }
    });
  
    Bracket.associate = function (models) {
      Bracket.belongsTo(models.User, {
        foreignKey: {
          allowNull:false
        }
      });
    };
    
    return Bracket;
  };  