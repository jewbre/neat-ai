var debug = false;
(function(){
    let network = new Network();

    /**
     * @type {Node}
     */
    let n1 = network.createNewNode();
    let n12 = network.createNewNode();
    let n2 = network.createNewNode();
    let n3 = network.createNewNode();

    n1.threshold = -100;

    let l = new Layer();

    n1.addConnection(n2, 0.5);
    n2.addConnection(n3, 0.5);

    network.addLayer(l);
    network.addInputNode(n1);
    network.addInputNode(n12);
    network.addNodeToLayer(0, n2);
    network.addOutputNode(n3);

    let data = [];

    function toLearn(x, y, z){
        return x + y + z;
    }

    for(let i = 1; i < 10; i++) {
        for(let j = 1; j < 10; j++){
            for(let z = 1; z < 10; z++){
                data.push({
                    in : [i,j,z],
                    out : [toLearn(i,j,z)]
                })
            }
        }
    }

    let training = new SupervisedTraining(network, data);
    var trainedNetwork = training.train();
    for(let i = 0; i <= 50; i++) {
        console.log("In: " + i + "; Out: " + trainedNetwork.calculate([i,1,1]));
    }

    console.log(JSON.stringify(trainedNetwork.toJson()));

})();