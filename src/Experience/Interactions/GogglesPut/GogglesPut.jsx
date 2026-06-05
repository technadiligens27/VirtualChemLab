import { useContext, useState, useRef } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext";
import Message from "../../Message/Message";

const GogglesPut = ()=>{

    const {gogglesRef} = useContext(ModelContext);
    const {gogglesOn,hasSat} = useContext(InteractionContext)

    console.log("goggles")
    const [show, setShow] = useState(false);
    
    const gogglePosition = useRef(new THREE.Vector3());

    useFrame(() => {
        if (!gogglesRef.current) return

        gogglesRef.current.getWorldPosition(gogglePosition.current)

        const distance = camera.position.distanceTo(
            gogglePosition.current
        )

        setShow(!gogglesOn.current && hasSat)
    })

    if (!show) return null

    return(
        <>
         {<Message
            position={[
            gogglePosition.current.x,
            gogglePosition.current.y + 2,
            gogglePosition.current.z
        ]}

        message="Press G to Put"
         
         
         />}
        </>
    )
}

export default GogglesPut