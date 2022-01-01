import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../../services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  character: any;

  constructor( private mavelService: MarvelService) {
    this.mavelService.getCharacters()
    .subscribe( (data: any) => {
      this.character = data;
      console.log(this.character);
    });
  }

  ngOnInit(): void {
  }


}
