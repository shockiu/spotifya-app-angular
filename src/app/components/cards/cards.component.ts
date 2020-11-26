import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: [
  ]
})
export class CardsComponent implements OnInit {

  @Input() items: any[] = [];

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  lookArtist(item: any) {
    let artistId;
    if( item.type === 'album' ) {
      artistId = item.artists[0].id;
    } else {
      artistId = item.id;
    }

    this.router.navigate(['artist', artistId]);

  }

}
