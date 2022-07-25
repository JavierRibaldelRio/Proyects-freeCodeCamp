//Pone en marcha el elemento audio, se le introduce la id del elemento que contriene el audio

function reproducirElementAudio(id) {
    //Coge el audio
    const audioElement = document.getElementById(id);

    //Para el audio
    audioElement.pause();

    //Lo reinicia
    audioElement.currentTime = 0;

    //Lo poene en marcha
    audioElement.play();
}


export default reproducirElementAudio;