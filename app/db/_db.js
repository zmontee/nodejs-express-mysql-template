const connection = require('./_connect');

class DB {
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  combines(object, separator = ', ', ignore = []) {
    const condition = [];

    for (let [key, value] of Object.entries(object)) {
      if (typeof key === 'number' || ignore.includes(key) || (value && value.length === 0) || key.length === 0 || key.includes(' '))
        continue;

      if (key.includes('%')) {
        condition.push(`${key.replace(/%/g, '')} LIKE "%${this.connection.escape(value)}%"`);
      } else if (key.includes('-oneof')) {
        condition.push(value.map(oneof => `${key.replace(/-oneof/g, '')} = ${this.connection.escape(oneof)}`).join(' OR '));
      } else if (key.includes('-wherein')) {
        condition.push(`${key.replace(/-wherein/g, '')} IN (${value})`);
      } else if (key.includes('<') || key.includes('>')) {
        condition.push(`${key} ${this.connection.escape(value)}`);
      } else if (key.includes('!')) {
        condition.push(`${key.replace(/!/g, '')} != ${this.connection.escape(value)}`);
      } else {
        condition.push(`${key} = ${this.connection.escape(value)}`);
      }
    }
    return (condition.length > 0 ? condition : [1]).join(separator);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          return reject(err);
        }
        if (rows.length === 0) {
          //   return reject(404);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = DB;
