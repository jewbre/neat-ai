var debug = false;
(function(){

    let builder = new NodeBuilder();

    let n1 = builder.build();
    let n2 = builder.build();
    let n3 = builder.build();
    let n4 = builder.build();
    let n5 = builder.build();
    let n6 = builder.build();

    let conBuilder = new ConnectionBuilder(ConnectionBuilder.prototype.DEFAULT_INTERVAL);
    let c1 = conBuilder.build(n1, n3);
    let c2 = conBuilder.build(n1, n4);
    let c3 = conBuilder.build(n1, n5);
    let c4 = conBuilder.build(n2, n4);
    let c5 = conBuilder.build(n3, n6);
    let c6 = conBuilder.build(n4, n5);

    let layerBuilder = new LayerBuilder();
    let l1 = layerBuilder.build();
    let l2 = layerBuilder.build();
    let l3 = layerBuilder.build();

    l1.addNode(n1);
    l1.addNode(n2);
    l2.addNode(n3);
    l2.addNode(n4);
    l3.addNode(n5);
    l3.addNode(n6);

    let network = new Network();
    network.addInputLayer(l1);
    network.addOutputLayer(l3);
    network.addLayer(l2);

    let network2 = network.duplicate();

    console.log(
        JSON.stringify( network.toJson() ),
        JSON.stringify( network2.toJson() ),
        JSON.stringify( network.toJson() ) == JSON.stringify( network2.toJson() )
    );

    console.log(network);
    console.log(network2);

    // n1._threshold = 0;
    // n2._threshold = 0;
    //
    // n1.addValue(5);
    // n2.addValue(6);
    //
    // n1.activate();
    // n2.activate();
    // n3.activate();
    // n4.activate();
    // n5.activate();
    // n6.activate();

    // for(let i = 1; i <= 6; i++) {
    //     console.log("Node #" + i, eval("n"+i));
    // }
})();