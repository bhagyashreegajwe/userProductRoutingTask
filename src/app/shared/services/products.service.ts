import { Injectable } from '@angular/core';
import { Iproducts } from '../models/product.interface';
import { products } from '../const/products';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  allProducts: Array<Iproducts> = products
  constructor(
    private _router: Router
  ) { }

  fetchAllProducts(){
    return this.allProducts;
  }

  getSelectedProduct(id:string){
    return this.allProducts.find(prod => prod.pid === id)
  }

  addNewProduct(newObj: Iproducts){
    this.allProducts.push(newObj)
    this._router.navigate(['products'])
  }

  updateProduct(updateObj:Iproducts){
    let getIndex = this.allProducts.findIndex(prod => prod.pid === updateObj.pid);
    this.allProducts[getIndex] = updateObj
    this._router.navigate(['products'])
  }

  removeProd(id:string){
    let getIndex = this.allProducts.findIndex(prod => prod.pid === id);
    this.allProducts.splice(getIndex,1);
    this._router.navigate(['products'])
  }
}
