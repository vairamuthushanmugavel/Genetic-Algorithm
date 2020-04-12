class People {
  constructor(maxpopulation, targetPhrase, mutationRate) {
    this.population = [];
    this.generation = 0;
    for (let i = 0; i < maxpopulation; i++) {
       this.population[i] = new DNA(targetPhrase.length);
    }
  }
}
