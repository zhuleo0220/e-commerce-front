import { Component, OnInit } from '@angular/core';
import {Product} from '../../../Model/product';
import {Category} from '../../../Model/Category';
import {ApiService} from '../../../Service/api.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  products: Product[] = [];

  auth: string;

  constructor(private api: ApiService, ) { }

  ngOnInit() {

    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProductsByCollection().subscribe(
          res => {
            this.products = res.data;
          }
      );

    }
  }


  delProd(prdid: any) {
    this.api.deleteProductsByCollection(prdid).subscribe();
location.reload();
  }
}
