var debug = false;
(function(){

    let builder = new NodeBuilder();

    let n1 = builder.build();
    let n2 = builder.build();
    let n3 = builder.build();
    let n4 = builder.build();
    let n5 = builder.build();
    let n6 = builder.build();
    let n7 = builder.build();
    let n8 = builder.build();
    let n9 = builder.build();
    let n10 = builder.build();

    let o1 = builder.build();
    let o2 = builder.build();
    let o3 = builder.build();

    let layerBuilder = new LayerBuilder();
    let l1 = layerBuilder.build();
    let l2 = layerBuilder.build();

    // let h1 = layerBuilder.build();
    // let h2 = layerBuilder.build();
    //
    // let hn1 = builder.build();
    // let hn2 = builder.build();
    // let hn3 = builder.build();
    // let hn4 = builder.build();
    // let hn5 = builder.build();
    // let hn6 = builder.build();

    // h1.addNode(hn1);
    // h1.addNode(hn2);
    // h1.addNode(hn3);
    //
    // h2.addNode(hn4);
    // h2.addNode(hn5);
    // h2.addNode(hn6);

    l1.addNode(n1);
    l1.addNode(n2);
    l1.addNode(n3);
    l1.addNode(n4);
    l1.addNode(n5);
    l1.addNode(n6);
    l1.addNode(n7);
    l1.addNode(n8);
    l1.addNode(n9);
    l1.addNode(n10);

    l2.addNode(o1);
    l2.addNode(o2);
    l2.addNode(o3);

    let connectionBuilder = new ConnectionBuilder(ConnectionBuilder.prototype.DEFAULT_INTERVAL);

    // connectionBuilder.build(n1, hn1);
    // connectionBuilder.build(n2, hn1);
    // connectionBuilder.build(n3, hn1);
    // connectionBuilder.build(n4, hn1);
    // connectionBuilder.build(n5, hn1);
    // connectionBuilder.build(n6, hn1);
    // connectionBuilder.build(n7, hn1);
    // connectionBuilder.build(n8, hn1);
    // connectionBuilder.build(n9, hn1);
    // connectionBuilder.build(n10, hn1);
    //
    // connectionBuilder.build(n1, hn2);
    // connectionBuilder.build(n2, hn2);
    // connectionBuilder.build(n3, hn2);
    // connectionBuilder.build(n4, hn2);
    // connectionBuilder.build(n5, hn2);
    // connectionBuilder.build(n6, hn2);
    // connectionBuilder.build(n7, hn2);
    // connectionBuilder.build(n8, hn2);
    // connectionBuilder.build(n9, hn2);
    // connectionBuilder.build(n10, hn2);
    //
    // connectionBuilder.build(n1, hn3);
    // connectionBuilder.build(n2, hn3);
    // connectionBuilder.build(n3, hn3);
    // connectionBuilder.build(n4, hn3);
    // connectionBuilder.build(n5, hn3);
    // connectionBuilder.build(n6, hn3);
    // connectionBuilder.build(n7, hn3);
    // connectionBuilder.build(n8, hn3);
    // connectionBuilder.build(n9, hn3);
    // connectionBuilder.build(n10, hn3);
    //
    // connectionBuilder.build(hn1, hn4);
    // connectionBuilder.build(hn1, hn5);
    // connectionBuilder.build(hn1, hn6);
    //
    // connectionBuilder.build(hn2, hn4);
    // connectionBuilder.build(hn2, hn5);
    // connectionBuilder.build(hn2, hn6);
    //
    // connectionBuilder.build(hn3, hn4);
    // connectionBuilder.build(hn3, hn5);
    // connectionBuilder.build(hn3, hn6);
    //
    // connectionBuilder.build(hn4, o1);
    // connectionBuilder.build(hn4, o2);
    // connectionBuilder.build(hn4, o3);
    //
    // connectionBuilder.build(hn5, o1);
    // connectionBuilder.build(hn5, o2);
    // connectionBuilder.build(hn5, o3);
    //
    // connectionBuilder.build(hn6, o1);
    // connectionBuilder.build(hn6, o2);
    // connectionBuilder.build(hn6, o3);


    let network = new Network();
    network.addInputLayer(l1);
    network.addOutputLayer(l2);

    // network.addLayer(h1);
    // network.addLayer(h2);

    network.nodeBuilder = builder;
    network.layerBuilder = layerBuilder;
    network.connectionBuilder = connectionBuilder;

    let trainSet = [
        {
            input : [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            output : [1, 0, 0],
        },
        {
            input : [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
            output : [0, 1, 0],
        },
        {
            input : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            output : [0, 0, 1],
        }
    ];

    let training = new Training(network);
    training.trainSet = trainSet;

    let totalIterations = 0;

    document.getElementById('iterate-10').addEventListener('click', function(){
        let net = training.train(10);
        createResults(trainSet, net);
        updateIterationCounter(10);

        training.original = net;
    });
    document.getElementById('iterate-100').addEventListener('click', function(){
        let net = training.train(100);
        createResults(trainSet, net);
        updateIterationCounter(100);

        training.original = net;
    });

    createResults(trainSet, network);

    function updateIterationCounter(amount) {
        totalIterations += amount;
        document.getElementById("total-iterations").innerHTML = "Total iterations: " + totalIterations;
    }

    function createResults(trainSet, network){
        let resultsContainer = document.getElementById("results");
        while (resultsContainer.firstChild) {
            resultsContainer.removeChild(resultsContainer.firstChild);
        }

        for(let set of trainSet) {
            let container = document.createElement("div");
            container.style.border = "2px solid black";
            container.style.padding = "10px";
            container.style.margin = "10px";

            network.reset();
            network.setInput(set.input);
            let output = network.calculateOutput();
            console.log("Expected: " + set.output + ", Calculated: " + output);

            for(let i = 0; i < set.output.length; i++) {
                let element = document.createElement("div");
                element.style.display = "inline-block";
                element.style.width = "50px";
                element.style.height = (set.output[i] * 200 ) + "px";
                element.style.backgroundColor = "red";
                element.style.border = "1px solid black";

                container.appendChild(element);

                element = document.createElement("div");
                element.style.display = "inline-block";
                element.style.width = "50px";
                element.style.height = (Math.max(0, output[i] * 200 )) + "px";
                element.style.backgroundColor = "green";
                element.style.marginRight = "50px";
                element.style.border = "1px solid black";

                container.appendChild(element);
            }

            resultsContainer.appendChild(container);
        }
    }

})();

