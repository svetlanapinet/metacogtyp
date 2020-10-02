/**
 * jspsych-html-keyboard-multiple-response
 * Josh de Leeuw & Matt Crump
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-audio-keyboard-multi-response"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-audio-keyboard-multi-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: "<p id='typing_feedback'></p>",
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },

    }
  };

  plugin.trial = function(display_element, trial) {

    var new_html = '<div id="jspsych-html-keyboard-multiple-response-stimulus">';

    // add progress bar
    if (trial.progressbar){
      new_html += '<div style="width: 600px; height: 20px; background-color: #ccc;">' +
      '<div style="width: 0%; height: 20px; background-color: #333; animation-name: progress-bar; animation-duration: ' +
      trial.trial_duration/1000 + 's;animation-timing-function: linear;">' +
      '</div>' +
      '<style> @keyframes progress-bar { 0% { width:0%;} 100% { width:100%} } </style>' +
      '</div>';
    }

    // add stimulus
     new_html += trial.stimulus.toUpperCase() +'</div>';


    // add prompt
    if(trial.prompt !== null){
      var thistring =  trial.prompt.toUpperCase();
      document.getElementByName('thistring').style.fontFamily =  'text-security-disc';
      new_html += '</div> ' + thistring + '</div> ';
    }

    // draw
    display_element.innerHTML = new_html;

    // store response
    var response = {
      rt: [],
      key: [],
      char: []
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key,
        "key_name": response.char
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      //display_element.querySelector('#jspsych-html-keyboard-multiple-response-stimulus').className += ' responded';

      if(info.key == 32){ // the key code for 'Q' is 81.
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        end_trial();
      }

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      // VISUAL FEEDBACK OF WHAT IS TYPED
      //console.log('document.getElementById("typing_feedback")',document.getElementById("typing_feedback"))
      response.key.push(info.key);
      response.rt.push(info.rt);
      response.char.push(String.fromCharCode(info.key));
     display_element.innerHTML += String.fromCharCode(info.key).toUpperCase();
     //display_element.innerHTML += "a";
     //document.getElementById("typing_feedback").innerHTML += String.fromCharCode(info.key);

     // if (trial.response_ends_trial) {
    //    end_trial();
    //  }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: true,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-multiple-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
