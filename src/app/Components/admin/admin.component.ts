import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import {Category} from '../../Model/Category';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  categoryId = 0;
  fileToUpload: File = null;
  showAdd : boolean;
  auth: string;
  categories: Category[] = [];
  ifShow:boolean;
  selectedCategory: Category;
  subCategories: Category[] = [];
  subShow:boolean;
  private editCat: Category;
  private showEditCat: boolean;
  constructor(private api: ApiService, private router: Router) { }
  imageUrl: string = "/assets/img/noimage.png";
  showAddCategory: boolean;
  ngOnInit() {
    this.showEditCat=false;
    this.showAdd=false;
    this.showAddCategory=false;
    this.subShow=false;
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken(); this.subShow=false;
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
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  show() {
    this.showAdd = true;
  }
  showCategory() {
    this.showAddCategory= true;
  }
  hide() {
    this.showAdd = false;
    this.showAddCategory= false
  }
  addProd(desc:any, quan:any, price:any, prodname:any, image:any, keyword:any,categoryId:any) {
    this.api.addProduct(desc.value, quan.value, price.value, prodname.value, this.fileToUpload, keyword.value, categoryId.value).subscribe(res => {
      this.products = res.data;
    });
  }
  delProd(prodid:any) {

    this.api.deleteProduct(prodid.value).subscribe(res => {

      this.ngOnInit();
    });
  }
  edit(prodid:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "user": prodid.value
      }
    };
    this.router.navigate(["admin/edit"], navigationExtras);
  }
  onSelect(category: any) {
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
    this.ifShow=false;
    this.subShow =true;

  }
  toggleShow(){
    this.ifShow=!this.ifShow;
  }

  onSelectSub(category: Category) {
    this.api.getProducts(category.id).subscribe(
        res => {
          this.products = res.data;
        }
    );


  }

  showAll() {
    this.api.getProducts(0).subscribe(
        res => {
          this.products = res.data;
        }
    );
  }

  addCategory(parentid: any, name: any,  desc: any) {
    this.api.addCategory(parentid.value,name.value,desc.value).subscribe(res => {
    });
  }

  editCategory(category: Category) {
    this.api.getCategories(-1).subscribe(
        res => {
          res.data.forEach(cat => {
            if (cat.id == category.id) {
              this.editCat = cat;
              this.showEditCat=true;
            }
          });
        }
    );

  }

  delCategory(category: Category) {
    this.api.deleteCategory(category.id).subscribe(res => {

      this.ngOnInit();
    });
}

  clickEditCategory(parentid: any, name: any, desc: any) {

    this.api.editCategory(parentid.value,name.value,desc.value,this.editCat.id).subscribe(res => {
    });
    this.showEditCat=false;
  }
}
