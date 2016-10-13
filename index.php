<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Neat AI</title>
</head>
<body>

<!-- Helper -->
<script src="/js/helpers/Map.js"></script>
<script src="/js/helpers/ThresholdFunction.js"></script>

<!-- Base models -->
<script src="/js/base/Node.js"></script>
<script src="/js/base/Connection.js"></script>
<script src="/js/base/Layer.js"></script>
<script src="/js/base/Network.js"></script>

<!-- Builders -->
<script src="/js/builders/NodeBuilder.js"></script>
<script src="/js/builders/ConnectionBuilder.js"></script>
<script src="/js/builders/LayerBuilder.js"></script>

<!-- Mutations -->
<script src="/js/mutations/factory/Mutation.js"></script>
<script src="/js/mutations/AddConnectedNodeMutation.js"></script>
<script src="/js/mutations/AddConnectedNodeOnNewLayerMutation.js"></script>
<script src="/js/mutations/AddConnectionBetweenNodes.js"></script>
<script src="/js/mutations/BlankMutation.js"></script>
<script src="/js/mutations/ChangeThresholdFunctionMutation.js"></script>
<script src="/js/mutations/ChangeThresholdMutation.js"></script>
<script src="/js/mutations/ChangeWeightMutation.js"></script>
<script src="/js/mutations/DeactivationMutation.js"></script>
<script src="/js/mutations/factory/MutationFactory.js"></script>

<!-- Training -->
<script src="/js/training/base/Training.js"></script>
<button id="iterate-10">Iterate for 10</button>
<button id="iterate-100">Iterate for 100</button>
<span id="total-iterations">Total iterations: 0</span>
<div id="results"></div>


<!-- Runner script -->
<script src="/js/main.js"></script>
</body>
</html>