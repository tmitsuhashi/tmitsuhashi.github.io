

function onBodyLoad() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/sw.js');
    };

    var media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: "user"
        }
    }).then(function(stream){
        console.log('stream:' + stream)
        var video = document.getElementById('camera-preview')
        video.srcObject = stream
        video.addEventListener('loadedmetadata', function(e){
            var width = video.videoWidth
            var height = video.videoHeight
            var button = document.getElementById('take-photo')
            var canvas = document.getElementById('photo-canvas')
            button.onclick = function(){
                canvas.width = width;
                canvas.height = height;
                var context = canvas.getContext('2d')
                context.drawImage(video, 0, 0, width, height)
                var image = context.getImageData(0, 0, width, height)
                var code = jsQR(image.data, image.width, image.height)
                if (code) {
                    console.log('QR code : ' + code.data)
                }
            }
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