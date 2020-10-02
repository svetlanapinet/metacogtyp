/**
 * xprmntr.js - > jspsychr.js
 * Danielle Navarro
 * modified to not conflict with xprmntr : Matt Crump
 **/

var jspsychr = {};
jspsychr.save_locally = function() {
  var data = jsPsych.data.get().csv();
  var file = "jspsychr_local_name";
  console.log('saving data...');
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'submit');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
  // In local files, status is 0 upon success in Mozilla Firefox
  if(xhr.readyState === XMLHttpRequest.DONE) {
    var status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // The request has been completed successfully
      console.log(xhr.responseText);
      console.log('it worked?');
    } else {
      console.log('something was wrong');
      // Oh no! There has been an error with the request!
    }
  }
};

  xhr.send(JSON.stringify({filename: file, filedata: data}));
};
