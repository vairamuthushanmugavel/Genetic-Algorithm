var textNode = document.getElementById("text");
var generationNode = document.getElementById("generation");
var populationNode = document.getElementById("population");
var avgfitnessNode = document.getElementById("averagefitness");
var mutratioNode = document.getElementById("mutratio");
//text to be guesses.
var text = "to be or not to be";
var mutationRation = 0.1;
var population = 200;
population;
function displayInfo() {
  textNode.textContent = text;
  mutratioNode.textContent = mutationRation * 100 + "%";
  populationNode.textContent = population;
}
// displayInfo();
