

var button = document.querySelectorAll(".colorPicker")
var imagine = document.querySelectorAll(".images")
var shoes = document.querySelectorAll(".shoes")
gsap.to(imagine, {
    transform: "translate(-40%,0%)",
  backgroundColor:"#7FA38C",
  duration:0.000001
})

button.forEach(function (val, app) {

    val.addEventListener("click", function () {
        gsap.to(imagine, {
            transform: `translate(-${(app) * 20}%,0)`,
            backgroundColor: `${val.getAttribute("color")}`
        })

    })

});
var time=gsap.timeline()
time.from(".page1 .right",{
x:100,
opacity:0,
scrollTrigger:{
    trigger:".page1 .right",
    scroller:"body",
    start:"top 40%",
    end:"top 100%",
    scrub:2
    
 }

})
time.to(".shoes img",{
    y:"250%",
    x:"-100%",
    rotate:"-50deg",
    
    
    scrollTrigger:{
        trigger:".page1",
        scroller:"body",
        start:"top 40%",
        end:"bottom 90%",
        scrub:2
    }
    
    })









const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
const frames = {
    curruntIndex: 0,
    totalIndex: 228

}
let imgLoaded = 0
var images = []
function preLoader() {
    for (i = 1; i <= frames.totalIndex; i++) {
        const ImgUrl = `./frame/frame_${i.toString().padStart(4, "0")}.jpeg`
        const img = new Image()
        img.src = ImgUrl
        img.onload = function () {
            imgLoaded++
            if (imgLoaded == frames.totalIndex) {
                loadImage(frames.curruntIndex)
                startAnimation()
            }
        }
        images.push(img)
    }

}
preLoader()
function loadImage(index) {
    if (index >= 0 && index < frames.totalIndex) {
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        const img = images[index]
        const scaleX = canvas.width / img.width
        const scaleY = canvas.height / img.height

        const scale = Math.max(scaleX, scaleY)

        const newWidth = img.width * scale
        const newHeight = img.height * scale

        const originX = (canvas.width - newWidth) / 2
        const originY = (canvas.height - newHeight) / 2

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = "high"
        context.drawImage(img, originX, originY, newWidth, newHeight)
        frames.curruntIndex = index

    }
}
function startAnimation() {
    var tl=gsap.timeline({
        scrollTrigger:{
            trigger:".parent",
            start:"top top",
            scrub:2
        }
    })
    gsap.to(".child",{
        position:"fixed",
       display:"block",
        top:0,
        left:0,
        scrollTrigger:{
            trigger:".parent",
            start:"top top",
            scrub:2
        }


    })
    tl.to(frames, {
        curruntIndex: frames.totalIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.curruntIndex))

        },
        
    })
    var tl2=gsap.timeline({
        scrollTrigger:{
            trigger:".parent",
            start:"bottom bottom",
            scrub:1
        }
    })
    tl2.to(".child,.parent",{
        top:"-100%",
        delay:1
    })
   
}

