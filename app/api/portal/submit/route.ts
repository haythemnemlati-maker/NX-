import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const token = formData.get('token') as string
    const portalId = formData.get('portalId') as string
    const responsesRaw = formData.get('responses') as string

    if (!token || !portalId || !responsesRaw) {
      return NextResponse.json({ error: 'بيانات غير مكتملة' }, { status: 400 })
    }

    const responses = JSON.parse(responsesRaw)
    const supabase = createClient()

    // 1. التحقق من صحة الرابط وهل تم استخدامه سابقاً
    const { data: linkData, error: linkError } = await supabase
      .from('portal_links')
      .select('id, is_used')
      .eq('token', token)
      .single()

    if (linkError || !linkData) {
      return NextResponse.json({ error: 'الرابط غير صالح' }, { status: 404 })
    }

    if (linkData.is_used) {
      return NextResponse.json({ error: 'تم استخدام هذا الرابط من قبل' }, { status: 410 })
    }

    // 2. معالجة وركوب الملفات المرفوعة إلى Supabase Storage
    const uploadedFilesMap: Record<string, string> = {}
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && key.startsWith('file_')) {
        const fieldId = key.replace('file_', '')
        const fileExt = value.name.split('.').pop()
        const filePath = `${portalId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('portal_assets')
          .upload(filePath, value)

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('portal_assets')
            .getPublicUrl(filePath)

          uploadedFilesMap[fieldId] = publicUrlData.publicUrl
        }
      }
    }

    // دمج روابط الملفات مع الإجابات النصية
    const finalData = {
      text_answers: responses,
      file_urls: uploadedFilesMap,
    }

    // 3. حفظ بيانات العميل في جدول Submissions
    const { error: insertError } = await supabase
      .from('submissions')
      .insert({
        portal_id: portalId,
        link_id: linkData.id,
        data: finalData,
      })

    if (insertError) {
      return NextResponse.json({ error: 'فشل حفظ البيانات' }, { status: 500 })
    }

    // 4. إغلاق الرابط لمنع استخدامه مرة أخرى (One-Time Link)
    await supabase
      .from('portal_links')
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq('id', linkData.id)

    return NextResponse.json({ success: true, message: 'تم إرسال البيانات بنجاح' })
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ غير متوقع في السيرفر' }, { status: 500 })
  }
}
