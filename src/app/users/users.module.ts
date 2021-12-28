import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { UsersComponent } from './users.component';
import {SharedModule} from "../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListViewComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule
  ],
})
export class UsersModule { }
