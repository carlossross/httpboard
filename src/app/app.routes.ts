import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts-subscribe',
    pathMatch: 'full',
  },
  {
    path: 'posts-subscribe',
    loadComponent: () =>
      import('./posts/pages/posts-page/posts-page.component').then((m) => m.PostsPageComponent),
  },
  {
    path: 'posts-tosignal',
    loadComponent: () =>
      import('./posts/pages/posts-tosignal-page/posts-tosignal-page.component').then(
        (m) => m.PostsTosignalPageComponent
      ),
  },
  {
    path: 'posts-effect',
    loadComponent: () =>
      import('./posts/pages/posts-effect-page/posts-effect-page.component').then(
        (m) => m.PostsEffectPageComponent
      ),
  },
  {
    path: 'posts-computed',
    loadComponent: () =>
      import('./posts/pages/posts-computed-page/posts-computed-page.component').then(
        (m) => m.PostsComputedPageComponent
      ),
  },
  {
    path: 'posts-crud',
    loadComponent: () =>
      import('./posts/pages/posts-crud-page/posts-crud-page.component').then(
        (m) => m.PostsCrudPageComponent
      ),
  },
];
