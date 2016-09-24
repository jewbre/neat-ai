class InLayer extends Layer {
    setValues(values) {
        /**
         * @type {Node}
         */
        let n = null;
        let counter = 0;

        for(n of this._nodes) {
            if(counter > values.length) {
                break;
            }

            n.resetValue();
            n.addValue(values[counter++]);
        }
    }
}
