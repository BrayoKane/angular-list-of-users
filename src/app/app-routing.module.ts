import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./shared/components/nav/nav.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path:'',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)}
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
