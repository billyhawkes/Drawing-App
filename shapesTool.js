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
                //draws the shape
                if (this.shape === "line") {
                    strokeWeight(this.slider.value());
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
                }
            }
        } else if (drawing) {
            //save the pixels with the most recent shape and reset the
            //drawing bool and start locations
            loadPixels();
            drawing = false;
            startMouseX = -1;
            startMouseY = -1;
        }
    };

    this.populateOptions = () => {
        // Shape
        select(".options").html(
            "<button class='shapeOption' data-shape='line'>Line</button><button class='shapeOption' data-shape='rect'>Rectangle</button><button class='shapeOption' data-shape='ellipse'>Ellipse</button>",
            true
        );
        const shapes = selectAll(".shapeOption");
        shapes.forEach((shape) => {
            shape.mouseClicked(() => {
                this.shape = shape.attribute("data-shape");
            });
        });

        // Stroke weight
        this.slider = createSlider(1, 50, 1);
        this.slider.parent(select(".options"));
    };
    this.unselectTool = () => {
        select(".options").html("");
    };
}
