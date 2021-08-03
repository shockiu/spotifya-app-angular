import { Component, OnInit } from '@angular/core';
import { ApiSpotifyService } from '../../services/api-spotify.service';
import { SpotifyData, Albums, Item } from '../../interfaces/spotify-data';
import { concat } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  data: Item[] = [];
  loading: boolean = true;
  err: boolean;
  messageError: string;

  constructor( private spotify: ApiSpotifyService ) {
    this.spotify.getTokenBearer()
    .subscribe(res => {
        console.log(res);
        this.spotify.tokenBearer = res;
    }, (err) => {
      console.error(err);
    }, () => {
      this.getNewRealeses();
    });   
  }

  ngOnInit(){
   
  }

  getNewRealeses() {
    this.err = false;
    this.spotify.getNewRealeses().subscribe(res => {
      this.data = res;
      this.loading = false;
    }, (err) => {
      this.err = true;
      console.log(err);
      this.messageError = err;
    })
  }

}
