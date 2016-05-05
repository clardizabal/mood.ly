import Sequelize from 'sequelize';
import password from '../config/mysqlsetup.js';

export default new Sequelize('moodb', 'root', password, {
  define: {
    timestamps: false // true by default
  },
  logging: false
});
