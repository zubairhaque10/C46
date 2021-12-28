var backgroundImage,  catImage, monkeyImage, coinImage, gameOverImage, resetImage
var cat, bg
var edges
var monkeyGroup, coinGroup 
var gameState = "play"
var score = 0
var reset

function preload(){
  backgroundImage = loadImage("images/background4.png")
  catImage = loadImage("images/cat.png")
  monkeyImage = loadImage("images/monkey.png")
  coinImage = loadImage("images/coin.png")
  gameOverImage = loadImage("images/gameover1.png")
  resetImage = loadImage("images/resetbutton.png")
  
  }
function setup() {
  createCanvas(800, 500);
  bg = createSprite(450, 250, 600, 500)
  bg.addImage(backgroundImage)
bg.scale = 1.3
bg.velocityX = -1
bg.x = bg.width/2
  cat = createSprite(100, 450, 50, 50)
  cat.addImage(catImage)
  cat.scale = 0.3
 // edges = createEdgeSprites()
 ground = createSprite(400, 505, 800, 20)
 ground.visible = false
 monkeyGroup = new Group()
 coinGroup = new Group()
 reset = createSprite(700, 10)
 reset.addImage(resetImage)
 reset.scale = 0.08
}


function draw() {
  background("black");
  console.log(cat.y)
  if(gameState == "play"){
    if(bg.x < 330){
      bg.x = bg.width/2
    }
    bg.velocityX = -1
if(keyDown(UP_ARROW)&& cat.y >= 400.5){
  cat.velocityY = -9

}
spawnMonkey()
cat.velocityY = cat.velocityY + 0.3
if(coinGroup.isTouching(cat)){
  score = score + 1
  coinGroup.destroyEach()
}
if(monkeyGroup.isTouching(cat)){
  gameState = "end"
}
reset.visible = false
  }
  if(gameState == "end"){
    bg.velocityX = 0
    monkeyGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
   bg.addImage(gameOverImage)
  monkeyGroup.destroyEach()
  coinGroup.destroyEach()
  cat.visible = false
   reset.visible = true

  }

if(mousePressedOver(reset)){
  restart()
}

spawnCoins()

cat.collide(ground)


  drawSprites();
  text("Score"+score, 750, 10)
}
function spawnMonkey(){
  if(frameCount%250==0){
  var monkey = createSprite(750, 470, 50, 50)
  monkey.scale = 0.5
  monkey.addImage(monkeyImage)
  monkey.velocityX = -6.5
  monkeyGroup.add(monkey)
  }
}
function spawnCoins(){
  if(frameCount%200==0){
    var coin = createSprite(500,400, 70, 70)
    coin.addImage(coinImage)
    coin.velocityX = -5
    coin.scale = 0.1
    coin.y = Math.round(random(300,500))
    coinGroup.add(coin)
  }
}
function restart(){
  gameState = "play"
  bg.addImage(backgroundImage)
  score = 0
  cat.addImage(catImage)
  cat.visible = true

}