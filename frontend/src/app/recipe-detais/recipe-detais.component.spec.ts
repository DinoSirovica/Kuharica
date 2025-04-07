import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetaisComponent } from './recipe-detais.component';

describe('RecipeDetaisComponent', () => {
  let component: RecipeDetaisComponent;
  let fixture: ComponentFixture<RecipeDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeDetaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
