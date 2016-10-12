class ThresholdFunction {

    constructor(shift, slope) {
        this._shift = shift;
        this._slope = slope;
    }


    get shift() {
        return this._shift;
    }

    set shift(value) {
        this._shift = value;
    }

    get slope() {
        return this._slope;
    }

    set slope(value) {
        this._slope = value;
    }

    calculateValue(input) {
        return 1 / (1 + Math.exp(this._shift + this._slope * input));
    }

    toJson() {
        return {
            shift : this._shift,
            slope : this._slope
        }
    }
}