//Funciones en formato fuction expression...
const urlRutas = "http://localhost:3000/rutas";
const urlPuntos = "http://localhost:3000/puntos";

//Obtener rutas de la API - (GET)
export const getRutas = async () => {
    try {
        const result = await fetch(urlRutas);
        const rutas = await result.json();
        return rutas
    }catch(error){
        console.log(error);
    }
}
// Insertar una nueva Ruta en la REST API - Método POST
export const newRuta = async (ruta) => {
    console.log(ruta);
    try{
       await fetch(urlRutas,{
            method: 'POST',
            body: JSON.stringify(ruta), // Se envia lo que va a contener
            headers:{
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html'

    }catch(error){
        console.log(error);
    }
}

// Eliminar una Ruta en la REST API - Método delete
export const deleteRuta = async (idRuta) => {
    try{
        await fetch(`${urlRutas}/${idRuta}`,{
            method: 'DELETE'
        })
    }catch(error){
        console.log(error);
    }
}

//Editar una Ruta en la RESP API - Método patch
export const editRuta = async (edicion, idRuta) => {
    try {
        await fetch(`${urlRutas}/${idRuta}`,{
            method: 'PATCH',
            body: JSON.stringify(edicion),
            headers: {'Content-Type': 'application/json'}
        })
    } catch (error) {
        console.log(error);
    }
}

export const getPuntos = async () => {
    try {
        const result = await fetch(urlPuntos);
        const puntos = await result.json();
        return puntos
    }catch(error){
        console.log(error);
    }
}