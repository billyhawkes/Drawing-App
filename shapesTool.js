// a tool for drawing a variety of shapes with a slider for stroke weight
function LineToTool() {
    this.icon = "assets/lineTo.jpg";
    this.name = "LineTo";
    this.shape = "line";

    var startMouseX = -1;
    var startMouseY = -1;
    var drawing = false;

    //draws the shape to the screen
    this.draw = function () {
        //only draw when mouse is clicked
        if (mouseIsPressed) {
            //if it's the start of drawing a new shape
            if (startMouseX == -1) {
                startMouseX = mouseX;
                startMouseY = mouseY;
                drawing = true;

                //save the current pixel Array
                loadPixels();
            } else {
                //update the screen with the saved pixels to hide any previous
                //shapes between mouse pressed and released
                updatePixels();

                //draws the shape based on shape selected
                if (this.shape === "line") {
                    line(startMouseX, startMouseY, mouseX, mouseY);
                } else if (this.shape === "rect") {
                    rect(
                        startMouseX,
                        startMouseY,
                        mouseX - startMouseX,
                        mouseY - startMouseY
                    );
                } else if (this.shape === "ellipse") {
                    let difX = mouseX - startMouseX;
                    let difY = mouseY - startMouseY;

                    ellipse(
                        startMouseX + difX / 2,
                        startMouseY + difY / 2,
                        difX,
                        difY
                    );
                } else if (this.shape === "triangle") {
                    triangle(
                        startMouseX + (mouseX - startMouseX) / 2,
                        startMouseY,
                        startMouseX,
                        mouseY,
                        mouseX,
                        mouseY
                    );
                }
            }
        } else if (drawing) {
            //save the pixels with the most recent shape and reset the
            //drawing bool and start locations
            loadPixels();

            // Draws shapes to the screen
            if (this.shape === "line") {
                layers[currentLayer].draw.push({
                    func: line,
                    coords: [startMouseX, startMouseY, mouseX, mouseY],
                    size: pixelSize,
                    colour: currentColor,
                });
            } else if (this.shape === "rect") {
                layers[currentLayer].draw.push({
                    func: rect,
                    coords: [
                        startMouseX,
                        startMouseY,
                        mouseX - startMouseX,
                        mouseY - startMouseY,
                    ],
                    size: pixelSize,
                    colour: currentColor,
                });
            } else if (this.shape === "ellipse") {
                let difX = mouseX - startMouseX;
                let difY = mouseY - startMouseY;
                layers[currentLayer].draw.push({
                    func: ellipse,
                    coords: [
                        startMouseX + difX / 2,
                        startMouseY + difY / 2,
                        difX,
                        difY,
                    ],
                    size: pixelSize,
                    colour: currentColor,
                });
            } else if (this.shape === "triangle") {
                layers[currentLayer].draw.push({
                    func: triangle,
                    coords: [
                        startMouseX + (mouseX - startMouseX) / 2,
                        startMouseY,
                        startMouseX,
                        mouseY,
                        mouseX,
                        mouseY,
                    ],
                    size: pixelSize,
                    colour: currentColor,
                });
            }

            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    this.populateOptions = () => {
        // Shape options
        select(".options").html(
            "<h3>Options</h3><div class='shapeList'><button class='shapeOption' data-shape='line'>&#9586; | Line Tool</button><button class='shapeOption' data-shape='rect'>&#9645; | Rectangle Tool</button><button class='shapeOption' data-shape='ellipse'>&#9711; | Ellipse Tool</button><button class='shapeOption' data-shape='triangle'>&#9651; | Triangle Tool</button></div>",
            true
        );
        const shapes = selectAll(".shapeOption");

        // Changes selected shape on click
        shapes.forEach((shape) => {
            shape.mouseClicked(() => {
                this.shape = shape.attribute("data-shape");
            });
        });
    };
    this.unselectTool = () => {
        // Clear options
        select(".options").html("");
    };
}
