function HelperFunctions() {
    //event handler for the clear button event. Clears the screen
    select("#clearButton").mouseClicked(function () {
        // Resets all layers
        layers = [
            { visible: true, draw: [] },
            { visible: true, draw: [] },
            { visible: true, draw: [] },
            { visible: true, draw: [] },
        ];
        background(255, 255, 255);
        //call loadPixels to update the drawing state
        //this is needed for the mirror tool
        loadPixels();
    });

    //event handler for the save image button. saves the canvsa to the
    //local file system.
    select("#saveImageButton").mouseClicked(function () {
        saveCanvas("myPicture", "jpg");
    });
}
