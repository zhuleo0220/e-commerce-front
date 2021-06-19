import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: any;
  error = false;
  constructor(private apiService: ApiService,private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  login(): void {
    this.apiService.login(this.loginForm.value).
      subscribe(res => {
        if (res.code == "200" ) {
          this.apiService.storeToken(res.data, "customer");
          this.router.navigate(['/home']);
          this.error = false;
          this.messageService.clear();
          this.messageService.add("login success")
        }else if (res.code==404){
          this.messageService.clear();
          this.messageService.add("wrong username or wrong password");
        }
      },
        err => {
          this.router.navigate(['/login']);
      });
  }
}
