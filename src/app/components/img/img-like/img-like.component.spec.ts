import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgLikeComponent } from './img-like.component';

describe('ImgLikeComponent', () => {
  let component: ImgLikeComponent;
  let fixture: ComponentFixture<ImgLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
