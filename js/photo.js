MIN = 1
MAX = 9
NOW_NUM = 1

function checkImage(){
    document.getElementById("photo-silde").removeChild(appear)
}


function changeImage(n) {
    NOW_NUM += n
    if (NOW_NUM < MIN) {
        NOW_NUM = MAX
    }
    else if (MAX < NOW_NUM) {
        NOW_NUM = MIN
    }
    checkImage()
    showImage(NOW_NUM)
}

function showImage(NOW_NUM) {
    var myImage = new Image();
    myImage.src = `assets/img/myimage/photo0${NOW_NUM}.jpg`
    myImage.id = "appear"
    myImage.classList.add("my-photo")
    document.getElementById("photo-silde").appendChild(myImage)
}

function init() {
    showImage(8)
}

init()
