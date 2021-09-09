//global variables that will store the toolbox colour palette
//amnd the helper functions
let toolbox = null;
let colourP = null;
let currentColor = "black";
let pixelSize = 1;
let helpers = null;
let currentLayer = 0;
let layers = [
    { visible: true, draw: [] },
    { visible: true, draw: [] },
    { visible: true, draw: [] },
    { visible: true, draw: [] },
];

function setup() {
    //create a canvas to fill the content div from index.html
    canvasContainer = select("#content");
    var c = createCanvas(
        canvasContainer.size().width,
        canvasContainer.size().height
    );
    c.parent("content");

    //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    //load pixelSize tool
    new PixelSize();
    new Layers();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    //add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    background(255);
}

function draw() {
    // Clears screen
    clear();

    // Draws each layer
    for (let i = 3; i >= 0; i--) {
        if (layers[i].visible) {
            // Draws layer shapes if visible
            for (let j = 0; j < layers[i].draw.length; j++) {
                stroke(layers[i].draw[j].colour);
                fill(layers[i].draw[j].colour);
                strokeWeight(layers[i].draw[j].size);
                layers[i].draw[j].func(...layers[i].draw[j].coords);
            }
        }
    }
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        // Draws selected tools
        toolbox.selectedTool.draw();
    } else {
        // Alerts if no tool selected
        alert("it doesn't look like your tool has a draw method!");
    }
}
