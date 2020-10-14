function EXP0_CONFIG(){
  // the place to change parameters

  var jsPsych = window['jsPsych'];

  var config = {};
  var width = window.innerWidth;
  var height = window.innerHeight;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    DEBUG OR NOT                                        //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

config.debug = true; // Shorter stimulus sequence


  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
  //----------------------------------------------------------------------------------------//
  //                                    STAIRCASE                                           //
  //----------------------------------------------------------------------------------------//
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

  var thisstaircase = {};

  //---------------------------------------------------------------------- //
  // Parameters that can be changed -------------------------------------- //

  thisstaircase.StepSize                  = 100;
  thisstaircase.SCval                     = 2000;
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
config.len_conf               = 600000; //3000; MAX DURATION OF THE CONFIDENCE
config.len_fixation           = 900;//900;
config.len_respmapremind      = 2000;
config.len_word               = 3000;
config.len_TimePressureScreen  = 3000;
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

// Select all the words
var word_lists = listwords;
//if (config.debug == true) {word_lists = listtest;}
config.list_word_shuf = jsPsych.randomization.shuffle(word_lists);
config.ntrialperblock =  word_lists.length

// then select the number of corresponding stim in the chunk list
var chunk_lists = listchunks;
config.list_chunk_shuf = jsPsych.randomization.shuffle(chunk_lists);
config.list_chunk_shuf = config.list_chunk_shuf.slice(1, config.ntrialperblock );

var nonchunk_lists = listnonchunks;
config.list_nonchunk_shuf = jsPsych.randomization.shuffle(nonchunk_lists);
config.list_nonchunk_shuf = config.list_nonchunk_shuf.slice(1, config.ntrialperblock );

// Convert the non chunk into number stimuli
var thisstim;
var thisletter;
var number_list = [];
for (thisstim = 0;thisstim < config.ntrialperblock; thisstim++){ // Loop across
  var thistring = []
  for (thisletter = 0;thisletter < nonchunk_lists[thisstim].stimulus.length;thisletter++){
    //console.log('thistring',thistring)
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "w"){
      thistring.push("1")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "e"){
      thistring.push("2")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "r"){
      thistring.push("3")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "t"){
      thistring.push("4")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "u"){
      thistring.push("7")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "i"){
      thistring.push("8")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "o"){
      thistring.push("9")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "p"){
      thistring.push("0")}
    }
    var element = {}
    element.stimulus = thistring.join("");
    element.data = "number";
    number_list.push(element);
};
config.list_number_shuf = jsPsych.randomization.shuffle(number_list);


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
         console.log('Stairecase Val', thisstaircase.SCval)

         thisstaircase.nTrials += 1;

         // get the data of the previous rdk stim
         //var rdk_data = jsPsych.data.get().last(2).values()[0];
         var right_answer = data.acc;
         //console.log("bonne rep ?", right_answer)
         data.CorrectPerceptual = data.acc;
         thisstaircase.nTrialSC += 1;
         thisstaircase.responseMatrix = thisstaircase.responseMatrix.concat(!!right_answer);
         thisstaircase = expAK_staircase_function(thisstaircase);
         //data.dir_stair = thisstaircase.dir[1];
         toofewletterstyped = false;
         if (data.toofewletterstyped > 0 ){
           toofewletterstyped = true;}
        return toofewletterstyped
        }
  }



config.stim_trial_word = trial_word;



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
config.Conf_choices            = ["ShiftLeft","ShiftRight"]; // F and J
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
        var txt = "<br></br>Use the keys [ Shift Left ] and [ Shift Right ]  to move the slider";
        return txt
    },
    min: config.Conf_limits[0],
    max: config.Conf_limits[1],
    step: config.Conf_step,
    choices: config.Conf_choices,
    speed: config.Conf_speed,
    trial_duration: config.len_conf,

}

// Randomize the order of size of the slider
Conf_slider_template.start = function() {
    return Math.floor(Math.random() * config.Conf_limits[1])
};

config.Conf_slider_template = Conf_slider_template;

//---------------------------------------------------------------------- //
// Too slow screen  ---------------------------------------------------------- //
var Feedback_TimePressure_screen = {
    type: 'html-keyboard-response',
    stimulus: 'You have not typed all the letters. \n\n Respond faster !! ',
    choices:jsPsych.NO_KEYS,
    trial_duration: config.len_TimePressureScreen,
    //data: function(){
    //    var d = common_data;
    //    d.screen = "time_pressureScreen";
    //    d.toofewletterstyped = 1;
    //    return d
    //},
    //on_finish: function(data){

      //var last_screen = jsPsych.data.get().last(2).values()[0].screen;
      // If too late on the first screen
      //if (last_screen == "get_response"){ // if they were too late for the choice, ie at the begining of the trial
          //config.nb_too_late_in_a_row += 1;
      //}else if ((last_screen == "FoC_slider")){ // if they were too late for the confidence, ie they are still doing the task
      //    config.nb_too_late_in_a_row = 0;
      //}
      //} // end on_finish
}
config.Feedback_TimePressure_screen = Feedback_TimePressure_screen;



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    DESIGN                                              //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

//---------------------------------------------------------------------- //
// What parts to do ---------------------------------------------------- //

//var to_do = {};
//to_do.staircase                     = false;
//to_do.experiment                    = false;
//config.to_do                        = to_do;

//---------------------------------------------------------------------- //
// Structure ----------------------------------------------------------- //

config.nb_blockspercond = 3;

// Randomize the order of the blocks
var factors = {
    stimlist: ['config.list_word_shuf','config.list_chunk_shuf', 'config.list_nonchunk_shuf','config.list_number_shuf']
    //ms_delay: [100, 200]
}

config.perm_blockorder = jsPsych.randomization.factorial(factors, 1);
//console.log('lala',config.perm_blockorder[0].stimlist)

//---------------------------------------------------------------------- //
// Conditions and randomization ---------------------------------------- //


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
