import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Query } from '@angular/compiler/src/core';
import {api_key}from '../../app/tmdb';


export interface Result {
  title: string;
  author: string;
  release_date:string;
  poster_path:string;
  adult:boolean;
  overview:string;


}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: Observable<Result[]>;

  constructor(public navCtrl: NavController, public http : HttpClient) {
    this.results = Observable.of([]);
  }

  getItems(ev: any):void {
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.results = val ? this.fetchResults(val): Observable.of([]);
  }

  itemSelected(item: Result): void {
    this.navCtrl.push(DetailsPage,item);
  }

  fetchResults(query:string):Observable<Result[]>{
    return this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie",{
      params:{
        'api_key':api_key,
        'query':query,
        'language':'fr'
      }
    }).pluck('results');
  }

}
