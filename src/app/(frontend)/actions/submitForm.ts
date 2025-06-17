'use server'

type SubmitFormArgs = {
  formId: string
  data: Record<string, FormDataEntryValue>
}

export async function submitForm({ formId, data }: SubmitFormArgs) {
  try {
    const response = await fetch('/api/form-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        form: formId,
        submissionData: Object.entries(data).map(([field, value]) => ({
          field,
          value: value.toString(),
        })),
      }),
    })

    if (!response.ok) {
      throw new Error(`Submission failed with status ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error('[submitForm]', error)
    return { success: false, error: (error as Error).message }
  }
}
