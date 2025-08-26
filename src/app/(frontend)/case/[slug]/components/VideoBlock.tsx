import { Case, Media } from '@/payload-types'

export default function VideoBlock({ caseData }: { caseData: Case }) {
  const videos = caseData.videos || []

  if (videos.length === 0) return null

  return (
    <section id="video" className="container-class grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((item, idx) => {
        const videoUrl = typeof item.video !== 'string' && item.video?.url ? item.video.url : null
        if (!videoUrl) return null

        return (
          <div
            key={idx}
            className="video-container w-auto h-auto md:h-[400px] overflow-hidden rounded-3xl"
          >
            <video autoPlay muted loop controls className="w-full h-full object-cover">
              <source src={videoUrl} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
        )
      })}
    </section>
  )
}
