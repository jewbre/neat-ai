class AddConnectedNodeOnNewLayerMutation extends Mutation {

    mutate(network) {
        let node1 = null;
        let layer1 = null;
        let node2 = null;
        let layer2 = null;
        let insertLayer = network.layerBuilder.build();

        while(layer1 === null || layer1.nodes.length == 0) {
            layer1 = network.getRandomLayer();
        }

        let layer1index = network.getLayerIndex(layer1);
        let layer2index = layer1index;

        while(layer2 === null || Math.abs(layer2index - layer1index) < 1 || layer1.nodes.length == 0) {
            layer2 = network.getRandomLayer();

            if(layer2) {
                layer2index = network.getLayerIndex(layer2);
            }
        }

        if(layer1index > layer2index) {
            let tmp = layer1;
            layer1 = layer2;
            layer2 = tmp;
        }

        let insertLayerIndex = Math.floor( (layer1index + layer2index) / 2);


        while(node1 === null) {
            node1 = layer1.getRandomNode();
        }

        while(node2 === null) {
            node2 = layer2.getRandomNode();
        }

        let newNode = network.nodeBuilder.build();
        insertLayer.addNode(newNode);

        network.addLayerAtIndex(insertLayer, insertLayerIndex);

        network.connectionBuilder.build(node1, newNode);
        network.connectionBuilder.build(newNode, node2);
    }
}