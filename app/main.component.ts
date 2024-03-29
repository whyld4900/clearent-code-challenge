import { Component, Input } from '@angular/core';
import { CardType } from './card.enum';
import { Wallet } from './wallet.model';
import { Card } from './card.model';
import { InterestService } from './interest.service';

@Component({
  selector: 'clearent-main',
  template: `<p>Tests results are above. :)</p>`
})
export class MainComponent {

  @Input() persons: number[];
  @Input() wallets: Wallet[];
  @Input() cards: Card[];

  constructor(
    public interestSVC: InterestService
  ) { }

  public sumInterestForAllPersons(persons: number[]): number {
    const sum = persons.map(person => {
      return this.sumInterestByPerson(person);
    });

    return sum.reduce((acc, interest) => {
      acc += interest;
      return acc;
    }, 0)
  }

  public sumInterestByPerson(id: number): number {

    let sum = 0;

    const personWallets = this.wallets.filter(wallet => wallet.personId === id);

    personWallets.forEach(wallet => {
      sum += this.cards.reduce((acc, card) => {

        if (card.walletId === wallet.id) {
          acc += this.interestSVC.calculateInterestByCard(card.id, card.balance);
        }

        return acc;
      }, 0);
    });

    return sum;

  }

  public sumInterestByWallet(id: number): number {

    const sum = this.cards.reduce((acc, card) => {

      if (card.walletId === id) {
        acc += this.interestSVC.calculateInterestByCard(card.id, card.balance);
      }

      return acc;
    }, 0);

    return sum;

  }

  public sumInterestForPersonListByCard(id: number): any {

    let cardSums = {};

    const personWallets = this.wallets.filter(wallet => wallet.personId === id);

    personWallets.forEach(wallet => {
      this.cards.forEach(card => {
        if (card.walletId === wallet.id) {
          if (!cardSums[card.id]) {
            cardSums[card.id] = 0;
          }
          const interest = this.interestSVC.calculateInterestByCard(card.id, card.balance);
          cardSums[card.id] += interest;
        }

      });
    });

    return cardSums;

  }

  public sumInterestForPersonListByWallet(id: number): any {

    let walletSums = {};

    const personWallets = this.wallets.filter(wallet => wallet.personId === id);

    personWallets.forEach(wallet => {

      this.cards.forEach(card => {
        if (card.walletId === wallet.id) {
          if (!walletSums[card.walletId]) {
            walletSums[card.walletId] = 0;
          }
          const interest = this.interestSVC.calculateInterestByCard(card.id, card.balance);
          walletSums[card.walletId] += interest;
        }

      });
    });

    return walletSums;

  }

}
