import Sequelize from "sequelize";

class Database {
    
    connect() {
        const db = arguments[0];
        const envArray = db["environment"].split(":");
        const env = envArray[0];
        const database = envArray[1];
        const activeDatabase = db[env][database];
        if(database.toString().toLowerCase() === "sql"){
            const Driver = activeDatabase.driver.toLowerCase().toString();
            
            if(Driver === 'mysql' || Driver === 'postgres' || Driver === 'mssql'){
            
                return new Sequelize(activeDatabase.dbName, activeDatabase.dbUser, activeDatabase.dbPass, {
                    host: activeDatabase.host,
                    dialect: activeDatabase.driver
                });
            }
        }
    }
}


export default new Database();