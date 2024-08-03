import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproducts } from 'src/app/shared/models/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm! : FormGroup
  isInEditMode : boolean = false
  prodId !:string
  prodObj!:Iproducts

  constructor(
    private _productService : ProductsService,
    private _uuidService : UuidService,
    private _routes: ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.createProductForm();
    this.prodId = this._routes.snapshot.params['productId'];
    if(this.prodId){
      this.isInEditMode = true
      this.prodObj = this._productService.getSelectedProduct(this.prodId)!
      this.productForm.patchValue(this.prodObj)
    }else{
      this.isInEditMode = false
    }
  }

  createProductForm(){
    this.productForm = new FormGroup({
      pname : new FormControl(null, [Validators.required]),
      pabout : new FormControl(null, [Validators.required]),
      pprice : new FormControl(null, [Validators.required]),
      pimg : new FormControl(null, [Validators.required]),
      pbrand : new FormControl(null, [Validators.required]),
      pos:new FormControl(null, [Validators.required]),
      pmemory : new FormControl(null, [Validators.required]),
      pmodel : new FormControl(null, [Validators.required]),
    })
  }

  onAddProduct(){
    if(this.productForm.valid){
      let newProd = {...this.productForm.getRawValue(), pid:this._uuidService.uuid()}
      this._productService.addNewProduct(newProd)
    }
  }

  onEditProduct(){
    if(this.productForm.valid){
      let updateObj = {...this.productForm.value, pid:this.prodId}
      this._productService.updateProduct(updateObj)
    }
  }

  goToProducts(){
    this._router.navigate(['products'])
  }

}
