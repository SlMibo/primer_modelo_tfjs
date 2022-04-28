// -------------- MODELO DE PREGUNTAS Y RESPUESTAS------------------

const msg = document.getElementById('msg');
const contenedor = document.getElementById('content');
const form = document.getElementById('form');
const info = document.getElementById('info');
const pregunta = document.getElementById('pregunta');
const butt = document.getElementById('boton');
const respuesta = document.getElementById('respuesta');
let model;

// Load the model.
qna.load().then(tf_model => {
    // Una vez que el modelo haya entrenado, se ocultará
    // el div con el texto "Entrenando..."
    msg.hidden = true;
    // Se mostrará el div con el formulario
    contenedor.hidden = false;
    // Y se le dará el valor del modelo ya entrenado a la variable global "model"
    model = tf_model;
});

// Con el evento change en el textarea, valida si se ingresa un texto
// de más de 30 caracteres. Si es así, habilita el input para ingresar pregunta
info.addEventListener('input', (e) => {
    const infoText = e.target.value;
    if( infoText.length > 30){
        pregunta.disabled = false;
    }
})

// Con el evento submit en el botón, se evita el comportamiento por defecto de recarga
// Se inhabilita el botón, para volver a habilitarlo después de "contestar" 
// o de que el modelo termina su proceso
form.addEventListener('submit', (e) => {
    e.preventDefault();
    butt.disabled = true;

    //Se obtienen los valores de los input para usarlos de parámetros en el modelo
    const pregunt = pregunta.value;
    const informacion = info.value;
    if(model){
        model.findAnswers(pregunt, informacion).then(answers => {
            console.log(answers); 
            // Se valida que exista una respuesta a la pregunta hecha
            // Si answers sólo tiene un array vacío, se informará que no hay respuesta
            if (answers.length > 0){
                // Teniendo en cuenta que las oraciones se ordenan según el puntaje
                // obtenido según el modelo, se mostrará en pantalla el primero
                const response = answers[0].text;
                respuesta.innerHTML = `Respuesta mejor puntuada: ${response}`;
                console.log(answers[0].text);
            } else {
                respuesta.innerHTML = `No hay una respuesta a tu pregunta :(`;
            }
            butt.disabled = false;
        });
    }
})
