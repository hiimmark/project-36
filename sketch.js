var dog,sadDog,happyDog, database, feed, lastFed,feedTime;
var foodS,foodStock, feedButton, title;
var addFood;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFed = database.ref('feedTime')
  lastFed.on("value",readTime)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedButton=createButton("Feed The Dog")
  feedButton.position(600,95)
  feedButton.mousePressed(feedDog)

  title = createElement('h3')
  title.position(300,90)


}
function readTime(data){
  feedTime = data.val()
}

function draw() {
  background(46,139,87);
  foodObj.display();
  if(feedTime >= 12){
    title.html("Last Fed: "+(feedTime-12)+" PM")
  }
  else if(feedTime == 0){
    title.html("Last Fed: 12 AM")
  }
  else{
    title.html("Last Fed: "+feedTime+" AM")
  }

  //write code to read fedtime value from the database 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);
  if(foodS <= 0){
    foodS = foodS
  }
  else{
    foodS--;
  }
  database.ref('/').update({
    Food:foodS,
    feedTime: hour()
  })

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
