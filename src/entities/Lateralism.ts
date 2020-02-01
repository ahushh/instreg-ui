

export class Lateralism {
  name = 'lateralism';
  public value = 0;
  static create(options: string[]) {
    const lateralism = new Lateralism();

    if (options.includes('lateralism/bilateral')) {
      lateralism.value = 0.8;
      return lateralism;
    } else if (options.includes('laterlaism/multilateral')) {
      lateralism.value = 0.5;
      return lateralism;
    }
    return lateralism;
  }
}