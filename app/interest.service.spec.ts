import * as sinon from "sinon";
import { TestBed } from "@angular/core/testing";
import { InterestService } from "./interest.service";
import { CardType } from './card.enum';

describe("InterestService", () => {

  const balance100Test: number = 100.00;

  let svc: InterestService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        InterestService
      ]
    });

    svc = TestBed.get(InterestService);
  });

  it("will calculate interest for Discover", () => {

    const resultToTest = svc.calculateInterestByCard(CardType.Discover, balance100Test);

    expect(resultToTest).toBe(1);

  });

  it("will calculate interest for MC", () => {

    const resultToTest = svc.calculateInterestByCard(CardType.MC, balance100Test);

    expect(resultToTest).toBe(5);

  });

  it("will calculate interest for Visa", () => {

    const resultToTest = svc.calculateInterestByCard(CardType.Visa, balance100Test);

    expect(resultToTest).toBe(10);

  });

});