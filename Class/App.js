//Importar selectores del DOM
import { $navRutas,$navNuevaRuta,$navOpcionesRuta,$formAddRuta } from "../js/selectores.js";
//Importar funciones
import {renderRutas,listarRutas,nuevaRuta,opcionesRutas,agregarRuta} from '../js/funciones.js'

export class App {
    constructor(){
        this.initProgram();
    }

    initProgram(){
        renderRutas();
        $navRutas.addEventListener('click', listarRutas);
        $navNuevaRuta.addEventListener('click', nuevaRuta);
        $navOpcionesRuta.addEventListener('click', opcionesRutas);

        $formAddRuta.addEventListener('submit',agregarRuta);

    }
}



