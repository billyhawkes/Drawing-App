//Displays and handles the pixel size
function Layers() {
    // Loads layers into html
    this.loadLayers = () => {
        // Creates 4 layer options
        for (let i = 0; i < 4; i++) {
            // Create layer option
            let layer = createDiv();
            layer.class("layerButton");

            // Layer selection button
            let b = createButton(`Layer ${i + 1}`);
            // Sets layer
            b.mousePressed(() => {
                select(".numLayers").html(`${i + 1}`);
                currentLayer = i;
            });

            // Hide layer button
            let v = createButton("Hide");
            // Hides layer
            v.mousePressed(() => {
                layers[i].visible = !layers[i].visible;
                v.class(layers[i].visible ? "" : "hidden");
            });

            // Sets parents to html tags
            b.parent(layer);
            v.parent(layer);
            layer.parent(select(".layers"));
        }
    };
    // Calls load pixel size
    this.loadLayers();
}
