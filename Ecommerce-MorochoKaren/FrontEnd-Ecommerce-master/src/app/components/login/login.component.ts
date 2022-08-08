import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroupLogin!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router: Router){

  }
  ngOnInit() {
    this.builderFormGroupLogin();
  }
  builderFormGroupLogin(){
    this.formGroupLogin = this.formBuilder.group(
      {
      userName: ['', Validators.required],
      password: ['',Validators.required]
    },
    );
  }
  get UserNameField(){
    return this.formGroupLogin.get('UserName')
  }
  get PasswordField(){
    return this.formGroupLogin.get('Password')
  }
  onSubmit(event : Event){
    event.preventDefault();
    console.log(this.formGroupLogin);
    if(this.formGroupLogin.status == 'VALID'){
      console.log('ejecutar servicio login');
      this.authService.login(this.formGroupLogin.getRawValue());

    }
  }


}
