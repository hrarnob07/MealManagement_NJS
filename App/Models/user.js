'use strict';
import Sequelize from "sequelize";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "Please enter your email address"
                },
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        photo_path: Sequelize.STRING(255),
        profession: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        role: {
            type: Sequelize.ENUM,
            values: ["admin", "user"],
            defaultValue: "user"
        },
        state: {
            type: Sequelize.ENUM,
            values: ["Active", "Pending", "Deleted"],
            defaultValue: "Pending"
        }
    }, {
        underscored: true,
        operatorsAliases: false,
        tableName: "users"
    });
   /* User.associate = function (models) {
        User.hasMany(models.post);
        User.hasMany(models.like);
        User.hasMany(models.message, {
            foreignKey: 'sender_id'
        });
        User.hasMany(models.chatschedule, {
            as: "chatSchedules"
        });
        User.hasMany(models.chatschedule, {
            as: "adminChatSchedules",
            foreignKey: 'admin_id'
        });
        User.belongsToMany(models.ChatUser, {
            through: models.ChatUser,
            as: "chats",
            foreignKey: "user_id"
        });
    };*/
    return User;
};