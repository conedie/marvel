import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerDataService {

  character: any;
  filter: string = 'orderBy=name';
  search: string = '';
  showTextSearchEmpty: boolean = false;
  storage : { path: string; title: any; }[] = [];

  constructor() { }
}
