class ConnectionBuilder {
    /**
     * @param interval {number}
     */
    constructor(interval) {
        this._interval = interval;
    }
    /**
     * @param n1 {Node}
     * @param n2 {Node}
     */
    build(n1, n2) {
        return this.buildWithWeight( n1, n2, this.generateRandomWeight() );
    }
    //noinspection JSMethodCanBeStatic
    /**
     * @param n1 {Node}
     * @param n2 {Node}
     * @param weight {number}
     * @returns {Connection}
     */
    buildWithWeight(n1, n2, weight) {
        return new Connection(n1, n2, weight);
    }
    //noinspection JSMethodCanBeStatic
    /**
     * @returns {number}
     */
    generateRandomWeight(){
        // Normalize to [ -1.0, 1.0 ]
        let span = 2.0 * this._interval;
        return span * ( Math.random() - 0.5 );
    }
}

ConnectionBuilder.prototype.DEFAULT_INTERVAL = 1;