import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDirectoryComponent } from './up-directory.component';

describe('UpDirectoryComponent', () => {
  let component: UpDirectoryComponent;
  let fixture: ComponentFixture<UpDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
