import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users.component";
import {ListViewComponent} from "./list-view/list-view.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list-view',
        pathMatch:'full'
      },
      {
        path: 'list-view',
        component: ListViewComponent,
        data: {
          breadcrumb: [
            {
              label: 'Dashboard',
              url: 'home',
            },
            {
              label: 'Applications',
              url: 'applications'
            },
            {
              label: 'Settlement Invoices',
              url: '',
            },
          ],
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
