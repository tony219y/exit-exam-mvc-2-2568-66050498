import { Hono } from "hono";
import { RemedyModel } from "./models/Remedy.model.js";
import { RemedyController } from "./controllers/Remedy.controller.js";
import { FormView } from "./views/Form.view.js";
import { serve } from "@hono/node-server";

const app = new Hono();

// 1. Initial Model & Controller (Injected)
const remedyModel = new RemedyModel();
const remedyController = new RemedyController(remedyModel);

// 2. Route หน้าแรก (แสดงฟอร์ม)
app.get("/", (c) => {
  return c.html(FormView({}));
});

// 3. Route ประมวลผล (เรียก Controller)
app.post("/process", async (c) => {
  const body = await c.req.parseBody();

  // เรียก Controller ให้ทำงาน (Skinny Controller)
  const result = remedyController.processRemedy(body);

  // ส่งผลลัพธ์กลับไปที่ View
  return c.html(
    FormView({
      message: result.message,
      error: !result.success,
    }),
  );
});

const port = 3000;
console.log(`Server is running on port ${port} 🚀`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
