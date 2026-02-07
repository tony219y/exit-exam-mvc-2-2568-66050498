export default class ValidationService {
  /**
   * ตรวจสอบรหัสคำขอ (8 หลัก, ไม่ขึ้นต้นด้วย 0)
   */
  static validateClaimInput(input: any) {
    const { id } = input;

    if (!id) {
      return { success: false, message: "กรุณาระบุรหัสคำขอ" };
    }

    const idStr = String(id);

    // Regex: [1-9] ตัวแรกต้อง 1-9, [0-9]{7} อีก 7 ตัวที่เหลือเป็น 0-9 (รวมเป็น 8 หลัก)
    const isValidFormat = /^[1-9][0-9]{7}$/.test(idStr);

    if (!isValidFormat) {
      return {
        success: false,
        message: "รหัสคำขอต้องมี 8 หลัก และไม่ขึ้นต้นด้วย 0",
      };
    }

    return {
      success: true,
      data: { id: idStr },
    };
  }
}
