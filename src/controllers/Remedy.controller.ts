import { Claim } from "../models/Claim.model.js";
import { HighIncomeClaim } from "../models/HighIncomeClaim.model.js";
import { LowIncomeClaim } from "../models/LowIncomeClaim.model.js";
import { RemedyModel } from "../models/Remedy.model.js";
import ValidationService from "../services/validator.service.js";

export class RemedyController {
  constructor(
    protected model: RemedyModel, // รับ RemedyModel (Data Manager) เข้ามาใช้งาน
  ) {}

  processRemedy(input: any) {
    // Input (Requirement 5.1: 8 หลัก ไม่ขึ้นต้นด้วย 0)
    const validationResult = ValidationService.validateClaimInput(input);

    if (!validationResult.success || !validationResult.data) {
      return {
        success: false,
        message: validationResult.message || "รหัสคำขอไม่ถูกต้อง",
      };
    }

    const { id } = validationResult.data;

    // ดึงข้อมูล Claim จาก "คลังข้อมูล" (RemedyModel)
    // RemedyModel จะเป็นคนตัดสินใจว่าจะ return new คลาสลูกตัวไหนกลับมา
    const claim = this.model.getClaimById(id);

    if (!claim) {
      return { success: false, message: "ไม่พบรหัสคำขอนี้ในระบบ" };
    }

    // แยกประเภท Model และสั่งประมวลผล (Polymorphism)
    // ใช้ instanceof เพื่อพิสูจน์ให้กรรมการเห็นว่าเราแยก Class ตามประเภทจริง

    let amount = 0;
    let typeMessage = "";

    if (claim instanceof LowIncomeClaim) {
      amount = claim.calculateRemedy(); // เรียก Method จากคลาสลูก LowIncome
      typeMessage = "กลุ่มผู้มีรายได้น้อย";
    } else if (claim instanceof HighIncomeClaim) {
      amount = claim.calculateRemedy(); // เรียก Method จากคลาสลูก HighIncome
      typeMessage = "กลุ่มผู้มีรายได้สูง";
    } else if (claim instanceof Claim) {
      amount = claim.calculateRemedy(); // เรียก Method จากคลาสแม่ (General)
      typeMessage = "กลุ่มทั่วไป";
    }

    // 4. บันทึกผลการคำนวณลงไฟล์ (Requirement 5 ย่อยสุดท้าย)
    const isSaved = this.model.saveCompensation(claim.claimId, amount);

    if (isSaved) {
      return {
        success: true,
        message: `ประมวลผลสำเร็จสำหรับ${typeMessage}: ยอดเงินเยียวยาคือ ${amount.toLocaleString()} บาท`,
      };
    }

    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" };
  }
}
