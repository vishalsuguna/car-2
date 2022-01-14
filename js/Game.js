class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // TA
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
    fuels=new Group()
    powercoins=new Group()
    this.addSprites(fuels,5,fuelImage,0.02)
    this.addSprites (powercoins,20,powerCoinImage,0.1)
  }
   addSprites(spritesGroup,numberofsprites,spritesImage,scale)
   {
     for(var i=0;i<numberofsprites;i++)
     {
       var x,y
       x= random(width/2+150,width/2-150)
       y= random(-height*4.5,height-400)
       var sprites=createSprite(x,y)
       sprites.addImage("sprites",spritesImage)
       sprites.scale=scale
       spritesGroup.add(sprites)
     }
   }
  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;

        //add 1 to the index for every loop
        index = index + 1;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handleFuel(index)
          this.handleCoins(index)
        }
      }

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }
  handleFuel(index)
  {
    cars[index-1].overlap(fuels,function(collector,collected){
      player.fuel=185
      collected.remove()
    })


  }
handleCoins(index)
{
  cars[index-1].overlap(powerCoins,function(collector,collected){
    player.score+=20
    collected.remove()
  })
}


}
