describe("Node", function() {
    it("Should have provided values", function() {
        let id = 1;
        let node = new Node(id, 0.5, function(value){ return value});

        expect(node.id).toEqual(id);
    });

    describe("when connection is added between two nodes", function() {
        let node1;
        let node2;
        let connection;
        beforeEach(function() {
            node1 = new Node(1, 0.5, function(value){ return value});
            node2 = new Node(2, 0.5, function(value){ return value});
            connection = new Connection(node1, node2, connection);
        });

        it("second node should have in_connection to first node", function() {
            expect(node2._inConnections.hasKey(node1.id)).toBeTruthy();
        });

        it("first node should have out_connection to second node", function() {
            expect(node1._outConnections.hasKey(node2.id)).toBeTruthy();
        });

        describe("when connection is removed over connection", function(){
            beforeEach(function(){
                connection.remove();
            });

            it("second node should not have in_connection to first node", function() {
                expect(node2._inConnections.hasKey(node1.id)).toBeFalsy();
            });

            it("first node should not have out_connection to second node", function() {
                expect(node1._outConnections.hasKey(node2.id)).toBeFalsy();
            });
        });

        describe("when connection is removed over node", function(){
            beforeEach(function(){
                node1.removeConnection(node2);
            });

            it("second node should not have in_connection to first node", function() {
                expect(node2._inConnections.hasKey(node1.id)).toBeFalsy();
            });

            it("first node should not have out_connection to second node", function() {
                expect(node1._outConnections.hasKey(node2.id)).toBeFalsy();
            });
        })
    });
});
