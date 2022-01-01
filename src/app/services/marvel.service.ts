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

    const url = `http://gateway.marvel.com/v1/public/${ query }&ts=1&apikey=${ environment.publicKey }&hash=${ environment.hash }`;

    return this.http.get(url);

  }

  getCharacters() {

    return this.getQuery('characters?limit=20')
    .pipe( map( (data: any) => data.data.results ));

  }



}
