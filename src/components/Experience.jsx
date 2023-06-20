import React, {useState, useRef, useEffect} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { Environment, OrbitControls, Sparkles } from "@react-three/drei"

export default function Experience () {
    const ref = useRef()
    const [clicked, setClicked] = useState(false)
    const vec = new THREE.Vector3()

    useFrame((state, delta) => {
        ref.current.rotation.x +=0.0005
        ref.current.rotation.y +=0.0004
        ref.current.rotation.z +=0.0007
        
        if(clicked) {
            state.camera.lookAt(ref.current.position)
            state.camera.position.lerp(vec.set(state.mouse.x, state.mouse.y, 5), 0.01)
            state.camera.updateProjectionMatrix()
            // console.log(state.mouse)
        }
        // state.camera.rotation.z += Math.sin(delta*10)
        //^makes the screen shake like there's an earthquake
    })
    return <>
        <OrbitControls/>

        <Environment files={'/env/mayanUtopia.hdr'} background/>

        <mesh ref={ref} position={[0,0,0]} onClick={() => {setClicked(!clicked)}}>
            <torusGeometry args={[1, 0.6, 32]} />
            {/* <torusKnotGeometry/> */}
            <meshStandardMaterial metalness={1} roughness={0}  color={'white'} side={THREE.DoubleSide}/>
        </mesh>

        <Sparkles speed={0.5} opacity={0.8} 
            color={'eggshell'} size={5} scale={10} 
            noise={[10,12,30]} count={100}
        />

        {/* <gridHelper args={[100,20]} depthTest={false}/> */}
    </>
}