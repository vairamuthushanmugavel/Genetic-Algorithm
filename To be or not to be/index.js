var textNode = document.getElementById("text");
var generationNode = document.getElementById("generation");
var populationNode = document.getElementById("population");
var avgfitnessNode = document.getElementById("averagefitness");
var mutratioNode = document.getElementById("mutratio");
var bestTextNode = document.getElementById("bestText");
var textContainerNode = document.getElementById("textContainer");
var setIntervalRef = null
//text to be guesses.
var target = "to be or not to be";
var mutationRatio = 0.01;
var maxPopulation = 400;

var population =  new People(maxPopulation,target,mutationRatio);

function draw(){
  population.calculateFitness();
  population.generate();
  population.calculateFitness();
  population.evalute();
  displayInfo();
  if(population.isFinished){
    clearInterval(setIntervalRef)
  }

}
setIntervalRef = setInterval(draw,100)

function displayInfo() {
  textNode.textContent = target;
  generationNode.textContent =  population.getGenerationCount();
  avgfitnessNode.textContent  = population.getAvgFitness();
  mutratioNode.textContent = mutationRatio * 100 + "%";
  populationNode.textContent = maxPopulation;
  bestTextNode.textContent =  population.getBestPhrase();
  textContainerNode.innerHTML = population.getAllPhrase()

}
// displayInfo();
