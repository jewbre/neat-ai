class Layer {
    /**
     * @param id {number}
     */
    constructor(id) {
        this._id = id;
        this._nodes = new Map();
        this._network = null;
    }
    /**
     * @returns {Node[]}
     */
    get nodes() {
        return this._nodes.values();
    }
    /**
     * @returns {number}
     */
    get id() {
        return this._id;
    }
    /**
     * @param value {Network}
     */
    set network(value) {
        this._network = value;
    }
    /**
     *
     */
    reset() {
        for(let node of this._nodes) {
            node.reset();
        }
    }
    /**
     *
     */
    activate() {
        for(let node of this._nodes) {
            node.activate();
        }
    }
    /**
     * @param node {Node}
     */
    addNode(node) {
        if(this._nodes.hasKey(node.id)) {
            return false;
        }

        this._nodes.put(node.id, node);
        node.layer = this;
        return true;
    }
    /**
     * @param node {Node}
     */
    removeNode(node){
        if(this._nodes.hasKey(node.id)) {
            this._nodes.remove(node.id);
        }
    }
    /**
     *
     */
    remove() {
        for(let node of this._nodes.values()) {
            node.remove();
            node.removeLayer();
        }
        this._nodes = null;

        this._network.removeLayer(this);
    }

    toJson() {
        let nodes = [];
        for(let node of this._nodes) {
            nodes.push(node.toJson());
        }

        return {
            id : this._id,
            nodes : nodes
        }
    }
}