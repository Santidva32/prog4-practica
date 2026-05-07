const boton = document.getElementById('btnAgregar');
const input = document.getElementById('inputTarea');
const unorderedList = document.getElementById('unorderedListTareas');

async function cargarTareas() {
    const respuesta = await fetch('http://localhost:3000/api/tareas');
    const tareas = await respuesta.json();
    tareas.forEach(element => {
        const list = document.createElement('li');
        list.textContent = element.descripcion;
        unorderedList.appendChild(list)
    });
}

cargarTareas();

boton.addEventListener('click', async function(){
    if(input.value.trim() === ""){
        return
    }
    const respuesta = await fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tarea: input.value })
    });
    const datos = await respuesta.json();
    console.log(datos);
    const list = document.createElement('li');
    list.textContent = input.value;
    unorderedList.appendChild(list);
    input.value = "";
});