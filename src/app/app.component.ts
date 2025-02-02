import { Component, OnInit, HostListener  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from './producto/class.producto';
import { SistemaService } from './sistema/sistema.service';
import { LocalStorageService } from './localStorage/local-storage.service';
import { BDService } from './lista/bd.service';





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
  isScrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
    onWindowScroll()   
 {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.isScrolled = scrollTop > 0;
        
    }

  constructor(public Sistema: SistemaService, public BD: BDService, private LocalStorage : LocalStorageService){

  }

  ngOnInit() {
  this.LocalStorage.getLocalStorage()
  
  }

  agregarNuevoProducto(event: Event): void {
    if (event) {
      event.preventDefault();  
      this.Sistema.newProducto();  
    }
  }
  

  

  
}
