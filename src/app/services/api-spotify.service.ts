import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { SpotifyData, Item, SpotifyDataArtists } from '../interfaces/spotify-data';
import { TokenRequest } from '../interfaces/token-bearer';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiSpotifyService {

  public tokenBearer: string = '';

  constructor( private http: HttpClient ) {
  }
  
  getTokenBearer(): Observable<string> {
    const URL: string = `${environment.urlAccountSpotify}${environment.client_id}/${environment.client_secret}`; 
    return this.http.get<TokenRequest>(URL).pipe(
      map((res: TokenRequest) => res.access_token )
    );
  }

  getQuerySpotify(query: string){

    const URL = `${environment.urlSpotify}${query}`;
    const HEADERS = new HttpHeaders({
      'Authorization' : `Bearer ${this.tokenBearer}`
    });
    console.log(HEADERS)
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
