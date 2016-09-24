class ChangeDefaultValueMutation extends Mutation {

    mutate(network) {
        if(debug) {
            console.log("Change default mutattion");
        }
        let node = network.getRandomLayer().getRandomNode();

        if(node !== null) {
            let currentValue = node.defaultValue;
            let deltaValue = 2.0 * ( Math.random() - 0.5 );
            node.defaultValue = currentValue + deltaValue;
        }
    }
}