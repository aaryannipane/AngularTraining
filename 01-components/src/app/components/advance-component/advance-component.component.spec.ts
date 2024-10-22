import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceComponentComponent } from './advance-component.component';

describe('AdvanceComponentComponent', () => {
  let component: AdvanceComponentComponent;
  let fixture: ComponentFixture<AdvanceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
