class MutationFactory {

    /**
     * @returns {Mutation}
     */
    generateRandomMutation() {

        let mutations = [
            ChangeWeightMutation,
            ChangeThresholdMutation,
            ChangeThresholdFunctionMutation,

            DeactivationMutation,

            AddConnectionBetweenNodes,

            BlankMutation,

            // AddConnectedNodeMutation,
            // AddConnectedNodeOnNewLayerMutation
        ];

        let index = Math.floor( Math.random() * mutations.length );

        return new mutations[index]();
    }
}