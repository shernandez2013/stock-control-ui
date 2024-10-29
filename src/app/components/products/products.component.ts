import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ProductService} from "../../services/product.service";
import {Table} from "primeng/table";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  products: Product[] = [];
  selectedProduct: Product | null = null;
  productDialog: boolean = false;
  isEdit: boolean = false;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.products = [
      {id: 1, name: 'Product 1', category: 'Category 1', price: 100},
      {id: 2, name: 'Product 2', category: 'Category 2', price: 200},
    ];
  }

  openNewProductDialog() {
    this.selectedProduct = {name: '', category: '', price: 0};
    this.isEdit = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = {...product};
    this.isEdit = true;
    this.productDialog = true;
  }

  saveProduct() {
    if (this.isEdit && this.selectedProduct) {
      const index = this.products.findIndex(p => p.id === this.selectedProduct?.id);
      this.products[index] = this.selectedProduct;
    } else {
      this.selectedProduct!.id = this.products.length + 1;
      this.products.push(this.selectedProduct!);
    }
    this.productDialog = false;
    this.selectedProduct = null;
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter(p => p.id !== product.id);
  }

  filterByName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filter(input.value, 'name', 'contains');
  }

  filterByCategory(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filter(input.value, 'category', 'contains');
  }

  filterByPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filter(input.value, 'price', 'contains');
  }

  hideDialog() {
    this.productDialog = false;
    this.selectedProduct = null;
  }
}
