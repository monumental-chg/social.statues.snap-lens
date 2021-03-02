
//@input Component.ScreenTransform scrTransform;
//@input Asset.Material textMat;

const ANIM_SPEED = 4;
const DELAY_START = 0.5;

global.currentIntroProgress = 0;
global.delayStartCounter = 0;








// script.scrTransform.offsets.left
// start = -0.2
// end =  0.336


// EVENT BINDING
var updateEvent = script.createEvent('UpdateEvent');
var onLensLoadEvent = script.createEvent('TurnOnEvent');

onLensLoadEvent.bind(function(eventData) {       
    onLensLoad(eventData);
})

updateEvent.bind(function(eventData) {  
    onFrameUpdate(eventData);
})




function onLensLoad(){
}



// UPDATE 

function onFrameUpdate(eventData) {
    if (global.delayStartCounter < DELAY_START) {
        global.delayStartCounter += getDeltaTime();
        return;
    }   
    
    global.currentIntroProgress += getDeltaTime() / ANIM_SPEED;
    if (global.currentIntroProgress >= 1) {
        global.currentIntroProgress = 1;
    } 
    
    updateVisuals(global.currentIntroProgress);    
}

function updateVisuals (progress) {
    progressEaseInOut = easeInOutQuart(progress);
    script.scrTransform.offsets.left = lerp(-0.1, 0.336, progressEaseInOut);
    script.textMat.mainPass.opacity =  lerp(0, 1, progressEaseInOut); 
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end;
}

function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

