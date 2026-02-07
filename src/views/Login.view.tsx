import { Layout } from "./Layout.view.js";

export const LoginView = (props: { message?: string }) => (
  <Layout title="Login - Staff Only">
    <h1 class="text-2xl font-bold mb-6">Staff Login</h1>
    {props.message && <p class="text-red-500 mb-4">{props.message}</p>}
    <form method="post" action="/login" class="space-y-4">
      <input type="text" name="username" placeholder="Username" class="w-full border p-2 rounded" required />
      <input type="password" name="password" placeholder="Password" class="w-full border p-2 rounded" required />
      <button type="submit" class="w-full bg-black text-white py-2 rounded">Login as Staff</button>
    </form>
    <a href="/" class="block text-center mt-4 text-sm text-gray-500 underline">กลับหน้าประชาชน</a>
  </Layout>
)