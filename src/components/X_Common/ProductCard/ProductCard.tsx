import {Box, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Canvas, useFrame} from "@react-three/fiber";
import React, {FC, useRef} from "react";
import {IProduct} from "../../../types/product.type";
import style from "./ProductCard.module.scss"

const BoxCustom: FC<{color: string}> = ({color}) => {
    const ref = useRef<THREE.Mesh>(null!)
    useFrame((state, delta) => {
        ref.current.rotation.x += -0.01
        ref.current.rotation.z += 0.01
    })

    return (
        <Box args={[1,1,1]} ref={ref}>
            <meshStandardMaterial color={color}/>
        </Box>
    )
}

export const ProductCard: FC<IProduct> = ({color, count, name}) => {
    return (
        <div className={style.productCard}>
            <div className={style.canvas}>
                <Canvas>
                    <BoxCustom color={color}/>
                    <ambientLight intensity={0.5}/>
                    <directionalLight position={[-1, 2, 4]} intensity={2}/>
                    <PerspectiveCamera makeDefault
                                       position={[1.5, 1.5, 1.5]}
                    />
                    <OrbitControls/>
                </Canvas>
            </div>

            <div className={style.texts}>
                <p><span>name:</span> {name}</p>
                <p><span>count:</span> {count}</p>
                <p><span>color:</span> {color}</p>
            </div>
        </div>
    )
}
