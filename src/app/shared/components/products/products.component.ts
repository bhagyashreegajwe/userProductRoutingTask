import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproducts } from '../../models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['pname', 'pprice', 'pbrand', 'pmemory','pos','pid'];
  products !:Array<Iproducts>
  constructor(
    private _productService : ProductsService
  ) { }

  ngOnInit(): void {
    this.products = this._productService.fetchAllProducts();
  }

}
