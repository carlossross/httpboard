import { Component, inject, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { catchError, of, tap } from 'rxjs';
import { Post } from '../../models/post.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-posts-tosignal-page',
  imports: [],
  templateUrl: './posts-tosignal-page.component.html',
  styleUrl: './posts-tosignal-page.component.scss',
})
export class PostsTosignalPageComponent {
  private readonly postsService = inject(PostsService);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private readonly posts$ = this.postsService.getAll().pipe(
    tap(() => this.loading.set(false)),
    catchError((err) => {
      console.error('Error en tosignal', err);
      this.error.set('Error al cargar (toSignal).');
      this.loading.set(false);
      return of([] as Post[]);
    })
  );

  readonly posts = toSignal(this.posts$, { initialValue: [] as Post[] });

  trackByPostId(_index: number, post: Post): number {
    return post.id;
  }
}
