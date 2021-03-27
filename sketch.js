var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	engine = Engine.create();
	world = engine.world;

	packageSprite = createSprite(width / 2, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2

	helicopterSprite = createSprite(width / 2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6

	groundSprite = createSprite(width / 2, height - 35, width, 10);
	groundSprite.shapeColor = color(255)

	boxPosition = width / 2 - 100;
	boxY = 610;

	boxLeftSprite = createSprite(boxPosition, boxY, 20, 100);
	boxLeftSprite.shapeColor = color(255, 0, 0);

	boxLeftBody = Bodies.rectangle(boxPosition + 20, boxY, 20, 100, { isStatic: true });
	World.add(world, boxLeftBody);

	boxRightSprite = createSprite(boxPosition + 200, boxY, 20, 100);
	boxRightSprite.shapeColor = "red";

	boxRightBody = Bodies.rectangle(boxPosition + 180, boxY, 20, 100);
	World.add(world, boxRightBody);

	packageBody = Bodies.circle(width / 2, 200, 5, { restitution: 0.4, isStatic: true });
	World.add(world, packageBody);

	boxBottomSprite = createSprite(boxPosition + 100, boxY + 40, 200, 20);
	boxBottomSprite.shapeColor = "red";

	boxBottomBody = Bodies.rectangle(boxPosition + 100, boxY + 25, 200, 20);
	World.add(world, boxBottomBody);

	//Create a Ground
	ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
	World.add(world, ground);




}


function draw() {
	background(0);
	Engine.update(engine);
	rectMode(CENTER);
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;

	Engine.run(engine);

	drawSprites();

}

function keyPressed() {
	if (keyCode === LEFT_ARROW) { 
		helicopterSprite.x = helicopterSprite.x - 20;
		translation = { x: -20, y: 0 } 
		Matter.Body.translate(packageBody, translation) 
	} else if (keyCode === RIGHT_ARROW) {
		 helicopterSprite.x = helicopterSprite.x + 20; 
		 translation = { x: 20, y: 0 }
		 Matter.Body.translate(packageBody, translation) 
	} else if (keyCode === DOWN_ARROW) {
		 Matter.Body.setStatic(packageBody, false);
	 }
}



