// LULU


//function getnames(list) {
//    names = [];
//    for (var i = 0; i < list.length; i++) {
//    names.push(list[i]['stimulus']);
//    }
//    return names
//}

//var word_lists = list1;
//var list_word_shuf = jsPsych.randomization.shuffle(word_lists);

var word_lists = listwords;
var list_word_shuf = jsPsych.randomization.shuffle(word_lists);

var chunk_lists = listchunks;
var list_chunk_shuf = jsPsych.randomization.shuffle(chunk_lists);

var nonchunk_lists = listnonchunks;
var list_nonchunk_shuf = jsPsych.randomization.shuffle(nonchunk_lists);



var trial_word = {
    type: 'html-keyboard-multi-response',
    stimulus:jsPsych.timelineVariable('stimulus'),
    trial_duration: 2000,
    visual_feedback: 'word',
};

var pause = {
    type: 'html-keyboard-response',
    stimulus: '+',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

var mappingreminder = {
    type: 'html-keyboard-multi-response',
    image: 'keyboardimg.jpg',
    choices: jsPsych.NO_KEYS,
    trial_duration: 2000,
};

var block = {
    type: 'html-keyboard-response',
    stimulus: '<p>Begin a new block</p>'+
	'<p>Press any key</p>',
};

 //
var mytimeline = []
var mytimeline2 = {
    timeline: [trial_word,pause,mappingreminder],
    timeline_variables:list_word_shuf
  }

var mytimeline3 = {
    timeline: [trial_word,pause,mappingreminder],
    timeline_variables:list_chunk_shuf
  }

var mytimeline4 = {
    timeline: [trial_word,pause,mappingreminder],
    timeline_variables:list_nonchunk_shuf
  }


mytimeline.push(block, mytimeline2, block, mytimeline3, block, mytimeline4);

jsPsych.init({
	timeline: mytimeline,
  on_finish: function() {
    jsPsych.data.displayData('json');}
});
