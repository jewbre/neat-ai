class SupervisedTraining {
    /**
     *
     * @param network {Network}
     * @param data [{in:number[], out:number[]}]
     */
    constructor(network, data) {
        this._network = network;
        this._mutationFactory = new MutationFactory();
        this._data = data;
        this._iterations = 100;
        this._error = 0.001;
    }

    train() {
        let perGeneration = 6;
        let totalDuplicates = 40;
        let duplicatesPerNetwork = totalDuplicates/perGeneration;

        let generation = [];
        for(let i = 0; i < perGeneration; i++) {
            generation.push(this._network.duplicate());
        }

        for(let i = 0; i < this._iterations; i++) {
            if(i%10 == 0) {
                console.log("iteration #" + i, "generation size: " + generation.length);
            }
            let breakIterations = false;

            let newGeneration = [];
            for(let k = 0; k < totalDuplicates; k++) {
                let net = generation[ Math.floor(k / duplicatesPerNetwork) ].duplicate();
                newGeneration.push({
                    error : 0,
                    network : net
                });
            }

            let checkedNewGeneration = [];
            for(let index = 0; index < newGeneration.length; index++) {

                let networkSet = newGeneration[index];
                for(let m = 0; m < index%duplicatesPerNetwork; m++) {
                    this._mutationFactory.generateMutation().mutate(networkSet.network);
                }

                for(let dataset of this._data) {
                    let results = networkSet.network.calculate(dataset.in);
                    for(let j = 0; j < results.length; j++) {
                        networkSet.error += Math.abs( results[j]*results[j] - dataset.out[j]*dataset.out[j] );
                    }
                }
                checkedNewGeneration.push(networkSet);

                if(networkSet.error < this._error) {
                    breakIterations = true;
                    break;
                }

            }

            checkedNewGeneration.sort(function(a, b){
                return a.error - b.error;
            });

            let remainingFromGeneration = [];
            for(let j = 0; j < perGeneration; j++) {
                checkedNewGeneration[j].network.clearNetwork();
                remainingFromGeneration.push(checkedNewGeneration[j].network);
            }
            generation = remainingFromGeneration;

            if(breakIterations) {
                break;
            }
        }

        return generation[0];
    }



}