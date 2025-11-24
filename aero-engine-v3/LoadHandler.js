
/**
 * 
 */
export class LoadHandler {

    /**
     * @type{Set<string>}
     */
    resources;

    /**
     * @param{function}
     */
    onLoaded = null;

    index = 0;

    constructor() {
        this.resources = new Set();
    }

    generateId() {
        return `generated-${this.index++}`;
    }

    registerLoading(name) {
        this.resources.add(name);
    }

    notifyCompleted(name) {
        this.resources.delete(name);
        if (this.onLoaded != null && this.resources.size == 0) {
            this.onLoaded();
        }
    }


    listenCompleted(onLoaded) {
        if (this.resources.size == 0) {
            onLoaded();
        }
        else {
            this.onLoaded = onLoaded;
        }
    }
}

