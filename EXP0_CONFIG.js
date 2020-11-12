function EXP0_CONFIG(){
  // the place to change parameters

  var jsPsych = window['jsPsych'];


  var width = window.innerWidth;
  var height = window.innerHeight;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    DEBUG OR NOT                                        //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

config.debug = false; // Shorter stimulus sequence
config.do_instrwelcome = true; // Welcoming instructions
config.do_typingtest = true; // Shorter stimulus sequence
config.do_instrmaintask = true; // Shorter stimulus sequence


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    DESIGN                                              //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//


//---------------------------------------------------------------------- //
// Structure ----------------------------------------------------------- //

config.nb_blockspercond = 4;
if (config.debug == true){config.nb_blockspercond = 1;}


// Randomize the order of the blocks
var factors = {
   stimlist: [0,1,2,3]
   //    stimlist: ['config.list_word_shuf','config.list_chunk_shuf', 'config.list_nonchunk_shuf','config.list_number_shuf']
}

config.perm_blockorder = jsPsych.randomization.factorial(factors, 1);
var labels = ['words','chunks','nonchunks','numbers'];
var labels_ordered = [];
for (var thislabel = 0;thislabel<4;thislabel++){
  labels_ordered.push(labels[config.perm_blockorder[thislabel].stimlist])
}
config.perm_blockorderLABELS = labels_ordered;

console.log('config.perm_blockorder',config.perm_blockorder)
console.log('config.perm_blockorderLABELS',config.perm_blockorderLABELS)




  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
  //----------------------------------------------------------------------------------------//
  //                                    STAIRCASE                                           //
  //----------------------------------------------------------------------------------------//
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//


  //---------------------------------------------------------------------- //
  // Parameters that can be changed -------------------------------------- //

  thisstaircase.StepSize                  = 250;
  thisstaircase.SCvalstartppoint          = [1000,1500,2000,2800];
  //thisstaircase.SCval                     = 1000;//thisstaircase.SCvalstartppoint[thiscondition];
  thisstaircase.min_step_size             = 16;
  thisstaircase.numTrials                 = 150;// nb max
  thisstaircase.variableStepSize          = true; // true for variable stepSize, false for fixed stepsize
  thisstaircase.thresholdTrialN           = 40;
  thisstaircase.nRunHalve                 = 20; // after how many reversals should we reduce stepsize ?
  thisstaircase.minval                    = 200;
  thisstaircase.maxval                    = 20000;
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
config.len_TimePressureScreen  = 500;
//---------------------------------------------------------------------- //
// Block onset  ----------------------------------------------------------- //

var wordblock = {
    type: 'html-keyboard-response',
    prompt: "<p>Press the SPACE BAR to start.</p>",
    stimulus: '<p>This is a <b>word</b> block !</p>'+
    '<ul><li> Use your <b>left hand</b> for the letters [ <b>W</b> ] [ <b>E</b> ] [ <b>R</b> ] [ <b>T</b> ]</b>.</li>'+
    '<li> Use your <b>right hand</b> for the letter [ <b>U</b> ] [ <b>I</b> ] [ <b>O</b> ] [ <b>P</b> ].</li></ul>'+
    '<div><p>The block should last 2 minutes.</p></div>',
};

var chunkblock = {
    type: 'html-keyboard-response',
    prompt: "<p>Press the SPACE BAR to start.</p>",
    stimulus: '<p>This is a <b>random letter sequence</b> block !</p>'+
    '<ul><li> Use your <b>left hand</b> for the letters [ <b>W</b> ] [ <b>E</b> ] [ <b>R</b> ] [ <b>T</b> ]</b>.</li>'+
    '<li> Use your <b>right hand</b> for the letter [ <b>U</b> ] [ <b>I</b> ] [ <b>O</b> ] [ <b>P</b> ].</li></ul>'+
    '<div><p>The block should last 2 minutes.</p></div>',
};

var nonchunkblock = {
    type: 'html-keyboard-response',
    prompt: "<p>Press the SPACE BAR to start.</p>",
    stimulus: '<p>This is a <b>random letter sequence</b> block !</p>'+
              '<ul><li> Use your <b>left hand</b> for the letters [ <b>W</b> ] [ <b>E</b> ] [ <b>R</b> ] [ <b>T</b> ]</b>.</li>'+
              '<li> Use your <b>right hand</b> for the letter [ <b>U</b> ] [ <b>I</b> ] [ <b>O</b> ] [ <b>P</b> ].</li></ul>'+
              '<div><p>The block should last 2 minutes.</p></div>',
};

var numberblock = {
    type: 'html-keyboard-response',
    prompt: "<p>Press the SPACE BAR to start.</p>",
    stimulus: '<p>This is a <b>number sequence</b> block !</p>'+
              '<ul><li> Use your <b>left hand</b> for the digits <b>1 to 4</b>.</li>'+
              '<li> Use your <b>right hand</b> for the digits <b>6 to 9</b>.</li></ul>'+
              '<div><p>The block should last 2 minutes.</p></div>',
};
var instr_block = [];
instr_block.push(wordblock);
instr_block.push(chunkblock);//chunkblock,nonchunkblock,numberblock};
instr_block.push(nonchunkblock);
instr_block.push(numberblock);
config.instr_block = instr_block;

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
console.log('config.ntrialperblock',config.ntrialperblock)

// then select the number of corresponding stim in the chunk list
var chunk_lists = listchunks;
config.list_chunk_shuf = jsPsych.randomization.shuffle(chunk_lists);
config.list_chunk_shuf = config.list_chunk_shuf.slice(0, config.ntrialperblock);
//console.log('config.list_chunk_shuf',config.list_chunk_shuf)


var nonchunk_lists = listnonchunks;
config.list_nonchunk_shuf = jsPsych.randomization.shuffle(nonchunk_lists);
config.list_nonchunk_shuf = config.list_nonchunk_shuf.slice(0, config.ntrialperblock );
//console.log('config.list_nonchunk_shuf',config.list_nonchunk_shuf)


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
      thistring.push("6")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "i"){
      thistring.push("7")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "o"){
      thistring.push("8")}
    if (nonchunk_lists[thisstim].stimulus[thisletter] == "p"){
      thistring.push("9")}
    }
    var element = {}
    element.stimulus = thistring.join("");
    element.typestim = "numbers";
    number_list.push(element);
};
config.list_number_shuf = jsPsych.randomization.shuffle(number_list);




