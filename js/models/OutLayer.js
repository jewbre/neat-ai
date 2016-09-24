class OutLayer extends Layer {

    getValue(index) {
        if(index >= this._nodes.length) {
            return null;
        }

        return this._nodes[index].value;
    }

    getValues() {
        let output = [];
        for(let n of this._nodes) {
            output.push(n.value);
        }
        return output;
    }
}