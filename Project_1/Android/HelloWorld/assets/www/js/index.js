//*********************************** JavaScript / Cordova **********************************//

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

//*********************************** Custom JavaScript **********************************//

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

//*********************************** Device Information / Cordova **********************************//

// Wait for Cordova to load before loading any methods for Cordova //
document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready, start loading the method //
    function onDeviceReady() {
        
        // Variables //
        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value
        
        // Load immediately when device is ready //
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        
        // Grab the ID's and prep for (addEventListener) //
        var openCamera = document.getElementById('openCamera');
        var showNetwork = document.getElementById('networkInfo');
        var contacts = document.getElementById('contacts');
        var showDevice = document.getElementById('deviceInfo');
        
        // Add a Click Event to the selected ID's //
        showNetwork.addEventListener("click", checkConnection, false);
        showDevice.addEventListener("click", onClickDevice, false);
        openCamera.addEventListener("click", capturePhoto, false);
        contacts.addEventListener("click", startContacts, false);
        
        // Start Camera Method //
        function onPhotoDataSuccess(imageData) {
            // Uncomment to view the base64 encoded image data
            // console.log(imageData);
            
            // Get image handle
            var smallImage = document.getElementById('smallImage');
            
            // Unhide image elements
            smallImage.style.display = 'block';
            
            // Show the captured photo
            // The inline CSS rules are used to resize the image
            smallImage.src = "data:image/jpeg;base64," + imageData;
        };
        
        function onPhotoURISuccess(imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);
            
            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');
            
            // Unhide image elements
            //
            largeImage.style.display = 'block';
            
            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        };
        
        // When openCamera is clicked, run method to open the native (default) camera //
        function capturePhoto() {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                destinationType: destinationType.DATA_URL });
        }; // End Camera Method //
        
        // Start Network Method //
        // When networkInfo is clicked, run method to alert the user //
        function checkConnection() {
            var networkState = navigator.network.connection.type;
            
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.NONE]     = 'No network connection';
            
            // User is alert with network information //
            alert('Connection type: ' + states[networkState]);
        }; // End Network Method //
        
        // Start Contacts Method //
        // When #contacts is clicked, find all available contacts //
        function startContacts() {
            // find all contacts
            var options = new ContactFindOptions();
            options.filter="";
            var filter = ["displayName","addresses"];
            navigator.contacts.find(filter, onSuccess, onError, options);
        };
        
        // onSuccess: Get a snapshot of the current contacts
        function onSuccess(contacts) {
            // Unhide #contactList //
            document.getElementById('contactList').style.display = "block";
            // display the address information for all contacts
            for (var i=0; i<contacts.length; i++) {
                for (var j=0; j<contacts[i].addresses.length; j++) {
                    document.getElementById('contactList').innerHTML =
                        "Name: " + contacts[i].displayName + "</br>" +
                        "Type: " + contacts[i].addresses[j].type + "</br>" +
                        "Street Address: "  + contacts[i].addresses[j].streetAddress + "</br>" +
                        "Locality: "  + contacts[i].addresses[j].locality + "</br>" +
                        "Region: "  + contacts[i].addresses[j].region + "</br>" +
                        "Postal Code: "  + contacts[i].addresses[j].postalCode + "</br>" +
                        "Country: "  + contacts[i].addresses[j].country
                    ;
                }
            }
        };
        
        // onError: Failed to get the contacts
        function onError(contactError) {
            alert('onError!');
        }; // End Contactos Method //
        
        // Start Device Method //
        // When #deviceInfo is clicked, run method to alert the user //
        function onClickDevice() {
            // User is alerted with the device information //
            alert('Device Name: '     + device.name      + '\n' +
                  'Device Cordova: '  + device.cordova   + '\n' +
                  'Device Platform: ' + device.platform  + '\n' +
                  'Device UUID: '     + device.uuid      + '\n' +
                  'Device Version: '  + device.version   + '\n'
                  );
        };
        
        function onFail(message) {
            alert('Failed because: ' + message);
        }; // End Device Method //
    };
