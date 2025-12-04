import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCrudPageComponent } from './posts-crud-page.component';

describe('PostsCrudPageComponent', () => {
  let component: PostsCrudPageComponent;
  let fixture: ComponentFixture<PostsCrudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsCrudPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCrudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
