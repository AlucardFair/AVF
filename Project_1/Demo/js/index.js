var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

// Wait until DOM is ready //
window.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Ready");
    
    // getElementById function //
    function ge(x) {
        var elementID = document.getElementById(x);
        return elementID;
    };
                        
    // Hide All Divs //
    ge('dev-content').style.display = "none";
    ge('native-content').style.display = "none";
    ge('dataApi-content').style.display = "none";
    ge('research-content').style.display = "none";
    ge('video-content').style.display = "none";
                        
    // Switch Case to Show and Hide Divs //
    function togglePage(page){
        switch(page){
            // Show Only #dev-content //
            case "dev":
                ge('dev-content').style.display = "block";
                ge('native-content').style.display = "none";
                ge('dataApi-content').style.display = "none";
                ge('research-content').style.display = "none";
                ge('video-content').style.display = "none";
                break;
            //Show Only #native-content //
            case "native":
                ge('dev-content').style.display = "none";
                ge('native-content').style.display = "block";
                ge('dataApi-content').style.display = "none";
                ge('research-content').style.display = "none";
                ge('video-content').style.display = "none";
                break;
            // Show Only #dataApi-Content //
            case "dataApi":
                ge('dev-content').style.display = "none";
                ge('native-content').style.display = "none";
                ge('dataApi-content').style.display = "block";
                ge('research-content').style.display = "none";
                ge('video-content').style.display = "none";
                break;
            // Show Only #research-content //
            case "research":
                ge('dev-content').style.display = "none";
                ge('native-content').style.display = "none";
                ge('dataApi-content').style.display = "none";
                ge('research-content').style.display = "block";
                ge('video-content').style.display = "none";
                break;
            // Show Only #video-content //
            case "video":
                ge('dev-content').style.display = "none";
                ge('native-content').style.display = "none";
                ge('dataApi-content').style.display = "none";
                ge('research-content').style.display = "none";
                ge('video-content').style.display = "block";
                break;
            default:
                return false;
                        
        }
    };
                        
    // Add Event Listeners for Click Events - Then Run togglePage() According to Link Clicked //
    var displayDev = ge('dev');
    displayDev.addEventListener("click", function() {
        togglePage("dev")
    });
    var displayNative = ge('native');
    displayNative.addEventListener("click", function() {
        togglePage("native")
    });
    var displayDataApi = ge('dataApi');
    displayDataApi.addEventListener("click", function () {
        togglePage("dataApi")
    });
    var displayResearch = ge('research');
    displayResearch.addEventListener("click", function() {
        togglePage("research")
    });
    var displayVideo = ge('videoView');
    displayVideo.addEventListener("click", function() {
        togglePage("video")
    });
                        
    // Call Switch Case //
    togglePage("dev");
});
