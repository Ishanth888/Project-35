//Create variables here
var dog, dogIMG, happyDogIMG;  
var database;
var foodS;
var foodScript 
var fedTime;
var lastFed;
var foodObj;  
var feedDog;
var addFood;
function preload(){
	//load images here
  dogIMG=loadImage("images/dog.png");
  happyDogIMG=loadImage("images/happyDog.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(250, 250, 10,10);
	dog.addImage(dogIMG);
  dog.scale=0.2
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87)

fill("white");
stroke("white");
textSize(20);
text("Food Remaining:" + foodS, 180, 160);

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12 + " PM", 350, 30);
 }else if(lastFed>=12){
  text("Last Feed : 12 AM", 350, 30);
 }else{
   text("Last Feed : "+ " AM", 350, 30);
 }

 fedTime = database.ref('FeedTime');
 fedTime.on("value", function(data){
 lastFed = data.val();

 })
  drawSprites();
  //add styles here
 
 }

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//Function to write values from DB
// function writeStock(x){
//   if(x<=0){
//     x=0;
//   } else{
//     x=x-1
//   }
//  database.ref('/').update({
//    Food:x
//  })
// }

//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDogIMG);

if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);
} else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}