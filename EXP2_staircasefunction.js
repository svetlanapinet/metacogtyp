function expAK_staircase_function(thisstaircase){

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Declare variables

      var jsPsych = window['jsPsych'];

      var SCval = thisstaircase.SCval;
      var lastTrialsCorrect = thisstaircase.responseMatrix;
      var dir = thisstaircase.dir;

      var back1 = lastTrialsCorrect[lastTrialsCorrect.length-1]; // Last trial
      var back2 = lastTrialsCorrect[lastTrialsCorrect.length-2]; // Two trials ago
      var reverse = false; // Initialize reversal to false

      //console.log('back1',back1)
      //console.log('back2',back2)

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Update SCvalerence or not and check if there was a reversal

      if(back1 == 1) // If the last trial was correct
      {
            if(back2 == 1) // AND two trials ago were correct
            {
                  SCval -= thisstaircase.StepSize
                  lastTrialsCorrect[lastTrialsCorrect.length-1] = false; // s'il repond correctement à la prochaine ça fera 3 bonne réponses de suite mais il ne faudra pas baisser la SCvalérence ...
                  dir[0] = dir[1]; // Set the direction two trials ago to the direction one trial ago
                  dir[1] = "down"; // Set the direction one trial ago to up
                  reverse = check_reversal(dir); // Check if there was a reversal in direction as a result of the step down
                  //console.log('How did we get here ?')
            }
            // If the last trial was correct and two trials ago were wrong, do nothing.
      }
      else if (back1 == 0) // If the last trial was wrong
      {

            SCval += thisstaircase.StepSize
            dir[0] = dir[1];
            dir[1] = "up";
            reverse = check_reversal(dir); // Check if there was a reversal in direction as a result of the step up
      }
      


      // Set limits on SCval
      if (SCval <= thisstaircase.minval){
            SCval = thisstaircase.minval
      };
      if (SCval >= thisstaircase.maxval){
            SCval = thisstaircase.maxval1
      };


      // If reversal save SCvalerence and trial nb
      if (reverse && (thisstaircase.nTrialSC > 1) ){ // (thisstaircase.nTrialSC > 1) because we don't want to count the first "down" as a reversal
            //console.log("reverse!")
            //console.log('rev', thisstaircase.SCvalRev)
            //console.log('last', thisstaircase.last_SCvalerences)
            thisstaircase.SCvalRev.push(thisstaircase.SCval); // IMPORTANT: we save the SCvalerence value before modification (SCval as been changed but not thisstaircase.SCval yet)
            thisstaircase.nTrialRev.push(thisstaircase.nTrialSC);
            thisstaircase.last_SCval.push(thisstaircase.SCval); // compute a mean when change step size
            thisstaircase.r += 1;
      }




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Stepsize adaptation

      // If min stepsize is not reached, reduce stepsize
      if (thisstaircase.variableStepSize){
            if (thisstaircase.StepSize > thisstaircase.min_step_size){
                  //console.log("comp", thisstaircase.r, thisstaircase.nRunHalve)
                  if (thisstaircase.r == thisstaircase.nRunHalve){
                        thisstaircase.StepSize  = thisstaircase.StepSize/2;
                        thisstaircase.nRunHalve = thisstaircase.nRunHalve*2;
                        thisstaircase.SCval = arrayAverage(thisstaircase.last_SCval);
                        thisstaircase.last_SCval = []; // reset the array that stores SCvalerences values since the last stepsize change
                  }

            }
      }
      //console.log("stepsize", thisstaircase.StepSize)



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//
//-------------------------------------------------------------------------------------------------//
// Updated the real values

      thisstaircase.SCval = SCval;
      thisstaircase.dir = dir;
      thisstaircase.responseMatrix = lastTrialsCorrect;

      return thisstaircase;


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
