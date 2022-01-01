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

}
