class AddConnectionMutation extends Mutation {

    mutate(network) {
        let rand1 = network.getRandomLayerWithIndex();
        let rand2 = rand1;

        while(rand2.index == rand1.index) {
            rand2 = network.getRandomLayerWithIndex();
        }

        let weight = 2.0 * (Math.random() - 0.5);

        let l1 = rand1.layer;
        let l2 = rand2.layer;

        if(rand2.index < rand1.index) {
            l1 = rand2.layer;
            l2 = rand1.layer;
        }

        let n1 = l1.getRandomNode();
        let n2 = l2.getRandomNode();

        if(n1 !== null && n2 !== null) {
            n1.addConnection(n2, weight);
            if(debug){
                console.log("AddConnectionMutation(" + n1.id + " to  " + n2.id + ", weight: " + weight + ")");
            }
        }

    }
}