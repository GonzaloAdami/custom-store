import { Injectable } from '@angular/core';
import { BDService } from '../lista/bd.service';
import { FormularioService } from '../formulario/formulario.service';
import { Producto } from '../producto/class.producto';




@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private BD: BDService,  private Formulario : FormularioService) { }

  setLocalStorage() {
    try {
        // Obtén los datos existentes en el local storage
        const LocalStorage = localStorage.getItem('ListaDeProductos');
        let LocalStorageData = [];
        
        if (LocalStorage) {
          LocalStorageData = JSON.parse(LocalStorage);
        }

        // Obtén la lista de productos nuevos
        const copiaListaLocal = this.BD.ListaDeProductos;

        // Filtra los productos nuevos para que solo se agreguen los que no están en el local storage
        const nuevaLista = copiaListaLocal.filter(product => {

            return !LocalStorageData.some((newProducto: { id: number; }) => newProducto.id === product.id);
            
        });

        // Combina la lista existente con los nuevos productos
        const listaActualizada = [...LocalStorageData, ...nuevaLista];

        // Guarda la lista actualizada en el local storage
        const DatoStringify = JSON.stringify(listaActualizada);
        localStorage.setItem('ListaDeProductos', DatoStringify);
    } catch (error) {
        console.error('Error al actualizar el local storage:', error);
    }
}



  getLocalStorage(){
    const LocalStorage = localStorage.getItem('ListaDeProductos')
    const DataParse: Array<Producto> = LocalStorage ? JSON.parse(LocalStorage) : [];
    DataParse.map((item) => this.BD.ListaDeProductos.push(new Producto(item.imagen , item.nombre, item.medicion, item.precio, item.id)));
  }
  
  validarLocalStorage(): boolean {
    const localStorageData = localStorage.getItem('ListaDeProductos');
    if (localStorageData) {
        const ListaDeProductos = JSON.parse(localStorageData);
        const [ , nombre , medicion, , ] = this.Formulario.getDatosFormulario();
        return ListaDeProductos.some((producto: Producto) => producto.nombre === nombre && producto.medicion === medicion);
    }else{
      return false
    }
    
}

}
