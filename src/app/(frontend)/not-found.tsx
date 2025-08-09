import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container mx-auto my-16 px-6 lg:px-24">
      <div className="flex gap-16 justify-between items-center p-8 md:p-16 bg-background rounded-custom ">
        <div className="flex flex-col gap-6 md:gap-10 flex-1">
          <h1 className="font-unbounded text-3xl mb-4">Страница не найдена</h1>
          <p className="font-inter text-lg text-link/80">
            Запрашиваемая страница не существует или была перемещена на другой адрес. Попробуйте
            начать с главной страницы.
          </p>
          <div className="block md:hidden p-8">
            <Image
              src="/404-not-found.png"
              alt="404-not-found"
              width={400}
              height={200}
              draggable={false}
              className="object-contain"
            />
          </div>
          <Link
            className="bg-primary text-black text-center hover:bg-hover text-sm py-4 md:py-3 px-6 rounded-2xl md:w-fit"
            href={'/'}
          >
            Перейти на главную
          </Link>
        </div>
        <div className="hidden md:flex flex-1">
          <Image
            src="/404-not-found.png"
            alt="404-not-found"
            width={400}
            height={200}
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
