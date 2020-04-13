/**
 * @returns {char}  returns a random charactor.
 * @description generate the random charater each and everytime
 * @todo should replace the this function more generic way.
 */
function randomChar() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let index = Math.floor(Math.random() * characters.length);
  return characters.charAt(index);
}

class DNA {
  constructor(length) {
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < length; i++) {
      this.genes[i] = randomChar();
    }
  }
  /**
   * @param {string} text phase to be matched.
   * @returns {number} fitness score to that compared with target phrase
   */
  calculateFitness(text) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === text[i]) {
        score++;
      }
    }
    this.fitness = score / text.length;
  }
  /**
   *
   * @param {DNA} partner DNA to be mixed with current DNA
   * @returns {DNA} New DNA which generated.
   */
  crossOver(partner) {
    let child = new DNA(this.genes.length);
    let midPoint = Math.floor(this.genes.length / 2);
    for (let i = 0; i < this.genes.length; i++) {
      if (i < midPoint) {
        child[i] = partner.genes[i];
      } else {
        child[i] = this.genes[i];
      }
    }
  }
  /**
   *
   * @param {num} mutationRate the ratio that genes should be mutated
   * @description mutate the genes based on mutatipn rate which we are giving.
   */
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      let prob = Math.random();
      if (prob < mutationRate) {
        this.genes[i] = randomChar();
      }
    }
  }
}
