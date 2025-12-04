import { Component, computed, inject, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

interface PostsState {
  status: LoadStatus;
  data: Post[];
  errorMessage: string | null;
}

@Component({
  selector: 'app-posts-computed-page',
  imports: [],
  templateUrl: './posts-computed-page.component.html',
  styleUrl: './posts-computed-page.component.scss',
})
export class PostsComputedPageComponent {
  private readonly postsService = inject(PostsService);

  // state único
  readonly state = signal<PostsState>({
    status: 'idle',
    data: [],
    errorMessage: null,
  });

  // derivados con computed
  readonly loading = computed(() => this.state().status === 'loading');
  readonly error = computed(() => this.state().errorMessage);
  readonly posts = computed(() => this.state().data);
  readonly total = computed(() => this.state().data.length);

  constructor() {
    this.load();
  }

  load(): void {
    this.state.set({
      status: 'loading',
      data: [],
      errorMessage: null,
    });

    this.postsService.getAll().subscribe({
      next: (posts) => {
        this.state.set({
          status: 'success',
          data: posts,
          errorMessage: null,
        });
      },
      error: (err) => {
        console.error('Error en patrón computed', err);
        this.state.set({
          status: 'error',
          data: [],
          errorMessage: 'Error al cargar (computed).',
        });
      },
    });
  }

  trackByPostId(_index: number, post: Post): number {
    return post.id;
  }
}
