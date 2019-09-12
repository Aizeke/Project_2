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
    salt: DataTypes.STRING,
    hash: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['active', 'pending', 'inactive'],
      defaultValue: 'pending'
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

  });

  // Users to their Brackets, on delete: delete assocated brackets too.
  User.associate = function (models) {
    User.hasMany(models.Bracket, {
      onDelete: "cascade"
    })
  }

  return User;
};
