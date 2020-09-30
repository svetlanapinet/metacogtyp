/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 50,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      speed: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: '(Inverse) speed of the slider',
        default: 100,
        description: 'How often the slider position is updated (in ms)'
      },
      choices: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Keys that can be used to move the slider',
        default: [37, 39],
        description: 'Keys that can be used to move the slider (to the left and to the right).'
      },
      labels: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      slider_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name:'Slider width',
        default: null,
        description: 'Width of the slider in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      require_movement: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Require movement',
        default: false,
        description: 'If true, the participant will have to move the slider before continuing.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
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
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Response ends trial',
        default: 32, // space-bar
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 100px 0px;">';
    html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + '</div>';
    html += '<div class="jspsych-html-slider-response-container" style="position:relative; margin: 0 auto 3em auto; ';
    if(trial.slider_width !== null){
      html += 'width:'+trial.slider_width+'px;';
    }
    html += '">';
    html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" class="slider" id="jspsych-html-slider-response-response"></input>';
    html += '<div>'
    for(var j=0; j < trial.labels.length; j++){
      var width = 100/(trial.labels.length-1);
      var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    // Commented to remove submit button
    //html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';

    display_element.innerHTML = html;


    var response = {
      rt: null,
      response: null,
      finished: null
    };


      var in_slider_plugin = true;
      var arrow_pressed = false;
      var spacebarpressed = false;

      var relevant_keys = [trial.key_to_end, trial.choices[0], trial.choices[1]];


    document.addEventListener('keydown', function(e){ //keydown

      // "document" is global, so do it only if we are using this pluggin
      if (typeof in_slider_plugin !== 'undefined') {
        if (in_slider_plugin){
          if (!arrow_pressed){
            arrow_pressed = true;

            if ( !relevant_keys.includes(e.keyCode)){
              return false
            }

            var move_slider = setInterval(function(){

                if(in_slider_plugin){
                  var k = e.keyCode; // ou keypour utiliser les lettres
                  var old_value = parseInt(display_element.querySelector('#jspsych-html-slider-response-response').value, 10);
                  var step = trial.step;

                  if (k==trial.choices[0]){ //"ArrowLeft"){ // ArrowLeft
                    var new_value = old_value - step;
                  }else if (k==trial.choices[1]){ //ArrowRight
                    var new_value = old_value + step;
                  }
                  display_element.querySelector('#jspsych-html-slider-response-response').value = new_value;
                }

                // if the arrow key is not pressed anymore stop the slider
                if ( !arrow_pressed || !in_slider_plugin){
                  console.log("clear")
                  clearInterval(move_slider)
                }

              }, trial.speed)

        }
      } // end if in_slider_plugin is defined

      }
  })
  //console.log('button end trial',trial.response_ends_trial)

  document.addEventListener('keyup', function(e){
    // "document" is global, so do it only if we are using this pluggin
    if (typeof in_slider_plugin !== 'undefined') {
      if (in_slider_plugin){
        var k = e.keyCode;
        console.log('in keyup', k)
          arrow_pressed = false;
          if(k == trial.response_ends_trial){
            spacebarpressed = true;
            response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
            end_trial();
        }
      }
    }

  })

  console.log('Someone pressed the spacebar',     )


    // End the trial if the spacebar button is arrow_pressed
     if(spacebarpressed == true){
       console.log('Someone pressed the spacebar', spacebarpressed)
     }


    // update response when trial_duration is over (now that there is not continue button)
    if (trial.trial_duration !== null ) {
    jsPsych.pluginAPI.setTimeout(function() {
        response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
        in_slider_plugin = false;
        //console.log("in slider plugin dans end", in_slider_plugin)
        if (arrow_pressed){
          trial.finished = false;
        }else{
          trial.finished = true;
        }
        arrow_pressed = false;
        end_trial();
      }, trial.trial_duration);
    }



    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      jsPsych.pluginAPI.cancelAllKeyboardResponses();


      // save data
      var trialdata = {
        "rt": response.rt,
        "response": response.response,
        "stimulus": trial.stimulus,
        "finished": trial.finished,
        "start": trial.start
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }


    // if (trial.stimulus_duration !== null) {
    //   jsPsych.pluginAPI.setTimeout(function() {
    //     display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
    //   }, trial.stimulus_duration);
    // }
    //
    // // end trial if trial_duration is set
    // if (trial.trial_duration !== null) {
    //   jsPsych.pluginAPI.setTimeout(function() {
    //     end_trial();
    //   }, trial.trial_duration);
    // }

    var startTime = performance.now();
  };

  return plugin;
})();
