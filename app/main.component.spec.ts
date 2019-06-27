import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { CardType } from './card.enum';
import { Wallet } from './wallet.model';
import { Card } from './card.model';

@Component({
  template: `<clearent-main
              [persons]="testPersons"
              [wallets]="testWallets"
              [cards]="testCards"
              ></clearent-main>`
})
class MainComponentTester {
  public testPersons: number[] = [1];
  public testWallets: Wallet[] = [
    { id: 1, personId: 1 }
  ];
  public testCards: Card[] = [
    { id: CardType.Discover, walletId: 1, balance: 100.00 },
    { id: CardType.MC, walletId: 1, balance: 100.00 },
    { id: CardType.Visa, walletId: 1, balance: 100.00 }
  ];
}

describe('MainComponent', () => {
  let fixture: ComponentFixture<MainComponentTester>;
  let component: MainComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, MainComponentTester]
    });
    fixture = TestBed.createComponent(MainComponentTester);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  describe('1-person|1-wallet|3-cards', () => {

    it('will sum all the interest for a person', () => {

      let testResult = component.sumInterestByPerson(component.persons[0]);

      expect(testResult).toEqual(16);

    });

     it('will sum all the interest for a person and break it down by card', () => {

      let testResult = component.sumInterestForPersonListByCard(component.persons[0]);

      expect(testResult).toEqual(16);

    });

  });

  describe('1-person|2-wallet|3-cards', () => {

    it('TODO-55555', () => {

      component.wallets = [{ id: 1, personId: 1 }, { id: 2, personId: 1 }];

      let testResult = component.getWalletCount();

      expect(testResult).toEqual(2);

    });

  });

});