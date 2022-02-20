song="";
song1="";
song_status="";
song1_status="";
scoreRight = 0;
scoreLeft=0;


function preload(){
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(420,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is intialized");
}
function gotPoses(results){

    scoreRight=results[0].pose.keypoints[10].score;
    scoreLeft=results[0].pose.keypoints[9].score;

    console.log(results);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;

     
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.righttWrist.y;
    console.log("rightwristX = "+ rightwristX+ "rightwristY = "+ rightwristY+ "leftwristX = "+ leftwristX+ "leftwristY = "+ leftwristY );
    
}

function draw(){
    image(video, 0,0, 600,500);

song_status=song.isPlaying();
song1_status=song1.isPlaying();

fill("blue");
stroke("blue");
if(scoreRight > 0.2){
    circle(rightwristX,rightwristY,20);
    song1.stop();
    if(song_status == false){
        song.play();
        document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";
    }
   
}
if(scoreLeft > 0.2){
    circle(leftwristX,lefttwristY,20);
    song.stop();
    if(song1_status == false){
        song1.play();
        document.getElementById("song").innerHTML="Playing Peter Pan Song";
    }
}

  
}