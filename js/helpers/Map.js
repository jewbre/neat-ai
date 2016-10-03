/**
 * Created by vilimstubican on 02/10/16.
 */

/**
 * @private _map Object
 */
class Map {
    constructor() {
        this._map = {};
    }

    hasKey(key) {
        return this._map.hasOwnProperty(key);
    }

    put(key, value) {
        this._map[key] = value;
    }

    get(key) {
        return this._map[key];
    }

    remove(key) {
        var value = this._map[key];
        var newMap = {};
        for(var k in this._map) {
            if(this._map.hasOwnProperty(k) && k != key) {
                newMap[k] = this._map[k];
            }
        }
        this._map = newMap;
        return value;
    }

    keys() {
        var output = [];
        for(var key in this._map) {
            if(this._map.hasOwnProperty(key)) {
                output.push(key);
            }
        }
        return output;
    }

    values() {
        var output = [];
        for(var key in this._map) {
            if(this._map.hasOwnProperty(key)) {
                output.push(this._map[key]);
            }
        }
        return output;
    }

    [Symbol.iterator]() {
        return {
            _index : 0,
            _values : this.values(),
            next : function(){
                if(this._index < this._values.length) {
                    return {
                        value : this._values[this._index++],
                        done : false
                    };
                } else {
                    return {
                        value : undefined,
                        done : true
                    }
                }
            }
        };
    }
}