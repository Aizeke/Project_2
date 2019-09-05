module.exports = function(sequelize, DataTypes) {
  var Teams = sequelize.define("Teams", {
    teamName: DataTypes.STRING,
    teamRank: DataTypes.INTEGER,
    teamScore: DataTypes.INTEGER
  });
  return Teams;
};
