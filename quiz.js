const path = window.location.search.replace("?", "")
/*
let length = Object.keys(loadedData.words).length;
      let num = Math.floor(Math.random() * length);
      let word = Object.values(loadedData.words)[num];
      let answer = Object.keys(loadedData.words)[num];
      let questionAudio = new Audio(
        `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
      );
      */
//Stopwatch
let seconds = 0;
let minutes = 0;
setInterval(() => {
  if (seconds === 60) {
    seconds = 0
    minutes++
  } else {
    seconds++
  }
  time = (minutes < 10) ? "0" + minutes + ":" + seconds : minutes + ":" + seconds
  $(".time").text(time)
}, 1000)
const correctAudio = new Audio('/assets/audios/other/correct.mp3')
const incorrectAudio = new Audio('/assets/audios/other/incorrect.mp3')
let length;
let num;
let word;
let answer;
let questionAudio;
let correct = 0;
let incorrect = 0;
let streak = 0;
    $.getJSON(path, (data) => {
      const loadedData = data;
      length = Object.keys(loadedData.words).length;
      num = Math.floor(Math.random() * length);
      word = Object.values(loadedData.words)[num];
      answer = Object.keys(loadedData.words)[num];
      questionAudio = new Audio(
        `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
      );
      //edit page
      $('.flag').attr("src", loadedData.flagPath)
      $('.tt').attr("title", answer)
    new bootstrap.Tooltip($(".tt"))
      $(".title").text(loadedData.title);
      $(".tabTitle").text(loadedData.title);
      $(".title").append(`<img src="${loadedData.titleIcon}" width="40px;" style="margin-top:-7px;">`)
      $(".question").append(loadedData.languageName)
      $(".flagEmoji").text(loadedData.flagEmoji)
      $("html").css("--formMainColor", loadedData.formMainColor)
      $("html").css("--formSecondaryColor", loadedData.formSecondaryColor)

      //Initial audio playing
/*
        questionAudio.addEventListener("canplaythrough", () => {
          questionAudio.play().catch((e) => {
            window.addEventListener("click", () => {
              questionAudio.play();
            });
          });
        });
        */
        questionAudio.addEventListener("canplaythrough", () => {
          questionAudio.play().catch(e => {
             window.addEventListener('click', () => {
                questionAudio.play()
             }, { once: true })
          })
       });

        //const correct = new Audio("/assets/audios/other/correct.wav");

        $("#hidden").click();

        $(".word").html(
          `${word}`
        );

        $(".form__field").keypress((e) => {
          const key = e.which;
          if (key == 13) {
            console.log("recieved")
              console.log($(".form__field").val())
              console.error(answer)
            if ($(".form__field").val() === answer) {
              streak++
              correct++
              $(".streak").text(streak)
              $(".correct").text(correct)
              console.log("correct");
              length = Object.keys(loadedData.words).length;
      num = Math.floor(Math.random() * length);
      word = Object.values(loadedData.words)[num];
      answer = Object.keys(loadedData.words)[num];
      questionAudio = new Audio(
        `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
      );
      $('.tt').attr("title", answer)
    new bootstrap.Tooltip($(".tt"))
      $('#correct').modal("show")
      correctAudio.play()
              //$(".form__field").val("")
            } else {
              streak = 0
              incorrect++
              $(".streak").text(streak)
              $(".incorrect").text(incorrect)
              $(".incorrect-text").html(
                `You answered incorrectly. The correct answer was <span style="text-decoration:underline;">${answer}</span>`
              );
              console.log("incorrect");
              //$("#incorrect").modal("show");
              length = Object.keys(loadedData.words).length;
      num = Math.floor(Math.random() * length);
      word = Object.values(loadedData.words)[num];
      answer = Object.keys(loadedData.words)[num];
      questionAudio = new Audio(
        `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
      );
      $('.tt').attr("title", answer)
    new bootstrap.Tooltip($(".tt"))
      $('#incorrect').modal("show")
      incorrectAudio.play()
              //$(".form__field").val("");
            }
          }
        });

      //Generate flashcards
      $(document).ready(() => {
        Object.entries(loadedData.words).forEach((pair) => {
          $("#hidden").append(
            `<div class="card"><div class="card-header"><b>${pair[0]}</b> (<i>${loadedData.partsOfSpeech[pair[0]][1]}</i>)</div><div class="card-body">${pair[1]}</div></div>`
          );
        });
        $(".divider").append("test");
        twemoji.parse(document.body, {folder: "svg", ext: ".svg"})
      });

      //Regenerate question

      //More set information tab
    });
    function regenerate() {
        questionAudio.play()
        $(".word").text(word);
        $(".form__field").val("")
        $(".form__field").focus()
    }