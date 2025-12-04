import { Component, effect, inject, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts-effect-page',
  imports: [],
  templateUrl: './posts-effect-page.component.html',
  styleUrl: './posts-effect-page.component.scss',
})
export class PostsEffectPageComponent {
  private readonly postsService = inject(PostsService);

  readonly posts = signal<Post[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // trigger de recarga
  readonly reload = signal(0);

  constructor() {
    effect(() => {
      // cuando reload cambie, se vuelve a ejecutar este effect
      const _ = this.reload();

      this.loading.set(true);
      this.error.set(null);

      const sub = this.postsService.getAll().subscribe({
        next: (posts) => this.posts.set(posts),
        error: (err) => {
          console.error('Error en patrón effect', err);
          this.error.set('Error al cargar (effect).');
        },
        complete: () => {
          this.loading.set(false);
        },
      });

      // cleanup del effect: se ejecuta
      // - cuando vuelva a cambiar reload
      // - cuando se destruya el componente
      return () => sub.unsubscribe();
    });
  }

  reloadNow(): void {
    this.reload.update((v) => v + 1);
  }

  trackByPostId(_index: number, post: Post): number {
    return post.id;
  }
}
