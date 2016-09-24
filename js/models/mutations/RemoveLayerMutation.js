class RemoveLayerMutation extends Mutation {

    mutate(network) {
        if(debug){
            console.log("RemoveLayerMutation");
        }

        network.removeLayer(network.getRandomLayer());
    }
}
