import { Layout } from './Layout.view.js'

export const AdminDashboardView = (props: { data: any[] }) => (
    <Layout title="Staff Dashboard">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">รายการประมวลผลทั้งหมด</h1>
            <a href="/logout" class="bg-red-500 text-white px-4 py-1 rounded text-sm">ออกจากระบบ</a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse bg-white border border-gray-200">
                <thead>
                    <tr class="bg-gray-100 text-left text-sm text-gray-600">
                        <th class="p-3 border">รหัสคำขอ</th>
                        <th class="p-3 border">ยอดเงิน</th>
                        <th class="p-3 border">วันที่ประมวลผล</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.length > 0 ? (
                        props.data.map((row) => (
                            <tr class="text-sm hover:bg-gray-50">
                                <td class="p-3 border">{row.claimId}</td>
                                <td class="p-3 border font-bold text-green-600">
                                    {Number(row.amount).toLocaleString()} บาท
                                </td>
                                <td class="p-3 border text-gray-500">
                                    {row.processedDate || row.date || row.processed_date || 'ไม่ระบุวันที่'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colspan={3} class="p-10 text-center text-gray-400">ยังไม่มีข้อมูลการประมวลผล</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </Layout>
)