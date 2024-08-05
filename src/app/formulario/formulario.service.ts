import { Injectable } from '@angular/core';
import { Producto } from '../producto/class.producto';
import { BDService } from '../lista/bd.service';



@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private BD : BDService) { }


ID(){
  const ID = this.BD.ListaDeProductos.length;
  return ID;
  }

getDatosFormulario(): [string, string, string, number, number] {
  const imagen = (document.getElementById('imagen') as HTMLInputElement).value;
  const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
  const medicion = (document.getElementById('medicion') as HTMLInputElement).value;
  const precio = parseFloat((document.getElementById('precio') as HTMLInputElement).value);
  
  // `ID` debe ser una función que retorna un número, no la referencia a la función
  const id = this.ID();

  return [imagen, nombre, medicion, precio, id];
}
  

resetFormulario() {
  const imagen = document.getElementById('imagen') as HTMLInputElement;
  const nombre = document.getElementById('nombre') as HTMLInputElement;
  const medicion = document.getElementById('medicion') as HTMLInputElement;
  const precio = document.getElementById('precio') as HTMLInputElement;

  // Asignamos una cadena vacía a cada campo para borrar su valor
  imagen.value = "";
  nombre.value = "";
  medicion.value = "";
  precio.value = "";
}

}
