import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenotfound'
})
export class ImagenotfoundPipe implements PipeTransform {
  
  transform(value: any[]): string {

    if( !value ) {
      return '../../assets/img/nimage.png';
    }
    if( value.length > 0 ) {
      return value[0].url;
    } else {
      return '../../assets/img/nimage.png';
    }
  }

}
