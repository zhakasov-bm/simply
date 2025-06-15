export default function BGraphic() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50vw',
        height: '100vh',
        backgroundImage: 'url("/wave.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top right',
        backgroundSize: 'contain',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    ></div>
  )
}