// The stim template
var trial_word = {
    type: 'html-audio-keyboard-multi-response',
    stimulus:jsPsych.timelineVariable('stimulus'),
    progressbar:true,
    promptincap: true,
    trial_duration: function(data){ // So that the duration depends on the staircase value on that trial
                    //console.log('thisstaircase.SCval',thisstaircase.SCval)
                    return thisstaircase.SCval},
    image: null,
    visual_feedback: 'aster',
    choices: rangei(48,90),
    data: {thiscondition: jsPsych.timelineVariable('typestim')},

    on_finish: function(data){

         // Let's display some info on the screen
         console.log('ACC', data.acc)
         console.log('Stairecase Val', thisstaircase.SCval)
         console.log('data.thiscondition',data.thiscondition)
         console.log("CURRENT thisstaircase.SCval", thisstaircase.SCval)

        // Update where we are in the staircase
         var right_answer = data.acc;
         data.CorrectPerceptual = data.acc;
         thisstaircase.nTrialSC += 1;
         thisstaircase.nTrials += 1;
         thisstaircase.responseMatrix = thisstaircase.responseMatrix.concat(right_answer);
         console.log("nTrialSC", thisstaircase.nTrialSC)

         // Save parameters of staircase in data structure // add back1/back2?
         data.SC_SCval                = thisstaircase.SCval;
         data.SC_dir                  = thisstaircase.dir;
         data.SC_responseMatrix       = thisstaircase.responseMatrix;
         data.SC_nTrialSC             = thisstaircase.nTrialSC;
         data.SC_nTrials              = thisstaircase.nTrials;
         //console.log("CURRENT data structure", data)

         // Now let's calculate the new staircase value based on the accuracy
         thisstaircase = expAK_staircase_function(thisstaircase);
         //data.dir_stair = thisstaircase.dir[1];

         // Let's check a few things about the response
         toofewletterstyped = false;
         if (data.toofewletterstyped > 0 ){
           toofewletterstyped = true;}
           toomanyletterstyped = false;
         if (data.toofewletterstyped < 0 ){
             toomanyletterstyped = true;}

        //console.log('data',data)
        //console.log('config',config)
        //console.log('okonycroit',config.perm_blockorder.length)

        // Let's check we're not at the end of a block and need to update the staircase starting point
        if (thisstaircase.nTrials == config.nb_blockspercond * config.ntrialperblock){
          thisstaircase.nTrials = 0;
          thisstaircase.nTrialSC = 0;
          var thatstheconditionwerein = config.perm_blockorderLABELS.indexOf(data.thiscondition);
          var nextcond = thatstheconditionwerein + 1;
          if (nextcond < config.perm_blockorder.length){
            console.log('thatstheconditionwerein',thatstheconditionwerein)
            console.log('nextcond',nextcond)
            console.log('config.perm_blockorder[nextcond].stimlist',config.perm_blockorder[nextcond].stimlist)
          thisstaircase.SCval =   thisstaircase.SCvalstartppoint[config.perm_blockorder[nextcond].stimlist];
          console.log('UPDATE END BLOCK next thisstaircase.SCval is ',thisstaircase.SCval)
        }
          //thisstaircase.SCval =
        }
        console.log("NEXT thisstaircase.SCval", thisstaircase.SCval)

        return [toofewletterstyped,toomanyletterstyped,thisstaircase]
        }
  }


