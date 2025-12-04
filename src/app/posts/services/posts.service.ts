import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, retry } from 'rxjs';
import { PostDTO } from '../models/post.dto';
import { mapPostDomainToDTO, mapPostDTOToDomain } from '../models/post.mapper';
import { CreatePostPayload, Post, UpdatePostPayload } from '../models/post.model';
import { SKIP_AUTH, SKIP_LOG } from '../../core/http/http-context-tokens';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAll() {
    const ctx = new HttpContext().set(SKIP_AUTH, true);
    return this.http.get<PostDTO[]>(this.apiUrl, { context: ctx }).pipe(
      retry(2),
      map((dtos) => dtos.map(mapPostDTOToDomain))
    );
  }

  getById(id: number) {
    const ctx = new HttpContext().set(SKIP_LOG, true);
    return this.http
      .get<PostDTO>(`${this.apiUrl}/${id}`, { context: ctx })
      .pipe(retry(2), map(mapPostDTOToDomain));
  }

  create(payload: CreatePostPayload) {
    const dto = mapPostDomainToDTO({ ...payload, id: 0 });

    return this.http.post<PostDTO>(this.apiUrl, dto).pipe(map(mapPostDTOToDomain));
  }

  update(id: number, payload: UpdatePostPayload) {
    // unimos el id con el payload parcial
    const dto = mapPostDomainToDTO({ id, ...payload } as Post);

    return this.http.put<PostDTO>(`${this.apiUrl}/${id}`, dto).pipe(map(mapPostDTOToDomain));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
