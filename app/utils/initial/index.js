const { MYSQL_CONFIG } = require('../mysql-config');
const MysqlImport = require('mysql-import');
const importer = new MysqlImport({ ...MYSQL_CONFIG });

importer
  .import(`${__dirname}/data.sql`)
  .then(() => {
    // ok
    console.log(`Data has been imported into "${MYSQL_CONFIG.database}" database.`);
  })
  .catch(err => {
    console.error(err);
  });