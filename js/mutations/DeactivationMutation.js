class DeactivationMutation extends Mutation {

    mutate(network) {
        let node = null;
        let layer = null;

        while(layer === null || layer.nodes.length == 0) {
            layer = network.getRandomLayer();
        }

        while(node === null) {
            node = layer.getRandomNode();
        }

        node.deactivate();
    }
}