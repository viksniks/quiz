import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
results:any[]=[];
  constructor(private nav:NavParams,private modal:ModalController) { }

  ngOnInit() {
   let obj = this.nav.get("obj");
   console.log(obj);
   this.results = obj;
  }

  close()
  {
    this.modal.dismiss();
  }

}
