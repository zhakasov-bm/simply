import { IoClose } from 'react-icons/io5'

export default function FloatingNav() {
  return (
    <div className="hidden md:block fixed bottom-16 left-1/2 transform -translate-x-1/2 text-base font-inter z-100">
      <div className="flex gap-5 items-center w-fit border border-black/20 bg-lightBG/40 backdrop-blur-[2px] rounded-full text-black/40 hover:text-black py-2 px-6">
        <div>Услуги</div>
        <div>Кейсы</div>
        <div>Отзывы</div>
        <div>Команда</div>

        <button className="text-sm font-unbounded text-primary bg-black rounded-custom px-3 py-2">
          Заказать
        </button>
        <IoClose width={100} height={100} className="cursor-pointer" />
      </div>
    </div>
  )
}
