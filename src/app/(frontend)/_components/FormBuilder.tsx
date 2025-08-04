import PhoneInput from 'react-phone-input-2'

export default function FormBuilder({
  form,
  onSubmit,
  phone,
  setPhone,
  error,
  submitButtonLabel = 'Отправить',
  withTextarea = true,
  classNames = {},
}: {
  form: any
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  phone: string
  setPhone: (value: string) => void
  error?: string
  submitButtonLabel?: string
  withTextarea?: boolean
  classNames?: {
    wrapper?: string
    input?: string
    textarea?: string
    button?: string
  }
}) {
  return (
    <form className={classNames.wrapper || 'flex flex-col gap-3'} onSubmit={onSubmit}>
      {form?.fields?.map((field: any) => (
        <div key={field.id} className="relative flex-1 min-w-[180px]">
          {field.name === 'phone' ? (
            <PhoneInput
              country={'kz'}
              specialLabel=""
              inputProps={{
                name: field.name,
                required: field.required,
                placeholder: field.placeholder,
                className: classNames.input || 'w-full rounded px-4 py-3',
              }}
              value={phone}
              onChange={setPhone}
            />
          ) : withTextarea && field.blockType === 'textarea' ? (
            <textarea
              name={field.name}
              id={field.name}
              required={field.required}
              placeholder={field.defaultValue}
              className={
                classNames.textarea ||
                'w-full rounded-2xl px-4 pt-5 pb-2 h-40 text-black italic bg-white text-base font-light italic focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none'
              }
            />
          ) : (
            <>
              <input
                type={field.blockType}
                name={field.name}
                id={field.name}
                required={field.required}
                placeholder=""
                className={
                  classNames.input ||
                  'w-full rounded px-4 pt-5 pb-2 text-black bg-white text-lg focus:outline-none focus:ring-2'
                }
              />
              <label
                htmlFor={field.name}
                className="absolute left-4 top-2 text-xs text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-xs"
              >
                {field.label}
              </label>
            </>
          )}
        </div>
      ))}

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        className={
          classNames.button ||
          'w-full bg-black text-white px-5 h-[56px] rounded-2xl font-unbounded hover:text-hover transition'
        }
      >
        {submitButtonLabel}
      </button>
    </form>
  )
}
