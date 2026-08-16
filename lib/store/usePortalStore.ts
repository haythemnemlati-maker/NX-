import { create } from 'zustand'

export type FieldType = 'text' | 'textarea' | 'file' | 'link'

export interface PortalField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
}

interface PortalStore {
  title: string
  description: string
  fields: PortalField[]
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  addField: (type: FieldType) => void
  updateField: (id: string, updatedField: Partial<PortalField>) => void
  removeField: (id: string) => void
  resetStore: () => void
}

export const usePortalStore = create<PortalStore>((set) => ({
  title: 'بوابة استلام أصول جديدة',
  description: 'يرجى ملء البيانات وإرفاق الملفات المطلوب رفعها لإتمام المشروع.',
  fields: [
    {
      id: '1',
      type: 'text',
      label: 'اسم العلامة التجارية / الشركة',
      placeholder: 'أدخل الاسم هنا...',
      required: true,
    },
    {
      id: '2',
      type: 'file',
      label: 'شعار الشركة (Logo) أو أصول الهوية',
      required: true,
    },
  ],

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),

  addField: (type) =>
    set((state) => ({
      fields: [
        ...state.fields,
        {
          id: Date.now().toString(),
          type,
          label: type === 'file' ? 'مرفق جديد' : 'عنصر مدخلات جديد',
          placeholder: '',
          required: false,
        },
      ],
    })),

  updateField: (id, updatedField) =>
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      ),
    })),

  removeField: (id) =>
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    })),

  resetStore: () =>
    set({
      title: 'بوابة استلام أصول جديدة',
      description: 'يرجى ملء البيانات وإرفاق الملفات المطلوب رفعها لإتمام المشروع.',
      fields: [],
    }),
}))
