import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarvelService {



  constructor( private readonly http: HttpClient) {}

  getQuery( query: string ) {

    const url = `http://gateway.marvel.com/v1/public/${ query }ts=1&apikey=${ environment.publicKey }&hash=${ environment.hash }`;

    return this.http.get(url);

  }

  getQueryAll( query: string ) {

    const url = `${ query }ts=1&apikey=${ environment.publicKey }&hash=${ environment.hash }`;
    return this.http.get(url);

  }

  getCharacters(order: string) {

    return this.getQuery(`characters?${order}&`)
    .pipe( map( (data: any) => data.data.results ));

  }

  getCharactersSearch(nameStartsWith: string, order: string) {

    return this.getQuery(`characters?nameStartsWith=${nameStartsWith}&${order}&`)
    .pipe( map( (data: any) => data.data.results ));

  }

  getComic(urlComic: string) {

    return this.getQueryAll(`${urlComic}?`)
    .pipe( map( (data: any) => data.data.results[0] ));

  }

  getComicsAll() {

    return this.getQuery(`comics?`)
    .pipe( map( (data: any) => data.data.results ));

  }

  getCharacterStory(idCharacter: any) {

    return this.getQuery(`characters/${idCharacter}?`)
    .pipe( map( (data: any) => data.data.results ));

  }


}