config.stim_trial_word = trial_word;


var thisstimlist = [];
thisstimlist.push(config.list_word_shuf);
thisstimlist.push(config.list_chunk_shuf);
thisstimlist.push(config.list_nonchunk_shuf);
thisstimlist.push(config.list_number_shuf);

config.stimlist = thisstimlist;


//---------------------------------------------------------------------- //
// Confidence  ---------------------------------------------------------- //

config.Conf_labels             = ["<font size=6> Sure Error </font>",
                                 "<font size=6> Sure Correct</font>"]
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
config.Conf_speed              = 200; // how often the slider position is updated (in ms)
config.Conf_step               = 1;

// randomize Conf labels positions
//config.rand_order              = jsPsych.randomization.sampleWithReplacement([0, 1], 1)[0];
//if (config.rand_order == 1){
//    var temp = config.Conf_labels[0];
//    config.Conf_labels[0] = config.Conf_labels[1];
//    config.Conf_labels[1] = temp;
//}

// Conf slider template
var Conf_slider_template = {
    type: "html-slider-response",
    labels: config.Conf_labels,
    stimulus: config.Conf_stim,
    slider_width: config.Conf_size,
    prompt : function(){
        var txt = "<br></br>Use <b>[LEFT SHIFT]</b> and <b>[RIGHT SHIFT]</b> to move the slider."+
                  "<p>Press the <b>SPACE BAR</b> to continue.</p>";
        return txt
    },
    min: config.Conf_limits[0],
    max: config.Conf_limits[1],
    step: config.Conf_step,
    choices: config.Conf_choices,
    speed: config.Conf_speed,
    trial_duration: config.len_conf,
    data: {thiscondition: jsPsych.timelineVariable('typestim')},
//    on_finish: function(data){console.log('confidence data', data)}
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
    stimulus: 'You have not pressed enough keys. \n\n Respond faster !! ',
    choices:jsPsych.NO_KEYS,
    trial_duration: config.len_TimePressureScreen,
    data: {thiscondition: jsPsych.timelineVariable('typestim'),
  feedback: 'notenough'},

}

config.Feedback_TimePressure_screen = Feedback_TimePressure_screen;


var Feedback_TooManyLetters_screen = {
    type: 'html-keyboard-response',
    stimulus: 'You have pressed too many keys! ',
    choices:jsPsych.NO_KEYS,
    trial_duration: config.len_TimePressureScreen,
    data: {thiscondition: jsPsych.timelineVariable('typestim'),
  feedback: 'toomany'},

}
config.Feedback_TooManyLetters_screen = Feedback_TooManyLetters_screen;






//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    INSTRUCTIONS                                        //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//



// welcome !
instr_welcome = {};
instr_welcome.intro1 = {
    type:  "html-keyboard-response",
    prompt: "<p>Press the SPACE BAR to start.</p>",
    timing_post_trial: 1000,
    choices: [' '],
    stimulus: "<p> <b>Thanks for participating in this experiment ! </b></p>" +
    "<p>Do not close or reload the page after this point. </p></div>"
};

