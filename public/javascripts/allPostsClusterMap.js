var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-98.5562, 39.809734],
    zoom: 3.3
});
map.addControl(new MapboxGeocoder({
    acessToken: mapboxgl.accessToken
}));

map.on('load', function() {
            map.addSource("posts", {
                type: "geojson",
                data: postMessage,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });
            map.addLayer({
                id: "clusters",
                type: "circle",
                source: "posts",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": [
                        "step", ["get", "point_count"],
                        "#51bbbd6",
                        100,
                        "#f1f075",
                        750,
                        "#f28cb1"
                    ],
                    "circle-radius": [
                        "step", ["get", "point_count"],
                        20,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });
            map.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "posts",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": ["Arial Unicode MS Bold", "DIN Offc Pro Medium"],
                    "text-size": 14
                }
            });
            map.addLayer({
                    id: "unclustered-point",
                    type: "circle",
                    source: "posts",
                    filter: ["!", ["has", "point_count"],
                        paint: {
                            "circle-color": "#11b4da",
                            "circle-radius": 5,
                            "circle-stroke-width": 1,
                            "circle-stroke-color": "#fff"
                        }
                    }); map.on('click', 'unclustered-point', function(e) {
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description;

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 100) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(description)
                        .addTo(map);
                }); map.on('click', 'clusters', function(e) {
                    var features = map.queryRendredFeatures(e.point, { layers: ['clusters'] });
                    var clusterId = features[0].properties.cluster_id;

                    map.getSource('posts').getClusterExpansionZoom(cluster.id, function(err, zoom) {
                        if (err)
                            return;
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    });
                });
                var mouseenterCursor = function() {
                    map.getCanvas().style.cursor = 'pointer';
                };
                var mouseLeaveCursor = function() {
                    map.getCanvas().style.cursor = '';
                }; map.on('mouseenter', 'clusters', mouseenterCursor); map.on('mouseleave', 'clusters', mouseLeaveCursor); map.on('mouseenter', 'unclustered-point', mouseenterCursor); map.on('mouseleave', 'unclustered-point', mouseLeaveCursor);
            });