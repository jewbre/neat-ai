class AddConnectedNodeMutation extends Mutation {

    mutate(network) {
        let node1 = null;
        let layer1 = null;
        let node2 = null;
        let layer2 = null;
        let insertLayer = null;

        if(network.getLayersAmount() < 3) {
            return;
        }

        while(layer1 === null || layer1.nodes.length == 0) {
            layer1 = network.getRandomLayer();
        }

        while(insertLayer === null || insertLayer === layer1) {
            insertLayer = network.getRandomLayer();
        }

        if(network.getLayerIndex(layer1) > network.getLayerIndex(insertLayer)) {
            let tmp = layer1;
            layer1 = insertLayer;
            insertLayer = tmp;
        }

        while(layer2 === null || layer1 === layer2 || layer2.nodes.length == 0 || layer2 === insertLayer) {
            layer2 = network.getRandomLayer();
        }

        if(network.getLayerIndex(layer1) > network.getLayerIndex(layer2)) {
            let tmp = layer1;
            layer1 = layer2;
            layer2 = tmp;
        }

        if(network.getLayerIndex(insertLayer) > network.getLayerIndex(layer2)) {
            let tmp = insertLayer;
            insertLayer = layer2;
            layer2 = tmp;
        }

        while(node1 === null) {
            node1 = layer1.getRandomNode();
        }

        while(node2 === null) {
            node2 = layer2.getRandomNode();
        }

        let newNode = network.nodeBuilder.build();
        insertLayer.addNode(newNode);

        network.connectionBuilder.build(node1, newNode);
        network.connectionBuilder.build(newNode, node2);
    }
}