var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(400, 400);

  text("Survival Time: "+ survivalTime, 100, 50);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
 // monkey.debug = true
  monkey.addAnimation("moving", monkey_running);
  monkey.velocityX=2;
  monkey.scale=0.1
  
  ground = createSprite(0,350,900,10);

  bananaGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  
  background("lightblue");
  
  stroke("black");
  textSize(20);
  fill("black");

  
  if(gameState===PLAY){
    
    survivalTime = Math.ceil(frameCount/frameRate());
    camera.position.x=monkey.x;
    camera.position.y=monkey.y;
    if(monkey.x>200) {
      ground.x=monkey.x;
    }
  
    if(keyDown("space") ) {
       monkey.velocityY = -8;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
    spawnBanana();
    spawnObstacles();

    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }

    monkey.collide(ground); 

    drawSprites();
    
  }
  else if(gameState===END){
    background(0)
    monkey.velocityX=0;
    textSize(25);
    fill("yellow");
    text("GAME OVER!!",monkey.x-80,180);
  }
  
    
  
  
  
}



function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(420+monkey.x,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -1;
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(420+monkey.x,320,10,40);
    obstacle.velocityX = -2;
    
    //obstacle.debug = true;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 500;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
