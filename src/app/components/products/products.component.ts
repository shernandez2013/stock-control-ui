import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {Product, ProductService} from "../../services/product.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'category'];
  dataSource: MatTableDataSource<Product>;
  newProduct: Product = { id: 0, name: '', price: 0, category: '' };
  editingProduct: Product | null = null;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, category: 'Category A' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category B' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category B' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category B' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category B' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category B' },
  ];

  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource<Product>(this.products);
  }

  ngOnInit() {
    this.dataSource.data = this.products;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addProduct() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.newProduct);
      this.editingProduct = null;
    } else {
      this.newProduct.id = this.dataSource.data.length + 1;
      this.productService.addProduct(this.newProduct);
    }
    this.newProduct = { id: 0, name: '', price: 0, category: '' };
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.newProduct = { ...product };
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
}
