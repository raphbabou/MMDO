import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import {api_key}from '../../app/tmdb';
import { AlertController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';


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
  shakeSubscription: Subscription;

  constructor(public navCtrl: NavController, public http : HttpClient,private alertCtrl: AlertController, private platform:Platform, private shake: Shake ) {
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
  discoverMovies():Observable<Result[]>{
    return this.http.get<Result[]>("https://api.themoviedb.org/3/discover/movie",{
      params:{
        'api_key':api_key,
        'page':'1',
        'primary_release_year':'2018',
        'language':'fr'
      }
    }).pluck('results');
  }

  showRandomMovieAlert(movies: Result[]): void{


    var item = movies[Math.floor(Math.random()*movies.length)];


    let alert = this.alertCtrl.create({
        title: item.title,
        message: item.overview,
        buttons: [
          {
            text: 'Annuler'
          },
          {
            text: 'Fiche',
            handler: () => {
              this.itemSelected(item);
            }
          }
        ]
      });
      alert.present();

  }

ionViewDidEnter(){
  this.shakeSubscription = Observable.fromPromise(this.platform.ready())
  .switchMap(() => this.shake.startWatch())
.switchMap(() => this.discoverMovies())
        .subscribe(movies => this.showRandomMovieAlert(movies));
}

ionViewWillLeave(){
  this.shakeSubscription.unsubscribe();
}

}
