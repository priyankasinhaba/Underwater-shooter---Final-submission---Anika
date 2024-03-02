var splashscreen, bullet, bulletGroup, enemy, enemyGroup, bg_play, enemy1_img, enemy2_img
var aboutbutton
var playbutton, player_img, bullet_img
var score =0;
var gameState = "wait";




function preload() {
splashscreen = loadImage("underwater shooter.gif"); 
bg_play = loadImage("bg1.jpg")
enemy1_img = loadImage("shark-removebg-preview.png")
enemy2_img = loadImage("crab-removebg-preview.png")
enemy3_img = loadImage("jellyfish-removebg-preview.png")
enemy4_img = loadImage("fish-removebg-preview.png")
player_img = loadImage("submarnie-removebg-preview.png")
bullet_img = loadImage("bullet.png")
}

function setup(){
    createCanvas(900,600);
playbutton = createImg("play.png")
aboutbutton = createImg("about.png")
playbutton.position(400,250);
playbutton.size(200,200)
playbutton.hide();
aboutbutton.position(300,300);
aboutbutton.size(100,100)
aboutbutton.hide();

player = createSprite(100, 300)
    player.addImage(player_img)
    player.visible = false; 
    

    enemyGroup = new Group()
    bulletGroup = new Group()
}

function draw(){
    if (gameState === "wait") {
        background(splashscreen);
        //player.visible = false;
        score = 0;
        playbutton.show()
        aboutbutton.show()
    }
    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })
    
    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";
    
    })
if (gameState=="about"){
    aboutgame()
}

if (gameState == "play") {
    
    background(bg_play)

    player.visible = true;
    player.scale=0.2;
    

    if (player.y <= 60) {
        player.y = 60
    }

    if (player.y >= 550) {
        player.y = 550
    }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }
    if (keyWentDown ("SPACE")) {
        
        spawnBullets();
        bullet.y=player.y;
    }

    if (keyDown("LEFT_ARROW")) {
        player.x = player.x - 5;
    }

    if (keyDown("RIGHT_ARROW")) {
        player.x = player.x + 5;
    }

  
    spawnEnemies()
    

    for (var i = 0; i < enemyGroup.length; i++) {
        if (bulletGroup.isTouching(enemyGroup.get(i))) {
            score += 10;
            enemyGroup.get(i).remove()
            bulletGroup.destroyEach()
        }
    }

    for (var i = 0; i < enemyGroup.length; i++) {
        if (player.isTouching(enemyGroup.get(i))) {
            player.remove();
            enemyGroup.get(i).remove()
            bulletGroup.destroyEach()
            gameState = "lose"
        }
    }
    if (gameState === "lose"){
        loseGame();
    }

    if (score == 100){
        gameState = "win"
        winGame();
    }

}
drawSprites();
textSize(40);
fill("red");
text ("Score: " +score, 20, 30);
}



function spawnEnemies() {

    if (frameCount % 100 == 0) {

        var rand = Math.round(random(50, 600))
        enemy = createSprite(width, rand);
        enemy.scale = 0.25
        enemy.velocityX = -8;

        var randimg = Math.round(random(1,4))
        switch (randimg) {

            case 1:
                enemy.addImage(enemy1_img)
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2_img)
                enemy.setCollider("rectangle", 0, 0, enemy.width, enemy.height)
                break;

                case 3:
                    enemy.addImage(enemy3_img)
                    enemy.setCollider("rectangle", 0, 0, 250, 300)
                    break;
    
                case 4:
                    enemy.addImage(enemy4_img)
                    enemy.setCollider("rectangle", 0, 0, enemy.width, enemy.height)
                    break;
            default: break;

        }

        enemy.depth = player.depth;
        player.depth = player.depth + 1;

        enemyGroup.add(enemy);

    }

}

function spawnBullets() {

    bullet = createSprite(500,500);
    bullet.addImage(bullet_img);
    bullet.scale = 0.15;
    bullet.x = 160;
    bullet.velocityX = 15;

    bullet.depth = player.depth;
    player.depth = player.depth + 1;

    bulletGroup.add(bullet);
    
 

}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Control the submarine underwater & survive the robotic sea creatures !!",
        textAlign: "center",
        //imageUrl: "spaceImg.jpg",
        //imageSize: "200x200",
        confirmButtonText: "Lets destroy the sea creatures!!",
        confirmButtonColor: "blue",
    },
        function () {
            gameState = "wait"
        }
  
    )
  
  
  }

  function loseGame() {

    swal({
        title: "You Lost!!",
        text: "Please try again!!",
        textAlign: "center",
        //imageUrl: "spaceImg.jpg",
        //imageSize: "200x200",
        confirmButtonText: "Lets play again!!",
        confirmButtonColor: "blue",
    },
        function () {
            gameState = "wait"
        }
  
    )
  
  
  }
  function winGame() {

    swal({
        title: "You Win!!",
        text: "Good going!!",
        textAlign: "center",
        //imageUrl: "spaceImg.jpg",
        //imageSize: "200x200",
        confirmButtonText: "Lets play again!!",
        confirmButtonColor: "blue",
    },
        function () {
            gameState = "wait"
        }
  
    )
  
  
  }