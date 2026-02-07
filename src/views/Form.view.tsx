import { Layout } from "./Layout.view.js";

export const FormView = (props: { message?: string, error?: boolean }) => (
    <Layout title="ระบบตรวจสอบเงินเยียวยา">
        <h1 class="text-2xl font-bold mb-6 text-blue-600">ตรวจสอบสิทธิ์เยียวยา</h1>

        {props.message && (
            <div class={`p-4 mb-4 rounded ${props.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {props.message}
            </div>
        )}

        <form method="post" action="/process" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">รหัสคำขอ (8 หลัก)</label>
                <input
                    type="text"
                    name="id"
                    maxlength={8}
                    placeholder="เช่น 12345678"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                ประมวลผลคำขอ
            </button>
        </form>
    </Layout>
)