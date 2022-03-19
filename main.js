leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song1="";
song2 = "";
let_me_down_slowly="";
we_dont_talk_anymore="";

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    webcam = createCapture(VIDEO);
    webcam.hide();
    webcam.size(500,500);

    posenetmodel = ml5.poseNet(webcam,modelloaded)
    posenetmodel.on("pose",gotPoses)

}
function preload(){
    we_dont_talk_anymore = loadSound("song 1.mp3");
    let_me_down_slowly = loadSound("song 2.mp3");
    }
function draw(){
    image(webcam ,0,0,500,500);
    fill("blue");
 stroke("blue");
 circle(leftwristX,leftwristY,20);
 circle(rightwristX,rightwristY,20);
 
 
 song1 = we_dont_talk_anymore.isPlaying();
 console.log(song1);

 song2 = let_me_down_slowly.isPlaying();
 console.log(song2);

 if(scoreleftWrist > 0.2){
    let_me_down_slowly.stop();
    if(song1 == false){
        we_dont_talk_anymore.play();
        document.getElementById("songname_result").innerHTML = "We don't talk anymore";
    }
    
      
 }

 if(scorerightWrist > 0.2){
    we_dont_talk_anymore.stop();
    if(song2 == false){
        let_me_down_slowly.play();
        document.getElementById("songname_result").innerHTML = "Let me down slowly";
    }
 }


 
}
function modelloaded(){
    console.log("model loaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist_score = " +scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[9].score;
        console.log("rightWrist_score = " +scorerightWrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " +leftwristX+ "leftwristY" +leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX = " +rightwristX+ "rightwristY" +rightwristY);

    }

}