function EXP0_CONFIG(){
  // the place to change parameters

  var jsPsych = window['jsPsych'];

  var config = {};
  var width = window.innerWidth;
  var height = window.innerHeight;

config.test = true;


  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
  //----------------------------------------------------------------------------------------//
  //                                    STAIRCASE                                           //
  //----------------------------------------------------------------------------------------//
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

  var thisstaircase = {};

  //---------------------------------------------------------------------- //
  // Parameters that can be changed -------------------------------------- //

  thisstaircase.StepSize                  = 100;
  thisstaircase.SCval                     = 4000;
  thisstaircase.min_step_size             = 16;
  thisstaircase.numTrials                 = 150;// nb max
  thisstaircase.variableStepSize          = true; // true for variable stepSize, false for fixed stepsize
  thisstaircase.thresholdTrialN           = 40;
  thisstaircase.nRunHalve                 = 2; // after how many reversals should we reduce stepsize ?

  //---------------------------------------------------------------------- //
  // Initialisations ----------------------------------------------------- //

  thisstaircase.responseMatrix            = [true]; // save whether past answers where correct
  thisstaircase.dir                       = ["up", "up"]; // save past coh changes directions
  thisstaircase.good_rep                  = null; // correct answer or not
  thisstaircase.nTrials                   = 0; // compteur all trials
  thisstaircase.nTrialSC                  = 0; // compteur trials où le sujet &agrave; r&eacute;pondu
  thisstaircase.SCvalRev                  = [];
  thisstaircase.nTrialRev                 = [];
  thisstaircase.r                         = 0; // number of reversals
  thisstaircase.last_SCval                = []; // last coherences at reversal
  thisstaircase.all_SCval                 = [];

  config.stair                    = thisstaircase;




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    STIMULI                                             //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

//---------------------------------------------------------------------- //
// Timings ------------------------------------------------------------- //
config.len_conf               = 60000; //3000; MAX DURATION OF THE CONFIDENCE
config.len_fixation           = 900;//900;
config.len_respmapremind      = 2000;
config.len_word               = 3000;

//---------------------------------------------------------------------- //
// Block onset  ----------------------------------------------------------- //
var block = {
    type: 'html-keyboard-response',
    stimulus: '<p>Begin a new block</p>'+
	'<p>Press any key </p>',
};
config.stim_block = block;

//---------------------------------------------------------------------- //
// Response Mapping Reminder   ----------------------------------------- //
var mappingreminder = {
    type: 'image-keyboard-response',
    stimulus_height: 500,
    stimulus: 'keyboardimg.jpg',
    choices: jsPsych.NO_KEYS,
    trial_duration: config.len_respmapremind,
};
config.stim_mappingreminder = mappingreminder;

//---------------------------------------------------------------------- //
// Fixations ----------------------------------------------------------- //
var pause = {
    type: 'html-keyboard-response',
    stimulus: '+',
    choices: jsPsych.NO_KEYS,
    trial_duration: config.len_fixation,
};
config.stim_pause = pause;


//---------------------------------------------------------------------- //
// Words  ----------------------------------------------------------- //

var word_lists = listwords;
if (config.test == true) {word_lists = listtest;}
config.list_word_shuf = jsPsych.randomization.shuffle(word_lists);

var chunk_lists = listchunks;
config.list_chunk_shuf = jsPsych.randomization.shuffle(chunk_lists);

var nonchunk_lists = listnonchunks;
config.list_nonchunk_shuf = jsPsych.randomization.shuffle(nonchunk_lists);

//console.log('thistaircase', thisstaircase)
//console.log('try to select right key',rangei(48,90))

var trial_word = {
    type: 'html-audio-keyboard-multi-response',
    stimulus:jsPsych.timelineVariable('stimulus'),
    progressbar:true,
    promptincap: true,
    trial_duration: thisstaircase.SCval,
    image: null,
    visual_feedback: 'aster',
    choices: rangei(48,90),
    on_finish: function(data){

         console.log('ACC', data.acc)
         console.log('SCval', thisstaircase.SCval)

         thisstaircase.nTrials += 1;

         // get the data of the previous rdk stim
         //var rdk_data = jsPsych.data.get().last(2).values()[0];
         var right_answer = data.acc;
         console.log("bonne rep ?", right_answer)
         data.CorrectPerceptual = data.acc;
         thisstaircase.nTrialSC += 1;
         thisstaircase.responseMatrix = thisstaircase.responseMatrix.concat(!!right_answer);
         thisstaircase = expAK_staircase_function(thisstaircase);
         //data.dir_stair = thisstaircase.dir[1];

  }}


//var trial_word2 = {
//    type: 'html-keyboard-multi-response',
//    stimulus: jsPsych.timelineVariable('stimulus'),
//    trial_duration: config.len_word,
//    progress_bar: true,
//    image: null,
//    visual_feedback: 'aster',
//};

config.stim_trial_word = trial_word;

// Get the response
//var get_response = Object.assign({}, config.stim_trial_word);
//get_response.data = function(){
//     var d = common_data;
//     d.screen = "get_response";
//     return d
//  };
 // get_response.on_finish = function(data){
//     console.log('SCval', config.stair.SCval)
//
    // get the data of the previous rdk stim
//     var rdk_data = jsPsych.data.get().last(2).values()[0];
//
//     if (data.key_press != -1){
//       var right_answer = [data.final] == [trial_word.stimulus];
//       console.log("bonne rep ?", right_answer)
//       data.CorrectPerceptual = right_answer;
//       config.stair.nTrialSC += 1;
//       config.stair.responseMatrix = config.stair.responseMatrix.concat(!!right_answer);
//       config = expAK_staircase_function(config);
//       data.dir_stair = config.stair.dir[1];
//       data.choice = (_.invert(config.responseSettings))[data.key_press];

//    }else{
//      data.response = -999;
//      config.too_late = true;
//    }
//    }



//---------------------------------------------------------------------- //
// Confidence  ---------------------------------------------------------- //

config.Conf_labels             = ["<font size=4> Sure Correct </font>",
                                 "<font size=4> Sure Error </font>"]
config.Conf_limits             = [0, 4];
config.Conf_size               = function(){
                                    var longueur = config.diameter*3;
                                    var max_long = width*0.8;
                                    if (longueur > max_long){
                                        longueur = max_long
                                    }
                                    return longueur
                                }//width/2;
config.Conf_stim               = ''; //"How much did you feel in control ?";
config.Conf_choices            = [70, 74]; // F and J
config.Conf_speed              = 300; // how often the slider position is updated (in ms)
config.Conf_step               = 1;

// randomize Conf labels positions
config.rand_order              = jsPsych.randomization.sampleWithReplacement([0, 1], 1)[0];
if (config.rand_order == 1){
    var temp = config.Conf_labels[0];
    config.Conf_labels[0] = config.Conf_labels[1];
    config.Conf_labels[1] = temp;
}

// Conf slider template
var Conf_slider_template = {
    type: "html-slider-response",
    labels: config.Conf_labels,
    stimulus: config.Conf_stim,
    slider_width: config.Conf_size,
    prompt : function(){
        var txt = "<br></br>Use the keys [ F ] and [ J ]  to move the slider";
        return txt
    },
    min: config.Conf_limits[0],
    max: config.Conf_limits[1],
    step: config.Conf_step,
    choices: config.Conf_choices,
    speed: config.Conf_speed,
    trial_duration: config.len_conf,

}

config.Conf_slider_template = Conf_slider_template;



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    DESIGN                                              //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

//---------------------------------------------------------------------- //
// What parts to do ---------------------------------------------------- //

var to_do = {};
to_do.staircase                     = false;
to_do.experiment                    = false;
config.to_do                        = to_do;


//---------------------------------------------------------------------- //
// Structure ----------------------------------------------------------- //

//config.nb_blocs = 1;
//config.nb_perm_bloc = 1;



//---------------------------------------------------------------------- //
// Conditions and randomization ---------------------------------------- //


  //var colors = ["rgb(140,32,112)", "rgb(238,68,47)", "rgb(99,172,190)"];
  //var colors = ["rgb(230, 159, 0)", "rgb(0,114,178)", "rgb(0,158,115)"];
  //var colors = ["rgb(255,0,0)", "rgb(0,81,255)", "rgb(9,148,9)"] // ["red", "blue", "green"];

  //var colors_names = ["mauve", "red-orange", "blue-green"];
  //var colors_names = ["orange", "blue", "green"];
////var colors_names = ["red", "blue", "green"];
  //if (config.language == "francais"){
  ////    colors_names = ['rouge', 'bleu', 'vert']
  //}

  //config.colors = colors;
  //config.randomized_colors    = colors; // Not randomized anymore because there seems to be a spontaneous association (green for adheren red for oppose)
  //config.instructionSettings  = {adhere: config.randomized_colors[2], oppose: config.randomized_colors[0], detach: config.randomized_colors[1]};
  //config.orientationSettings  = {right: 0, left: 180}
  //config.responseSettings     = {right: 39, left: 37} // s and f  arrows now

  //config.factors              = {border_color_post: Object.values(config.instructionSettings),
                                  //  coherent_direction: Object.values(config.orientationSettings)};

  //config.nb_trials            = jsPsych.randomization.factorial(config.factors, 1).length;


//---------------------------------------------------------------------- //
// Catch Trials -------------------------------------------------------- //
//config.prop_catchup         = 0; //0.16; // ~1/6, dans le code matlab c'&eacute;tait 3 pour 18
//config.coh_catchup          = 0.6;
//config.cachup_random        = jsPsych.randomization.repeat([1, 2, 3], 2);
//config.cachup_random.push(jsPsych.randomization.sampleWithoutReplacement([1, 2, 3], 1)[0]) // we need 7 values for 7 blocs






//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    INSTRUCTIONS                                        //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//





//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//--------------------------------- Usefull functions  -----------------------------------//
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

// to generate random numbers
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
config.randomIntFromInterval = randomIntFromInterval;

// compute the mean of an array
function arrayAverage(arr){
  //Find the sum
  var sum = 0;
  for(var i in arr) {
    sum += arr[i];
  }
  //Get the length of the array
  var numbersCnt = arr.length;
  //Return the average / mean.
  return (sum / numbersCnt);
}
config.arrayAverage = arrayAverage;

// Range of numbers
function rangei(start,end){
  return Array(end - start + 1).fill().map((_, idx) => start + idx)

  // var list = [];
  // for (var i = lowEnd; i <= highEnd; i++) {
    // list.push(i);
    // return list
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

  return config
}
