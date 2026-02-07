import { Claim } from "./Claim.model.js";

export class LowIncomeClaim extends Claim {
  constructor(
    claimId: string,
    claimantId: string,
    income: number,
    policy: any,
  ) {
    super("LowIncome", claimId, claimantId, income, policy);
  }

  /**
   * ดึงค่าเงินคงที่มาจาก policy.max_amount (ซึ่งใน CSV คือ 6500)
   */
  override calculateRemedy(): number {
    return this.policy.max_amount;
  }
}
