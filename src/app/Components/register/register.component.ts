import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: any;
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
              private messageService: MessageService) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      password: '',
      username: '',
      usertype: 'customer'
    });
  }
  register(): void {

    this.apiService.register(this.registerForm.value).
      subscribe(res => {
          if(res.code==200){
            this.messageService.clear();
            this.messageService.add("register success");
          } else if (res.code==500){
            this.messageService.clear();
            this.messageService.add("register failed username already exists");
        }
      },
        err => {
          alert("An error has occured, Please try again !!!");
        });

  }
}

