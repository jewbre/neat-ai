class MutationFactory {

    constructor() {
        this._mutations = [
            AddConnectionMutation,
            AddNewNodeMutation,
            AddConnectionMutation,
            AddNewLayerMutation,
            ChangeConnectionWeight,
            AddNewNodeMutation,
            ChangeConnectionWeight,
            AddConnectionMutation,
            ChangeConnectionWeight,
            ChangeDefaultValueMutation,
        ]
    }

    /**
     * @returns {Mutation}
     */
    generateMutation() {
        return new this._mutations[Math.floor(Math.random() * this._mutations.length)]();
    }
}