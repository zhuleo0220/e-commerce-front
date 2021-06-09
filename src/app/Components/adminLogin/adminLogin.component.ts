import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './adminLogin.component.html',
  styleUrls: ['./adminLogin.component.css']
})
export class AdminLoginComponent implements OnInit {

  private loginForm: any;
  error = false;
  constructor(private apiService: ApiService,
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
    this.apiService.adminLogin(this.loginForm.value).
      subscribe(res => {
        if (res.code == "200" ) {
          this.apiService.storeToken(res.data, "admin");
          this.router.navigate(['/admin']);
          this.error = false;
        }
      },
        err => {
          this.router.navigate(['/admin/login']);
      });
  }
}
