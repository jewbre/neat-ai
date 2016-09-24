class Node {
    constructor(id){
        this._connections = [];
        this._defaultValue = 0.0;
        this._value = this._defaultValue;
        this._threshold = 0.5;
        this._id = id;
        this._isOutput = false;
    }

    getConnections() {
        return this._connections;
    }

    get isOutput(){
        return this._isOutput;
    }

    set isOutput(value){
        this._isOutput = value;
    }

    get defaultValue(){
        return this._defaultValue;
    }

    set defaultValue(value){
        this._defaultValue = value;
    }

    static getLastId(){
        return Node.prototype.lastId++;
    }

    /**
     *
     * Adds connection from this node to
     * @param target {Node}
     * @param weight {number}
     * @returns {Connection}
     */
    addConnection(target, weight) {
        let connection = new Connection(this, target, weight);
        this._connections.push(connection);
        return connection;
    }

    /**
     * @returns {boolean}
     */
    hasConnections() {
        return this._connections.length > 0;
    }

    /**
     *
     * @returns {Connection|null}
     */
    getRandomConnection() {
        if (!this.hasConnections()) {
            return null;
        }

        return this._connections[Math.floor(Math.random() * this._connections.length)];
    }

    /**
     *
     * @param target {Node}
     */
    removeConnection(target) {
        if (this._connections.length == 0) return;

        let newConns = [];
        for (var k in this._connections) {
            if (this._connections[k].target === target) {
                continue;
            }
            newConns.push(this._connections[k]);
        }
        this._connections = newConns;
    }

    /**
     *
     */
    activate() {
        // if (this._value >= this._threshold) {
            this._doActivation();
        // }
    }

    /**
     * @private
     */
    _doActivation() {
        /**
         * @type {Connection}
         */
        let con = null;
        for (con of this._connections) {
            con.activate();
        }
    }

    /**
     *
     * @param val {number}
     */
    addValue(val) {
        this._value += val;
    }

    /**
     *
     */
    resetValue() {
        this._value = this._defaultValue;
    }

    /**
     * @returns {number}
     */
    get value() {
        return this._value;
    }

    /**
     * @param value
     */
    set threshold(value) {
        this._threshold = value;
    }

    /**
     *
     * @returns {number}
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {{id: {number}, threshold: (number)}}
     */
    toJson() {
        return {
            id : this._id,
            threshold : this._threshold,
            defaultValue : this._defaultValue,
            isOutput : this._isOutput
        }
    }

    getConnectionsJson() {
        let output = [];
        for(let c of this._connections) {
            output.push(c.toJson());
        }
        return output;
    }

}

Node.prototype.lastId = 1;