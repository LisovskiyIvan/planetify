import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { generate } from 'random-words'
import { useWords } from '@/hooks/useWords'


function Word({ children, ...props }) {
  
  
  const color = new THREE.Color()
  const wordRef = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
 
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    wordRef.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    wordRef.current.scale.x = 1.5
    wordRef.current.scale.y = 1.5
    wordRef.current.scale.z = 1.5
  
  })
  return (
    <Billboard {...props} >
      <Text ref={wordRef} onPointerOver={over} onPointerOut={out}  children={children} />
    </Billboard>
  )
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = []
    const spherical = new THREE.Spherical()
    const phiSpan = Math.PI / (count + 1)
    const thetaSpan = (Math.PI * 2) / count
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++) temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), useWords()])
    return temp
  }, [count, radius])
  return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

function Rotation() {

  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);

  useFrame(()=> {
    setRotationY((rotationY + 0.002) % (Math.PI ))
    setRotationX((rotationX + 0.002) % (Math.PI ))
  })
  return(
    <group rotation={[rotationX, 0, rotationY]}>
          <Cloud count={8} radius={20}  />
    </group>
  )
}

export default function Ball() {
  
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <fog attach="fog" args={['#202025', 0, 80]} />
      <Suspense fallback={null}>
        <Rotation></Rotation>
      </Suspense>
      <TrackballControls />
    </Canvas>
  )
}