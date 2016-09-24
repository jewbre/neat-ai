class Connection {
    constructor(source, target, weight) {
        this._source = source;
        this._target = target;
        this._weight = weight;
    }

    activate() {
        try{
            this._target.addValue(this._source.value * this._weight);
        } catch (e){
            console.log("here con");
        }
    }


    get source() {
        return this._source;
    }

    get target() {
        return this._target;
    }


    get weight() {
        return this._weight;
    }

    set weight(value) {
        this._weight = value;
    }

    remove() {
        this._source.removeConnection(this._target);
    }

    /**
     * @returns {{source: {number}, target: {number}, weight: {number}}}
     */
    toJson(){
        return {
            source : this._source.id,
            target : this._target.id,
            weight : this._weight
        }
    }
}