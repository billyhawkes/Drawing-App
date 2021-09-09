function SprayCanTool() {
    //set an icon and a name for the object
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.png";

    // Variables for point number and spread
    var points = 13;
    var spread = 10;

    this.draw = function () {
        if (mouseIsPressed) {
            for (var i = 0; i < points; i++) {
                // Draws points in random coords around cursor
                layers[currentLayer].draw.push({
                    func: point,
                    coords: [
                        random(mouseX - spread, mouseX + spread),
                        random(mouseY - spread, mouseY + spread),
                    ],
                    size: pixelSize,
                    colour: currentColor,
                });
            }
        }
    };
}
