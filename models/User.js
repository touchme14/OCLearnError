// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Import instance Sequelize

const User = sequelize.define('User', {
  // id, createdAt, updatedAt otomatis ditambahkan karena timestamps: true
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: { //jika ingin mendefine manual
        type: DataTypes.DATE,
    allowNull: false
    },
  updatedAt:{ //jika ingin mendefine manual
        type: DataTypes.DATE,
    allowNull: false
    }
  },
 {
  tableName: 'users',
  timestamps: false, // PENTING!
});

module.exports = User;