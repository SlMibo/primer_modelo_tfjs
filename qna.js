// const passage = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
// const question = "Who is the CEO of Google?"
// const model = await qna.load();


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
    console.log('emtreno')
    // Find the answers
    msg.hidden = true;
    contenedor.hidden = false;
    model = tf_model;

    

});

info.addEventListener('input', (e) => {
    const infoText = e.target.value;
    if( infoText.length > 30){
        pregunta.disabled = false;
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    butt.disabled = true;

    const pregunt = pregunta.value;
    const informacion = info.value;
    if(model){
        model.findAnswers(pregunt, informacion).then(answers => {
            console.log(answers); 
            if (answers.length > 0){
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
