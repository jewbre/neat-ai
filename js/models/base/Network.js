class Network {
    constructor(){
        this._inputLayer = new InLayer();
        this._outputLayer = new OutLayer();
        this._layers = [];
        this._layers.push( new Layer() );
        this._nextId = 1;
    }

    calculate(inValues) {
        this.resetValues();

        this._inputLayer.setValues(inValues);
        this._inputLayer.activate();
        for(var l of this._layers) {
            l.activate();
        }

        return this._outputLayer.getValues();
    }

    clearNetwork() {
        let hasOutput = [];
        let newLayers = [];
        for(let i = this._layers.length - 1; i >= 0; i--) {
            // let nodes = this._layers[i].getNodes();
            // for(let n of nodes) {
            //     let hasConnection = false;
            //     for(let c of n.getConnections()) {
            //         if(c.target.isOutput || hasOutput.indexOf(c.target.id) >= 0) {
            //             hasOutput.push(n.id);
            //             hasConnection = true;
            //             break;
            //         }
            //     }
            //     if(!hasConnection) {
            //         this._layers[i].removeNode(n);
            //     }
            // }
            if(!this._layers[i].hasNodes()) {
                continue;
            }
            newLayers.push(this._layers[i]);
        }

        this._layers = newLayers;
    }

    removeLayer(layer) {
        if(this._layers.length == 1) {
            return;
        }

        let newLayers = [];
        for(let l of this._layers) {
            if(l === layer) {
                continue;
            }
            newLayers.push(l);
        }
        this._layers = newLayers;
    }

    resetValues() {
        this._inputLayer.reset();
        for(var l of this._layers) {
            l.reset();
        }
        this._outputLayer.reset();
    }

    addLayer(layer) {
        this._layers.push(layer);
    }

    addInputNode(node) {
        this._checkId(node.id);
        this._inputLayer.addNode(node);
    }

    addOutputNode(node) {
        this._checkId(node.id);
        this._outputLayer.addNode(node);
        node.isOutput = true;
    }

    addNodeToLayer(index, node) {
        if(index >= this._layers.length) {
            return null;
        }

        this._checkId(node.id);
        this._layers[index].addNode(node);
    }

    _checkId(id) {
        if(id >= this._nextId) {
            this._nextId = id + 1;
        }
    }

    getNumberOfLayers() {
        return this._layers.length;
    }

    /**
     * @returns {Layer}
     */
    getRandomLayer() {
        return this._layers[Math.floor(Math.random() * this._layers.length)];
    }
    /**
     * @returns {Layer}
     */
    getRandomLayerWithIndex() {
        let index = Math.floor(Math.random() * ( this._layers.length + 2 ));
        let layer = null;

        if(index == 0) {
            layer = this._inputLayer;
        } else if(index == (this._layers.length + 1)) {
            layer = this._outputLayer;
        } else {
            layer = this._layers[ index - 1 ];
        }

        return {
            layer : layer,
            index : index
        };
    }

    toJson() {

        let layers = [];
        let nodes = [];
        let connections = [];

        nodes = nodes.concat(this._inputLayer.getNodesJson());
        connections = connections.concat(this._inputLayer.getConnectionsJson());
        layers.push(this._inputLayer.toJson());

        try{
            for(let l of this._layers) {
                layers.push(l.toJson());
                nodes = nodes.concat(l.getNodesJson());
                connections = connections.concat(l.getConnectionsJson());
            }
        } catch(e){
            console.log("here");
        }


        nodes = nodes.concat(this._outputLayer.getNodesJson());
        connections = connections.concat(this._outputLayer.getConnectionsJson());
        layers.push(this._outputLayer.toJson());


        return {
            layers : layers,
            nodes : nodes,
            connections : connections
        }
    }

    static buildFromJson({layers:layers, nodes:nodes, connections:connections}) {
        let nodeMap = {};

        let network = new Network();
        let maxId = 1;

        for(let n of nodes) {
            let newNode = new Node(n.id);
            newNode.threshold = n.threshold;
            newNode.isOutput = n.isOutput;
            newNode.defaultValue = n.defaultValue;
            nodeMap[n.id] = newNode;

            if(maxId < n.id) {
                maxId = n.id;
            }
        }

        network._nextId = maxId + 1;

        let inputLayer = layers[0];
        for(let layerNode of inputLayer) {
            network.addInputNode( nodeMap[layerNode] );
        }

        for(let i = 1; i < layers.length - 1; i++) {
            let l = new Layer();
            for(let layerNode of layers[i]) {
                l.addNode(nodeMap[layerNode]);
            }

            network.addLayer(l);
        }

        let outputLayer = layers[layers.length - 1];
        for(let layerNode of outputLayer) {
            network.addOutputNode( nodeMap[layerNode] );
        }

        for(let con of connections) {
            nodeMap[ con.source ].addConnection( nodeMap[ con.target ], con.weight );
        }

        return network;
    }

    duplicate() {
        return Network.buildFromJson( this.toJson() );
    }

    getNodeId() {
        return this._nextId++;
    }

    createNewNode() {
        return new Node(this.getNodeId());
    }
}
