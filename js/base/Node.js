class Node {
    /**
     * @param id {number}
     * @param threshold {number}
     * @param thresholdFunction {ThresholdFunction}
     */
    constructor(id, threshold, thresholdFunction) {
        this._id = id;
        this._threshold = threshold;
        this._thresholdFunction = thresholdFunction;
        this._inConnections = new Map();
        this._outConnections = new Map();
        this._layer = null;
        this._active = true;

        this._value = Node.prototype.DEFAULT_VALUE;
    }

    addValue(value) {
        this._value += value;
    }

    deactivate() {
        this._active = false;
    }

    activate() {
        if(this._active && this._thresholdFunction.calculateValue(this._value) >= this._threshold) {
            this.doActivation();
        }
    }

    doActivation(){
        for(let connection of this._outConnections) {
            connection.activate();
        }
    }

    reset() {
        this._active = true;
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
     * @param diff {number}
     */
    updateThreshold(diff) {
        this._threshold += diff;
    }

    /**
     * @param shift {undefined|number}
     * @param slope {undefined|number}
     */
    updateThresholdFunction(shift, slope) {
        if(typeof shift !== "undefined") {
            this._thresholdFunction.shift = this._thresholdFunction.shift + shift;
        }

        if(typeof slope !== "undefined") {
            this._thresholdFunction.slope = this._thresholdFunction.slope + slope;
        }
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

    /**
     *
     * @returns {Connection|null}
     */
    getRandomConnection() {
        let connections = this._inConnections.values();
        if(connections.length > 0) {
            let index = Math.floor( Math.random() * connections.length );
            return connections[index];
        }

        return null;
    }

    hasConnections() {
        return this._inConnections.values().length > 0;
    }

    /**
     * @param node {Node}
     * @returns {boolean}
     */
    hasConnection(node) {
        return this._outConnections.hasKey(node.id);
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
            thresholdFunction : this._thresholdFunction.toJson(),
            layer : this._layer.id,
            inConnections : inConnections,
            outConnections : outConnections,
        }
    }
}

Node.prototype.DEFAULT_VALUE = 0.0;