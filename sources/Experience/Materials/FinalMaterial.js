import * as THREE from 'three'

import vertexShader from '../shaders/final/vertex.glsl'
import fragmentShader from '../shaders/final/fragment.glsl'

function FinalMaterial()
{
    const uniforms = {}
    const defines = {}

    // Buffers
    uniforms.uSpaceTexture = { value: null }
    uniforms.uDistortionTexture = { value: null }

    // Final material
    const material = new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        depthWrite: false,
        depthTest: false,
        // transparent: true,
        uniforms,
        defines,
        vertexShader,
        fragmentShader
    } )

    return material
}

export default FinalMaterial