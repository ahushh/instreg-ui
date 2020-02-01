
export class Commitment {
  name = 'commitment';
  public value: number = 0;

  static create(options: string[]) {
    const commitment = new Commitment();

    if (options.includes('non-regulatory')) {
      commitment.value = 0.4;
      return commitment;
    }
    if (options.includes('regulatory')) {
      commitment.value = 0.6;
      return commitment;
    }
    return commitment;
  }
}