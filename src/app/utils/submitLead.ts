export type LeadSubmissionPayload = {
  form: string
  data: Record<string, string>
  file?: File | null
}

const DEFAULT_ERROR = 'Не удалось отправить заявку. Попробуйте еще раз.'

export async function submitLead({ form, data, file }: LeadSubmissionPayload) {
  const formData = new FormData()
  formData.append('form', form)

  Object.entries(data).forEach(([key, value]) => {
    if (value != null) {
      formData.append(key, value)
    }
  })

  if (file instanceof File) {
    formData.append('file', file, file.name)
  }

  const response = await fetch('/api/lead', {
    method: 'POST',
    body: formData,
  })

  let result: { ok?: boolean; error?: string } | undefined

  try {
    result = await response.json()
  } catch (error) {
    // ignore body parsing issues, handle via generic error below
  }

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || DEFAULT_ERROR)
  }

  return result
}
