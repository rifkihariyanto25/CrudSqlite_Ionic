import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  daftarnama: string = "";
  datadb: any = [];
  editMode: boolean = false;
  editId: number = 0;

  
  constructor(
    public database: DatabaseService, 
    public platform: Platform) {

    this.database.createDatabase().then(() => {
      // mencetak data
      this.getDataList();
    });
  }

  ngOnInit() {}

  addDataList() {
    if (!this.daftarnama.length) {
      alert("Jangan Kosong!");
      return;
    }

    if (this.editMode) {
      // edit 
      this.database
        .editDatalist(this.daftarnama, this.editId)
        .then((data) => {
          this.daftarnama = "";
          (this.editMode = false), (this.editId = 0);
          alert(data);
          this.getDataList();
        });
    } else {
      // add 
      this.database.addDatalist(this.daftarnama).then((data) => {
        this.daftarnama = "";
        alert(data);
        this.getDataList();
      });
    }
  }

  getDataList() {
    this.database.getDatalist().then((data) => {
      this.datadb = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.datadb.push(data.rows.item(i));
        }
      }
    });
  }

  deleteDataList(id: number) {
    this.database.deleteDatalist(id).then((data) => {
      alert(data);
      this.getDataList();
    });
  }

  editDataList(Listedit: any) {
    this.editMode = true;
    this.daftarnama = Listedit.name;
    this.editId = Listedit.id;
  }
}
  
