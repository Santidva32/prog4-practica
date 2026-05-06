const boton = document.getElementById('btnAgregar');
const input = document.getElementById('inputTarea');
const unorderedList = document.getElementById('unorderedListTareas');

boton.addEventListener('click', function(){
    const list = document.createElement('li');
    list.textContent = input.value;
    unorderedList.appendChild(list);
    input.value = "";
});