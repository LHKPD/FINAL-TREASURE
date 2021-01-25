var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var end,endImg;
var gameOver,gameOImg;
var treasure = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
boyG=new Group();  

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  boyG.add(boy);
  
  if(gameState === PLAY){
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasure = treasure + 100;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
       treasure = treasure + 200;
      }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
       treasure = treasure + 300;
      }
    else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        treasure = 0;
       gameState = END;
    }
  }
  
  
    path.velocityY = 4;
  boy.x = World.mouseX;
    
    if (gameState === END){
      path.velocityY = 0;
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      cashG.destroyEach();
      swordGroup.destroyEach();
      boyG.destroyEach();
      end = createSprite(200,200,10,10);
      end.addImage(endImg);
      end.scale = 0.8;
      textSize(15);
      text("Press Space TO Play Again",300,300);
      
      if(keyDown("space")){
    gamestate = PLAY;
  }
    }
   
  }
  
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure : "+ treasure,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 5;
  sword.lifetime = -5;
  swordGroup.add(sword);
    sword.setCollider("circle",0,0,20);
    sword.debug = false;
  }
}