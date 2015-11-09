/**
    *  Plugin created by Daniel Mayer 
    *  danielmayer.net

    * HOW TO USE THIS PLUGIN: 
    * First, add the following classes to the text you wish to scale responsively.
    * For large title text, add class "rtext-title"
    * For h1 tags, add class "rtext-h1". You may also choose below to let the plugin add this class to all h1 tags.
    * For h2 tags, add class "rtext-h2". You may also choose below to let the plugin add this class to all h2 tags.
    * For other elements, add class "rtext-custom1", "rtext-custom2", or "rtext-custom3". These will correspond to "Custom 1", "Custom 2", and "Custom 3" below.
    * Edit the portion specified below.

    * Note: this plugin is dependent on jQuery, so make sure jQuery is loaded before this plugin on your site.

    * Have fun!
*/

function responsiveText() {
/* EDIT this part */
    // Responsive Title
    $("#count").addClass("rtext-custom1");
    $("#count sup").addClass("rtext-custom2");
    var titleMaxWidth = 1200, // The maximum window width at which your title will be responsive
        titleMinWidth = 330, // The minimum window width at which your title will be responsive
        titleMaxSize = 80, // The font size at the specified maximum window width
        titleMinSize = 32, // The font size at the specified minimum window width

    // Responsive h1 tags
        h1MaxWidth = 1800, // Follow the pattern above!
        h1MinWidth = 400,
        h1MaxSize = 60,
        h1MinSize = 30,
        // Make all h1 tags responsive? Type "true" or "false"
        allh1 = false,

    // Responsive h2 tags
        h2MaxWidth = 1800,
        h2MinWidth = 400,
        h2MaxSize = 50,
        h2MinSize = 22,
        // Make all h2 tags responsive? Type "true" or "false"
        allh2 = false,

    // Custom 1
        custom1MaxWidth = 1280,
        custom1MinWidth = 960,
        custom1MaxSize = 38,
        custom1MinSize = 28,
        custom1MaxLineHeight = 38,
        custom1MinLineHeight = 28,

    // Custom 2
        custom2MaxWidth = 1280,
        custom2MinWidth = 960,
        custom2MaxSize = 56,
        custom2MinSize = 38,
        custom2MaxLineHeight = 56,
        custom2MinLineHeight = 38,

    // Custom 3
        custom3MaxWidth = 1800,
        custom3MinWidth = 400,
        custom3MaxSize = 70,
        custom3MinSize = 40;

/** All done! */

// DO NOT EDIT from here to the end 
    if (allh1 === true) {
        $("h1").addClass("rtext-h1");
        rtextTitle.removeClass("rtext-h1");
    }
    if (allh2 === true) {
        $("h2").addClass("rtext-h2").removeClass("rtext-title");
    } 

    var windowWidth = $(window).width(),
        rtextTitle = $(".rtext-title"),
        titleSize = rtextTitle.css("font-size"),
        rtextH1 = $(".rtext-h1"),
        h1Size = rtextH1.css("font-size"),
        rtextH2 = $(".rtext-h2"),
        h2Size = rtextH2.css("font-size"),
        rtextCustom1 = $(".rtext-custom1"),
        custom1Size = rtextCustom1.css("font-size"),
        custom1LineHeight = rtextCustom1.css("line-height"),
        rtextCustom2 = $(".rtext-custom2"),
        custom2Size = rtextCustom2.css("font-size"),
        rtextCustom3 = $(".rtext-custom3"),
        custom3Size = rtextCustom3.css("font-size"),
        titleSize = titleMaxSize - ((titleMaxWidth - windowWidth) / ((titleMaxWidth - titleMinWidth)/(titleMaxSize - titleMinSize))),
        h1Size = h1MaxSize - ((h1MaxWidth - windowWidth) / ((h1MaxWidth - h1MinWidth)/(h1MaxSize - h1MinSize))),
        h2Size = h2MaxSize - ((h2MaxWidth - windowWidth) / ((h2MaxWidth - h2MinWidth)/(h2MaxSize - h2MinSize))),
        custom1Size = custom1MaxSize - ((custom1MaxWidth - windowWidth) / ((custom1MaxWidth - custom1MinWidth)/(custom1MaxSize - custom1MinSize))),
        custom1LineHeight = custom1MaxLineHeight - ((custom1MaxWidth - windowWidth) / ((custom1MaxWidth - custom1MinWidth)/(custom1MaxLineHeight - custom1MinLineHeight))),
        custom2Size = custom2MaxSize - ((custom2MaxWidth - windowWidth) / ((custom2MaxWidth - custom2MinWidth)/(custom2MaxSize - custom2MinSize))),
        custom3Size = custom3MaxSize - ((custom3MaxWidth - windowWidth) / ((custom3MaxWidth - custom3MinWidth)/(custom3MaxSize - custom3MinSize)));

    if (windowWidth <= titleMaxWidth && windowWidth >= titleMinWidth) {
        rtextTitle.css("font-size", titleSize);
        rtextH2.css("font-size", h2Size);
    }
    if (windowWidth > titleMaxWidth) {
        rtextTitle.css("font-size", titleMaxSize);
    }
    if (windowWidth < titleMinWidth) {
        rtextTitle.css("font-size", titleMinSize);
    }

    if (windowWidth <= h1MaxWidth && windowWidth >= h1MinWidth) {
        rtextH1.css("font-size", h1Size);
        rtextH2.css("font-size", h2Size);
    }
    if (windowWidth > h1MaxWidth) {
        rtextH1.css("font-size", h1MaxSize);
    }
    if (windowWidth < h1MinWidth) {
        rtextH1.css("font-size", h1MinSize);
    }

    if (windowWidth <= h2MaxWidth && windowWidth >= h2MinWidth) {
        rtextH2.css("font-size", h2Size);
    }
    if (windowWidth > h2MaxWidth) {
        rtextH2.css("font-size", h2MaxSize);
    }
    if (windowWidth < h2MinWidth) {
        rtextH2.css("font-size", h2MinSize);
    }

    if (windowWidth <= custom1MaxWidth && windowWidth >= custom1MinWidth) {
        rtextCustom1.css("font-size", custom1Size + "px");
        rtextCustom1.css("line-height", custom1LineHeight + "px");
    }
    if (windowWidth > custom1MaxWidth) {
        rtextCustom1.css("font-size", custom1MaxSize);
    }
    if (windowWidth < custom1MinWidth) {
        rtextCustom1.css("font-size", custom1MinSize);
    }
    

    if (windowWidth <= custom2MaxWidth && windowWidth >= custom2MinWidth) {
        rtextCustom2.css("font-size", custom2Size);
    }
    if (windowWidth > custom2MaxWidth) {
        rtextCustom2.css("font-size", custom2MaxSize);
    }
    if (windowWidth < custom2MinWidth) {
        rtextCustom2.css("font-size", custom2MinSize);
    }

    if (windowWidth <= custom3MaxWidth && windowWidth >= custom3MinWidth) {
        rtextCustom3.css("font-size", custom3Size);
    }
    if (windowWidth > custom3MaxWidth) {
        rtextCustom3.css("font-size", custom3MaxSize);
    }
    if (windowWidth < custom3MinWidth) {
        rtextCustom3.css("font-size", custom3MinSize);
    }
}