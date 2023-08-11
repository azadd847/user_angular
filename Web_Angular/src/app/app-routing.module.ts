import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomerComponent } from './components/customer/customer.component'

import { ProductsComponent } from './components/products/products.component';
import { OtherComponent } from './components/other/other.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'; // Kayıt olma bileşeni eklenmeli


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'other',
    component: OtherComponent
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/home' },




 
  // { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }