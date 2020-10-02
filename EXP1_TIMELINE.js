// TIMELINE OF THE EXPERIMENT


config = EXP0_CONFIG();


// -----------------------------------------------------------------------------------------------//
// Conf Slider ---------------------------------------------------------------
var Conf_slider = Object.assign({}, config.Conf_slider_template);
Conf_slider.start = function() {
    return Math.floor(Math.random() * config.Conf_limits[1])
};
//Conf_slider.data = function(){
//                    var d = common_data;
//                    d.screen = "Conf_slider";
//                    return d
//                  }
//Conf_slider.on_finish = function(data){
//                          if (data.start == data.response){
//                            config.too_late = true;
//                          }
//                        }


// ----------------------------------------------------------------------------
// TRIALS WORD ---------------------------------------------------------------
var timelinewords = {
    timeline: [config.stim_trial_word,Conf_slider,config.stim_pause], //Conf_slider,
    timeline_variables:config.list_word_shuf
  }

// ----------------------------------------------------------------------------
// TRIALS CHUNKS -------------------------------------------------------------
var timelinechunks = {
    timeline: [config.stim_trial_word,Conf_slider,config.stim_pause],
    timeline_variables:config.list_chunk_shuf
  }

// ----------------------------------------------------------------------------
// TRIALS NON-CHUNKS ---------------------------------------------------------
var timelinenonchunks = {
    timeline: [config.stim_trial_word,Conf_slider,config.stim_pause],
    timeline_variables:config.list_nonchunk_shuf
  }

  // ----------------------------------------------------------------------------
  // TRIALS NUMBERS  ---------------------------------------------------------
  var timelinenonchunks = {
      timeline: [config.stim_trial_word,config.Conf_slider_template,config.stim_pause,],
      timeline_variables:config.list_nonchunk_shuf
    }


  // ---------------------------------------------------------------------------
  // BLOCKS --------------------------------------------------------------------
var mytimeline = []
mytimeline.push(config.stim_block, timelinewords, config.stim_block, timelinechunks, config.stim_block, timelinenonchunks);

if (config.test == true) {var mytimeline = []
mytimeline.push(config.stim_block, timelinewords);
}

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
