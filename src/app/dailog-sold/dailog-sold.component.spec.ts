import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogSoldComponent } from './dailog-sold.component';

describe('DailogSoldComponent', () => {
  let component: DailogSoldComponent;
  let fixture: ComponentFixture<DailogSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogSoldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailogSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
