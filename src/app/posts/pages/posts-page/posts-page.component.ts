import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-posts-page',
  imports: [],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent {
  readonly posts = signal<Post[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly postService = inject(PostsService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.postService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (posts) => this.posts.set(posts),
        error: (err) => {
          console.error('Error loading posts', err);
          this.error.set('Ocurrió un error al cargar los posts');
        },
      });
  }

  trackByPostId(_index: number, post: Post): number {
    return post.id;
  }
}
