//Importar funcion método HTTP - get -Post
import {getRutas,newRuta,editRuta,deleteRuta,getPuntosFilter,newPunto,editPuntos} from '../apiConnection/API.js'

//Importar selectores del DOM
import {$secInicio,$secRutas,$inputRuta,$btnRuta,$subTitle,$tablaRutas ,$formAddRuta,$modalTitle,$modalBody,$modalIdRuta,$modalNombre,$modalUrl,$formAddPunto,$cartsPuntosList,$btnPuntoAddList,$btnPuntoVerList, $opcionesED, $listBtnOpciones, $listAddPunto, $listShowPuntos} from '../js/selectores.js'

//1.FUNCIONES DEL CRUD RUTAS

//1.1 GET -Render las rutas
export async function renderRutas(){
    const listaRutas = await getRutas();  

    $tablaRutas.innerHTML=" ";

     listaRutas.forEach((ruta,index)=>{
        const {id,nomRuta,puntos} = ruta;
        let html = `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${nomRuta}</td>
                        <td>
                            <button data-ruta="${id}"  data-posicion="${index}" data-puntos="${puntos}" "type="button" class="addPunto bi bi-plus-square" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                        </td>
                        <td>${puntos}</td>
                        <td>
                            <button  data-ruta="${id}" data-bs-target="#p${id}" type="button" class="bi bi-eye" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample"></button>
                        </td>
                        <td class="tdOpciones hidden">
                            <button data-ruta="${id}" type="button" class="btn btn-warning bi bi-pencil-square" data-posicion="${index}"></button>

                            <button data-ruta="${id}" type="button" class="btn btn-danger bi bi-trash delete"></button>
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
//1.2 POST - Agregar  Ruta
export function  agregarRuta(e){
   e.preventDefault();

    const nomRuta = $inputRuta.value;

    if($btnRuta.textContent === "Guardar"){
        //Nuevo objeto Ruta
        const nuevaRuta ={
            "id": Date.now(),
            nomRuta,
            "puntos":0
        }
        newRuta(nuevaRuta);
    }else{
        let idRuta = (e.target.dataset.ruta) 
       let edicion = {"nomRuta":nomRuta};
        editRuta(edicion,idRuta)
    }
    
}

//1.3 PATCH - Editar Nombre la ruta (ver condicional 1.2)
export function editarRuta(idRuta,posicion){
    $formAddRuta.style.display = "block";
    $subTitle.textContent="Edición de Ruta";

    const $tdTable = document.getElementsByTagName("td");

    $inputRuta.value = $tdTable[posicion].innerHTML;

    $btnRuta.textContent = 'Confirmar';
    $formAddRuta.setAttribute('data-ruta',idRuta);
}

//1.4 DELETE - Eliminar Ruta
    //Ver seccion 0.2


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

//3 FUNCIONES DE PUNTOS Read-Create-Delete
//3.1 Render Puntos
async function renderPuntos(idRuta){

    //Obtener solo los puntos de una ruta específica
    let listaPuntosFilter = await getPuntosFilter(idRuta);
    const $cartsPunto = document.getElementById(`c${idRuta}`);
    $cartsPunto.innerHTML = " "; //Se deja vacío

    listaPuntosFilter.forEach(punto=>{
        const {id,nomPunto, imagen} =punto;
        
        let html = `<div class="card" style="width: 18rem;">
                            <img src="${imagen}" class="card-img-top" alt="imagen.jpg">
                            <div class="card-body">
                            <p class="card-text"><b>${nomPunto}</b></p>
                            <div>
                                <button type="button" class="btn btn-danger bi bi-trash rutas" id="${id}"></button>
                            </div>
                            </div>
                        </div>`;
        $cartsPunto.insertAdjacentHTML('beforeend', html)
        
    });
    
}

//3.2 Añadir punto 

export async function agregarPunto(e){
    e.preventDefault();
    let puntos = Number(e.target.dataset.puntos);
    console.log(puntos)
    let id = Date.now();
    let nomPunto = $modalNombre.value;
    let rutaId = Number($modalIdRuta.value);
    let imagen = $modalUrl.value;
    //Objeto Ruta
    let nuevaRuta = {
        id,
        nomPunto,
        rutaId,
        imagen
    }
   await newPunto(nuevaRuta);
    let incrementarPunto = {"puntos":puntos+1};
   await editPuntos(rutaId,incrementarPunto)

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

//0.2 Selección de botón eliminar o editar
export function seleccionTabla(e){
    let clase = e.target.className
    let idRuta = parseInt(e.target.dataset.ruta);

    if(clase.includes("bi-pencil-square")){
        let posicion = parseInt(e.target.dataset.posicion)*6;
        editarRuta(idRuta,posicion)
    }else if(clase.includes("delete")){
        //Confirmar delete
        deleteRuta(idRuta);

    }else if(clase.includes("bi-plus-square")){
        let posicion = parseInt(e.target.dataset.posicion)*6;
        let puntos = parseInt(e.target.dataset.puntos);
        $formAddPunto.setAttribute('data-puntos',puntos);
        
        formularioPunto(idRuta,posicion);
    }else if(clase.includes("bi-eye")){
        renderPuntos(idRuta);
    }
}

//0.3 Contador de puntos de cada Ruta
async function contarPuntos(idRuta){
    //Obtener solo los puntos de una ruta específica
    let listaPuntosFilter = await getPuntosFilter(idRuta);
    let puntos = listaPuntosFilter.length;
    return  puntos
}

function formularioPunto(idRuta,posicion){
    const $tdTable = document.getElementsByTagName("td");
    $modalTitle.textContent = $tdTable[posicion].innerHTML;

    $modalIdRuta.value = idRuta;
}






