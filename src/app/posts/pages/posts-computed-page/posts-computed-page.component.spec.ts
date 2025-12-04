import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComputedPageComponent } from './posts-computed-page.component';

describe('PostsComputedPageComponent', () => {
  let component: PostsComputedPageComponent;
  let fixture: ComponentFixture<PostsComputedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsComputedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComputedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
