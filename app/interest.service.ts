import { Injectable } from '@angular/core';
import { Rate } from './rate.model';
import { CardType } from './card.enum';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  public rate: Rate[] = [
    { cardId: CardType.Discover, percent: 1 },
    { cardId: CardType.MC, percent: 5 },
    { cardId: CardType.Visa, percent: 10 }
  ];

  constructor(
  ) {
  }

  public getRateByCard(card: CardType): Rate {
    return this.rate.find(item => item.cardId === card);
  }

  public getPercentForCalc(rate: Rate): number {
    return rate.percent / 100;
  }

  public calculateInterestByCard(card: CardType, balance: number): number {

    const rate = this.getRateByCard(card);
    const percent = this.getPercentForCalc(rate);

    return balance * percent;

  }

}