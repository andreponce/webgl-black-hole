import BlackHole from './BlackHole.js'
import Experience from './Experience.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.blackHole = new BlackHole()
            }
        })
    }

    resize()
    {
    }

    update()
    {
        if(this.blackHole)
            this.blackHole.update()
    }

    destroy()
    {
    }
}