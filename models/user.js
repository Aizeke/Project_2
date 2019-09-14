module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      validate: {
        isEmail: true
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    salt: DataTypes.STRING,
    hash: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['active', 'pending', 'inactive'],
      defaultValue: 'pending'
    }
  });

  // Users to their Brackets, on delete: delete assocated brackets too.
  User.associate = function (models) {
    User.hasMany(models.Bracket, {
      foreignKey: "",
      onDelete: "cascade"
    })
  }

  return User;
};