instr_welcome.intro2 = {
    type:  "html-keyboard-response",
    prompt: "<p>Press the SPACE BAR to continue.</p>",
    timing_post_trial: 1000,
    choices: [' '],
    stimulus: "<h2>Preparing for the experiment</h2>"+
        "<div align='left'> This experiment will last approximately <b>30 minutes</b>. </div>" +
        "<p align='left'>It will involve <b>typing words</b>. You will not be able to type the words accurately if you are in a noisy or distracting environment.</p>"+
        "<p align='left'>Please take a moment to do the following before you continue:</p>"+
        "<div align='left'><ul><li><b>Mute</b>, <b>turn off</b>, or move away from any sources of noise or distraction.</li>"+
        "<li>Make sure you are <b>sitting comfortably</b>, in a good typing position before you begin.</li> </div>"
}
config.instr_welcome = instr_welcome;



// Typing test
instr_typingtest = {};
instr_typingtest.typingparagraph = {
    type:  "html-keyboard-response",
    prompt: "<p>Press the SPACE BAR to start the typing test.</p>",
    timing_post_trial: 1000,
    choices: [' '],
    stimulus: "<h2>Typing test</h2>"+
        "<div align='left'><p>For this experiment, we are looking for participants with a certain <b>level of spelling and typing proficiency</b>. </p>" +
        "<p>You will need to meet certain criteria in the practice trials to be able to continue.</p>"+
        "<p>Your typing proficiency will be assessed in a <b>typing test</b>. " +
        "<p>You're going to have to <b>copy three texts</b>."
      }

instr_typingtest.typingwords = {
    type:  "html-keyboard-response",
    prompt: "<p>Press the SPACE BAR to continue.</p>",
    timing_post_trial: 1000,
    choices: [' '],
    stimulus: "<p> <b>Well done ! </b></p>" +
            "<p>Now, you will be asked to copy 15 words <strong>within a time limit </strong>. </p>"+
            "<p>You will need to finish typing before the bar at the top of the screen fills up.</p></div>"
}
config.instr_typingtest = instr_typingtest;

// Typing task
instr_typingtask= {};


instr_typingtask.typingtask = {
    type:  "html-keyboard-response",
    prompt: "<p>Press the SPACE BAR to continue.</p>",
    timing_post_trial: 1000,
    choices: [' '],
    stimulus: "<h2>Main experiment</h2>"+
        "<div align='left'><p>We are going to start the main experiment now.</p></div>" +
        "<div align='left'><p><br>As before, you will see sequences of four <b>letters</b> or <b>numbers</b> " +
        "and you will have to <b>type</b> them as quickly as you can.<br>" +
        "The sequence will be either a single <b>word</b>, <b>four random letters</b> or <b>four digits</b>." +
        "<p><br>As before, you will need to finish typing <b>before the bar fills up</b>. " +
        "Start typing as soon you see the word, as fast as you can. </p> </div>" +
        "<p><div align='left'><p><br>What you type will be <b>masked</b> as if you were typing a <b>password</b>." +
        "<p><br> It is a difficult task and <b>it is ok to make mistakes</b> ! Aim to type the sequence correctly around 70% of the times." +
        " Do not correct what you typed </b> by using the backspace. Always type a sequence of 4 keystrokes. </p></div>"
      }
//config.instr_typingtask = instr_typingtask.typingtask;


instr_typingtask.confidence = {
          type:  "html-keyboard-response",
          prompt: "<p>Press the SPACE BAR to continue.</p>",
          timing_post_trial: 1000,
          choices: [' '],
          stimulus: "<h2>Rate your typing accuracy</h2>"+
          "<div align='left'><p>After each typing sequence, you will have to <b>rate how confident you felt</b>" +
          " you have <b>typed the sequence correctly</b>.</p>" +
          "<p><br>After you finished typing, a scale will be presented on the screen.</p>" +
          "<ul><li>The <b>left end of the scale</b> corresponds to being <b>certain you made an error</b> when typing the sequence.</li>" +
          "<li>The <b>right end of the scale</b> corresponds to being <b>certain you typed the sequence correctly</b>.</li></div>" +
          "<div align='left'><p><br>Move the cursor along the scale to indicate how confident you feel about what you typed. " +
          "To move the cursor, you will have to use the <b>SHIFT keys</b>. " +
          "Locate them on your keyboard: they are underneath the ENTER key on the right, and underneath the CAP LOCK key on the left. " +
          "<ul><li>Press the <b>SHIFT key</b> on the <b>left</b> of your keyboard to <b>move the cursor to the left</b>.</li>" +
          "<li> Press the <b>SHIFT key</b> on the <b>rigth</b> of your keyboard to <b>move the cursor to the right</b>.</li></div>" +
          "<div align='left'>Press the space bar to register your confidence and start the next trial.</div>"
  }
