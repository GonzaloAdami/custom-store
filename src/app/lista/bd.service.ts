import { Injectable } from '@angular/core';
import { Producto } from '../producto/class.producto';

@Injectable({
  providedIn: 'root'
})
export class BDService {
  ListaDeProductos: Array<Producto>
  constructor() {
    this.ListaDeProductos = [];
  }
}
