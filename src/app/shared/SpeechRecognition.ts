let recognition;
let recognizing = false;

export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const { webkitSpeechRecognition }: IWindow = <IWindow>window;

if (!('webkitSpeechRecognition' in window)) alert('¡API no soportada!');
else {

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        recognizing = true;
    };

    console.log(recognition);

    recognition.onresult = event => {
        console.log(event);
        for (let i = event.resultIndex; i < event.results.length; i++) {
            (<HTMLInputElement>document.getElementById('result')).value += event.results[i][0].transcript;
        }
    };

    recognition.onerror = (event) => {
        alert('error');
    };

    recognition.onend = () => {
        recognizing = false;
    };
}


function escuchar() {
    if (!recognizing) {
        recognition.start();
        recognizing = true;
    } else {
        recognition.stop();
        recognizing = false;
    }
}
