export default function ClientDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">تفاصيل العميل</h1>
      <p className="text-slate-500">معرف العميل: {params.id}</p>
    </div>
  )
}
