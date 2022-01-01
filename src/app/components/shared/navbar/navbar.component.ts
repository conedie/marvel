import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../../services/marvel.service';
import { ManagerDataService } from '../../../services/manager-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly mavelService: MarvelService, private managerDataService: ManagerDataService) { }

  ngOnInit(): void {
  }

  searchCharacter(textSearch: string) {
    this.managerDataService.search = textSearch;
    if (textSearch == '') {
      this.mavelService.getCharacters(this.managerDataService.filter)
      .subscribe( (data: any) => {
        this.managerDataService.character = data;
        this.messageNotFound(data.length );
      });

    } else {
      this.mavelService.getCharactersSearch(textSearch, this.managerDataService.filter)
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

}
