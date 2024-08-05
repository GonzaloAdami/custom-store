import { Injectable } from '@angular/core';
import { FormularioService } from '../formulario/formulario.service';
import { Producto } from '../producto/class.producto';
import { BDService } from '../lista/bd.service';
import { LocalStorageService } from '../localStorage/local-storage.service';




@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor(
    private Formulario : FormularioService,
    public BD: BDService,
    private LocalStorage : LocalStorageService,
  ) { 


  }

  async getValidacion(): Promise<{ isValid: boolean; errors: string[] }> {
    let [imagen, nombre, medicion, precio] = this.Formulario.getDatosFormulario();
    const errors: string[] = [];
  
    const isImage = async (url: string): Promise<boolean> => {
      try {
        const response = await fetch(url);
        console.log('Response status:', response.status);
        if (!response.ok) {
          console.log('Response status text:', response.statusText);
          errors.push(`No se pudo acceder a la imagen: ${response.statusText}`);
          return false;
        }
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        return contentType !== null && contentType.startsWith('image/');
      } catch (error) {
        console.error('Fetch error:', error);
        errors.push(`Error al verificar la imagen: ${(error as Error).message}`);
        return false;
      }
    };
  
    // Verifica si la imagen es válida y la reemplaza si es necesario
    if (typeof imagen === 'string' && imagen !== '') {
      const isValidImage = await isImage(imagen);
      if (!isValidImage) {
        imagen = './default.webp';
      }
    } else {
      imagen = './default.webp';
      errors.push('La URL de la imagen es inválida o está vacía.');
    }
  
    // Verifica que el resto de los datos sean válidos
    if (typeof nombre !== 'string' || nombre === '') {
      errors.push('El nombre es inválido.');
    }
    if (typeof medicion !== 'string' || medicion === '') {
      errors.push('La medición es inválida.');
    }
    if (typeof precio !== 'number') {
      errors.push('El precio es inválido.');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  
  




  
  
  async newProducto() {
    if (await this.getValidacion()) {
      // Verifica si el producto ya existe en local storage
      if (!this.LocalStorage.validarLocalStorage()) {
        // Obtén los datos del formulario
        const [imagen, nombre, medicion, precio, id] = this.Formulario.getDatosFormulario();
        
        // Verifica si el producto ya está en la lista para evitar duplicados
        if (!this.BD.ListaDeProductos.some((producto: Producto) => producto.id === id)) {
          
                // Crea un nuevo producto
                const nuevoProducto = new Producto(imagen, nombre, medicion, precio, id);
                
                // Agrega el nuevo producto a la lista
                this.BD.ListaDeProductos.push(nuevoProducto);
                
                // Actualiza el local storage
                this.LocalStorage.setLocalStorage();
            
        }else{ alert("Este producto ya se encuentra en la lista"); }            
      }else{ alert("Este producto ya se encuentra en la lista"); }
    }else{console.error('Error : Error en la validacion de los datos del formulario')}
    
    // Resetea el formulario
    this.Formulario.resetFormulario();
    
  } 


  

  eliminarProducto(id: number) {
    this.BD.ListaDeProductos = this.BD.ListaDeProductos.filter((item) => item.id !== id);
    localStorage.setItem('ListaDeProductos', JSON.stringify(this.BD.ListaDeProductos));

  }

 obtenerPrecioTotalLista(): number {
  return this.BD.ListaDeProductos.reduce((total: number, producto: Producto) => {
    return total + producto.getPrecioTotal(); // Use producto.getPrecioTotal() for price
  }, 0);
}

}
