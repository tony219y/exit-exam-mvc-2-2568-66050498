import { readFileSync, appendFileSync } from "fs";
import { join } from "path";
import { Claim } from "./Claim.model.js";
import { LowIncomeClaim } from "./LowIncomeClaim.model.js";
import { HighIncomeClaim } from "./HighIncomeClaim.model.js";

export class RemedyModel {
  // Path ไปยังโฟลเดอร์ data
  private dataPath = join(process.cwd(), "data");

  // ฟังก์ชันช่วยอ่าน CSV แปลงเป็น Array of Objects
  public loadData(fileName: string) {
    const filePath = join(this.dataPath, fileName);
    const content = readFileSync(filePath, "utf-8");
    const lines = content.split("\n").filter((l) => l.trim() !== "");
    const headers = lines[0].split(",").map((h) => h.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return headers.reduce((obj: any, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
    });
  }

  getClaimById(id: string): Claim | null {
    // อ่านจากไฟล์จริงๆ ทุกครั้งที่เรียก (หรือจะทำ Cache ก็ได้แต่สอบจริงเน้นอ่านสด)
    const claims = this.loadData("claims.csv");
    const claimants = this.loadData("claimants.csv");
    const policies = this.loadData("policies.csv");

    const claimData = claims.find((c) => c.claimId === id);
    if (!claimData) return null;

    const claimant = claimants.find((c) => c.id === claimData.claimantId);
    if (!claimant) return null;

    const income = Number(claimant.income);

    // เลือก Model และส่ง Policy ที่อ่านจาก CSV เข้าไป
    if (income < 6500) {
      const policy = policies.find((p) => p.type === "LowIncome");
      return new LowIncomeClaim(claimData.claimId, claimant.id, income, policy);
    }

    if (income >= 50000) {
      const policy = policies.find((p) => p.type === "HighIncome");
      return new HighIncomeClaim(
        claimData.claimId,
        claimant.id,
        income,
        policy,
      );
    }

    const policy = policies.find((p) => p.type === "General");
    return new Claim("General", claimData.claimId, claimant.id, income, policy);
  }

  saveCompensation(claimId: string, amount: number): boolean {
    const filePath = join(this.dataPath, "compensations.csv");
    const date = new Date().toISOString().split("T")[0];
    const row = `${claimId},${amount},${date}\n`;

    // บันทึกต่อท้ายไฟล์ (Append) ตาม Requirement 5
    appendFileSync(filePath, row);
    return true;
  }
}
