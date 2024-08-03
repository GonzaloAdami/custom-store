import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


/* 
* ------------------------------------------------------------------------------------------------------- 

    * Funcion : Clase
    ? Arquitectura que deben cumplir los Productos

* ------------------------------------------------------------------------------------------------------- 
 */
class Producto {

      img:         string; /** @param { Imagen del Producto } */
      nombre:      string; /** @param { Nombre del Producto } */
      medidas:     string; /** @param { Unidad en la que se va a medir el Producto } */
      precio:      number; /** @param { Precio que va a tener el Producto } */
      cantidad:    number; /** @param { Cantidad de Productos en la lista } */
      precioTotal: number; /** @param { El valor del precio multiplicado con la cantidad de productos a llevar } */
      id:          number; /** @param { ID del Producto para identifiarlo } */

  constructor(img: string, nombre: string, medidas: string, precio: number, id: number) {

    this.img =         img;
    this.nombre =      nombre;
    this.precio =      precio;
    this.medidas =     medidas;
    this.cantidad =    0;
    this.precioTotal = 0;
    this.id =          id;

  }

/**
  Debe retornar el precio total, la operacion 
  depende de una cantidad y del precio del producto
  @returns: @type { number } */
  calcularPrecio() {
    this.precioTotal = this.cantidad * this.precio;
  }

/**
  Debe aumentar en 1 la cantidad deL Producto
  @returns: @type { number } */
  sumarCantidad() {

    this.cantidad++;
    //Multuplicar cantidad por el precio
    this.calcularPrecio(); 

  }

/**
  Debe disminuir en 1 la cantidad deL Producto 
  @returns: @type { number } */
  restarCantidad() {

    if (this.cantidad > 0) {

      this.cantidad--;
      //Multuplicar cantidad por el precio
      this.calcularPrecio();

    }

  }
}

/* 
* ------------------------------------------------------------------------------------------------------- 

    * Funcion : Componente
    ? Es la clase principal del archivo

* ------------------------------------------------------------------------------------------------------- 
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

/* -----------------------
  * Variables principales
-------------------------*/

  Productos: Array<Producto>;
  precioTotalFinal: number;

  constructor() {
  /**
    @param { Asignar el valor de las variables declaradas }*/
    this.Productos = [];
    this.precioTotalFinal = 0;

  }

  ngOnInit() {
  /**
    @param { Obtiene el local storague y actualiza el precio final }*/
    this.getLocalStorage();
    this.actualizarPrecioTotalFinal();
  }

/* 
? -------------------------------------------------------------------------------------------------
  ! LocalStorate Setter / Getter
?------------------------------------------------------------------------------------------------*/

/**
  @param { Validacion del funcionamiento del LocalStorage }*/
  isLocalStorageAvailable() {

    try {

    //Establecemos la clave
      const testKey = '__test__';

      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);

      return true;

    }catch (e) { return false; } // Retornamos el error
  }

/**
  @param { Validacion del funcionamiento del LocalStorage }*/
  guardarProductosEnLocalStorage() {

    if (this.isLocalStorageAvailable()) {

  /** @param { Guarda en el local storage } */
      localStorage.setItem('Productos', JSON.stringify(this.Productos));

    }else { console.error('localStorage no está disponible.') };//Manejo de errores al Settear

  }

/**
  @param { Validacion del funcionamiento del LocalStorage }*/
  getLocalStorage() {

    /**
    @return { Validacion del funcionamiento del LocalStorage }*/
    if (this.isLocalStorageAvailable()) {

    //Obtener el LocalStorague
      const productosJSON = localStorage.getItem('Productos');

    // Validar si hay elementos en LocalStorague
      if (productosJSON) {

      //Trasformar los datos JSON a un objeto de JS
        const productosArray = JSON.parse(productosJSON);

      //Guardar todos los productos del LocalStorague en el Array<Producto> llamado Productos 
        this.Productos = productosArray.map((producto: any) => 

        //Creando el producto con los las propiedades de cada elementos en el LocalStorage
          new Producto(
            producto.img, 
            producto.nombre, 
            producto.medidas,
            producto.precio,  
            producto.id
          )

        );

      //Actualizar el precio final de la lista agregada
        this.actualizarPrecioTotalFinal(); 

      } else {  console.error('No hay productos guardados en localStorage.'); } //Error si no hay Producto en el LocalStorague

    } else { console.error('localStorage no está disponible.'); } //Error si el LocalSrotague no funciona

  }


/* 
? -------------------------------------------------------------------------------------------------
  ! Actualizar el precio total de la compra de todos los productos
?------------------------------------------------------------------------------------------------*/
/**
  @param { Sumar el precio total de todos los productos seleccionados }*/
  actualizarPrecioTotalFinal() {
    this.precioTotalFinal = this.Productos.reduce((total, item) => total + item.precioTotal, 0);
  }

  /* 
? -------------------------------------------------------------------------------------------------
  ! Resetep del formulario
?------------------------------------------------------------------------------------------------*/

/**
  @param { Borrar todos los datos de los imputs para limpiar el formulario }*/
  resetForm() {

    (document.getElementById('imagen')    as HTMLInputElement).value = '';
    (document.getElementById('nombre')    as HTMLInputElement).value = '';
    (document.getElementById('medicion')  as HTMLInputElement).value = '';
    (document.getElementById('precio')    as HTMLInputElement).value = '';

  }

  /* 
? -------------------------------------------------------------------------------------------------
  ! Eliminacion del Producto
?------------------------------------------------------------------------------------------------*/

/**
  @param { Buscar los Productos por su ID y eliminarlo del localStorage }*/
  eliminarProducto(id: number) {

  //Busca el Producto por su ID que revibe como parametro
    const index = this.Productos.findIndex(producto => producto.id === id);

  //Validar que el ID no sea un numero negativo
    if (index !== -1) {

    //Eliminar el Producto de la lista 
      this.Productos.splice(index, 1);
      
    //Calcular el precio final de la suma de los Productos restantes
      this.actualizarPrecioTotalFinal(); 

    //Guardar la la lista sin el elemento borrado en el LocalStorague
      this.guardarProductosEnLocalStorage();

    } else { console.error('Producto no encontrado.'); } // Error si el Producto no fue encontrado

  }

  /* 
? -------------------------------------------------------------------------------------------------
  ! Creacion del producto
?------------------------------------------------------------------------------------------------*/

/**
  @param { Creacion de los producto }*/
  crearProducto() {

  //Obtén los valores de los inputs
    const imagen   =  (document.getElementById('imagen')     as HTMLInputElement)?.value;
    const nombre   =  (document.getElementById('nombre')     as HTMLInputElement)?.value;
    const medicion =  (document.getElementById('medicion')   as HTMLInputElement)?.value;
    const precio   =  (document.getElementById('precio')     as HTMLInputElement)?.value;

    // Verifica si todos los campos tienen valor
    if (imagen && nombre && medicion && precio) {
      
    //Obtener el LocalStorage
      this.getLocalStorage();

    //Crear el ID del Producto que es equivalente a la cantidad de Productos en la lista + 1
      let productoId = this.Productos.length > 0 ? this.Productos[this.Productos.length - 1].id + 1 : 0;
    
    //Creacion del producto
      const producto = new Producto(imagen, nombre, medicion, parseFloat(precio), productoId);

    //Guardar el Producto creado en la lista de los productos
      this.Productos.push(producto);

    //Guardar el Producto en el localStorague
      this.guardarProductosEnLocalStorage();

    //Resetear el Formulario para crear el siguiente Producto
      this.resetForm();

    } else { console.error('Por favor, complete todos los campos.'); }

  }
}
