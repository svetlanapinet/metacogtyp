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
    stimulus:'<div style="width: 600px; height: 20px; background-color: #ccc;">' +
    '<div style="width: 0%; height: 20px; background-color: #333; animation-name: progress-bar; animation-duration: 3s;animation-timing-function: linear;">' +
    '</div>' +
    '<style> @keyframes progress-bar { 0% { width:0%;} 100% { width:100%} } </style>',
    prompt: jsPsych.timelineVariable('stimulus'),
    trial_duration: 3000,
    image: null,
    visual_feedback: 'aster',
};

var trial_word2 = {
    type: 'html-keyboard-multi-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    trial_duration: 3000,
    progress_bar: true,
    image: null,
    visual_feedback: 'aster',
};

var pause = {
    type: 'html-keyboard-response',
    stimulus: '+',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
};

var mappingreminder = {
    type: 'image-keyboard-response',
    stimulus_height: 500,
    stimulus: 'keyboardimg.jpg',
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
    timeline: [mappingreminder,trial_word,pause],
    timeline_variables:list_word_shuf
  }

var mytimeline3 = {
    timeline: [mappingreminder,trial_word,pause],
    timeline_variables:list_chunk_shuf
  }

var mytimeline4 = {
    timeline: [mappingreminder,trial_word,pause,],
    timeline_variables:list_nonchunk_shuf
  }


mytimeline.push(block, mytimeline2, block, mytimeline3, block, mytimeline4);

jsPsych.init({
	timeline: mytimeline,
  on_finish: function() {
    jsPsych.data.displayData('json');}
});
