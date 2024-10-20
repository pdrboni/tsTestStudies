/*
  O LSP diz que em todos os subtipos de discount, o comportamento de calculate deve ser igual. Ou seja, eu não poderia implementar a função calculate novamente em algum subtipo de Discount, pois aí, apesar, de o programa poder funcionar normalmente, a função calculate do subtipo que a implementou novamente, terá um "comportamento diferente". Por exemplo, poderia fazer ela retornar qualquer coisa.
*/

export abstract class Discount {
  protected discount = 0;

  calculate(price: number): number {
    return price - price * this.discount;
  };
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount = 0.5;
}

export class TenPercentDiscount extends Discount {

  protected readonly discount = 0.1;
}

export class NoDiscount extends Discount {

  calculate(price: number): number {
    return price;
  };
}
