class AddConnectionBetweenNodes extends Mutation {

    mutate(network) {
        let node1 = null;
        let layer1 = null;
        let node2 = null;
        let layer2 = null;

        while(layer1 === null || layer1.nodes.length == 0) {
            layer1 = network.getRandomLayer();
        }

        while(layer2 === null || layer1 === layer2 || layer2.nodes.length == 0) {
            layer2 = network.getRandomLayer();
        }

        if(network.getLayerIndex(layer1) > network.getLayerIndex(layer2)) {
            let tmp = layer1;
            layer1 = layer2;
            layer2 = tmp;
        }

        while(node1 === null) {
            node1 = layer1.getRandomNode();
        }

        while(node2 === null) {
            node2 = layer2.getRandomNode();
        }

        if(node1.hasConnection(node2)) {
            return;
        }

        network.connectionBuilder.build(node1, node2);
    }
}