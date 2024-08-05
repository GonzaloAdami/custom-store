export class Producto{
    imagen: string;
    nombre: string;
    medicion: string;
    precio: number;
    id: number;
    unidades: number;

    constructor(imagen: string, nombre: string,  medicion: string, precio: number, id: number) {
    this.imagen = imagen ;
    this.nombre = nombre ;
    this.medicion = medicion ;
    this.precio = precio; 
    this.id = id;
    this.unidades = 0;
    }

    sumarUnidades(){
        this.unidades++
    }

    restarUnidades(){
        if(this.unidades > 0){ this.unidades-- }
    }

    getPrecioTotal():number{
      return this.unidades * this.precio;
    }
}