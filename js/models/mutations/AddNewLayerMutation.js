class AddNewLayerMutation extends Mutation {
    mutate(network) {
        if(debug){
            console.log("AddNewLayerMutation");
        }
        network.addLayer(new Layer());
    }
}