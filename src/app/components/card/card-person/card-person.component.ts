import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MarvelService } from '../../../services/marvel.service';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.scss']
})
export class CardPersonComponent implements OnInit {

  p: number = 1;
  comic: any;
  price: string = '';
  showComic = false;

  @Input() characters: any;


  constructor(private readonly marvelService: MarvelService) {

  }

  ngOnInit(): void {
  }

  openModalCharacter(){

  }
  openModalComics(urlComic: string){
    this.marvelService.getComic(urlComic)
      .subscribe(data=> {
        this.showComic = true;
        this.comic = data;
        if (data.prices.length > 0) {
          this.price = "$" + data.prices[0].price;
          console.log(data.prices[0]);
        } else {
          this.price = 'Not found';
        }
      });

  }

}
