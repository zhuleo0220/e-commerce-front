import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Product } from 'src/app/Model/product';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  product: Product = {
    id: 0,
    description: '',
    price: 0,
    name: '',
    stock: 0,
    keywords: '',
    images: null,
    productCategoryId:0
  };
  products: Product[] = [];
  fileToUpload: File = null;
  auth: string;
  prodid: string;
  imageUrl: string = "/assets/img/noimage.png";

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    if (this.api.isAuthenticated) {
      this.auth = this.api.getToken();
      this.api.getProducts(0).subscribe(
        res => {
          res.data.forEach(pro => {
            if (pro.id == this.prodid) {
              this.product = pro;
            }
          });
        }
      );
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prodid = params["user"];
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  updateProd(desc:any, stock:any, price:any, name:any, image: any, keywords: any, categoryId: any) {
    console.log(this.product.id);
    this.api.updateProduct(desc.value, stock.value, price.value, name.value,  this.fileToUpload, keywords.value,categoryId.value, this.product.id).subscribe(res => {
      location.reload();
    });
  }

}
