song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    
    if(scoreleftwrist>0.2){
    circle(leftwristx,leftwristy,20);
    isnumberleftwristy=Number(leftwristy);
    remove_decimal=floor(isnumberleftwristy);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
    }
}
function modelLoaded(){
    console.log('Posenet is initialized');
}
function gotPoses(results){
    if(results.length>0){

        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist= "+scoreleftwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.leftWrist.x;
        rightwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx= "+leftwristx+" leftwirsty= "+leftwristy);
        console.log("rightwristx= "+rightwristx+" rightwirsty= "+rightwristy);

    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
