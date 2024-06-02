function Timer() {
    let diEnd = document.getElementById('diEnd').dataset.date

    var countDownDate = diEnd


    var x = setInterval(function() {


        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer")
            .innerHTML =
            '<div>' + days + '<span>Days</span></div>' +
            '<div>' + hours + '<span>Hours</span></div>' +
            '<div>' + minutes + '<span>Minutes</span></div>' +
            '<div>' + seconds + '<span>Seconds</span></div>';


        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer")
                .innerHTML =
                '<div>' + 'Discount Time Ended' + '<span></span></div>';
        }
    }, 1000);

}


var spinnerElement = document.querySelector('.spinner-border');
var spinnerElementTwo = document.querySelector('.spinner-border2');
document.addEventListener('DOMContentLoaded', function() {
    Timer()
    facebookPlayer()
    youtubePlayer()
})

function youtubePlayer() {
    const youtubeModal = document.getElementById('youtubeModal')
    const iframe = document.getElementById('Youtubeiframe');
    spinnerElementTwo.style.display = 'block';
    youtubeModal.addEventListener('show.bs.modal', function(event) {

        var button = event.relatedTarget
        var linkid = button.getAttribute('data-link');
        var folderinfo = button.getAttribute('data-title');
        var src = "https://www.youtube.com/embed/" + linkid;
        iframe.src = src;
        var modalTitle = youtubeModal.querySelector('.modal-title')
        modalTitle.innerText = folderinfo;

        iframe.addEventListener('load', function() {
            spinnerElementTwo.style.display = 'block';
        })

    })
}


function facebookPlayer() {
    const facebookModal = document.getElementById('facebookModal')
    facebookModal.addEventListener('show.bs.modal', function(event) {

        spinnerElement.style.display = 'block';
        var button = event.relatedTarget
        var linkid = button.getAttribute('data-link');
        var faceBookAttr = facebookModal.querySelector('.fb-video');
        faceBookAttr.dataset.href = linkid;
        FB.XFBML.parse();
        var folderinfo = button.getAttribute('data-title');
        var modalTitle = facebookModal.querySelector('.modal-title');
        modalTitle.innerText = folderinfo;
    });
    window.fbAsyncInit = function() {
        FB.init({
            xfbml: true,
            version: 'v3.2'
        });

        FB.Event.subscribe('xfbml.ready', function(msg) {
            if (msg.type === 'video') {
                var videoElement = msg.instance;
                spinnerElement.style.display = 'none';
            }
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}