class ChangeThresholdMutation extends Mutation {

    mutate(network) {
        let node = null;
        let layer = null;

        while(layer === null || layer.nodes.length == 0) {
            layer = network.getRandomLayer();
        }

        while(node === null) {
            node = layer.getRandomNode();
        }

        let diff = 2 * (Math.random() - 0.5);

        node.updateThreshold(diff);
    }
}