//config.instr_confidence = instr_typingtask.confidence;

instr_typingtask.ready = {
          type:  "html-keyboard-response",
          prompt: "<p>Press the SPACE BAR to start the experiment.</p>",
          timing_post_trial: 1000,
          choices: [' '],
          stimulus: "<h2>Ready?</h2>"+
        "<div align='left'><p>Remember:</p>"+
        "<ul><li><b>Type the sequence</b> of four letters or numbers.</li>"+
        "<li>Finish typing <b>before the deadline</b>."+
        "<li><b>Don't correct yourself</b>, it's <b>ok to make mistakes</b>!</li>"+
        "<li>Rate <b>how confident</b> you feel you typed the sequence correctly.</li></ul>"+
        "<p>Let's start!</p>"
}
config.instr_typingtask = instr_typingtask;



//timeline_instruct = [instructions_block1, instructions_block2, instructions_block3, instructions_block4];
//config.instructions = timeline_instruct;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//----------------------------------------------------------------------------------------//
//                                    Typing Test                                        //
//----------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

// Typing paragraphs
var trial_typtest1 = {
    type: 'html-keyboard-multi-response',
    stimulus:jsPsych.timelineVariable('stimulus'),
//    trial_duration: thisstaircase.SCval,
    prompt: "<p><i>Copy the text and press ENTER when you have finished.</i></p>",
    visual_feedback: 'word',
    key_terminator: 13,
    data: {phase: 'copytext'},
  }


config.typtest_paragraph = trial_typtest1;



// Add debrief trial here as well to compute typing speed (at least) on texts
//config.typtest = timeline_typtest;

// Typing words
var trial_typtest2 = {
    type: 'html-keyboard-multi-response',
    stimulus:jsPsych.timelineVariable('stimulus'),
    trial_duration: 2500,
    timing_response: 2000,
    visual_feedback: 'word',
    post_trial_gap: 200,
    progressbar: true,
    data: {phase: 'typtest2'},
    on_finish: function(data) {
        data.correct = data.stimulus == data.final.toLowerCase();
        var dead = trial_typtest2.timing_response;
        console.log(dead)
        console.log(data.rtlast)
        if (data.rtlast <= dead) {
        data.over = false} else {data.over = true}},
//    key_terminator: 13,
  }


config.typtest_words = trial_typtest2;

// Debrief test
  var debrief_block2 = {
    type: "html-keyboard-response",
    stimulus: '', //eventually something transparent
    choices: jsPsych.NO_KEYS,
    trial_duration: 100,
    data: {phase: 'typtest2_res'},
    on_finish: function(data) {

      var trials_train2 = jsPsych.data.get().filter({phase: 'typtest2'});
      var correct_train2 = trials_train2.filter({correct: true});
      var accuracy = Math.round(correct_train2.count() / trials_train2.count() * 100);
      var under_train2 = trials_train2.filter({over: false});
      var under = Math.round(under_train2.count() / trials_train2.count() * 100);
      data.accuracy = accuracy;
      data.under = under;
      console.log(accuracy);
    },
  };

config.typtest_debrief_block2 = debrief_block2;


  // a trial that will eventually be very short and transparent to get out of the experiment if need be
  var debrief_block3 = {
    type: "html-keyboard-response",
    stimulus: '', //eventually something transparent
    trial_duration: 100,
    on_finish: function() {
      var train2_res = jsPsych.data.get().filter({phase: 'typtest2_res'});
      var train2_acc = train2_res.values()[0];
      if(train2_acc.accuracy >= 50 && train2_acc.under >= 80){
  	     console.log('show must go on!'); // go on
        } else {
      	console.log('you would be out if this was the real experiment')
//          endExperimentEarly(); //  something to get participants out
      }},};

config.typtest_debrief_block3 = debrief_block3;
//  config.typtest = [timeline_typtest2, debrief_block2, debrief_block3];


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

  return [config,thisstaircase]
}
