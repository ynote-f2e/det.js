function Diagram(json) {
    var title = json.title,
        background = json.background;

    this.getTitle = function () {
        return title;
    };

    this.getBackground = function () {
        return background;
    };

}