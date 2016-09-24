class AddNewNodeMutation extends Mutation {

    mutate(network) {
        if(debug){
            console.log("AddNewNodeMutation");
        }
        network.getRandomLayer().addNode(network.createNewNode());
    }
}