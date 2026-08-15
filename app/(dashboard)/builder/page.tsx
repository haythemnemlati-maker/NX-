'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { createClient } from '@/lib/supabase/client'
import { PortalElement, ElementType, ThemeConfig } from '@/types'
import { 
  Type, 
  FileUp, 
  Image as ImageIcon, 
  AlignLeft, 
  CheckSquare, 
  Trash2, 
  GripVertical, 
  Sparkles,
  Save,
  Link as LinkIcon
} from 'lucide-react'

// عناصر الأدوات المتاحة للسحب
const AVAILABLE_ELEMENTS: { type: ElementType; label: string; icon: any }[] = [
  { type: 'text', label: 'حقل نص قصير', icon: Type },
  { type: 'textarea', label: 'حقل نص طويل', icon: AlignLeft },
  { type: 'file', label: 'رفع ملفات / مستندات', icon: FileUp },
  { type: 'logo', label: 'شعار / صورة للبراند', icon: ImageIcon },
  { type: 'select', label: 'قائمة خيارات', icon: CheckSquare },
]

export default function BuilderPage() {
  const [portalTitle, setPortalTitle] = useState('بوابة استقبال عميل جديد')
  const [elements, setElements] = useState<PortalElement[]>([
    { id: '1', type: 'logo', label: 'شعار الوكالة', required: false },
    { id: '2', type: 'text', label: 'اسم الشركة / العميل', placeholder: 'أدخل اسم شركتك هنا', required: true },
    { id: '3', type: 'file', label: 'ملفات المشروع والأصول (Assets)', required: true },
  ])
  
  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: '#2563eb',
    backgroundColor: '#ffffff',
    darkMode: false,
  })

  const [saving, setSaving] = useState(false)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  // إضافة عنصر جديد للصفحة البيضاء
  const addElement = (type: ElementType, label: string) => {
    const newElement: PortalElement = {
      id: Date.now().toString(),
      type,
      label: `عنوان ${label}`,
      placeholder: type === 'file' ? '' : 'أدخل الإجابة هنا...',
      required: true,
    }
    setElements([...elements, newElement])
  }

  // حذف عنصر من الصفحة
  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
  }

  // تحديث بيانات عنصر معين
  const updateElement = (id: string, key: keyof PortalElement, value: any) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, [key]: value } : el))
    )
  }

  // معالجة ترتيب العناصر بعد السحب والإفلات
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(elements)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setElements(items)
  }

  // حفظ البوابة وتوليد الرابط الفريد (One-Time Link)
  const handleSaveAndGenerateLink = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 1. حفظ البوابة في جدول portals
      const { data: portal, error: portalError } = await supabase
        .from('portals')
        .insert({
          agency_id: user.id,
          title: portalTitle,
          schema: elements,
          theme_config: theme,
        })
        .select()
        .single()

      if (portalError || !portal) throw portalError

      // 2. إنشاء توكن فريد ورابط ذكي غير مكرر
      const token = crypto.randomUUID()
      const { error: linkError } = await supabase
        .from('portal_links')
        .insert({
          portal_id: portal.id,
          token: token,
          is_used: false,
        })

      if (linkError) throw linkError

      // 3. عرض الرابط الفريد للوكالة
      const fullUrl = `${window.location.origin}/portal/${token}`
      setGeneratedLink(fullUrl)
    } catch (err: any) {
      alert('حدث خطأ أثناء حفظ البوابة: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* الشريط العلوي للتحكم والحفظ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex-1 w-full sm:w-auto">
          <input
            type="text"
            value={portalTitle}
            onChange={(e) => setPortalTitle(e.target.value)}
            className="text-xl font-bold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-full px-1 py-0.5"
            placeholder="عنوان البوابة..."
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleSaveAndGenerateLink}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-50"
          >
            <Sparkles size={16} />
            {saving ? 'جاري الحفظ والتوليد...' : 'حفظ وتوليد الرابط الفريد'}
          </button>
        </div>
      </div>

      {/* عرض الرابط المولد إذا تم الإنشاء */}
      {generatedLink && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-300 text-sm font-medium">
            <LinkIcon size={18} />
            <span>تم توليد رابط البوابة الفريد (صالح للاستخدام مرة واحدة):</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono w-full sm:w-72"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink)
                alert('تم نسخ الرابط بنجاح!')
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700 transition shrink-0"
            >
              نسخ الرابط
            </button>
          </div>
        </div>
      )}

      {/* منطقة العمل الرئيسية: الأدوات والصفحة البيضاء */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* الشريط الجانبي الأيسر: الأدوات والتخصيص */}
        <div className="space-y-6">
          {/* إضافة العناصر */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">عناصر الصفحة</h3>
            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_ELEMENTS.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.type}
                    onClick={() => addElement(item.type, item.label)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition text-right text-sm font-medium"
                  >
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                    <span>+ {item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* تخصيص الثيم والألوان */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">تخصيص الهوية</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">اللون الأساسي للزر</label>
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-800 p-1 bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* الصفحة البيضاء (Canvas) التي يبني عليها الوكالة الصفحة */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[600px]">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
                معاينة مباشرة للبوابة
              </span>
            </div>

            {/* سحب وإفلات العناصر */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="elements">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {elements.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-sm">
                        الصفحة بيضاء حالياً. اضغط على العناصر في القائمة الجانبية لإضافتها هنا.
                      </div>
                    ) : (
                      elements.map((element, index) => (
                        <Draggable key={element.id} draggableId={element.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="group border border-slate-200 dark:border-slate-800 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-400 transition relative"
                            >
                              <div className="flex items-center justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2 flex-1">
                                  <span {...provided.dragHandleProps} className="cursor-grab text-slate-400 hover:text-slate-600">
                                    <GripVertical size={18} />
                                  </span>
                                  <input
                                    type="text"
                                    value={element.label}
                                    onChange={(e) => updateElement(element.id, 'label', e.target.value)}
                                    className="font-semibold text-sm bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 focus:outline-none px-1 py-0.5 w-full"
                                  />
                                </div>

                                <div className="flex items-center gap-3">
                                  <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={element.required}
                                      onChange={(e) => updateElement(element.id, 'required', e.target.checked)}
                                      className="rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    مطلوب
                                  </label>

                                  <button
                                    onClick={() => removeElement(element.id)}
                                    className="text-slate-400 hover:text-red-500 transition p-1"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>

                              {/* شكل العنصر كمعاينة */}
                              {element.type === 'text' && (
                                <input
                                  disabled
                                  placeholder={element.placeholder}
                                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400"
                                />
                              )}
                              {element.type === 'textarea' && (
                                <textarea
                                  disabled
                                  rows={2}
                                  placeholder={element.placeholder}
                                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400"
                                />
                              )}
                              {element.type === 'file' && (
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 p-4 rounded-lg text-center text-xs text-slate-400 flex flex-col items-center gap-1">
                                  <FileUp size={20} />
                                  <span>منطقة رفع الملفات للعميل</span>
                                </div>
                              )}
                              {element.type === 'logo' && (
                                <div className="border border-slate-200 dark:border-slate-700 p-3 rounded-lg text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                                  <ImageIcon size={18} />
                                  <span>مكان عرض شعار البراند الخاص بك</span>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

      </div>
    </div>
  )
}
