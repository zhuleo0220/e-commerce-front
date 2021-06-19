import { Component, OnInit } from '@angular/core';

import {ApiService} from '../../../Service/api.service';
import {Router} from '@angular/router';
import {Orders} from '../../../Model/Orders';
import {Address} from '../../../Model/address';
import {Cart} from '../../../Model/cart';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private auth: string;
  orderList: Orders[];
  detailOrder: Orders;
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phoneNumber: ''

  };
  cartlist: Cart[];
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.getOrders(1).subscribe(res => {
      this.orderList = res.data;
      this.orderList.forEach(value => {
        value.showDetail=false;
      });
    });

  }

  showDetailOrder(order: Orders) {
    this.orderList.forEach(value => {
      if(value.id==order.id){
        value.showDetail=!value.showDetail;
      } else{
        value.showDetail=false;
      }
    });
    this.detailOrder = order;
    this.api.getAddress().subscribe(res => {
      if (res.data != null) {
        this.model = res.data;
      }
    };
    this.api.getDetailItems(order.id).subscribe(res => {
      this.cartlist = res.data;
    });
  }

  PayOrder(order: Orders) {
  }

  ComfirmReceive(order: Orders) {
    
  }
}
