// LULU


//function getnames(list) {
//    names = [];
//    for (var i = 0; i < list.length; i++) {
//    names.push(list[i]['stimulus']);
//    }
//    return names
//}

var word_lists = list1;
var list_word_shuf = jsPsych.randomization.shuffle(word_lists);




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

 //
var mytimeline = []
var mytimeline2 = {
    timeline: [trial_word,pause],
    timeline_variables:list_word_shuf
  }

mytimeline.push(mytimeline2);

jsPsych.init({
	timeline: mytimeline,
  on_finish: function() {
    jsPsych.data.displayData('json');}
});
