    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('auth','root','aakash',{
        host:'localhost',
        dialect: 'mysql',
    })

    const Session = sequelize.define('Session',{
        sid:{
            type: Sequelize.STRING,
            primaryKey: true,
        },
        data: Sequelize.TEXT,
        expires: Sequelize.DATE
    })

    