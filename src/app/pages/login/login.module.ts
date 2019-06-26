import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { UserGuard } from 'src/app/services/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  exports: [LoginPage]
})
export class LoginPageModule {}
