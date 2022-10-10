import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { PageAComponent } from './pages/page-a/page-a.component';
import { PageBComponent } from './pages/page-b/page-b.component';
import { PageCComponent } from './pages/page-c/page-c.component';

import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: 'a-page',
    component: PageAComponent,
  },
  {
    path: 'b-page',
    component: PageBComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'c-page',
    component: PageCComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
