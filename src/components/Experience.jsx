import React, {useState, useRef, useEffect} from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { Environment, OrbitControls, Sparkles } from "@react-three/drei"

let i = 0
export default function Experience () {
    const envArr = ['/env/cabinintheSky.hdr', '/env/cosyCabin.hdr', '/env/cyberpunkHallway.hdr', '/env/mayanUtopia.hdr',]
    

    const ref = useRef()
    const envRef = useRef()

    const [clicked, setClicked] = useState(false)
    const [env, setEnv] = useState(envArr[0])

    const vec = new THREE.Vector3()

    useEffect(() => {}, [])

    
    useFrame((state, delta) => {
        ref.current.rotation.x +=0.002
        ref.current.rotation.y +=0.001
        ref.current.rotation.z +=0.004

        console.log(state.mouse.x)
        
        if(clicked) {
            state.camera.lookAt(ref.current.position)
            state.camera.position.lerp(
                vec.set((state.mouse.x * 5), 
                        (state.mouse.y * 5), 5), 0.01
            )
            state.camera.updateProjectionMatrix()
            // console.log(state.mouse)
        }

        //setting different environments to mouse movement
        //(there's got to be a better way)
        if(state.mouse.x <= -0.5) {
            setEnv(envArr[0])
        }
        if(state.mouse.x > -0.5 && state.mouse.x <= 0) {
            setEnv(envArr[1])
        }
        if(state.mouse.x > 0 && state.mouse.x <= 0.5) {
            setEnv(envArr[2])
        }
        if(state.mouse.x > 0.5) {
            setEnv(envArr[3])
        }
        // state.camera.rotation.z += Math.sin(delta*10)
        //^makes the screen shake like there's an earthquake
    })

    return <>
        <OrbitControls/>

        <Environment files={env} background/>

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