const dbconfig = {
    environment: "development:sql",
    development: {
        /**
         * Mongo DB Setup
         * Use your own mongodb database connection
         */
        mongodb: {
            host: "127.0.0.1",
            port: "27017",
            dbName: "blog",
            dbUser: "",
            dbPass: ""
        },
        /**
         * SQL Database setup option
         * SQL Supported Driver
         * @supported mysql|sqlite|postgres|mssql
         * @default mysql
         */
        sql: {
            driver: 'mysql',
            host: '127.0.0.1',
            dbName: 'school_management',
            dbPass: '',
            dbUser: 'root',

            // SQLite only
            storage: 'path/to/database.sqlite'
        }
    },
    production: {
        /**
         * Mongo DB Setup
         * Use your own mongodb database connection
         */
        mongodb: {
            host: "127.0.0.1",
            port: "27017",
            dbName: "blog",
            dbUser: "",
            dbPass: ""
        },
        /**
         * SQL Database setup option
         * SQL Supported Driver
         * @supported mysql|sqlite|postgres|mssql
         * @default mysql
         */
        sql: {
            driver: 'mysql',
            host: '127.0.0.1',
            dbName: 'school_management',
            dbPass: '',
            dbUser: 'root',
            // SQLite only
            storage: 'path/to/database.sqlite'
        }
    }
};

export default dbconfig;