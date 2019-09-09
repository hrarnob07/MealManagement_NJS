// import db from "./Database/Database";
import route from "../App/Http/route";
import connectionTalkBack from './Middleware/ConnectionTalkBack';
// import dbconfig from "../App/Config/database";
import config from '../App/Config/app';

const routeInit = (app, route, path = undefined) => {
    const Path = (path !== undefined) ? path : "/";
    Object.keys(route).forEach(key => {
        app.use(Path, route[key]);
    });
};

// const sequelize = db.connect(dbconfig);
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// global.sequelize = sequelize;
module.exports = (app) => {
    //Setun application lable middleware
    require("./Middleware/Application")(app);
    app.use(connectionTalkBack);

    //initialize router
    routeInit(app, route, config.APIPREFIX);
};
// module.exports.sequelize = sequelize;