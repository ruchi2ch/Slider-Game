if(window.innerWidth < 500){
    var boardWidth = window.innerWidth-40;
    var gameWidth = window.innerWidth-140;
    document.documentElement.style.setProperty('--boardWidth', boardWidth + "px");
    document.documentElement.style.setProperty('--width', gameWidth + "px");
}else{
    var boardWidth = 500;
    var gameWidth = 400;
}
var counter = 2;
var sliderNumber = 2;
var btn = document.getElementById("btn");
var counterSpan = document.getElementById("counter");

function stopSliding(sliderMoving, sliderAbove, sliderB4){
    var sliderMoving = document.getElementById(sliderMoving);
    var sliderAbove = document.getElementById(sliderAbove);
    var sliderB4 = document.getElementById(sliderB4);
    var left = window.getComputedStyle(sliderMoving).getPropertyValue("left");
    sliderMoving.classList.remove("animate");
    sliderMoving.style.left = left;
    let width = parseFloat(window.getComputedStyle(sliderMoving).getPropertyValue("width"));
    left = parseFloat(left);
    let leftB4 = parseFloat(window.getComputedStyle(sliderB4).getPropertyValue("left"));
    let difference = left - leftB4;
    let absDifference = Math.abs(difference);
    if(difference>width||difference<-width){
        btn.setAttribute("onclick", "");
        sliderAbove.style.animation = "none";
        sliderAbove.style.visibility = "hidden";
        sliderAbove.style.display= "none";
        alert("Game over. Points: " + (counter-2));
        document.getElementById("highscore").value = (counter-2);
        document.getElementById("form").submit();
    }
    if(difference>0){
        left = left + absDifference;
    }else{
        left = left - difference;
        sliderMoving.style.left = left.toString().concat("px");
    }
    var offset = (width - absDifference).toString().concat("px");
    sliderMoving.style.width = offset; 
    sliderAbove.style.width = offset;
    sliderAbove.style.visibility = "visible";
    gameWidth = gameWidth + absDifference;
    if(sliderMoving != document.getElementById('slider1')){
        document.documentElement.style.setProperty('--width', gameWidth + "px");
    }
    var onclick = "stopSliding('slider".concat(sliderNumber, "','slider", sliderNumber+1, "','slider", sliderNumber-1, "')");
    if(counter % 25 == 0){
        btn.setAttribute("onclick","restart()");
    }else{
        btn.setAttribute("onclick",onclick);
    }
    counterSpan.innerHTML = "Points: ".concat(counter-1);
    counter++;
    sliderNumber++;
}
function restart(){
    for (i = 1; i < 26; i++) {
        slider = document.getElementById("slider".concat(i));
        slider.style.left = 0;
        slider.style.visibility = "hidden";
        slider.classList.add("animate");
        slider.style.width = "100px";
        btn.setAttribute("onclick", "stopSliding('slider1','slider2','slider1')");
        if(counter==26){
            slider.style.backgroundColor = "limegreen";
        }else if(counter==51){
            slider.style.backgroundColor = "yellow";
        }else if(counter==76){
            slider.style.backgroundColor = "blue";
        }else if(counter==101){
            slider.style.backgroundColor = "orange";
        }

    }
    counterSpan.innerHTML = "Points: ".concat(counter-1);
    counter++;
    sliderNumber = 2;
    if(window.innerWidth < 500){
        boardWidth = window.innerWidth-40;
        gameWidth = window.innerWidth-140;
        document.documentElement.style.setProperty('--boardWidth', boardWidth + "px");
        document.documentElement.style.setProperty('--width', gameWidth + "px");
    }else{
        boardWidth = 500;
        gameWidth = 400;
        document.documentElement.style.setProperty('--boardWidth', boardWidth + "px");
        document.documentElement.style.setProperty('--width', gameWidth + "px");
    }
    document.getElementById("slider1").style.visibility = "visible";
}