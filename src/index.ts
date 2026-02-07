import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { RemedyModel } from './models/Remedy.model.js'
import { RemedyController } from './controllers/Remedy.controller.js'
import { FormView } from './views/Form.view.js'
import { LoginView } from './views/Login.view.js'
import { AdminDashboardView } from './views/AdminDashboard.view.js'

const app = new Hono()
const remedyModel = new RemedyModel()
const remedyController = new RemedyController(remedyModel)

// Middleware กั้นสิทธิ์
const adminGuard = async (c: any, next: any) => {
  if (getCookie(c, 'user_role') !== 'staff') return c.redirect('/login')
  await next()
}

// Routes ประชาชน
app.get('/', (c) => c.html(FormView({})))
app.post('/process', async (c) => {
  const result = remedyController.processRemedy(await c.req.parseBody())
  return c.html(FormView({ message: result.message, error: !result.success }))
})

// Routes Authentication
app.get('/login', (c) => c.html(LoginView({})))
app.post('/login', async (c) => {
  const { username, password } = await c.req.parseBody()
  if (username === 'admin' && password === '1234') {
    setCookie(c, 'user_role', 'staff')
    return c.redirect('/admin/dashboard')
  }
  return c.html(LoginView({ message: 'Login Failed!' }))
})

// Routes เจ้าหน้าที่ (ตอนนี้ Clean แล้ว!)
app.get('/admin/dashboard', adminGuard, (c) => {
  // 1. ดึงข้อมูลจาก Model (Data Logic)
  const data = remedyModel.loadData('compensations.csv')
  
  // 2. ส่งข้อมูลไปที่ View เพื่อ Render (Presentation Logic)
  return c.html(AdminDashboardView({ data })) 
})

app.get('/logout', (c) => {
  deleteCookie(c, 'user_role')
  return c.redirect('/')
})

serve({ fetch: app.fetch, port: 3000 })