// -----JS CODE-----



//@ui {"widget":"label", "label":"---------- Camera Tracking"}
//@ui {"widget":"label", "label":"[References]"}

//@input SceneObject so3DCam
// @input Component.Head HeadBinding

//@ui {"widget":"separator"}

//@ui {"widget":"label", "label":"---------- UI"}
//@ui {"widget":"label", "label":"[References]"}
//@input SceneObject soFrame 
//@input SceneObject soInfoText 
//@input SceneObject soOverlay

//@ui {"widget":"separator"}

//@ui {"widget":"label", "label":"---------- MISC STUFF"}
//@ui {"widget":"label", "label":"[Settings]"}

//@input float faceCooldown = 1;

//@ui {"widget":"label", "label":"[References]"}

//@input SceneObject Plaque
//@input Component.AnimationMixer AnimMixer
//@input string animationLayerName = "BaseLayer"
//@input float animationWeight = 1.0 {"widget":"slider", "min": 0, "max": 1, "step": 0.01}
//@input float animationStartOffset = 0.0
//@input int numberOfLoops = -1
//@input Asset.AudioTrackAsset AudioClip
//@input SceneObject AnimationSceneObject
//@input Component.AudioComponent AudioSource
//@input SceneObject AudioSceneObject
//@input Asset.Material InfoTextMat



//@ui {"widget":"separator"}

// @ui {"widget":"label", "label":"---------- DEBUG"}
// @ui {"widget":"label", "label":"[Settings]"}
// @input bool debug_enabled
// @ui {"widget":"label", "label":"[References]"}
// @input SceneObject soDebug
// @input Component.Text debug_quat
// @input Component.Text debug_quat2
// @input Component.Text debug_face
// @input Component.Text debug_facecount
// @input Component.Text debug_time


// INITIALISATION

global.enableFace;
global.faceCooldownCounter = 0;


// EVENT BINDING
var updateEvent = script.createEvent('UpdateEvent');
var onLensLoadEvent = script.createEvent('TurnOnEvent');
var onTapEvent = script.createEvent("TapEvent");



onLensLoadEvent.bind(function(eventData) {       
    onLensLoad(eventData);
})

updateEvent.bind(function(eventData) {  
    onFrameUpdate(eventData);
})

onTapEvent.bind(function(eventData) {       
    onTapped(eventData);
})


// START

function onLensLoad(){
    print("Lens Loaded");
    
    setupDebug(script.debug_enabled); 
    
}



// UPDATE 

function onFrameUpdate(eventData) {
    
    updateFaceState(isDevicePointing () && isMoreThanOneHead()); // For finished build, ensure this line is UNCOMMENTED
        
    if (script.debug_enabled) {
        updateDebug();
    }
    
}


// TAPPED

function onTapped(eventData)
{
    //updateFaceState (!global.enableFace); // For finished build, ensure this line is COMMENTED
}


// FUNCTIONS !!

function updateFaceState (state) { // continuous
    
    // stops changing the face if we are reenabling it but the cooldown hasnt finished
    if (global.faceCooldownCounter > 0) {
        global.faceCooldownCounter -= getDeltaTime();
        if (state) {
            return;
        }
    }
    
    
    if (state != global.enableFace) {
        if (state) {
            enableFace(); // single fire event
            global.faceCooldownCounter = script.faceCooldown;
        } else {
            disableFace();  // single fire event
        }
        
        global.enableFace = state;
        updateVisuals(state);
    }
}


function enableFace () {
    script.AudioSource.play(1);
    script.AnimMixer.getLayer(script.animationLayerName).start(0,-1);   
    print("send animation trigger")
}

function disableFace () {
    script.AudioSource.stop(false);
    if(script.AnimMixer.getLayer(script.animationLayerName).isPlaying()){
        script.AnimMixer.getLayer(script.animationLayerName).stop();
    }
}

function updateVisuals (state) {
    script.Plaque.enabled = state;
    script.soFrame.enabled = !state;
    script.soInfoText.enabled = !state;
    //script.InfoTextMat.mainPass.opacity = state ? 0 : 100;
    
    script.soOverlay.enabled = !state;
    script.AudioSceneObject.enabled = state;
    script.AnimationSceneObject.enabled = state;
}


function setupDebug (state) {
    script.soDebug.enabled = state;
}

function updateDebug() {
    var rotation = script.so3DCam.getTransform().getWorldRotation();
    script.debug_quat.text = Math.round(rotation.x*100).toString() +", "+ Math.round(rotation.y*100).toString()+", " + Math.round(rotation.z*100).toString()+", " + Math.round(rotation.w*100).toString();
    
    script.debug_quat2.text = ""+Math.round(rotation.x*100)+"," + Math.sign(Math.round(rotation.w*100));//String(global.triggerAnimcounter);
    
    script.debug_facecount.text = ""+script.HeadBinding.getFacesCount();//String(global.triggerAnimcounter);
    
    script.debug_face.text = global.enableFace ?  "Animation Enabled" : "Animation Disabled";
    
    script.debug_time.text = ""+Math.round(getTime());
    
    
    script.soFrame.enabled = false;
    script.soOverlay.enabled = false;
}



function isDevicePointing () {
    var rotation = script.so3DCam.getTransform().getWorldRotation();
//    return Math.round(rotation.x*100) <-10 && Math.sign(Math.round(rotation.w*100))==-1;
    return 1;
}

function isMoreThanOneHead () {
    return script.HeadBinding.getFacesCount() > 0;
}
