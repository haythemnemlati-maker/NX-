import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const eventType = body.event_type

    // معالجة حدث نجاح الاشتراك أو إنشائه
    if (eventType === 'subscription.created' || eventType === 'subscription.updated') {
      const customerId = body.data.customer_id
      const status = body.data.status
      const userId = body.data.custom_data?.user_id

      if (userId && status === 'active') {
        // تحديث خطة الوكالة في Supabase
        await supabaseAdmin
          .from('agencies')
          .update({ plan: 'pro' })
          .eq('id', userId)
      }
    }

    // معالجة حدث إلغاء الاشتراك
    if (eventType === 'subscription.canceled') {
      const userId = body.data.custom_data?.user_id
      if (userId) {
        await supabaseAdmin
          .from('agencies')
          .update({ plan: 'free' })
          .eq('id', userId)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
