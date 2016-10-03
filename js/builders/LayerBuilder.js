class LayerBuilder {
    constructor(startingId) {
        this._id = typeof startingId !== "undefined" ? startingId : 1;
    }
    /**
     * @returns {Layer}
     */
    build() {
        return this.buildWithId( this.getNextId() );
    }
    /**
     * @param id {number}
     * @returns {Layer}
     */
    buildWithId(id) {
        if(this._id <= id) {
            this._id = id + 1;
        }
        return new Layer(id);
    }
    /**
     * @returns {number}
     */
    getNextId() {
        return this._id++;
    }
}