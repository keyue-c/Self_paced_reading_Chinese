// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/
// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", "instruc", randomize("experiment") , SendResults() , "bye" )


// What is in Header happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // Delay of 250ms before every trial
    newTimer(250)
        .start()
        .wait()
)
.log( "Name" , getVar("ParticipantName") )
// This log command adds a column reporting the participant's name to every line saved to the results


newTrial( "intro" ,
    newText("<p>欢迎您参加实验！</p><p>请出入您的姓名并按下回车键：</p>")
        .css("font-size", "1.5em")
        .print()
    ,
    newTextInput()
        .css("font-size", "1.5em")
        .print()
        .wait()                 // The next command won't be executed until Enter is pressed
        .setVar( "ParticipantName" )
        // This setVar command stores the value from the TextInput element into the Var element
)

newTrial( "instruc" ,
    newText("指导语")
        .center()
        .css("font-size", "2em")
        .print()
    ,
    newText("instruction", "<p>在本次阅读测试中，你会看到一系列的下划线代表每句话中的字，空格代表字之间的间隙。</p><p>在读每个句子时，每次按下<b><font color=\"red\">空格键</font></b>都会显示下一个字，并且同时隐藏上一个字。也就是说，一次只能显示一个字。</p><p>在每句话之后，你必须回答一个关于这句话的<b><font color=\"blue\">问题</font></b>，根据这句话的意思，你可以选择“是”或“否”，按<b>“F”表示“是”，按“J”表示“否”</b>。</p><p>你的任务是尽可能快地阅读这个句子，并且正确回答问题。电脑会记录你按下空格键所花的时间，以及你对问题的回答。</p>")
        .center()
        .print()
    ,
    newButton("开始实验")
        .center()
        .css("font-size", "1.5em")
        .print()
        .wait()
)

// This Template command generates as many trials as there are rows in stimuli.csv
Template( "stimuli.csv" ,
    // Row will iteratively point to every row in stimuli.csv
    row => newTrial("experiment",
    newController("DashedSentence",{s:row.Sentence})
        .css("font-size", "1.5em")
        .print("center at 50%", "middle at 40%")
        .log()
        .wait()
        .remove()
    ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("question", row.Question)
        .css("font-size", "1.5em")
        .print("center at 50%", "middle at 40%")
    ,
    newText("choices", "F. 是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;J. 否")
        .css("font-size", "1.5em")
        .print("center at 50%", "middle at 50%")
    ,
    newKey("FJ")
        .log()
        .wait()
    )
)

newTrial( "bye" ,
    newText("感谢您参加实验!")
        .css("font-size", "1.5em")
        .print()
    ,
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial
