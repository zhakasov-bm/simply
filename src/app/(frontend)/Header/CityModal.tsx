import React, { useEffect } from 'react'
import { ALLOWED_CITIES, CITY_RU } from '@/app/utils/cities'
import { IoClose } from 'react-icons/io5'

type CityModalProps = {
  currentCity: string
  onSelect: (city: string) => void
  onClose: () => void
}

export const CityModal = ({ currentCity, onSelect, onClose }: CityModalProps) => {
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden'
    return () => {
      // Restore scroll
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 focus:outline">
      <div className="bg-white rounded-custom p-6 min-w-[300px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Выберите город</h2>
          <IoClose onClick={onClose} width={40} height={40} className="cursor-pointer" />
        </div>

        <ul>
          {ALLOWED_CITIES.map((city) => (
            <li key={city}>
              <button
                className={`w-full font-inter text-left py-2 px-4 rounded-custom hover:bg-gray-100 ${
                  city === currentCity ? 'text-black' : 'text-black/40'
                }`}
                onClick={() => onSelect(city)}
              >
                {CITY_RU[city]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
