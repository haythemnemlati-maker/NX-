export interface SubscriptionPlan {
  id: string
  name: string
  priceId: string
  limits: {
    maxPortals: number
    maxClients: number
    fileUploadLimitMb: number
  }
}

export const PLANS: Record<string, SubscriptionPlan> = {
  FREE: {
    id: 'free',
    name: 'المجانية',
    priceId: '',
    limits: {
      maxPortals: 2,
      maxClients: 5,
      fileUploadLimitMb: 10,
    },
  },
  PRO: {
    id: 'pro',
    name: 'الاحترافية (Pro)',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || 'pri_01h123...',
    limits: {
      maxPortals: 50,
      maxClients: 500,
      fileUploadLimitMb: 500,
    },
  },
}

export function checkPlanLimit(currentCount: number, limit: number): boolean {
  return currentCount < limit
}
