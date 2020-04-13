class People {
  constructor(maxpopulation, targetPhrase, mutationRate) {
    this.population = [];
    this.generation = 0;
    this.targetPhrase = targetPhrase;
    this.mutationRate = mutationRate;
    this.maxpopulation = maxpopulation;
    this.bestPhrase = "";
    this.perfectScore = 1;
    this.isFinished = false;
    for (let i = 0; i < maxpopulation; i++) {
      this.population[i] = new DNA(targetPhrase.length);
    }
  }
  /**
   * @description  calculate the fitness for current genration
   */
  calculateFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calculateFitness(this.targetPhrase);
    }
  }
  /**
   * @description generate new population
   */
  generate() {
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    let newPopulation = [];
    for (let i = 0; i < this.maxpopulation; i++) {
      let partnerA = this.acceptOrReject(maxFitness);
      let partnerB = this.acceptOrReject(maxFitness);
      let child = partnerA.crossOver(partnerB);
      child.mutate(this.mutationRate);
      // child.calculateFitness(this.targetPhrase);
      // console.log(child.fitness);
      newPopulation.push(child);
    }

    this.population = newPopulation;
    this.generation++;
  }
  /**
   * @returns {Number} current generation count.
   */
  getGenerationCount() {
    return this.generation;
  }
  /**
   * @returns {num} returns the average fitness
   *@description getting hthe average fitness in current population.
   */

  getAvgFitness() {
    let avgFitness = 0;
    for (let i = 0; i < this.maxpopulation; i++) {
      avgFitness += this.population[i].fitness;
    }
    return avgFitness / this.population.length;
  }
  /**
   *
   * @description picking up the partner based on accept and reject method.
   */

  acceptOrReject() {
    let besafe = 0;
    while (true) {
      if (besafe < 10000) {
        let idx = Math.floor(Math.random() * this.population.length);
        let partner = this.population[idx];
        let prob = Math.random();

        if (prob < partner.fitness) {
          return partner;
        }
        besafe++;
      } else {
        let idx = Math.floor(Math.random() * this.population.length);
        let partner = this.population[idx];
        return partner;
      }
    }
  }
  /**
   * @returns {string} returns all the phrase
   * @description returns all the phrase in current population
   */
  getAllPhrase() {
    let phrases = "";
    for (let i = 0; i < this.population.length; i++) {
      phrases += this.population[i].getPhrase() + "<br>";
    }
    return phrases;
  }
  /**
   * @description Evaluvating whether if current population has reached best phrase.
   */
  evalute() {
    let maxfit = 0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxfit) {
        maxfit = this.population[i].fitness;
        index = i;
      }
    }
    this.bestPhrase = this.population[index].getPhrase();
    if (maxfit === this.perfectScore) {
      this.isFinished = true;
    }
  }
  /**
   * @returns returns the best phrase.
   * @description returing the best phrase of current population.
   */
  getBestPhrase() {
    return this.bestPhrase;
  }
}
