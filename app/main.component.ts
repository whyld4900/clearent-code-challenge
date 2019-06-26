import { Component, Input } from '@angular/core';
import { CardType } from './card.enum';
import { Wallet } from './wallet.model';
import { Card } from './card.model';

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

  public getPersonCount(): number {
    return this.persons.length;
  }

  public getWalletCount(): number {
    return this.wallets.length;
  }

}
