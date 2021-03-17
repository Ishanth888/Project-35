//Create variables here
var dog, dogIMG, happyDogIMG;  
var database;
var foodS;
var foodScript   
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
}


function draw() {  
background(46, 139, 87)

fill("white");
stroke("white");
textSize(20);
text("Food Remaining:" + foodS, 180, 160);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogIMG);
}
  drawSprites();
  //add styles here
 fill("white");
 stroke("white");
 textSize(10);
 text("Note: Press UP_ARROW Key To Feed Drago Milk!",100,20);
 
 
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values from DB
function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x=x-1
  }
 database.ref('/').update({
   Food:x
 })
}