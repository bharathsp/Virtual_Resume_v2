var navMenuAnchorTags=document.querySelectorAll('.nav-menu a');
for(var i=0;i<navMenuAnchorTags.length;i++)
{
    navMenuAnchorTags[i].addEventListener('click',function(event)
    {
        event.preventDefault();
        var targeSectionID=this.textContent.trim().toLowerCase();
        var targetSection=document.getElementById(targeSectionID);
        
        var interval=setInterval(function()
        {
            var targetSectionCoordinates=targetSection.getBoundingClientRect();
                if(targetSectionCoordinates.top<=0)
                {
                    clearInterval(interval);
                    return;
                }
                window.scrollBy(0,50);
        },50);
    })
}
// var interval;
// var navMenuAnchorTags=document.querySelectorAll('.nav-menu a');
// for(var i=0;i<navMenuAnchorTags.length;i++)
// {
//     navMenuAnchorTags[i].addEventListener('click',function(event)
//     {
//         event.preventDefault();
//         var targeSectionID=this.textContent.trim().toLowerCase();
//         var targetSection=document.getElementById(targeSectionID);
        
//          interval=setInterval(scrollVertically,50,targetSection);
//     });
// }

// function scrollVertically(targetSection)
// {
//     var targetSectionCoordinates=targetSection.getBoundingClientRect();
//     if(targetSectionCoordinates.top<=0)
//     {
//         clearInterval(interval);
//         return;
//     }
//     window.scrollBy(0,50);
// }



//handle scroll event on window
// check that skill container is visible or not
//ensure that initial width of colored ksill divs is Zero--> initialised/Reset to 0 width value
// shoot animation on every skill -. increase skill wisth from 0 to skill level at regual interval
// store skill level --> html with helo of data attribute




// var progressBars = document.querySelectorAll(".skill-progress > div");
// var skillsContainer = document.getElementById('skills-container');
// var animationDone = false;



// function initialiseBars() {
//     for (var bar of progressBars) {
//         bar.style.width = 0 + '%';
//     }
// }

// initialiseBars();



// function fillBars() {

//     for (let bar of progressBars) {
//         let currentWidth = 0;
//         let interval = setInterval(function () {
//             let targetWidth = bar.getAttribute('data-bar-width');
//             if (currentWidth >= targetWidth) {
//                 clearInterval(interval);
//                 return;
//             }
//             currentWidth++;
//             bar.style.width = currentWidth + '%';
//         }, 5);
//     }
// }



// function checkScroll() {

//     var coordinates = skillsContainer.getBoundingClientRect();
//     if (!animationDone && coordinates.top <= window.innerHeight) {
//         animationDone = true;
//         fillBars();
//     } else if (coordinates.top > window.innerHeight) {
//         animationDone = false;
//         initialiseBars();
//     }
// }



// window.addEventListener("scroll", checkScroll);




var progressBars = document.querySelectorAll(".skill-progress > div");



function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}



function fillBar(bar) {

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);

}



// This function uses a for loop for individual progress bars.
function checkScroll() {

    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }

    }
}



window.addEventListener("scroll", checkScroll);

// This event fills the progress bars if they are displayed on the screen when the page is loaded.
//window.addEventListener("load", checkScroll);

// Timeline Traveller Animation - Move icons along with scroll
function updateTimelineTravellers() {
    // Don't run on mobile where timeline divider is hidden
    if (window.innerWidth <= 768) {
        return;
    }
    
    var timelineDividers = document.querySelectorAll('.timeline-divider');
    
    timelineDividers.forEach(function(divider) {
        var timeline = divider.closest('.timeline');
        if (!timeline) return;
        
        var traveller = divider.querySelector('.timeline-traveller');
        if (!traveller) return;
        
        var timelineRect = timeline.getBoundingClientRect();
        var dividerRect = divider.getBoundingClientRect();
        var viewportHeight = window.innerHeight;
        var dividerHeight = dividerRect.height;
        
        // Get timeline position relative to viewport
        var timelineTop = timelineRect.top;
        var timelineBottom = timelineRect.bottom;
        
        // Calculate position based on viewport center relative to timeline
        var viewportCenter = viewportHeight / 2;
        var relativePosition = viewportCenter - timelineTop;
        
        // Calculate percentage of timeline scrolled
        var timelineStart = timelineRect.top + window.scrollY;
        var timelineEnd = timelineRect.bottom + window.scrollY;
        var currentScroll = window.scrollY + viewportCenter;
        
        // Normalize position (0 to 1) based on scroll through timeline
        var scrollProgress = (currentScroll - timelineStart) / (timelineEnd - timelineStart);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Map to divider height
        var position = scrollProgress * dividerHeight;
        
        // Clamp position within bounds
        position = Math.max(0, Math.min(dividerHeight, position));
        
        // Set the traveller position
        traveller.style.top = position + 'px';
    });
}

// Update timeline travellers on scroll
window.addEventListener("scroll", updateTimelineTravellers);
window.addEventListener("resize", updateTimelineTravellers);

// Initialize on page load
window.addEventListener("load", function() {
    updateTimelineTravellers();
    // Also trigger after a short delay to ensure layout is complete
    setTimeout(updateTimelineTravellers, 100);
});