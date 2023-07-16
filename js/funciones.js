//Importar funcion método HTTP - get -Post
import {getRutas,newRuta ,getPuntos} from '../apiConnection/API.js'

//Importar selectores del DOM
import {$ruta, $formAddRuta, $tablaRutas} from '../js/selectores.js'
//Importar selectores del DOM
import {$secInicio,$secRutas} from '../js/selectores.js'
//Render las rutas
export async function renderRutas(){
    const listaRutas = await getRutas();  

    $tablaRutas.innerHTML=" ";

    listaRutas.forEach((ruta,index)=>{
        const {id,nomRuta} = ruta;
        //let contadorPuntos = contarPuntos(id); //Contar los puntos de cada RUTA
        let html = `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${nomRuta}</td>
                        <td>
                            <button id="${id}" type="button" class="addPunto bi bi-plus-square" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                        </td>
                        <td>${17}</td>
                        <td>
                            <button  id="v${id}" data-bs-target="#p${id}" type="button" class="bi bi-eye" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample"></button>
                        </td>
                        <td class="tdOpciones hidden">
                            <button id="e${id}" type="button" class="btn btn-warning bi bi-pencil-square"></button>

                            <button id="d${id}" type="button" class="btn btn-danger bi bi-trash"></button>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" style="padding: 0;">
                            <div class="collapse" id="p${id}">
                                <div class="cardPuntos" id="c${id}">
                                <!--Se añade de forma dinámica-->
                                </div>
                            </div>
                        </td>
                    </tr>`;

        $tablaRutas.insertAdjacentHTML('beforeend',html);
            
    });
};

//Agregar nueva ruta
export function agregarRuta(e){
   e.preventDefault();

    const nomRuta = $ruta.value;
    
    //Nuevo objeto Ruta
    const nuevaRuta ={
        "id": Date.now(),
        nomRuta
    }
    newRuta(nuevaRuta);
}

//Funcionamiento de los navbar
export function listarRutas(){
    $secInicio.style.display = "none";
    $secRutas.style.display = "block";
}





