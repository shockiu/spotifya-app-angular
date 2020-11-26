import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSpotifyService } from '../../services/api-spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {

  artistInfo: any = {};
  topTracks: any[] = [];
  loading: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private spotify: ApiSpotifyService          
    ) {
      this.loading = true;
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.spotify.getOneArtist(params['id']).subscribe( res => { 
        this.artistInfo = res;
        this.loading = false;
      });
      this.spotify.getTopTracksOneArtist(params['id']).subscribe( res => {
        this.topTracks = res['tracks'];
        console.log(this.topTracks);
      });
    });
  }

}
