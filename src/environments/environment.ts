// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:"http://localhost:8080",
  signupUrl : "/admin/register",
  loginUrl : "/admin/login",
  adminLoginUrl : "/admin/adminlogin",
  addToCartUrl : "/cart/add",
  viewCartUrl : "/cart/list",
  updateCartUrl : "/cart/update/quantity/",
  deleteCartUrl: "/cart/delete",
  addAddressUrl : "/user/address/update",
  viewAddressUrl : "/user/address/get",
  productsUrl : "/product/listAll/",
  addProductUrl : "/product/create",
  deleteProductUrl : "/product/delete",
  updateProductUrl : "/product/update",
  viewOrderUrl : "/order/list/",
  updateOrderUrl : "/admin/updateOrder",
  placeOrderUrl : "/order/createOrder",
  logoutUrl : "/admin/logout",
  categoriesUrl : "/productCategory/list/",
  addCategoryUrl: '/productCategory/create',
  deleteCategoryUrl: '/productCategory/delete/',
  updateCategoryUrl: '/productCategory/update',
  getCollectionUrl: '/member/productCollection/list',
  addToCollectiontUrl: '/member/productCollection/add',
  deleteToCollectiontUrl: '/member/productCollection/delete/',
    detailItemtUrl: '/order/',


};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error',  // Included with Angular CLI.
