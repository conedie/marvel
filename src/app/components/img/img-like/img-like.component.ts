import { Component, Input, OnInit } from '@angular/core';
import { ManagerDataService } from '../../../services/manager-data.service';

@Component({
  selector: 'app-img-like',
  templateUrl: './img-like.component.html',
  styleUrls: ['./img-like.component.scss']
})
export class ImgLikeComponent implements OnInit {

  @Input() itemsFav:{ path: string; title: any; }[] = [];
  constructor( private readonly managerDataService: ManagerDataService) { }

  ngOnInit(): void {
  }

  removeFav( itemRemove: { path: string; title: any; }) {
    let storage = JSON.parse(localStorage.getItem('fav') || '{}');
    let i = 0

    storage.forEach((element: any) => {
      if ( element.path == itemRemove.path ) {
          storage.splice(i, 1);
      }
      i++;
    });

    localStorage.removeItem('fav');
    localStorage.setItem('fav', JSON.stringify(storage));
    this.managerDataService.storage = storage

  }
}
