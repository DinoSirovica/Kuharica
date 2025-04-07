import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavouritesComponent } from './myfavourites.component';

describe('MyfavouritesComponent', () => {
  let component: MyfavouritesComponent;
  let fixture: ComponentFixture<MyfavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyfavouritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyfavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
