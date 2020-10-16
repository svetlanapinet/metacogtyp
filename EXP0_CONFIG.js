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
if (config.debug == true) {word_lists = listtest;}
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
if (config.debug == true){config.nb_blockspercond = 1;}


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


var instructions_block1 = {
    type: "html-keyboard-response",
    stimulus:"<h2>Preparing for the experiment</h2>"+
        "<div align='left'><p>This experiment involves typing words. You will not be able to type the words accurately if you are in a noisy or distracting environment.</p>"+
        "<p>Please take a moment to do the following before you continue:</p>"+
        "<ul><li>Mute, turn off, or move away from any sources of noise or distraction.</li>"+
            "<li>Make sure you are sitting comfortably, in a good typing position before you begin.</li>"+
            "<li>[...anything else?].</li></ul></div>",
    prompt: "<p>Press the SPACE key to continue.</p>",
    timing_post_trial: 1000,
    choices: [' '],
};

var instructions_block2 = {
    type: "html-keyboard-response",
    stimulus:"<h2>Typing words</h2>"+
        "<div align='left'><p>In this experiment, you will see some words on the screen and type them as quickly as you can.</p>"+
        "<p>You should start typing whenever you see the word. What you type will be masked as if you were typing a password. There will not be very much time to type the word, so you will need to type as quickly as you can.</p></div>",
    prompt: "<p>Press the SPACE key to continue.</p>",
    timing_post_trial: 1000,
    choices: [' '],
};

var instructions_block3 = {
    type: "html-keyboard-response",
    stimulus:"<h2>Pretest</h2>"+
        "<div align='left'><p>For this experiment, we are looking for participants with a certain level of spelling and typing proficiency. You will need to meet certain criteria in the practice trials to be able to continue.</p>"+
        "<p>Your typing proficiency will be assessed in a typing test. First, you will be asked to copy a text <strong>without</strong> strict time limits. Then, you will be asked to copy 15 words <strong>within</strong> time limits. You will need to finish typing before the deadline.</p></div>",
    prompt: "<p>Press the SPACE key to continue.</p>",
    timing_post_trial: 1000,
    choices: [' '],
};

var instructions_block4 = {
    type: "html-keyboard-response",
    stimulus:"<h2>Ready?</h2>"+
        "<div align='left'><p>Some final notes before you begin:</p>"+
        "<ul><li>The stimulus in each trial can be a single English word, a sequence of 4 letters, a sequence of 4 numbers.</li>"+
        "<li>You <strong>don't</strong> need to press any specific key after each word, it will automatically move on to the next trial.</li>"+
        "<li>You <strong>don't</strong> need to use the SHIFT key.</li>"+
        "<li>Try to type the words as fast and as accurately as you can.</li>"+
        "<li>Do not try to correct yourself, it's okay if you make mistakes, but remember to finish typing before the deadline.</li>"+
        "<li>It is <strong>very</strong> important that you type 4 keystrokes on each trial.</li>"+
        "<li>There is no way to pause the session. However, there will be regular breaks during the session.</li></ul>"+
        "<p>You may now start the session.</p>"+
        "<p><strong>Do not close or reload the page after this point!</strong> If you close or reload the page before the session is complete, you will not be able to continue.</p></div>",
    prompt: "<p>Press the SPACE key to begin.</p>",
    timing_post_trial: 1000,
    choices: [' '],
};

timeline_instruct = [instructions_block1, instructions_block2, instructions_block3, instructions_block4];


config.instructions = timeline_instruct;


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


// SAVE DATA

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

config.saveData = downloadObjectAsJson;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

  return config
}
