import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
import { User } from '../Model/user';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Address } from '../Model/address';
import { environment } from 'src/environments/environment';
import {Category} from '../Model/Category';
import {Cart} from '../Model/cart';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {

  }
  // Registering new users to the system
  register(user: User): Observable<any> {
    return this.http.post(environment.baseUrl+environment.signupUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' }
      });
  }
  // validating user credentials
  login(user: User): Observable<any> {
    return this.http.post(environment.baseUrl+environment.loginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json' ,
            'Access-Control-Allow-Origin': '*'
           }
      });
  }
  adminLogin(user: User): Observable<any> {
    return this.http.post(environment.baseUrl+environment.adminLoginUrl,
        JSON.stringify(user),
        {
          headers:
              { 'Content-Type': 'application/json' ,
                'Access-Control-Allow-Origin': '*'
              }
        });
  }

  logout(){
    this.http.get<any>(environment.baseUrl+environment.logoutUrl);
  }

  // Add Products to the Cart
  addToCart(product: Product ): Observable<any> {
    return this.http.post<any>(environment.baseUrl+environment.addToCartUrl , product );
  }

  // View Cart items
  getCartItems(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.viewCartUrl);
  }

  // update items quantity in the cart
  updateCartItem(prodid: number, quant: number): Observable<any> {
    const cart: Cart = new class implements Cart {
      id=prodid;
      omemberId: number;
      price: number;
      productId: number;
      productName: string;
      quantity=quant;
      suntotal: number;
    }
    return this.http.put<any>(environment.baseUrl+environment.updateCartUrl, cart);
  }

  // delete cart Item
  deleteCartItem(id: number): Observable<any> {
    return this.http.delete<any>(environment.baseUrl+environment.deleteCartUrl + "?id=" + id);
  }

  // update Address
  addOrUpdateAddress(adr: Address): Observable<any> {
    return this.http.post<any>(environment.baseUrl+environment.addAddressUrl, adr);
  }

  // fetch address
  getAddress(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.viewAddressUrl);
  }

   // Fetching all the products
   getProducts(categoryId: number): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.productsUrl+categoryId);
  }
  getProduct(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.productsUrl);
  }

  // Add product in the system
  addProduct( desc: string,
    quan: string, price: string, prodname: string, image: File, keyword: string, categoryId:any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("images", image);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("name", prodname);
    formData.append("stock", quan);
    formData.append("keyword", keyword);
    formData.append("categoryId", categoryId);
    return this.http.post<any>(environment.baseUrl+environment.addProductUrl, formData);

  }

  // update Product for Logged Admin User
  updateProduct( desc: string,
    quan: string, price: string, prodname: string, image: File, keywords: string,categoryId: any, id: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("name", prodname);
    formData.append("stock", quan);
    formData.append("images", image);
    formData.append("keyword", keywords);

    formData.append("categoryId", categoryId);
    formData.append("productId", id);
    return this.http.put<any>(environment.baseUrl+environment.updateProductUrl, formData);
  }

  // delete Product
  deleteProduct( prodid: number) {
    return this.http.delete<any>(environment.baseUrl+environment.deleteProductUrl + "?productId=" + prodid);
  }

  // fetch available orders placed
  getOrders(id: number) {
    return this.http.get<any>(environment.baseUrl+environment.viewOrderUrl+id);
  }

   // place the order
   placeOrder(): Observable<any> {
    return this.http.post<any>(environment.baseUrl+environment.placeOrderUrl,1);
  }

  // update status for order
  updateStatusForOrder( order: any) {
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("orderStatus", order.orderStatus);
    return this.http.post<any>(environment.baseUrl+environment.updateOrderUrl, formData)
  }

  // Authentication Methods

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  storeToken(token: string, auth_type: string) {
    this.storage.set("auth_token", token);
    this.storage.set("auth_type", auth_type);
  }

  getAuthType(): string {
    if (this.storage.get("auth_type") !== null) {
      return this.storage.get("auth_type");
    }
    return null;
  }

  getToken() {
    return this.storage.get("auth_token");
  }

  removeToken() {
    this.storage.remove("auth_type");
    return this.storage.remove("auth_token");
  }

  getCategories(categoryId: number) {
    return this.http.get<any>(environment.baseUrl+environment.categoriesUrl+categoryId);

  }

  addCategory(parentid: any, name: any, level: any, product_count: any, keywords: any, desc: any):Observable<any> {

    const category: Category=new class implements Category {
      description = desc;
      id: number;
      keywords=keywords;
      level=level;
      name=name;
      parent_id=parentid;
      product_count=product_count;
    }
    return this.http.post<any>(environment.baseUrl+environment.addCategoryUrl, category);

  }

  deleteCategory(id: number) {
    return this.http.delete<any>(environment.baseUrl+environment.deleteCategoryUrl + "?categoryId=" + id);


  }

  editCategory(parentid: any, name: any, level: any, product_count: any, keywords: any, desc: any,id:any) {
    const category: Category=new class implements Category {
      description = desc;
      id= id;
      keywords=keywords;
      level=level;
      name=name;
      parent_id=parentid;
      product_count=product_count;
    };
    return this.http.post<any>(environment.baseUrl+environment.updateCategoryUrl, category);


  }

  getProductsByCollection() {
    return this.http.get<any>(environment.baseUrl+environment.getCollectionUrl);

  }

  addToCollection(product: Product) {
    return this.http.post<any>(environment.baseUrl+environment.addToCollectiontUrl , product );

  }

  deleteProductsByCollection(prodid: any) {
    return this.http.delete<any>(environment.baseUrl+environment.deleteToCollectiontUrl + "?productId=" + prodid);

  }

  getDetailItems(orderId:number) {
    return this.http.get<any>(environment.baseUrl+environment.detailItemtUrl  +orderId);
  }
}
