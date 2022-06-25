import * as THREE from 'three'
import Experience from './Experience.js'
import Noises from './Noises.js'
import BlackHoleDiscMaterial from './Materials/BlackHoleDiscMaterial.js'
import BlackHoleParticlesMaterial from './Materials/BlackHoleParticlesMaterial.js'

export default class BlackHole
{
    constructor()
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes

        this.noises = new Noises()

        this.setCommonUniforms()
        this.setParticles()
        this.setDisc()
    }

    setCommonUniforms()
    {
        this.commonUniforms = {}
        this.commonUniforms.uInnerColor = { value: new THREE.Color('#ff8080') }
        this.commonUniforms.uOuterColor = { value: new THREE.Color('#3633ff') }

        // Debug
        if(this.debug.active)
        {
            const folder = this.debug.ui.getFolder('blackhole')
            
            folder
                .addColor(
                    this.commonUniforms.uInnerColor,
                    'value'
                )
                
            folder
                .addColor(
                    this.commonUniforms.uOuterColor,
                    'value'
                )
        }
    }

    setDisc()
    {
        this.disc = {}

        this.disc.geometry = new THREE.CylinderGeometry(5, 1, 0, 64, 10, true)

        this.disc.noiseTexture = this.noises.create(128, 128)
        this.disc.material = new BlackHoleDiscMaterial()
        this.disc.material.uniforms.uNoiseTexture.value = this.disc.noiseTexture
        this.disc.material.uniforms.uInnerColor = this.commonUniforms.uInnerColor
        this.disc.material.uniforms.uOuterColor = this.commonUniforms.uOuterColor
        
        this.disc.mesh = new THREE.Mesh(
            this.disc.geometry,
            this.disc.material
        )
        this.scene.add(this.disc.mesh)
    }

    setParticles()
    {
        this.particles = {}
        this.particles.count = 10000

        // Geometry
        const distanceArray = new Float32Array(this.particles.count)
        const sizeArray = new Float32Array(this.particles.count)
        for(let i = 0; i < this.particles.count; i++)
        {
            distanceArray[i] = Math.random()
            sizeArray[i] = Math.random()
        }

        this.particles.geometry = new THREE.BufferGeometry()
        this.particles.geometry.setAttribute('position', new THREE.Float32BufferAttribute(distanceArray, 1))
        this.particles.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1))

        // Material
        // this.particles.material = new THREE.PointsMaterial()
        this.particles.material = new BlackHoleParticlesMaterial()
        this.particles.material.uniforms.uViewHeight.value = this.sizes.height
        this.particles.material.uniforms.uInnerColor = this.commonUniforms.uInnerColor
        this.particles.material.uniforms.uOuterColor = this.commonUniforms.uOuterColor

        // Mesh
        this.particles.points = new THREE.Points(
            this.particles.geometry,
            this.particles.material
        )
        this.particles.points.frustumCulled = false

        this.scene.add(this.particles.points)
    }

    resize()
    {
        this.particles.material.uniforms.uViewHeight.value = this.sizes.height
    }

    update()
    {
        this.disc.material.uniforms.uTime.value = this.time.elapsed
        this.particles.material.uniforms.uTime.value = this.time.elapsed + 9999.0
    }
}