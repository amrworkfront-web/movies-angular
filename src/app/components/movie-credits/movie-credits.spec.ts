import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCredits } from './movie-credits';

describe('MovieCredits', () => {
  let component: MovieCredits;
  let fixture: ComponentFixture<MovieCredits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCredits],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCredits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
