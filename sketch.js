//Hungry monkey

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;


//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(600,400);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -50;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  //survival time
  survialTime = 0;
  
}

//Draw
function draw() {
//Background
background ("white");
  
//displaying survialtime
stroke("black");
fill("black");
textSize(20);
text("Survial Time:"+  survialTime, 210, 50);
  
//Monkey
monkey.collide(ground);

//PLAY
if(gameState === PLAY){
monkey.changeAnimation("running", monkey_running);
    
survialTime = Math.ceil(frameCount/frameRate());
     
//infinite ground   
if (ground.x < 0){
ground.x = ground.width/2;
}

monkey.setCollider=(circle,0,0,monkey.width,monkey.height);
//monkey.debug=true; 
  
//jump when the space key is pressed
 if(keyDown("space")&& monkey.y >= 220) {
    monkey.velocityY = -12;
  }    
    
if(FoodGroup.isTouching(monkey)) {
FoodGroup.destroyEach();
score = score+1;
}
   
//Gravity
monkey.velocityY = monkey.velocityY + 0.8;
  
 //Adding Functions
food();
obstacles();
    
if(obstacleGroup.isTouching(monkey)){
gameState = END;
}
  }
  
  
//END
if (gameState === END) {

obstacleGroup.destroyEach();
FoodGroup.destroyEach();
survialTime.visible = false;
monkey.destroy();   
ground.destroy();
     
stroke("red");
fill("red");
textSize(30)
text("Game Over", 230, 230);

stroke("black");
fill("black");
textSize(30);
text("Monkey is dead", 190, 270);
  
stroke("yellow")
fill("yellow")
textSize(30);
text("HAHA!!!",230,120);

stroke("yellow")
fill("yellow")
textSize(30);
text("YOU ARE A LOOSER🙊🙊🙊",140,160);

stroke("yellow")
fill("yellow")
textSize(30);
text("🤣🤣🤣🤣🤮🤮🤮",140,200);





}
 
drawSprites();

}

//Banana
function food() {
  if (frameCount % 110 === 0) {
    banana = createSprite(400,350,40,10);
   banana.addImage(bananaImage);
   banana.y = Math.round(random(120,200));
   banana.scale = 0.1;
    
   banana.velocityX = -3;
   banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 80 === 0){
obstacle = createSprite(250,325,5,5);
obstacle.addImage(obstacleImage);
obstacle.velocityX = -3;
obstacle.scale = 0.1;
obstacleGroup.add(obstacle);
obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height)
    }
}



 
 


