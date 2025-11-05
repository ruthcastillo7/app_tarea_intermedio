const input=document.querySelector('input[type="text"]')//1. capturare todos mis elementos
const userInput=document.querySelector('#inputUsuario') //1.5. relaciona con los eventos submit, captura los input
const lista=document.querySelector('#lista')
//5.
let idCounter=0
const stats=document.querySelector('#stats')

userInput.addEventListener('submit',(event)=>{//a travez del submit podras capturar todos los eventos del formulario. Mi funcion capturara ese evento.
    event.preventDefault()
    agregarTarea()//3. llamo a la funcion
})

//2. dentro de esta funcion capturar el nuevo valor
let agregarTarea=()=>{
    idCounter++//.6 y linea de id="${idCounter}" <- eso es un id incrementable
    let newValue=input.value
    if(newValue == ""){
        alert("no puedo tener una tarea vacia")
        return
    }
    //4. aqui pegamos la porcion de codigo del html que crea las tarjetas. Al concatenar se va aumentando "+="
    lista.innerHTML+=`
        <div class="contenedor-tarea" id="${idCounter}">
            <label>
                <input type="checkbox">
                ${newValue}
            </label>
            <img src="./assets/tacho.png" alt="eliminar" class="btnEliminar">
        </div>`
        input.value=""
        updateStats()
}

// 7. agregue un evento clic a las tareas, a ese cuadro le estoy a gregando un escuchador de clik
lista.addEventListener('click',(event)=>{
    //8. Al hacer click en un elemento IMG padre quiero que me muestre el id al cual pertenece
    if(event.srcElement.nodeName=="IMG"){
        deleteTask(event.srcElement.parentNode.id)
    }else if (event.srcElement.nodeName=="INPUT"){//11. Si captura un input que actualice el mensaje de Completadas: ${check.length}
        updateStats() 
    }
})

// 9. darle funcionalidad al mensajito
let updateStats=()=>{
    let divs=lista.querySelectorAll('div')//querySelectorAll : devuelve todos los div en una lista
    // 10. solo quiero los que tienen check
    let check=lista.querySelectorAll('input[type="checkbox"]:checked')
    stats.innerHTML=`Tareas pendienes: ${divs.length} Completadas: ${check.length}`
}

//12. para eliminar la tarea
let deleteTask=(id)=>{
    let taskDelete=document.getElementById(id)
    lista.removeChild(taskDelete)
    updateStats()
}