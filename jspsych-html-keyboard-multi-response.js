/**
 * jspsych-audio-keyboard-response
 * Josh de Leeuw
 *
 * plugin for playing an audio file and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["html-keyboard-multi-response"] = (function() {

  var plugin = {};


  plugin.info = {
    name: 'html-keyboard-multi-response',
    description: '',
    parameters: {
//      stimulus: {
//        type: jsPsych.plugins.parameterType.AUDIO,
//        pretty_name: 'Stimulus',
//        default: undefined,
//        description: 'The audio to be played.'
//      },
//      target: {
//        type: jsPsych.plugins.parameterType.STRING,
//        pretty_name: 'Target',
//        default: undefined,
//        description: 'The target to be typed.'
//      },
      stimulus: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'Any content here will be displayed below the stimulus.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choices',
        array: true,
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      image : {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Image',
        default: null,
        description: 'The image to be displayed'
      },
      progress_bar : {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Progress Bar',
        default: true,
        description: 'Whether a progress bar with the remaining time of the trial should be displayed above the stimulus'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'The maximum duration to wait for a response.'
      },
//      response_ends_trial: {
//        type: jsPsych.plugins.parameterType.BOOL,
//        pretty_name: 'Response ends trial',
//        default: true,
//        description: 'If true, the trial will end when user makes a response.'
//      },
      key_terminator: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key terminator',
        default: null,
        description: 'If set, the trial will end when user presses this key.'
      },
//     trial_ends_after_audio: {
//        type: jsPsych.plugins.parameterType.BOOL,
//        pretty_name: 'Trial ends after audio',
//        default: false,
//        description: 'If true, then the trial will end as soon as the audio file finishes playing.'
//      },
//      timing_response: {
//        type: jsPsych.plugins.parameterType.INT,
//        pretty_name: 'Time allowed for the response',
//        default: 2000,
//        description: 'The time between the beep and the boop that marks the deadline.'
//      },      
//      timing_after_response: {
//        type: jsPsych.plugins.parameterType.INT,
//        pretty_name: 'Time after boop deadline',
//        default: 500,
//        description: 'The amount of time in milliseconds between the boop that marks the deadline and the end of the trial.'
//      },      
      visual_feedback: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name:'Whether to display something on the screen',
        options: ['no', 'word', 'aster'],
        default: 'no',
        description: 'Determines the type of feedback displayed on the screen during typing'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

        var setTimeoutHandlers = [];
//    display_element.append('');
      display_element.innerHTML = '';

    var new_html = '';

      // add progress bar
    if (trial.progress_bar == true){
      var dur = trial.trial_duration / 1000;
      var pgbar_html = '<div id = "trial-progress-bar"; style="width: 400px; height: 20px; background-color: #ccc;">' +
    '<div style="width: 0%; height: 20px; position:top; background-color: #333; animation-name: progress-bar; animation-duration:'+dur.toString()+'s;animation-timing-function: linear;">' +
    '</div>' ;
      new_html += pgbar_html;
    }
    console.log(pgbar_html);

    
    // add image if specified
    if (trial.image !== null){
      var img_html = '<img src="'+trial.image+'" id="jspsych-image-keyboard-response-stimulus"></img>';
      new_html += img_html;
    }

      var stim_html = '<div id="jspsych-html-keyboard-multi-response-stimulus" style="margin-bottom: 1em">'+trial.stimulus+'</div>';
        new_html += stim_html;
//        var new_html = trial.stimulus;

    // add prompt
      if(trial.prompt !== null){
        new_html += trial.prompt;
      }


    if (trial.progress_bar == true){
      var style_pgbar = '<style> @keyframes progress-bar { 0% { width:0%;} 100% { width:100%} } </style>';
     new_html += trial.prompt;
    }
    
    console.log(new_html);
    
    
      // draw
      display_element.innerHTML = new_html;
//        display_element.append(new_html);


    
    // show feedback on screen if option was selected
//    if (trial.visual_feedback !== 'no') {
//        display_element.innerHTML = '';

        var text_element = document.createElement('input');
//        display_element.append(text_element);
//        display_element.innerHTML += text_element;
//        document.getElementById("jspsych-html-keyboard-multi-response-stimulus").appendChild(text_element);

        text_element.id = 'jspsych-audio-keyboard-multi-response-feedback';
        text_element.name = 'response-feedback';
        text_element.type = 'text';
        text_element.size = '10'; // 40  size of the input box
        if (trial.visual_feedback === 'no') {
          text_element.type = 'text';
          text_element.style.color = 'white';
      };
        if (trial.visual_feedback === 'word') {text_element.type = 'text'};
        if (trial.visual_feedback === 'aster') {text_element.type = 'password'};
        text_element.autofocus = true;
        text_element.autocapitalize = false;
        text_element.spellcheck = false;
        text_element.style.border = 'none';
        text_element.style.fontSize = '26px';
//        text_element.style.fontFamily = 'Courier';
        text_element.disabled = false; // change to true
        display_element.append(text_element);

//        text_element.focus();
//        text_element.addEventListener('input');
//    }

 
    // store response
//    var response = {
//      rt: null,
//      key: null
//    };
      var responseTimes = [];
      var responseTypingTimes = [];
      // array for response keys 
      var responseKeys = [];
      var finalKeys = "";
      var finalResp = "";
      var errdetect = null;
      
    // function to end trial when it is time
    function end_trial() {

      text = document.getElementById('jspsych-audio-keyboard-multi-response-feedback');
      finalResp = text.value;

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      jsPsych.pluginAPI.cancelAllKeyboardResponses();

      // gather the data to store for the trial
//      if(context !== null && response.rt !== null){
//       response.rt = Math.round(response.rt * 1000);
//      }

  // remove last element if enter
//      if (finalKeys.toUpperCase() === 'YES') {
//        errdetect = 1;
//      }else if (finalKeys.toUpperCase() === 'NO'){
//        errdetect = 0;
//      }else{errdetect = null};


    var trial_data = {
        "rt": JSON.stringify(responseTimes),
        "stimulus": trial.stimulus,
        "key_press": JSON.stringify(responseKeys),
//        "tt": JSON.stringify(responseTypingTimes),
        "total_response": finalKeys,
        "final": finalResp,
        "error": errdetect,
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    var target = trial.stimulus;
    var bksp = 0;
    var lettercount = 0;

    // function to handle responses by the subject
    var after_response = function(info) {

      // only record the first response
//      if (response.key == null) {
//        response = info;
//      }
// construct arrays of RT, IKI and keys
        if (info.key !== null) {
          responseTimes.push(info.rt);
          finalKeys += jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key);
          responseKeys.push(info.key);

      text = document.getElementById('jspsych-audio-keyboard-multi-response-feedback');
      finalResp = text.value + jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(info.key);

//      console.log(finalKeys)
//      console.log(finalResp)
      if (finalKeys.toUpperCase() === 'YES' || finalResp.toUpperCase() === 'YES') {
        errdetect = 1;
        setTimeout(function() {end_trial();}, 200);
      }else if (finalKeys.toUpperCase() === 'NO' || finalResp.toUpperCase() === 'NO'){
        errdetect = 0;
        setTimeout(function() {end_trial();}, 200);
      }else{errdetect = null;
//        trial.trial_duration+=1000;
//        console.log(trial.trial_duration);
        };
        };

// if last key is enter, end trial
      if (trial.key_terminator !== null){
          if (info.key !== null && info.key === trial.key_terminator){
          end_trial();
        };
      };

// use a confirmation key?
//      if (trial.response_ends_trial) {
//        end_trial();
//      }

    };



var getResponse = function() {
    // start the response listener
    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: true,
        allow_held_key: false
      });

//      var text_elem = document.getElementById('jspsych-audio-keyboard-multi-response-feedback');
      text_element.disabled = false;
      text_element.focus();

    // end trial if time limit is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
        console.log('trial is over');
      }, trial.trial_duration);
    }
  };


   getResponse();


  };

 
  return plugin;
})();
