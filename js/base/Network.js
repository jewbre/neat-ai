class Network{

    constructor(){
        this._layers = [];
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
        for(var k in this._layers) {
            if(this._layers[k].id == layer.id) {
                this._layers.splice(k, 1);
                layer.remove();
                break;
            }
        }
    }
    duplicate() {
        return Network.fromJson( this.toJson() );
    }

    /**
     * @returns {{layers: Array}}
     */
    toJson() {
        let layers = [];
        for(let layer of this._layers) {
            layers.push( layer.toJson() );
        }

        return {
            layers : layers
        }
    }

    static fromJson(json) {
        let nodes = new Map();
        let layerBuilder = new LayerBuilder();
        let nodeBuilder = new NodeBuilder();
        let connectionBuilder = new ConnectionBuilder(ConnectionBuilder.prototype.DEFAULT_INTERVAL);
        let network = new Network();

        let layerCounter = 0;
        for(let l of json.layers) {
            let layer = layerBuilder.buildWithId(l.id);
            for(let n of l.nodes) {
                let node = nodeBuilder.buildWithId(n.id);
                node.threshold = n.threshold;
                layer.addNode(node);
                nodes.put(node.id, node);
            }

            if(layerCounter == 0) {
                network.addInputLayer(layer)
            } else if(layerCounter == json.layers.length - 1) {
                network.addOutputLayer(layer)
            } else {
                network.addLayer(layer);
            }

            layerCounter++;
        }

        for(let l of json.layers) {
            for(let n of l.nodes) {
                for(let c in n.outConnections) {
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