class ChangeWeightMutation extends Mutation {

    mutate(network) {
        let connection = null;
        let node = null;
        let layer = null;

        while(layer === null || layer.nodes.length == 0) {
            layer = network.getRandomLayer();
        }

        while(node === null) {
            node = layer.getRandomNode();
        }

        if(!node.hasConnections()) {
            return;
        }

        while(connection === null) {
            connection = node.getRandomConnection();
        }

        let diff = 2 * (Math.random() - 0.5);

        connection.weight = connection.weight + diff;
    }
}