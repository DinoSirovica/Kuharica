import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrecipiesComponent } from './myrecipies.component';

describe('MyrecipiesComponent', () => {
  let component: MyrecipiesComponent;
  let fixture: ComponentFixture<MyrecipiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyrecipiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyrecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
