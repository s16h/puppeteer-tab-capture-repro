chrome.runtime.onMessage.addListener(request => {
    switch (request) {
        case 'START_RECORDING':
            console.log('START_RECORDING');
            startRecording();
            break;
        case 'STOP_RECORDING':
            console.log('STOP_RECORDING');
            break;
        default:
            console.log('UNKNOWN_REQUEST');
    }
});

function startRecording() {
    console.log('Starting to record.');

    const options = { audio: true };
    chrome.tabCapture.capture(options, (stream) => {
        if (stream === null) {
            console.log(`Last Error: ${chrome.runtime.lastError.message}`);
            return;
        }

        try {
            const recorder = new MediaRecorder(stream);
        } catch (err) {
            console.log(err.message);
            return;
        }

        console.log('Recroder is in place.');

        recorder.addEventListener('dataavailable', event => {
            const { data: blob, timecode } = event;
            console.log(`Got another blob: ${timecode}: ${blob}`);
        });
        const timeslice = 5 * 1000;
        recorder.start(timeslice);
    });
}