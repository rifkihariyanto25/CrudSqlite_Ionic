import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";


@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
   datadb: "datadb",
  };

  constructor(private sqlite: SQLite) {}

  async createDatabase() {
    await this.sqlite
      .create({
        name: "ionic_sqlite_crud",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("tidak bisa membuat database " + JSON.stringify(e));
      });

    await this.createTables();
  }

  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.datadb} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL UNIQUE)`,
      []
    );

  }

  async addDatalist(name: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.datadb} (name) VALUES ('${name}')`,
        []
      )
      .then(() => {
        return "data created";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Data Tidak Boleh Sama";
        }

        return "tidak bisa mencetak data " + JSON.stringify(e);
      });
  }

  async getDatalist() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.datadb} ORDER BY name ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "tidak bisa mencetak data " + JSON.stringify(e);
      });
  }

  async deleteDatalist(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.datadb} WHERE id = ${id}`, [])
      .then(() => {
        return "Data Telah Dihapus";
      })
      .catch((e) => {
        return "tidak bisa menghapus data " + JSON.stringify(e);
      });
  }

  async editDatalist(name: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.datadb} SET name = '${name}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Data Telah Diupdate";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Data Tidak Boleh Sama";
        }

        return "tidak bisa update data " + JSON.stringify(e);
      });
  }

}
