import { Component, OnInit } from '@angular/core';
import { ApiSpotifyService }  from '../../services/api-spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor(private apiSpotify: ApiSpotifyService) { }

  data: any[] = [];
  loading: boolean = false;

  ngOnInit(): void {
  }

  searchArtist(event) {
    if( event.target.value != '' ){
      this.loading = true;
      this.apiSpotify.getArtist(event.target.value)
                .subscribe(( res ) => { 
                  this.data = res
                  this.loading = false;
                });
      
    }    
  }

}
