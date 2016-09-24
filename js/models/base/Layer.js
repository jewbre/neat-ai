class Layer {
    constructor(){
        this._nodes = [];
    }
    /**
     *
     * @param node Node
     */
    addNode(node) {
        this._nodes.push(node);
    }

    removeNode(node) {
        let newNodes = [];
        for(let k in this._nodes) {
            if(this._nodes[k] === node) {
                continue;
            }
            newNodes.push(this._nodes[k]);
        }
        this._nodes = newNodes;
    }

    reset() {
        for(let node of this._nodes) {
            node.resetValue();
        }
    }

    activate() {
        for(let node of this._nodes) {
            node.activate();
        }
    }

    /**
     * @returns {boolean}
     */
    hasNodes() {
        return this._nodes.length > 0;
    }

    getNodes() {
        return this._nodes;
    }

    /**
     *
     * @returns {Node|null}
     */
    getRandomNode() {
        if (!this.hasNodes()) {
            return null;
        }

        return this._nodes[Math.floor(Math.random() * this._nodes.length)];
    }

    getNodesJson() {
        let output = [];
        for(let n of this._nodes) {
            output.push(n.toJson());
        }
        return output;
    }

    getConnectionsJson() {
        let output = [];
        for(let n of this._nodes) {
            output = output.concat(n.getConnectionsJson());
        }
        return output;
    }
    /**
     * @returns {{nodes: number[]}}
     */
    toJson() {
        let output = [];
        for(let n of this._nodes) {
            output.push(n.id);
        }
        return output;
    }
}
