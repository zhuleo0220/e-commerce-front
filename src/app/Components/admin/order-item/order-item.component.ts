import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';
import {Orders} from '../../../Model/Orders';
import {Address} from '../../../Model/address';
import {Cart} from '../../../Model/cart';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

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
    this.api.getOrders(0).subscribe(res => {
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

  DeliveryOrder(order: Orders) {
    this.api.deliveryItem(order.id).subscribe();
     location.reload();
  }
}
