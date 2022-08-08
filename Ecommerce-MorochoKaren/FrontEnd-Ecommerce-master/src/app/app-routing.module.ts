import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: '', children:[
    {path: 'home', component: HomeComponent},
    {path: 'brand', component: BrandComponent},
    {path: 'product-type', component: ProductTypeComponent},
    {path: 'product', component: ProductComponent},
    {path: 'cart', component: CartComponent},
  ] ,canActivate:[AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
