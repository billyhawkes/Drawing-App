//Displays and handles the pixel size
function PixelSize() {
    this.onSizeChange = () => {
        // Sets global pixel size value
        pixelSize = this.slider.value();
        select("#numPixels").html(`${pixelSize}px`);
    };

    this.loadPixelSize = () => {
        // Creates slider for stroke weight
        this.slider = createSlider(1, 100, 1);
        // Adds slider to options
        this.slider.parent(select(".pixelSize"));
        this.slider.changed(this.onSizeChange);
    };

    // Calls load pixel size
    this.loadPixelSize();
}
