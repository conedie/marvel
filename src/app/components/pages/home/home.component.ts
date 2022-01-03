import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../../services/marvel.service';
import { ManagerDataService } from '../../../services/manager-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  character: any;

  constructor( private mavelService: MarvelService, public managerDataService: ManagerDataService) {
    this.showData(this.managerDataService.filter);
    this.randomFav();
    setTimeout(() => {
      this.updateFavourites();
    }, 2000);
  }

  ngOnInit(): void {
  }

  showData(orderBy: string) {
    if (this.managerDataService.search == '') {
      this.managerDataService.filter = orderBy;
      this.mavelService.getCharacters(orderBy)
      .subscribe( (data: any) => {
        this.managerDataService.character = data;
        this.messageNotFound(data.length );
      });
    }else{
      this.mavelService.getCharactersSearch(this.managerDataService.search, this.managerDataService.filter)
      .subscribe( data => {
        this.managerDataService.character = data;
        this.messageNotFound(data.length );
      });
    }
  }

  messageNotFound(count: number): void{
    if (count > 0) {
      this.managerDataService.showTextSearchEmpty = false;
    } else {
      this.managerDataService.showTextSearchEmpty = true;
    }
  }

  randomFav(): void {
    const item: { path: string; title: any; }[] = [];
    let numRandom: number[] = [];
    let ok: boolean = false;
    let key: number;
    this.mavelService.getComicsAll()
      .subscribe( data => {
        for (var i = 0; i <= 2; i++) {
          ok = false;
          do {
            key = this.getRandomInt(0,19);
            if ( numRandom.indexOf(key) == -1) {
              numRandom.push(key);
              ok = true;
            }

          } while (ok = false);
          item.push( { path:data[key].thumbnail.path + '.' + data[key].thumbnail.extension , title:data[key].title  } );
        }

        if (!localStorage.getItem('fav')) {
          localStorage.setItem('fav', JSON.stringify(item))
        }
      });
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  updateFavourites(): void{
    this.managerDataService.storage = JSON.parse(localStorage.getItem('fav') || '{}');
  }

}
