var mario,wins,victory;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var GO,G;
var gameState=PLAY;
var score;
var count;
var music;
function preload()
{
  marioAnimation=loadAnimation("Capture1.png","Capture4.png","Capture3.png");
  obstacleAnimation=loadAnimation("obstacle1.png");
  wallAnimation=loadAnimation("wall.png");
  groundAnimation=loadAnimation("ground.png");  
  flagAnimation=loadAnimation("Flag.png");
  victory=loadImage("mario.jpg")
  G=loadImage("ghost2.jpg");
  music=loadSound("ghost1.mp3");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;


  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%5==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
      
  }
  flag=createSprite(countDistanceX-150,height-320);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.09;
  flag.setCollider("rectangle",0,0,1100,6520);
  flag.debug=true;

}

function draw() {
  background('skyblue');
  //code to move the camera
  var count=World.seconds;
console.log(score);
score=count*100
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
          //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyWentDown("up") && mario.spt.velocityY===0) 
        {
          mario.jump();
        }
        //if()
//console.log(gameState)
   }
   if(flag.isTouching(mario.spt)){
     gameState=WIN

   }
   if(mario.spt.isTouching(obstacleGroup)||mario.spt.y>height&&gameState===PLAY){
     gameState=LOSE;
   }
  if(gameState==LOSE)//END State
  { 
GO=createSprite(mario.spt.x,height/2,10,10);
GO.addImage(G);
GO.scale=5;
music.play();
    }

  if(gameState==WIN)//WIN state
  { 
    wins=createSprite(mario.spt.x,height/2,10,100);
    wins.addImage("yes",victory);
    wins.scale=4;

   }
  

   drawSprites();
   textSize(20);
   fill("red");
   stroke("green")
   text("score="+score,mario.spt.x-20,mario.spt.y+120)
}



