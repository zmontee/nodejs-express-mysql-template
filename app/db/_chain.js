const DB = require('./_db');

class Chain extends DB {
  select(select = '*') {
    this.queryString = `SELECT ${select} FROM ${this.table} as T1`;
    return this;
  }

  join(joinTable = '') {
    if (joinTable.length > 0) {
      this.queryString += ` INNER JOIN ${joinTable} as T2`;
    }
    return this;
  }

  on(t1 = '', t2 = '') {
    if (t1.length > 0 && t2.length > 0) {
      this.queryString += ` ON (T1.${t1} = T2.${t2})`;
    }
    return this;
  }

  where(condition = {}) {
    this.queryString += ` WHERE ${this.combines(condition, ' AND ')}`;
    return this;
  }

  search(fields = '', what = '') {
    if (fields && fields.length > 0 && what && what.length > 0) {
      this.queryString += ` ${this.queryString.includes('WHERE') ? 'AND' : 'WHERE'
        } (MATCH (${fields}) AGAINST ('${what}*' IN BOOLEAN MODE)`;

      let likes = '';
      fields.split(',').forEach(key => {
        likes += ` OR ${key} LIKE '%${what}%'`;
      })
      this.queryString += likes + ')';

    }
    return this;
  }

  limit(numbers = '') {
    if (numbers.length > 0) {
      this.queryString += ` LIMIT ${numbers}`;
    }
    return this;
  }

  groupby(field = '') {
    if (field.length > 0) {
      this.queryString += ` GROUP BY ${field}`;
    }
    return this;
  }

  order(order = 'id DESC') {
    this.queryString += ` ORDER BY ${order}`;
    return this;
  }

  run() {
    return this.query(this.queryString);
  }
}

module.exports = Chain;
