function tsp_ls(distance_matrix) {
    if (distance_matrix.length === 0) {
        return 0;
    }

    function calculateTotalLength(route) {
        let totalLength = 0;
        for (let i = 0; i < route.length - 1; i++) {
            totalLength += distance_matrix[route[i]][route[i + 1]];
        }
        totalLength += distance_matrix[route[route.length - 1]][route[0]];
        return totalLength;
    }

    function generateRandomRoute(n) {
        let route = [];
        for (let i = 0; i < n; i++) {
            route.push(i);
        }
        for (let i = route.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [route[i], route[j]] = [route[j], route[i]];
        }
        return route;
    }

    function twoOptSwap(route, i, k) {
        let newRoute = route.slice(0, i).concat(route.slice(i, k + 1).reverse(), route.slice(k + 1));
        return newRoute;
    }

    let currentRoute = generateRandomRoute(distance_matrix.length);
    let incumbentRoute = currentRoute.slice();
    let currentLength = Number.POSITIVE_INFINITY;
    let incumbentRouteLength = currentLength;
    let iterationsWithoutImprovement = 0;
    let maxIterationsWithoutImprovement = 1000;
    while (iterationsWithoutImprovement < maxIterationsWithoutImprovement) {
        let improved = false;
        for (let i = 1; i < currentRoute.length - 1; i++) {
            for (let k = i + 1; k < currentRoute.length; k++) {
                let newRoute = twoOptSwap(currentRoute, i, k);
                let newLength = calculateTotalLength(newRoute);
                if (newLength < currentLength) {
                    currentRoute = newRoute.slice();
                    currentLength = newLength;
                    improved = true;
                    iterationsWithoutImprovement = 0;
                    if (newLength < incumbentRouteLength) {
                        incumbentRoute = newRoute.slice();
                        incumbentRouteLength = newLength;
                    }
                }
            }
        }
        if (!improved) {
            iterationsWithoutImprovement++;
        }
    }
    return incumbentRouteLength;
}
