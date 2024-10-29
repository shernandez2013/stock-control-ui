import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, category: 'Category A' },
    { id: 2, name: 'Product 2', price: 150, category: 'Category B' },
  ];

  constructor() {
    this.productsSubject.next(this.products);
  }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.productsSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index > -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next(this.products);
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
    this.productsSubject.next(this.products);
  }
}

export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
}
