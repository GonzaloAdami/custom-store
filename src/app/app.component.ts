import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

class Producto {
  img: string;
  nombre: string;
  medidas: string;
  precio: number;
  cantidad: number;
  precioTotal: number;
  id: number;

  constructor(img: string, nombre: string, medidas: string, precio: number, id: number) {
    this.img = img;
    this.nombre = nombre;
    this.precio = precio;
    this.medidas = medidas;
    this.cantidad = 0;
    this.precioTotal = 0;
    this.id = id;
  }

  calcularPrecio() {
    this.precioTotal = this.cantidad * this.precio;
  }

  sumarCantidad() {
    this.cantidad++;
    this.calcularPrecio();
  }

  restarCantidad() {
    if (this.cantidad > 0) {
      this.cantidad--;
      this.calcularPrecio();
    }
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Productos: Array<Producto>;
  precioTotalFinal: number;

  constructor() {
    this.Productos = [];
    this.precioTotalFinal = 0;
  }

  ngOnInit() {
    this.getLocalStorage();
    this.actualizarPrecioTotalFinal();
  }

  isLocalStorageAvailable() {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  guardarProductosEnLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('Productos', JSON.stringify(this.Productos));
    } else {
      console.error('localStorage no está disponible.');
    }
  }

  getLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const productosJSON = localStorage.getItem('Productos');
      if (productosJSON) {
        const productosArray = JSON.parse(productosJSON);
        this.Productos = productosArray.map((producto: any) => new Producto(producto.img, producto.nombre, producto.medidas, producto.precio, producto.id));
        this.actualizarPrecioTotalFinal(); // Asegúrate de actualizar el total después de cargar los productos
      } else {
        console.error('No hay productos guardados en localStorage.');
      }
    } else {
      console.error('localStorage no está disponible.');
    }
  }

  actualizarPrecioTotalFinal() {
    this.precioTotalFinal = this.Productos.reduce((total, item) => total + item.precioTotal, 0);
  }

  eliminarProducto(id: number) {
    const index = this.Productos.findIndex(producto => producto.id === id);
    if (index !== -1) {
      this.Productos.splice(index, 1);
      this.actualizarPrecioTotalFinal(); // Actualiza el precio total después de eliminar
      this.guardarProductosEnLocalStorage(); // Guarda la lista actualizada en localStorage
    } else {
      console.error('Producto no encontrado.');
    }
  }

  crearProducto() {
    // Obtén los valores de los inputs
    const imagen = (document.getElementById('imagen') as HTMLInputElement)?.value;
    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value;
    const medicion = (document.getElementById('medicion') as HTMLInputElement)?.value;
    const precio = (document.getElementById('precio') as HTMLInputElement)?.value;

    // Verifica si todos los campos tienen valor
    if (imagen && nombre && medicion && precio) {
      this.getLocalStorage();

      let productoId = this.Productos.length > 0 ? this.Productos[this.Productos.length - 1].id + 1 : 0;
      const producto = new Producto(imagen, nombre, medicion, parseFloat(precio), productoId);
      this.Productos.push(producto);
      this.guardarProductosEnLocalStorage();
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
}
