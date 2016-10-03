class NodeBuilder {
    /**
     * @param startingId {number}
     */
    constructor(startingId) {
        this._id = typeof startingId === "undefined" ? 1 : startingId;
    }
    /**
     * @returns {Node}
     */
    build(){
        return this.buildWithId(this._id++);
    }
    /**
     * @param id {number}
     * @returns {Node}
     */
    buildWithId(id) {
        if(this._id < id) {
            this._id = id+1;
        }
        return new Node(id, this._getThreshold(), this._getThresholdFunction());
    }
    //noinspection JSMethodCanBeStatic
    /**
     * @returns {number}
     * @private
     */
    _getThreshold() {
        return 0.5;
    }
    /**
     * @returns {Function}
     * @private
     */
    _getThresholdFunction() {
        let shift = 0.0;
        let slope = -1.0;
        return function(input) {
            return 1 / (1 + Math.exp(shift + slope * input));
        }
    }
}