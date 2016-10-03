/**
 * @private _inNode {Node}
 * @private _outNode {Node}
 * @private _weight {number}
 */
class Connection {
    /**
     *
     * @param inNode {Node}
     * @param outNode {Node}
     * @param weight {number}
     */
    constructor(inNode, outNode, weight) {
        this._inNode = inNode;
        this._outNode = outNode;
        this._weight = weight;

        inNode.addOutConnection(this);
        outNode.addInConnection(this);
    }

    activate() {
        this._outNode.addValue(
            this.weight * this._inNode.value
        );
    }

    /**
     * @returns {Node}
     */
    get inNode() {
        return this._inNode;
    }

    /**
     * @returns {Node}
     */
    get outNode() {
        return this._outNode;
    }

    /**
     * @returns {number}
     */
    get weight() {
        return this._weight;
    }

    /**
     * @param value {number}
     */
    set weight(value) {
        this._weight = value;
    }

    remove() {
        this._inNode.removeConnection(this._outNode);
        this._outNode.removeConnection(this._inNode);
    }
}
