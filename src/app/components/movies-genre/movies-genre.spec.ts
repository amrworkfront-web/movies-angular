import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesGenre } from './movies-genre';

describe('MoviesGenre', () => {
  let component: MoviesGenre;
  let fixture: ComponentFixture<MoviesGenre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesGenre],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesGenre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
