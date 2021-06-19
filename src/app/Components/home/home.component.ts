import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import {Category} from '../../Model/Category';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  categoryId: any;
  ifShow:boolean;
    selectedCategory: Category;
    subCategories: Category[] = [];
    subShow:boolean;
  constructor(private api: ApiService,private messageService: MessageService) { }

  ngOnInit() {
      this.subShow=false;
      this.categoryId = 0;
      this.api.getProducts(this.categoryId).subscribe(
        res => {
          this.products = res.data;
        }
      );
    this.api.getCategories(this.categoryId).subscribe(
        res => {
          this.categories = res.data;
        }
    );
  }

  addToCart(e) {
    this.api.addToCart(e).subscribe(res => {
        if(res.code==401){
            this.messageService.clear();
            this.messageService.add("login first");
        } else{
            this.messageService.clear();
            this.messageService.add("add to cart success");
        }
    });
  }

    onSelect(category: any) {
      this.messageService.clear();
      this.selectedCategory=category;
        this.api.getCategories(category.id).subscribe(
            res => {
                this.subCategories = res.data;
            }
        );
        this.api.getProducts(category.id).subscribe(
            res => {
                this.products = res.data;
            }
        );

        if(this.subCategories.length){
            this.messageService.add('no category exist');

        } ;
        this.ifShow=false;
        this.subShow=true;

    }
    toggleShow(){
      this.ifShow=!this.ifShow;
    }

    onSelectSub(category: Category) {
      this.messageService.clear();
        this.api.getProducts(category.id).subscribe(
            res => {
                this.products = res.data;
            }
        );
     if(this.products.length){
            this.messageService.add('no product exist');

        };


    }
    showAll() {
        this.api.getProducts(0).subscribe(
            res => {
                this.products = res.data;
            }
        );
    }

    addToCollection(e) {
        this.api.addToCollection(e).subscribe(res => {
            if(res.code==401){
                this.messageService.clear();
                this.messageService.add("login first");
            }else{
                this.messageService.clear();
                this.messageService.add("add to collection success");
            }
    })
}
}
