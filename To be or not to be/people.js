class People {
  constructor(maxpopulation, targetPhrase, mutationRate) {
    this.population = [];
    this.generation = 0;
    this.targetPhrase = targetPhrase;
    this.mutationRate = mutationRate;
    this.maxpopulation = maxpopulation;
    for (let i = 0; i < maxpopulation; i++) {
      this.population[i] = new DNA(targetPhrase.length);
    }
  }
  calculateFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calculateFitness(this.targetPhrase);
    }
  }
  generate() {
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    let newPopulation = [];
    for (let i = 0; i < this.maxpopulation; i++) {
      partnerA = this.acceptOrReject(maxFitness);
      partnerB = this.acceptOrReject(maxFitness);
      let child = partnerA.crossOver(partnerB);
      child.mutate(this.mutationRate);
      this.population.push(child);
    }
    this.population = newPopulation;
    this.generation++;
  }

  getGenerationCount() {
    return this.generation;
  }

  getAvgFitness() {
    let avgFitness = 0;
    for (let i = 0; i < this.maxpopulation; i++) {
      avgFitness += this.population[i].fitness;
    }
    return avgFitness / this.population.length;
  }

  acceptOrReject(maxfitness) {
    while (true) {
      let idx = Math.floor(Math.random() * this.population.length);
      let partner = this.population[idx];
      let prob = Math.floor(Math.random * maxfitness);
      if (prob < partner.fitness) {
        return partner;
      }
    }
  }
}
