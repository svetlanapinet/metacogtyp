// TIMELINE OF THE EXPERIMENT


config = EXP0_CONFIG();


var Conf_slider = Object.assign({}, config.Conf_slider_template);
var too_slow_response = {
  timeline: [config.too_slow_screen],
  conditional_function: function(){
    return display_too_slow;
  }
}

// ----------------------------------------------------------------------------
// CREATE BASIC TIMELINE ------------------------------------------------------

var mytimeline = []
for (var thiscond = 0;thiscond < config.perm_blockorder.length; thiscond++){ // Loop across conditions (Word,  chunks, non-chunk, numbers)

    // Reinitialize the STAIRCASE
    config = EXP0_CONFIG();

    var Conf = {
        timeline: [Conf_slider],
        conditional_function: function(){
          return (!toofewletterstyped); // uniquement s'il a fait un choix à temps
          }
        }

    var feedbackTimePressure = {
            timeline: [config.Feedback_TimePressure_screen],
            conditional_function: function(){
              return (toofewletterstyped); // uniquement s'il a fait un choix à temps
              }
            }


    // Create time line for a trial with stim + confidence + little break
    var timelineTrials = {
      timeline: [config.stim_trial_word,feedbackTimePressure,Conf,config.stim_pause], //Conf_slider,
      timeline_variables: eval(config.perm_blockorder[thiscond].stimlist)
    }



        //timeline.push(after_choice);


    // Replicate according to the number of block you want for each condition
    for (var thisblockrepet = 0; thisblockrepet < config.nb_blockspercond; thisblockrepet++){
          mytimeline.push(config.stim_block, timelineTrials);
      }
  }
//console.log("mytimeline",mytimeline)



// *****************************************************************************
// -----------------------------------------------------------------------------
// EXECUTE TIMELINE ------------------------------------------------------------
jsPsych.init({
	timeline: mytimeline,
  on_finish:
//  jspsychr.save_locally,
  function() {
    jsPsych.data.displayData('json');}
});
