

function onBodyLoad() {
    console.log('onBodyLoad()')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/sw.js');
    };

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: "user",
            frameRate: {
                ideal: 5,
                max: 15
            }
        }
    }).then(function(stream){
        console.log('stream:' + stream)
        const video = document.getElementById('camera-preview')
        video.srcObject = stream
        video.addEventListener('loadedmetadata', function(e){
            const button = document.getElementById('take-photo')
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            setInterval(function(){
                context.drawImage(video, 0, 0, canvas.width, canvas.height)
                const image = context.getImageData(0, 0, canvas.width, canvas.height)
                const code = jsQR(image.data, image.width, image.height)
                console.log('code : ' + code)
                if (code) {
                    location.href = code.data
                }
            }, 1000)
        }, false)
    })

    /*
    
    const medias = {
        audio: false, video: {
            facingMode: "user"
        }
    },
        video = document.getElementById("video");

    navigator.getUserMedia(medias, successCallback, errorCallback);

    var width = 0, height = 0;

    video.addEventListener("loadedmetadata", function (e) {
        width = this.videoWidth;
        height = this.videoHeight;
    }, false);

    function successCallback(stream) {
        video.srcObject = stream;

        var button = document.getElementById("btnPicture");
        var canvas = document.getElementById("imageCanvas");

        button.disabled = false;
        button.onclick = function () {
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(video, 0, 0, width, height, 0, 0, width, height);
            var img = canvas.toDataURL("image/jpeg");

            $('#imgCanvas').val(img);
            $('#formResult').submit();
        };
    };

    function errorCallback(err) {
        alert(err);
    };

    */
}