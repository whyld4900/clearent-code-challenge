import { Component, Input } from '@angular/core';
import { CardType } from './card.enum';
import { Wallet } from './wallet.model';
import { Card } from './card.model';
import { InterestService } from './interest.service';

@Component({
  selector: 'clearent-main',
  template: `<br><div>persons: <pre>{{persons | json}}</pre></div><hr>
            <div>wallets: <pre>{{wallets | json}}</pre></div><hr>
            <div>cards: <pre>{{cards | json}}</pre></div>`
})
export class MainComponent {

  @Input() persons: number[];
  @Input() wallets: Wallet[];
  @Input() cards: Card[];

  constructor(
    public interestSVC: InterestService
  ) { }

  public sumInterestByPerson(id: number): number {

    let sum = 0;

    const personWallets = this.wallets.filter(wallet => wallet.personId === id);

    personWallets.forEach(wallet => {
      sum += this.cards.reduce((acc, card) => {
        acc += this.interestSVC.calculateInterestByCard(card.id, card.balance);
        return acc;
      }, 0);
    });

    return sum;

  }

  public sumInterestForPersonListByCard(id: number): any {

    let cardSums = {};

    const personWallets = this.wallets.filter(wallet => wallet.personId === id);

    personWallets.forEach(wallet => {
      this.cards.forEach(card => {
        cardSums[card.id] = 0;
        const interest = this.interestSVC.calculateInterestByCard(card.id, card.balance);
        cardSums[card.id] += interest;
      });
    });

    return cardSums;

  }

  public getWalletCount(): number {
    return this.wallets.length;
  }

}
