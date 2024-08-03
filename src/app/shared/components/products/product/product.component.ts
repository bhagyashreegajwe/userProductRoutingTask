import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproducts } from 'src/app/shared/models/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId !: string
  productObj !:Iproducts
  constructor(
    private _routes : ActivatedRoute,
    private _productService : ProductsService
  ) { }

  ngOnInit(): void {
    this.productId = this._routes.snapshot.params['productId'];
    if(this.productId){
      this.productObj = this._productService.getSelectedProduct(this.productId)!
    }
  }

  removeProduct(id:string){
    let getConfirm = confirm('Are you sure to remove the product?');
    if(getConfirm){
      this._productService.removeProd(id)
    }
  }

}
