export interface Post {
  id: number;
  title: string;
  content: string; // nombre pensado para nuestro dominio
  authorId: number; // evitamos el nombre "userId" porque es más semántico aquí
}

export type CreatePostPayload = Omit<Post, 'id'>;
export type UpdatePostPayload = Partial<Omit<Post, 'id'>>;
