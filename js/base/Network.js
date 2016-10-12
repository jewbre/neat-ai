class Network {

    constructor() {
        this._layers = [];
        this._nodeBuilder = null;
        this._connectionBuilder = null;
    }

    addInputLayer(layer) {
        this._layers.splice(0, 0, layer);
        layer.network = this;
    }

    addOutputLayer(layer) {
        this._layers.push(layer);
        layer.network = this;
    }

    /**
     * @param layer {Layer}
     */
    addLayer(layer) {
        this.addLayerAtIndex(layer, this._layers.length);
    }

    getLayersAmount() {
        return this._layers.length;
    }

    /**
     * @param layer {Layer}
     * @returns {number}
     */
    getLayerIndex(layer) {
        return this._layers.indexOf(layer);
    }

    /**
     * @param layer {Layer}
     * @param index {number}
     */
    addLayerAtIndex(layer, index) {
        let ind = Math.max(1, Math.min(this._layers.length - 1, index));
        this._layers.splice(ind, 0, layer);
        layer.network = this;
    }

    removeLayer(layer) {
        for (var k in this._layers) {
            if (this._layers[k].id == layer.id) {
                this._layers.splice(k, 1);
                layer.remove();
                break;
            }
        }
    }

    setInput(values) {
        let inputLayerNodes = this._layers[0].nodes;
        for(let i = 0; i < values.length; i++) {
            let node = inputLayerNodes[i];
            node.addValue(values[i]);
        }
    }

    calculateOutput() {
        for(let layer of this._layers) {
            layer.activate();
        }

        let lastLayerNodes = this._layers[this._layers.length - 1].nodes;
        let output = [];
        for(let node of lastLayerNodes) {
            output.push( node.value );
        }

        return output;
    }

    /**
     *
     */
    reset() {
        for(let layer of this._layers) {
            layer.reset();
        }
    }

    get nodeBuilder() {
        return this._nodeBuilder;
    }

    set nodeBuilder(value) {
        this._nodeBuilder = value;
    }

    get connectionBuilder() {
        return this._connectionBuilder;
    }

    set connectionBuilder(value) {
        this._connectionBuilder = value;
    }

    get layerBuilder() {
        return this._layerBuilder;
    }

    set layerBuilder(value) {
        this._layerBuilder = value;
    }

    /**
     * @returns {Layer}
     */
    getRandomLayer() {
        let index = Math.floor(Math.random() * this._layers.length);
        return this._layers[index];
    }

    duplicate() {
        return Network.fromJson(this.toJson());
    }

    /**
     * @returns {{layers: Array}}
     */
    toJson() {
        let layers = [];
        for (let layer of this._layers) {
            layers.push(layer.toJson());
        }

        return {
            layers: layers
        }
    }

    static fromJson(json) {
        let nodes = new Map();
        let layerBuilder = new LayerBuilder();
        let nodeBuilder = new NodeBuilder();
        let connectionBuilder = new ConnectionBuilder(ConnectionBuilder.prototype.DEFAULT_INTERVAL);
        let network = new Network();

        network.nodeBuilder = nodeBuilder;
        network.connectionBuilder = connectionBuilder;
        network.layerBuilder = layerBuilder;

        let layerCounter = 0;
        for (let l of json.layers) {
            let layer = layerBuilder.buildWithId(l.id);
            for (let n of l.nodes) {
                let node = nodeBuilder.buildWithId(n.id);
                node.threshold = n.threshold;
                node.updateThresholdFunction(n.thresholdFunction.shift, n.thresholdFunction.slope);
                layer.addNode(node);
                nodes.put(node.id, node);
            }

            if (layerCounter == 0) {
                network.addInputLayer(layer)
            } else if (layerCounter == json.layers.length - 1) {
                network.addOutputLayer(layer)
            } else {
                network.addLayer(layer);
            }

            layerCounter++;
        }

        for (let l of json.layers) {
            for (let n of l.nodes) {
                for (let c in n.outConnections) {
                    connectionBuilder.buildWithWeight(
                        nodes.get(n.id),
                        nodes.get(c),
                        n.outConnections[c]
                    );
                }
            }
        }

        return network;
    }
}