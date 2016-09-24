class ChangeConnectionWeight extends Mutation {

    mutate(network) {
        if(debug){
            console.log("ChangeConnectionWeight");
        }
        let node = network.getRandomLayerWithIndex().layer.getRandomNode();

        if(node !== null) {
            let con = node.getRandomConnection();

            if(con !== null) {
                let currentWeight = con.weight;
                let deltaWeight = 2.0 * ( Math.random() - 0.5 );
                let newWeight = currentWeight + deltaWeight;

                if(newWeight > 1.0) {
                    newWeight = 1.0;
                } else if(newWeight < -1.0) {
                    newWeight = -1.0;
                }

                con.weight = newWeight;
            }
        }
    }
}