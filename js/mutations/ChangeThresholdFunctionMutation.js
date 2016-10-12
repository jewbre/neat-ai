class ChangeThresholdFunctionMutation extends Mutation {

    mutate(network) {
        let node = null;
        let layer = null;

        while(layer === null || layer.nodes.length == 0) {
            layer = network.getRandomLayer();
        }

        while(node === null) {
            node = layer.getRandomNode();
        }

        let shiftDiff = 0.0;
        let slopeDiff = 0.0;
        if(Math.random() > 0.5) {
            shiftDiff = 2 * (Math.random() - 0.5);
        }
        if(Math.random() > 0.5) {
            slopeDiff = 2 * (Math.random() - 0.5);
        }

        node.updateThresholdFunction(shiftDiff, slopeDiff);
    }
}