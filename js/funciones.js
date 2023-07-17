//Importar funcion método HTTP - get -Post
import {getRutas,newRuta ,getPuntos} from '../apiConnection/API.js'

//Importar selectores del DOM
import {$ruta, $tablaRutas} from '../js/selectores.js'
//Importar selectores del DOM
import {$secInicio,$secRutas, $subTitle, $formAddRuta,$opcionesED, $listBtnOpciones, $listAddPunto, $listShowPuntos} from '../js/selectores.js'

//1.FUNCIONES DEL CRUD RUTAS

//1.1 GET -Render las rutas
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
//1.2 POST - Agregar
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

//2.Funcionamiento de los navbar
//2.1
export function listarRutas(){
    $secInicio.style.display = "none";    
    $secRutas.style.display = "block";
    $formAddRuta.style.display = "none";
    $opcionesED.style.display = "none";

    $subTitle.textContent="Lista de Rutas";

    habilitarBtns(false);

}

//2.2
export function nuevaRuta(){
    $secInicio.style.display = "none";    
    $secRutas.style.display = "block";
    $formAddRuta.style.display = "block";
    $opcionesED.style.display = "none";


    $subTitle.textContent="Agregar nueva Ruta";
    habilitarBtns(false);

}

//2.3
export function opcionesRutas(){
    $secInicio.style.display = "none";    
    $secRutas.style.display = "block";
    $formAddRuta.style.display = "none";

    $opcionesED.style.display = "table-cell";
    $subTitle.textContent="Editar o Eliminar Rutas";

    //Habilitar los botones editar y eliminar de cada ruta
    habilitarBtns(true);
}

//0.Otras funciones

//0.1 Habilitar los botones editar y eliminar de cada ruta
function habilitarBtns(habilitar){

    if(!habilitar){
        for(var i = 0; i < $listBtnOpciones.length ;i++){
            $listBtnOpciones[i].style.display="none";

            //Habilita los botones agregar y ver puntos
            $listAddPunto[i].disabled=false;
            $listShowPuntos[i].disabled=false;
            $listAddPunto[i].style.color="green";
            $listShowPuntos[i].style.color="darkblue";
        }
    }else{
        for(var i = 0; i < $listBtnOpciones.length ;i++){
            $listBtnOpciones[i].style.display="table-cell";

            //Deshabilita los botones agregar y ver puntos
            $listAddPunto[i].disabled=true;
            $listShowPuntos[i].disabled=true;
            $listAddPunto[i].style.color="gray";
            $listShowPuntos[i].style.color="gray";
        }

    }
}






