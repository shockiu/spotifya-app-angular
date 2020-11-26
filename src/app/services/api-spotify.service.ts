import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifyData, Item, SpotifyDataArtists } from '../interfaces/spotify-data';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiSpotifyService {

  constructor( private http: HttpClient ) {
  }
  
  getQuerySpotify(query: string){

    const URL = `https://api.spotify.com/v1/${query}`;
    const HEADERS = new HttpHeaders({
      'Authorization' : 'Bearer BQD4ArTVUkK9AhzEDDfKaBey47LDGczobSS6HWed6CCq8YBM11ukm_Fh5IR9Z73WG47EoZpK0Momehk9gTE'
    });
    
    return this.http.get(URL, { headers: HEADERS });
  }

  getNewRealeses(): Observable<Item[]> {
    
    return this.getQuerySpotify('browse/new-releases?limit=20&offset=5')
                      .pipe( map ( (data: SpotifyData) => data.albums.items ));
  }

  getArtist( termino: string ): Observable<Item[]> {

    return  this.getQuerySpotify(`search?q=${termino}&type=artist&limit=20`) 
                      .pipe( map ( (data: SpotifyDataArtists ) => data.artists.items ));
  }

  getOneArtist( artistId: string ): Observable<any> {
    return this.getQuerySpotify(`artists/${artistId}`);
  }

  getTopTracksOneArtist( artistId: string ): Observable<any> {
    return this.getQuerySpotify(`artists/${artistId}/top-tracks?country=ES`);
  }

}
