import Sequelize from 'sequelize';
import Config from '../config/mysqlsetup.js';

export default new Sequelize(
  // Config.dbConfig.database,
  'moodb',
  // Config.dbConfig.username,
  'root',
  // Config.dbConfig.password, // FOR TRAVISCI TESTING - USUALLY IS 'HR41'
  '',
  {
    host: 'http://127.0.0.1', // Config.dbConfig.host,
    dialect: 'mysql',
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
