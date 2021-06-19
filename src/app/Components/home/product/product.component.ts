import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Model/product';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() public product;
  blob: Blob;

  @Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() productAddToCollection: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.blob = new Blob([this.product.images],{type: "image/jpeg"})

  }

  addToCart() {
    this.productAddToCart.emit(this.product);
  }

    addToCollection() {
      this.productAddToCollection.emit(this.product);
    }
}
