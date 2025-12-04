import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsEffectPageComponent } from './posts-effect-page.component';

describe('PostsEffectPageComponent', () => {
  let component: PostsEffectPageComponent;
  let fixture: ComponentFixture<PostsEffectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsEffectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsEffectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
