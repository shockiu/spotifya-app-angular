import { Component, OnInit } from '@angular/core';
import { ApiSpotifyService } from '../../services/api-spotify.service';
import { SpotifyData, Albums, Item } from '../../interfaces/spotify-data';

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
    this.err = false;
    this.spotify.getNewRealeses().subscribe((res) => {
      this.data = res;
      this.loading = false; 
    }, (err) => {
      this.err = true;
      console.log(err);
      this.messageError = err;
    });
   
  }

  ngOnInit(){
   
  }

}
