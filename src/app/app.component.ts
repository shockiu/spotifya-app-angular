import { Component } from '@angular/core';
import { ApiSpotifyService } from './services/api-spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private apiSpotify: ApiSpotifyService ) { 
    this.apiSpotify.getTokenBearer().subscribe( res => {
      this.apiSpotify.tokenBearer = res;
    });
  }

}
