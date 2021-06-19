import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Cart } from 'src/app/Model/cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  private auth: string;
  cartlist: Cart[];
  totalSum: number = 0;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit() {
    this.api.getCartItems().subscribe(res => {
      this.cartlist = res.data;
      this.cartlist.forEach(value => {
        this.totalSum = this.totalSum + (value.quantity * value.price);

      });
    });

  }
  updateCart(id, quantity:any) {
    this.api.updateCartItem(id, quantity.value).subscribe(res => {
    });
  location.reload();
  }
  deleteItem(id:any) {
    this.api.deleteCartItem(id).subscribe(res => {
    });
    location.reload();
  }

  placeOrder() {
    this.api.placeOrder().subscribe(res => {
      console.log(res);
    });
    this.route.navigate(['/home']);
  }

}
