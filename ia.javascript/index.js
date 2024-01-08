const video = document.getElementById('video');
const translatedTextElement = document.getElementById('translatedText');
let translatedText = "";

const mediaPipeHands = new MediaPipeHands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

mediaPipeHands.setOptions({
    selfieMode: false,
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

mediaPipeHands.onResults(handleHandResults);

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        mediaPipeHands.setStream(video.srcObject);
    });

function handleHandResults(results) {
    const landmarks = results.multiHandLandmarks;
    if (landmarks) {
        const indexFingerTip = landmarks[0][8];
        const middleFingerTip = landmarks[0][12];

        const gesture = getGesture(indexFingerTip, middleFingerTip);
        translateGesture(gesture);
    }
}

function getGesture(indexFingerTip, middleFingerTip) {
    const distance = Math.sqrt(
        Math.pow(indexFingerTip.x - middleFingerTip.x, 2) +
        Math.pow(indexFingerTip.y - middleFingerTip.y, 2)
    );

    if (distance < 0.05) {
        return 'A';
    } else {
        return 'B';
    }
}

async function translateGesture(gesture) {
    // Adapte esta função para chamar um serviço de tradução real
    translatedText = await callTranslationService(gesture);
    translatedTextElement.textContent = "Tradução: " + translatedText;
}

async function callTranslationService(text) {
    // Adapte esta função para chamar o serviço de tradução real
    // Aqui, um exemplo simulado usando a API de Tradução do Google Cloud.
    // Substitua 'SUA_CHAVE_API' pela sua chave de API válida.
    const apiKey = 'SUA_CHAVE_API';
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${text}&source=auto&target=pt`);
    const result = await response.json();
    return result.data.translations[0].translatedText;
}

function handleHandResults(results) {
    const landmarks = results.multiHandLandmarks;
    if (landmarks) {
        const indexFingerTip = landmarks[0][8];
        const middleFingerTip = landmarks[0][12];

        const gesture = getGesture(indexFingerTip, middleFingerTip);
        translateGesture(gesture);

        // Adiciona movimento à imagem com base no gesto
        moveImageBasedOnGesture(gesture);
    }
}

function moveImageBasedOnGesture(gesture) {
    // Adapte esta função conforme necessário para mover sua imagem com base no gesto
    // Aqui, um exemplo simples de mover para a direita quando o gesto 'A' é detectado
    if (gesture === 'A') {
        movingImage.style.transform = 'translateX(50px)';
    } else {
        movingImage.style.transform = 'translateX(0)';
    }
}

// Adiciona event listeners para os botões
document.getElementById('translateButton').addEventListener('click', () => {
    translateByText();
});

document.getElementById('speakButton').addEventListener('click', () => {
    speakTranslatedText();
});

function translateByText() {
    const inputText = document.getElementById('translationInput').value;
    translateGesture(inputText);
}

function speakTranslatedText() {
    const translatedText = document.getElementById('translatedText').textContent;
    speakText(translatedText);
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

async function callTranslationService(text) {
    const apiKey = 'SUA_CHAVE_API'; // Substitua 'SUA_CHAVE_API' pela sua chave de API válida

    const url = 'https://translation.googleapis.com/language/translate/v2';
    const targetLanguage = 'pt'; // Idioma de destino (português)

    try {
        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: 'auto', // Detecta o idioma automaticamente
                target: targetLanguage,
            }),
        });

        const result = await response.json();

        if (result && result.data && result.data.translations && result.data.translations[0]) {
            return result.data.translations[0].translatedText;
        } else {
            throw new Error('Erro na tradução.');
        }
    } catch (error) {
        console.error('Erro na chamada do serviço de tradução:', error);
        return 'Erro na tradução';
    }
}
