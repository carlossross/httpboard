import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTosignalPageComponent } from './posts-tosignal-page.component';

describe('PostsTosignalPageComponent', () => {
  let component: PostsTosignalPageComponent;
  let fixture: ComponentFixture<PostsTosignalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsTosignalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsTosignalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
