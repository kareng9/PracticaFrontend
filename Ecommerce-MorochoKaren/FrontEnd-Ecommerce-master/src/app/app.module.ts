import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BASE_URL } from './models/constanst';
import { environment } from 'src/environments/environment';


import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';




@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    ProductComponent,
    HomeComponent,
    ProductTypeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:BASE_URL, useValue:(environment.baseUrl.length > 0 ? environment.baseUrl : 'https://localhost:5000')
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
