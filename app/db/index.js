const Chain = require("./_chain");

class Table extends Chain {
  all(condition = {}, limit = "", order = "ORDER BY id DESC") {
    return this.query(
      `SELECT * FROM ${this.table} WHERE ${this.combines(
        condition,
        " AND "
      )} ${order} ${limit ? `LIMIT ${limit}` : ""}`
    );
  }

  count(condition = {}) {
    return this.query(
      `SELECT COUNT(*) as count FROM ${this.table} WHERE ${this.combines(
        condition,
        " AND "
      )}`
    ).then((res) => res[0].count);
  }

  get(condition) {
    return this.all(condition).then((result) => result[0]);
  }

  add(params, ignore = ["id"]) {
    if (typeof params !== "object") throw "params must be an object";

    return this.query(
      `INSERT INTO ${this.table} SET ${this.combines(params, ", ", ignore)};`
    ).then((addedResponse) => {
      return addedResponse.insertId;
      // return this.all({}, '1', 'ORDER BY id DESC').then(result => result[0]);
    });
  }

  change(id, params) {
    if (typeof params !== "object") throw "params must be an object";
    this.query(
      `UPDATE ${this.table} SET ${this.combines(params, ", ", [
        "id",
      ])} WHERE id = "${id}";`
    );

    return this.get({ id });
  }

  remove(condition) {
    return this.query(
      `DELETE FROM ${this.table} WHERE ${this.combines(condition, " AND ")};`
    );
  }

  replace(params) {
    if (typeof params !== "object") throw "params must be an object";
    this.query(
      `UPDATE ${this.table} SET ${this.combines(params, ", ", ["id"])}`
    );
  }
}

module.exports = Table;
