$(function () {
    const $heading = $("header h1");
    const $picture = $(".profile-image");
    const originalFontSize = $heading.css("font-size");
    const originalColor = $heading.css("color");

    $("#animate-button").on("click", function () {
        const largerFontSize = `${parseFloat(originalFontSize) * 1.3}px`;

        $heading.stop(true, true).css({
            "font-size": originalFontSize,
            color: originalColor
        });
        $heading.animate({ "font-size": largerFontSize }, 600);
        $heading.css("color", "#d35400");
        $picture.css("border", "5px solid #d35400");

        setTimeout(function () {
            $heading.animate({ "font-size": originalFontSize }, 600);
            $heading.css("color", originalColor);
        }, 700);
    });
});
