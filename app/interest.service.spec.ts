import * as sinon from "sinon";
import { TestBed } from "@angular/core/testing";
import { InterestService } from "./interest.service";
import { CardType } from './card.enum';

describe("InterestService", () => {

  let sandbox: sinon.SinonSandbox;
  // let corpStoreStub: sinon.SinonStubbedInstance<CorpStore>;

  let svc: InterestService;

  beforeEach(() => {

    sandbox = sinon.createSandbox();
    // corpStoreStub = sandbox.createStubInstance(CorpStore);

    TestBed.configureTestingModule({
      providers: [
        InterestService
      ]
    });

    svc = TestBed.get(InterestService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("calculateInterestByCard-MC", () => {

    const balanceTest = 100.00;  

    const resultToTest = svc.calculateInterestByCard(CardType.MC, balanceTest);

    expect(resultToTest).toBe(5);

  });

});