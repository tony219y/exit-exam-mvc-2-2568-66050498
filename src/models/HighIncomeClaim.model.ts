import { Claim } from "./Claim.model.js";

export class HighIncomeClaim extends Claim {
  constructor(
    claimId: string,
    claimantId: string,
    income: number,
    policy: any,
  ) {
    super("HighIncome", claimId, claimantId, income, policy);
  }

  /**
   * สูตร: (รายได้ / 5) แต่ไม่เกินเพดานสูงสุดใน Policy
   */
  override calculateRemedy(): number {
    const calculatedAmount = this.income / 5;
    return Math.min(calculatedAmount, this.policy.max_amount);
  }
}
