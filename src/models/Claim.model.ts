export class Claim {
  public type: string;

  constructor(
    type: string,
    public claimId: string, // รหัสคำขอ 8 หลัก
    public claimantId: string, // รหัสประชาชน
    public income: number, // รายได้ต่อเดือน
    protected policy: any
  ) {
    this.type = type;
  }

  // Business Rule: รายได้ทั่วไป ได้เท่าที่จ่ายจริงแต่ไม่เกิน 20,000
  calculateRemedy(): number {
    return Math.min(this.income, this.policy.max_amount);
  }
}
