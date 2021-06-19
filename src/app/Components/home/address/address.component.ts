import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/Model/address';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  private addressForm: any;
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phoneNumber: ''

  };
  constructor(private api: ApiService, private route: Router,private messageService: MessageService) { }

  ngOnInit() {
    this.api.getAddress().subscribe(res => {
      if (res.data != null) {
        this.model = res.data;
      }
    }, err => {
      console.log(err);
    });
  }

  addOrUpdateAddress() {
    this.api.addOrUpdateAddress(this.model).subscribe(res => {
      if(res.code==200) {
        this.messageService.add('update address successfully');
      }
      // location.reload();
    });

  }

}
