class Node {
    /**
     * @param id {number}
     * @param threshold {number}
     * @param thresholdFunction {Function}
     */
    constructor(id, threshold, thresholdFunction) {
        this._id = id;
        this._threshold = threshold;
        this._thresholdFunction = thresholdFunction;
        this._inConnections = new Map();
        this._outConnections = new Map();
        this._layer = null;

        this._value = Node.prototype.DEFAULT_VALUE;
    }

    addValue(value) {
        this._value += value;
    }

    activate() {
        if(this._thresholdFunction(this._value) >= this._threshold) {
            this.doActivation();
        }
    }

    doActivation(){
        console.log("Activation");
        for(let connection of this._outConnections) {
            connection.activate();
        }
    }

    reset() {
        this._value = Node.prototype.DEFAULT_VALUE;
    }

    remove() {
        /**
         * @type {Connection} connection
         */
        for(let connection of this._inConnections) {
            //noinspection JSUnfilteredForInLoop
            connection.remove();
        }
        for(let connection of this._outConnections) {
            //noinspection JSUnfilteredForInLoop
            connection.remove();
        }

        this._layer.removeNode(this);
        this._layer = null;
    }

    /**
     * @param node {Node}
     */
    removeConnection(node) {
        let connection = null;
        if(this._inConnections.hasKey(node.id)) {
            connection = this._inConnections.remove(node.id);
        } else if(this._outConnections.hasKey(node.id)) {
            connection = this._outConnections.remove(node.id);
        }

        if(connection !== null) {
            connection.remove();
        }
    }

    removeLayer() {
        this.layer = null;
    }

    /**
     * @param connection {Connection}
     */
    addInConnection(connection) {
        Node._addConnection(this._inConnections, connection, connection.inNode)
    }

    /**
     * @param connection {Connection}
     */
    addOutConnection(connection) {
        Node._addConnection(this._outConnections, connection, connection.outNode)
    }
    /**
     * @param connections {Map}
     * @param connection {Connection}
     * @param node {Node}
     * @private
     */
    static _addConnection(connections, connection, node) {
        connections.put(node.id, connection);
    }


    get id() {
        return this._id;
    }

    get value() {
        return this._value;
    }

    /**
     * @param value {Layer}
     */
    set layer(value) {
        this._layer = value;
    }

    /**
     * @returns {Layer}
     */
    get layer() {
        return this._layer;
    }

    /**
     * @returns {{id: (number), threshold: (number), layer: number, inConnections: number[], outConnections: number[]}}
     */
    toJson() {
        let inConnections = {};
        for(let c of this._inConnections) {
            inConnections[c.inNode.id] = c.weight;
        }
        let outConnections = {};
        for(let c of this._outConnections) {
            outConnections[c.outNode.id] = c.weight;
        }

        return {
            id : this._id,
            threshold : this._threshold,
            layer : this._layer.id,
            inConnections : inConnections,
            outConnections : outConnections,
        }
    }
}

Node.prototype.DEFAULT_VALUE = 0.0;