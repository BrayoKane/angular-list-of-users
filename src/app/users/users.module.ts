import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { UsersComponent } from './users.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ListViewComponent,
    UsersComponent
  ],
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
})
export class UsersModule { }
