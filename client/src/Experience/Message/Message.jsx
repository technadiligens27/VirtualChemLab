import { Html } from '@react-three/drei'

const Message = ({
  position,
  message = 'Interact'
}) => {
  return (
    <Html
      position={position}
      center
      distanceFactor={8}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          padding: '10px 18px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}
      >
        {message}
      </div>
    </Html>
  )
}

export default Message