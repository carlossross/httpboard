import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CreatePostPayload, Post, UpdatePostPayload } from '../../models/post.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts-crud-page',
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './posts-crud-page.component.html',
  styleUrl: './posts-crud-page.component.scss',
})
export class PostsCrudPageComponent {
  private readonly postsService = inject(PostsService);
  private readonly destroyRef = inject(DestroyRef);

  // 📦 Estado principal
  readonly posts = signal<Post[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // 📦 Estado para GET by id
  readonly searchId = signal<number | null>(null);
  readonly selectedPost = signal<Post | null>(null);

  // 📦 Estado para crear
  newTitle = '';
  newContent = '';
  newAuthorId: number | null = null;

  // 📦 Estado para actualizar
  editId: number | null = null;
  editTitle = '';
  editContent = '';
  editAuthorId: number | null = null;

  constructor() {
    this.loadAll();
  }

  // 🔹 GET lista
  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);

    this.postsService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (posts) => this.posts.set(posts),
        error: (err) => {
          console.error('Error cargando lista', err);
          this.error.set('Error al cargar la lista de posts.');
        },
      });
  }

  // 🔹 GET por id
  loadById(): void {
    const id = this.searchId();
    if (id == null) return;

    this.loading.set(true);
    this.error.set(null);
    this.selectedPost.set(null);

    this.postsService
      .getById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (post) => this.selectedPost.set(post),
        error: (err) => {
          console.error('Error cargando post por id', err);
          this.error.set(`No se pudo cargar el post con id ${id}.`);
        },
      });
  }

  // 🔹 POST crear
  createPost(): void {
    if (!this.newTitle || !this.newContent) {
      this.error.set('Título y contenido son requeridos para crear.');
      return;
    }

    const payload: CreatePostPayload = {
      title: this.newTitle,
      content: this.newContent,
      authorId: this.newAuthorId ?? 1,
    };

    this.loading.set(true);
    this.error.set(null);

    this.postsService
      .create(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (created) => {
          // lo agregamos a la lista local
          this.posts.update((current) => [created, ...current]);
          // limpiamos el formulario
          this.newTitle = '';
          this.newContent = '';
          this.newAuthorId = null;
        },
        error: (err) => {
          console.error('Error creando post', err);
          this.error.set('No se pudo crear el post.');
        },
      });
  }

  // 🔹 PUT update
  updatePost(): void {
    if (this.editId == null) {
      this.error.set('Necesitas un id para actualizar.');
      return;
    }

    const payload: UpdatePostPayload = {
      title: this.editTitle || undefined,
      content: this.editContent || undefined,
      authorId: this.editAuthorId ?? undefined,
    };

    this.loading.set(true);
    this.error.set(null);

    this.postsService
      .update(this.editId, payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (updated) => {
          // actualizamos la lista local
          this.posts.update((current) => current.map((p) => (p.id === updated.id ? updated : p)));
        },
        error: (err) => {
          console.error('Error actualizando post', err);
          this.error.set(`No se pudo actualizar el post con id ${this.editId}.`);
        },
      });
  }

  // 🔹 DELETE
  deletePost(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.postsService
      .delete(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          this.posts.update((current) => current.filter((p) => p.id !== id));
        },
        error: (err) => {
          console.error('Error eliminando post', err);
          this.error.set(`No se pudo eliminar el post con id ${id}.`);
        },
      });
  }

  trackByPostId(_index: number, post: Post): number {
    return post.id;
  }
}
