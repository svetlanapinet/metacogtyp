function expAK_staircase_function(config){

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Declare variables

      var jsPsych = window['jsPsych'];

      var coh = config.stair.Coh;
      var lastTrialsCorrect = config.stair.responseMatrix;
      var dir = config.stair.dir;

      var back1 = lastTrialsCorrect[lastTrialsCorrect.length-1]; // Last trial
      var back2 = lastTrialsCorrect[lastTrialsCorrect.length-2]; // Two trials ago
      var reverse = false; // Initialize reversal to false



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Update coherence or not and check if there was a reversal

      if(back1) // If the last trial was correct
      {
            if(back2) // AND two trials ago were correct
            {
                  coh -= config.stair.StepSize
                  lastTrialsCorrect[lastTrialsCorrect.length-1] = false; // s'il repond correctement à la prochaine ça fera 3 bonne réponses de suite mais il ne faudra pas baisser la cohérence ...
                  dir[0] = dir[1]; // Set the direction two trials ago to the direction one trial ago
                  dir[1] = "down"; // Set the direction one trial ago to up
                  reverse = check_reversal(dir); // Check if there was a reversal in direction as a result of the step down
            }
            // If the last trial was correct and two trials ago were wrong, do nothing.
      }
      else // If the last trial was wrong
      {

            coh += config.stair.StepSize
            dir[0] = dir[1];
            dir[1] = "up";
            reverse = check_reversal(dir); // Check if there was a reversal in direction as a result of the step up
      }


      // Set limits on coh
      if (coh <= 0){
            coh = 0
      };
      if (coh >= 1){
            coh = 1
      };


      // If reversal save coherence and trial nb
      if (reverse && (config.stair.nTrialSC > 1) ){ // (config.stair.nTrialSC > 1) because we don't want to count the first "down" as a reversal
            //console.log("reverse!")
            //console.log('rev', config.stair.cohRev)
            //console.log('last', config.stair.last_coherences)
            config.stair.cohRev.push(config.stair.Coh); // IMPORTANT: we save the coherence value before modification (coh as been changed but not config.stair.Coh yet)
            config.stair.nTrialRev.push(config.stair.nTrialSC);
            config.stair.last_coherences.push(config.stair.Coh); // compute a mean when change step size
            config.stair.r += 1;
      }




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Stepsize adaptation

      // If min stepsize is not reached, reduce stepsize
      if (config.stair.variableStepSize){
            if (config.stair.StepSize > config.stair.min_step_size){
                  console.log("comp", config.stair.r, config.stair.nRunHalve)
                  if (config.stair.r == config.stair.nRunHalve){
                        config.stair.StepSize  = config.stair.StepSize/2;
                        config.stair.nRunHalve = config.stair.nRunHalve*2;
                        config.stair.Coh = arrayAverage(config.stair.last_coherences);
                        config.stair.last_coherences = []; // reset the array that stores coherences values since the last stepsize change
                  }

            }
      }
      console.log("stepsize", config.stair.StepSize)



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Updated the real values

      config.stair.Coh = coh;
      config.stair.dir = dir;
      config.stair.responseMatrix = lastTrialsCorrect;

      return config;


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Useful functions                                                                          //
//-------------------------------------------------------------------------------------------------//
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//

      // Note that we only call check_reversal when there was a step up or step down
      function check_reversal(dir)
      {
            if(dir[0] !== dir[1]) // If the direction two trials ago is NOT the same direction as the last trial, then there was a reversal
            return true;
            else // If the direction two trials ago and the last trial are the same direction, no reversal
            return false;

      }

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

}
