import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesContentComponent } from './images-content.component';

describe('ImagesContentComponent', () => {
  let component: ImagesContentComponent;
  let fixture: ComponentFixture<ImagesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
