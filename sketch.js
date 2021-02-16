var dog,happyDog,dogimg,dogimg1;
var database,foodS,foodStock;
var fedTime,lastFed,feed,addFood,foodObj;

function preload()
{
  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();
  dog = createSprite(300,300,20,20);
  dog.addImage(dogimg);
  dog.scale = 0.15;
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() { 
  background(46,139,87);

  foodObj.display();
  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: "+ lastFed % 12 + " pm",350,30)
  }
  else if(lastFed == 0){
    text("Last Feed: 12am",350,30)
  }
  else{
    text("Last Feed: "+ lastFed + " am",350,30)
  }

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDog);
if(foodObj.getFoodStock()<= 0){
  foodObj.updateFoodStock(foodObj.getFoodStock()* 0);
}
else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })}
  function addFoods(){
    foodS ++;
    database.ref("/").update({
      Food: foodS
    })
  }