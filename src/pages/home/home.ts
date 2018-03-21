import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


export interface Result {
  title: string;
  author: string;
  date:string;
  image:string;

}
const fakeResults: Result[]= [
  { title: "azert 1", author:'RA', date:"25/12/17",image:"http://test.fr"},
  { title: "azert 2", author:'',date:"04/02/18",image:""},
  { title: "azkdjh", author:'RA', date:"21/03/18",image:"http://gjgdjs.fr"},
];


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: Result[];

  // constructor(){
  //   this.results = fakeResults;
  // }

  constructor(public navCtrl: NavController) {
    this.results = fakeResults;
  }
  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.results = this.results.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
