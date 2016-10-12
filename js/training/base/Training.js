class Training {

    /**
     * @param original {Network}
     */
    constructor(original) {
        this._original = original;
        this._mutationFactory = new MutationFactory();
        this._errorLimit = 0.01;
        this._generations = [];

        this._trainSet = null;
        this._testSet = null;
    }

    train(iterations){
        let topSurvivor = this._original;
        var maxError = Number.MAX_VALUE;

        for(let i = 0; i < iterations; i++) {
            console.log("Iteration #" + i);
            maxError = Number.MAX_VALUE;
            let generation = this.createGeneration(topSurvivor);

            for(let candidate of generation) {

                let numberOfMutations = Math.round(Math.random() * 10);
                for(let k = 0; k < numberOfMutations; k++) {
                    this._mutationFactory.generateRandomMutation().mutate(candidate);
                }

                let currentError = 0;

                for(let set of this._testSet) {
                    candidate.reset();
                    candidate.setInput(set.input);
                    let output = candidate.calculateOutput();
                    currentError += this.calculateError(set.output, output);
                }

                // console.log("Error: " + currentError);

                if(currentError < maxError) {
                    maxError = currentError;
                    topSurvivor = candidate;
                }

            }
            this._generations.push(generation);

            if(maxError < this._errorLimit) {
                return topSurvivor;
            }
        }

        return topSurvivor;

    }

    calculateError(expected, calculated) {
        let error = 0.0;
        for(let counter = 0; counter < expected.length; counter++) {
            let e = expected[counter];
            let c = calculated[counter];
            error += 0.5 * (e - c) * (e - c);
        }
        return error;
    }

    /**
     * @param topSurvivor {Network}
     */
    createGeneration(topSurvivor) {
        let generation = [topSurvivor];
        for(let g = 1; g < 50; g++) {
            generation.push( topSurvivor.duplicate() );
        }

        return generation;
    }

    set trainSet(value) {
        this._trainSet = value;
        this._testSet = value;
    }

    set testSet(value) {
        this._testSet = value;
    }
}