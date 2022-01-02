import { Component, Input, OnInit } from '@angular/core';
import { MarvelService } from '../../../services/marvel.service';
import { ManagerDataService } from '../../../services/manager-data.service';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.scss']
})
export class CardPersonComponent implements OnInit {

  p: number = 1;
  comic: any;
  price: string = '';
  showComic: boolean = false;
  showAdded: boolean = false;
  structFav: any;

  @Input() characters: any;


  constructor(private readonly marvelService: MarvelService,
    private readonly managerDataService: ManagerDataService
    ) {

  }

  ngOnInit(): void {
  }

  openModalCharacter(character: any) {
    this.marvelService.getCharacterStory(character.id)
      .subscribe( data => {
        console.log(data);
      });
  }
  openModalComics(urlComic: string): void{
    this.marvelService.getComic(urlComic)
      .subscribe(data=> {
        this.showComic = true;
        this.comic = data;
        if (data.prices.length > 0) {
          this.price = "$" + data.prices[0].price;
        } else {
          this.price = 'Not found';
        }
      });

      setTimeout(() => {
        this.validateComicFav(this.comic);
      }, 1000);
  }

  addFavComic(): void {
    if ( this.validateComicFav(this.comic)) {
      this.addComicStorage();
    }
  }

  validateComicFav(data: any) {
    let storage = JSON.parse(localStorage.getItem('fav') || '{}');
    let path: string = data.thumbnail.path + '.' + data.thumbnail.extension;
    let add: boolean = true;
    this.showAdded = false;
    storage.forEach((element: any) => {
      if (path == element.path) {
        add = false;
        this.showAdded = true;
      }
    });
    return add;
  }

  addComicStorage(): void {
    let storage = JSON.parse(localStorage.getItem('fav') || '{}');
    storage.push( {path:this.comic.thumbnail.path + '.' + this.comic.thumbnail.extension, title: this.comic.title} );
    localStorage.removeItem('fav');
    localStorage.setItem('fav',JSON.stringify(storage));
    this.managerDataService.storage = storage;
    this.showAdded = true;
  }

}
