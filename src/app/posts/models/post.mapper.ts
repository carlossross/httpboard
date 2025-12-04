import { PostDTO } from './post.dto';
import { Post } from './post.model';

export function mapPostDTOToDomain(dto: PostDTO): Post {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.body,
    authorId: dto.userId,
  };
}

export function mapPostDomainToDTO(post: Post): PostDTO {
  return {
    id: post.id,
    title: post.title,
    body: post.content,
    userId: post.authorId,
  };
}
