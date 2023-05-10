
$(".stopwatch-btn").click(function(){
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show stopwatch wrapper
    $(".stopwatch").slideDown();
    //update type text
    $(".type").html("stopwatch");
})


$(".back-btn").click(function(){
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show clock wrapper
    $(".clock").slideDown();
    //update type text
    $(".type").html("stopwatch");
})


$(".timer-btn").click(function(){
    //hide all other wrapper
    $(".outer-wrapper > div").slideUp();
    //show timer wrapper
    $(".timer").slideDown();
    //update type text
    $(".type").html("stopwatch");
})



const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";


    //convert 24 hours to 12
    hours = hours % 12 || 12;

    //add trailing zero if less then 10
    hours = addTrailingZero(hours);
    minute = addTrailingZero(minute);
    second = addTrailingZero(second);

    $("#hours").html(hours);
    $("#min").html(minute);
    $("#sec").html(second);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};

//call the function on page load

updateTime();

//call function after every second
setInterval(updateTime, 1000);

let stopwatchHours = 0,
    stopwatchMinute = 0,
    stopwatchSecond = 0,
    stopwatchMilisecond = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

const stopwatch = () => {
    //inceasemilisecond by 1
    stopwatchMilisecond++;
    if (stopwatchMilisecond === 100) {
        //if stopwatch milisecond is hundred then increase second by 1 ans ms =1
        stopwatchSecond++;
        stopwatchMilisecond = 0;
    }

    if (stopwatchSecond === 60) {
        //same with minute
        stopwatchMinute++;
        stopwatchSecond = 0;
    }

    if (stopwatchMinute === 60) {
        //same with minute
        stopwatchHours++;
        stopwatchMinute = 0;
    }

    //show value on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinute));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSecond));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMilisecond));

}


const startstopWatch = () => {
    if (!stopwatchRunning) {
        //if(stopwatch not already running)
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
}

//function to stop stopwatch

const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

//reset stopWatch function
const resetStopwatch = () => {
    //clear intervals and set all values to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinute = 0;
    stopwatchSecond = 0;
    stopwatchMilisecond = 0;
    stopwatchRunning = false;
    laps = 0;

    //update value on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
};


//start stopwatch on start button
$(".start-stopwatch").click(function () {
    startstopWatch();
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
})

$(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
})

$(".lap-stopwatch").click(function () {
    //on lap button
    laps++;
    //remove active class
    $(".lap").removeClass("active");
    $(".laps").prepend(`
    <div class="lap active">
        <p>lap ${laps}</p>
        <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinute)}:
        ${addTrailingZero(stopwatchSecond)} : ${addTrailingZero(stopwatchMilisecond)}:
        </p>
    </div>`
    );
})

//Timer

let time =0,
 timerHour=0,
 timerMinute = 0,
 timerSecond =0 ,
 timerMiilisecond = 0,
 timerInterval;

 const getTime =()=>{
    time=prompt("enter time in minutes");
    //convert time to second
    time= time * 60;
    //update timer default
    setTime();
 }

 const setTime =()=>{
    timerHour = Math.floor(time/3600);
    timerMinute = Math.floor((time % 3600)/60);
    timerSecond = Math.floor(time%60);

    //show user entered time on document
    $("#timer-hour").html(addTrailingZero(timerHour));
    $("#timer-min").html(addTrailingZero(timerMinute));
    $("#timer-sec").html(addTrailingZero(timerSecond));
    $("#timer-ms").html(addTrailingZero(timerMiilisecond));

 }

 const timer =()=>{
    timerMiilisecond--;
    if(timerMiilisecond === -1){
        timerMiilisecond = 59;
        timerSecond--;
    }
    if(timerSecond === -1){
        timerSecond = 59;
        timerMinute--;
    }
    if(timerMinute === -1){
        timerMinute = 59;
        timerHour--;
    }
    //update time
    $("#timer-hour").html(addTrailingZero(timerHour));
    $("#timer-min").html(addTrailingZero(timerMinute));
    $("#timer-sec").html(addTrailingZero(timerSecond));
    $("#timer-ms").html(addTrailingZero(timerMiilisecond));

    //check time up on every interval
    timeUp();
};

const startTimer=()=>{
    //before starting check if valid time enterd
    if(timerHour===0 && timerMinute === 0 && timerSecond === 0 && timerMiilisecond ===0){
        // if(alll value given are zero)
        getTime();
      }else{
        //starttimer
        timerInterval = setInterval(timer , 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
      }
}

const stopTimer=()=>{
    clearInterval(timerInterval);
    $("start-timer").show();
    $(".stop-timer").hide();
};

const resetTimer =()=> {
    stopTimer();
    time =0;
    setTime();    
};

//check if time remianig 0

const timeUp =()=>{
    if(timerHour===0 && timerMinute === 0 && timerSecond === 0 && timerMiilisecond ===0){
        resetTimer();
        alert("Time's Up");
    }
}

 $(".start-timer").click(function(){
    startTimer();
 })

$(".stop-timer").click(function(){
    stopTimer();
})

$(".reset-timer").click(function (){
    resetTimer();
})

