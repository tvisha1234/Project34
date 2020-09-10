//Create variables here
var dog, happyDog, database, foodS, foodStock, dogImg, happyDogImg;
var count = 20;

function preload()
{
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,30,30);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown("UP_ARROW")) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
    if(count <= 0) {
      count = 0;
    }
    else{
      count = count - 1;
    }
  }

  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  text("Press the UP ARROW KEY to feed Tom milk!", 50, 100);
  text("Milk Left: "+count, 50,50);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



