// TIMELINE OF THE EXPERIMENT


config = EXP0_CONFIG();


var Conf_slider = Object.assign({}, config.Conf_slider_template);
var too_slow_response = {
  timeline: [config.too_slow_screen],
  conditional_function: function(){
    return display_too_slow;
  }
}

instr_template = config.instr_template;
thisinstr = instr_template;

// ----------------------------------------------------------------------------
// CREATE BASIC TIMELINE ------------------------------------------------------

var mytimeline = []


// ******* Wecome instructions *************************************************
mytimeline = mytimeline.concat(config.instr_welcome.intro1);
mytimeline = mytimeline.concat(config.instr_welcome.intro2);


// ************** Typing test *************************************************
if (config.do_typingtest){
//1/ TYPE A PARAGRAPH
mytimeline = mytimeline.concat(config.instr_typingtest.typingparagraph);
var timeline_typtest = {
  timeline: [config.typtest_paragraph],
  timeline_variables: copytexts,
}
mytimeline = mytimeline.concat(timeline_typtest);

//2/ TYPE Words
mytimeline = mytimeline.concat(config.instr_typingtest.typingwords);
var timeline_typtest2 = {
  timeline: [config.typtest_words],
  timeline_variables: wordstest2,
}
mytimeline = mytimeline.concat(timeline_typtest2);
mytimeline = mytimeline.concat(config.typtest_debrief_block2)
mytimeline = mytimeline.concat(config.typtest_debrief_block3)
}

// ************** Main task *************************************************

if (config.do_instrmaintask)
mytimeline = mytimeline.concat(config.instr_typingtask.typingtask);
mytimeline = mytimeline.concat(config.instr_typingtask.confidence);
mytimeline = mytimeline.concat(config.instr_typingtask.ready);

for (var thiscond = 0;thiscond < config.perm_blockorder.length; thiscond++){ // Loop across conditions (Word,  chunks, non-chunk, numbers)



    // Get the condition number from the randomization
    thiscondition = config.perm_blockorder[thiscond].stimlist;
    console.log('config.stair.SCvalstartppoint[thiscondition]',config.stair.SCvalstartppoint[thiscondition])

    // Reinitialize the STAIRCASE
    config = EXP0_CONFIG(thiscondition);
    //thisstaircase.SCval = config.stair.SCvalstartppoint[thiscondition]
    //console.log('

    var Conf = {
        timeline: [Conf_slider],
        conditional_function: function(){
          return (!toofewletterstyped&&!toomanyletterstyped); // uniquement s'il a fait un choix à temps
          }
        }

    var feedbackTimePressure = {
            timeline: [config.Feedback_TimePressure_screen],
            conditional_function: function(){
              return (toofewletterstyped); // uniquement s'il n'a pas tapé assez de lettres
              }
            }
   var feedbackToomanyletters = {
            timeline: [config.Feedback_TooManyLetters_screen],
            conditional_function: function(){
              return (toomanyletterstyped); // uniquement s'il n'a pas tapé assez de lettres
              }
            }

    // Create time line for a trial with stim + confidence + little break
    var timelineTrials = {
      timeline: [config.stim_trial_word,feedbackTimePressure,feedbackToomanyletters,Conf,config.stim_pause], //Conf_slider,
      //timeline_variables: eval(config.perm_blockorder[thiscond].stimlist)
      timeline_variables: config.stimlist[thiscondition]
    }



        //timeline.push(after_choice);

    // Replicate according to the number of block you want for each condition
    for (var thisblockrepet = 0; thisblockrepet < config.nb_blockspercond; thisblockrepet++){
          mytimeline.push(config.instr_block[thiscondition], timelineTrials);
      }
  }
//console.log("mytimeline",mytimeline)


// short version for debugging purposes
if (config.debug == true){
  var shorttimeline = {
    timeline: [config.stim_trial_word, config.stim_pause],
    timeline_variables: config.list_word_shuf
  }
  var mytimeline = [];
  //mytimeline = mytimeline.concat(config.instructions);
  mytimeline = mytimeline.concat(config.typtest);
  mytimeline.push(shorttimeline);
  console.log(mytimeline);
}

//console.log("mytimeline",mytimeline)
//console.log(config.list_word_shuf)

// *****************************************************************************
// -----------------------------------------------------------------------------
// EXECUTE TIMELINE ------------------------------------------------------------
jsPsych.init({
	timeline: mytimeline,
  on_finish:
  function() {
    jsPsych.data.displayData('json');
  //var all_data = jsPsych.data.get().csv();
    var all_data = jsPsych.data.get().json();
    var outputname = "data" + config.randomIntFromInterval(1,999);
    config.saveData(all_data, outputname);
  },
});
