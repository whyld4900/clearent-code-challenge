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

      expect(testResult).toBe(16);

    });

    it('will sum all the interest for a person and break it down by card', () => {

      let testResult = component.sumInterestForPersonListByCard(component.persons[0]);

      let testSum = 0;
      Object.keys(testResult).forEach(id => { testSum += testResult[id] });

      expect(testSum).toBe(16);
      expect(testResult[CardType.MC]).toBe(5);

    });

  });

  describe('1-person|2-wallet|3-cards', () => {

    const testWallets = [
      { id: 1, personId: 1 },
      { id: 2, personId: 1 }
    ];

    const testCards = [
      { id: CardType.Discover, walletId: 1, balance: 100.00 },
      { id: CardType.MC, walletId: 2, balance: 100.00 },
      { id: CardType.Visa, walletId: 1, balance: 100.00 }
    ];

    it('will sum all the interest for a person', () => {

      component.wallets = testWallets;
      component.cards = testCards;

      let testResult = component.sumInterestByPerson(component.persons[0]);

      expect(testResult).toBe(16);

    });

    it('will sum all the interest for a person and break it down by wallet', () => {

      component.wallets = testWallets;
      component.cards = testCards;

      let testResult = component.sumInterestForPersonListByWallet(component.persons[0]);
      let testSum = 0;
      Object.keys(testResult).forEach(id => { testSum += testResult[id] });

      expect(testSum).toBe(16);
      expect(testResult[2]).toBe(5);

    });

  });

  describe('2-person|2-wallet|4-cards', () => {

    const testWallets = [
      { id: 1, personId: 1 },
      { id: 2, personId: 2 }
    ];

    const testCards = [
      { id: CardType.MC, walletId: 1, balance: 100.00 },
      { id: CardType.MC, walletId: 2, balance: 100.00 },
      { id: CardType.Visa, walletId: 1, balance: 100.00 },
      { id: CardType.Visa, walletId: 2, balance: 100.00 }
    ];

    it('will sum all the interest for all persons', () => {

      component.persons = [1, 2];
      component.wallets = testWallets;
      component.cards = testCards;


      let testResult = component.sumInterestForAllPersons(component.persons);

      expect(testResult).toBe(30);

    });

    it('will sum all the interest for each person', () => {

      component.persons = [1, 2];
      component.wallets = testWallets;
      component.cards = testCards;

      component.persons.forEach(person => {
        let testResult = component.sumInterestByPerson(person);

        expect(testResult).toBe(15);
      });


    });

    it('will sum all the interest for a wallet', () => {

      component.persons = [1, 2];
      component.wallets = testWallets;
      component.cards = testCards;

      component.wallets.forEach(wallet => {
        let testResult = component.sumInterestByWallet(wallet.id);

        expect(testResult).toBe(15);
      });

    });

  });

});