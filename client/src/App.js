import React, { useRef, useState } from 'react'
import './App.scss';
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three';

import { softShadows, MeshWobbleMaterial, OrbitControls, Sphere } from "drei";

import { useSpring, a} from "react-spring/three"

import Terror from './Theater_Bold.json'

softShadows();

const SpinningText = ({position, args, color, speed}) => {
  const mesh = useRef(null);

  const font = new THREE.FontLoader().parse(Terror);

  // configure font geometry
  const textOptions = {
    font,
    size: 4,
    height: 1
  };

  useFrame(() => (mesh.current.rotation.y =+  0.01 ))

  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand ? [1.6,1.6,1.6] : [1,1,1]
  })

  return (
    <a.mesh 
    onClick={() => setExpand(!expand)} 
    scale={props.scale}
    castShadow 
    position={position} 
    ref={mesh}>
      <textGeometry attach='geometry' args={[args, textOptions]} />
      <MeshWobbleMaterial 
      attach='material' 
      color={color} 
      speed={speed} 
      factor={0.05}
      metalness={0.5} />
    </a.mesh>
  )
}

function App() {

  return (
    <>
      <Canvas shadowMap colorManagement camera={{position: [3, 3, 15], fov: 70}}>
        <ambientLight intensity={0.1}/>
        <directionalLight 
        castShadow
        position={[5, 15, 20]} 
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5}/>
        <pointLight position={[0, -10, 0]} intensity={1.5}/>
        

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]}/>
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <group>
          <SpinningText args={'SQUID'} position={[-5, 4, -2]} color="white" speed={2}/>
          <SpinningText args={'SWIM'} position={[-1, -1, 3]} color="white" speed={4}/>
          </group>  
        </group>

        <group>
        </group>


        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
