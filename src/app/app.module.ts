import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import {Router, Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminLoginComponent } from './Components/adminLogin/adminLogin.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthguardGuard } from './Service/authguard.guard';
import { AdminComponent } from './Components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './Components/home/product/product.component';
import { CartItemComponent } from './Components/home/cart-item/cart-item.component';
import { AddressComponent } from './Components/home/address/address.component';
import { EditItemComponent } from './Components/admin/edit-item/edit-item.component';
import { OrderItemComponent } from './Components/admin/order-item/order-item.component';
import { AuthInterceptor } from './Service/AuthInterceptor';
import { CollectionComponent } from './Components/home/collection/collection.component';
import { OrderComponent } from './Components/home/order/order.component';
const appRoutes: Routes = [

{
  path:'login',
  component: LoginComponent
},{
    path:'admin/login',
    component: AdminLoginComponent
  },
{
  path:'register',
  component: RegisterComponent
},
{
  path:'admin',
  component: AdminComponent
}
,
{
  path:'home',
  component: HomeComponent,
},
{
  path:'home/cart',
  component: CartItemComponent,
  canActivate:[AuthguardGuard]
},
  {
    path:'home/collection',
    component: CollectionComponent,
    canActivate:[AuthguardGuard]
  },
  {
    path:'home/order',
    component: OrderComponent,
    canActivate:[AuthguardGuard]
  },
{
  path:'home/address',
  component: AddressComponent,
  canActivate:[AuthguardGuard],
  canLoad: [AuthguardGuard]
},
{
  path:'admin/edit',
  component: EditItemComponent,
  canActivate:[AuthguardGuard]
},
{
  path:'admin/order',
  component: OrderItemComponent,
  canActivate:[AuthguardGuard]
},
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,
    ProductComponent,
    HomeComponent,
    CartItemComponent,
    AddressComponent,
    AdminComponent,
    EditItemComponent,
    OrderItemComponent,
    CollectionComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    StorageServiceModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
