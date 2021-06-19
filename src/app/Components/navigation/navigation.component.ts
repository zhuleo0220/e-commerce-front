import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private loggedType: string;
  constructor(private auth: ApiService, private route: Router,private messageService: MessageService) {

    if (this.auth.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.auth.getAuthType() == "customer") {
        this.loggedType = "customer";
      } else if (this.auth.getAuthType() == "admin") {
        this.loggedType = "admin";
      }
    }
  }

  ngOnInit() {
    //console.log(this.auth.getAuthType());

  }
  logout() {
    this.loggedType = "home";
    this.auth.removeToken();
    this.auth.logout();
    this.route.navigate(['/login']);
    this.messageService.clear();
    this.messageService.add('logout success')
  }

}
