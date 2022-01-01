import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.scss']
})
export class CardPersonComponent implements OnInit {

  @Input() characters: any;

  constructor() { }

  ngOnInit(): void {
  }

}
