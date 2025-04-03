

export class MyActionListener {

    private actionListeners: Map<string, Array<(data: any) => void>>

    constructor() {
        this.actionListeners = new Map()
    }
    
    register(action: string, listener: (data: any) => void) {
        
        if (!this.actionListeners.has(action)) {
            this.actionListeners.set(action, [])
        }

        const registeredListeners = this.actionListeners.get(action)

        this.actionListeners.set(action, [...registeredListeners!, listener])
    }
    
    removeListener(action: string) {
        this.actionListeners.delete(action)
    }

    emit(action: string, data: any) {

        if (!this.actionListeners.has(action)) {
            throw new Error(`No listeners registered for action: ${action}`)
        }

        const listeners = this.actionListeners.get(action)

        listeners!.forEach(listener => listener(data))
    }
}