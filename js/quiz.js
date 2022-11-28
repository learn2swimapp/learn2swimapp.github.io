const path = window.location.search.replace("?", "");
//Play Audio Function
function playAudio(audioPath) {
  temp = new Audio(audioPath);
  temp.play();
}
//Stopwatch
let seconds = 0;
let minutes = 0;
setInterval(() => {
  if (seconds === 59) {
    seconds = 0;
    minutes++;
  } else {
    seconds++;
  }
  let time;
  if (minutes < 10) {
    time = "0" + minutes + ":";
  } else {
    time = minutes + ":";
  }
  if (seconds < 10) {
    time += "0" + seconds;
  } else {
    time += seconds;
  }
  $(".time").text(time);
}, 1000);
//Load Audios
const correctAudio = new Audio("/assets/audios/other/correct.mp3");
const incorrectAudio = new Audio("/assets/audios/other/incorrect.mp3");
//Set All Variables
let length;
let num;
let word;
let answer;
let questionAudio;
let correct = 0;
let incorrect = 0;
let streak = 0;
//Make the GET request to the JSON file
$.getJSON(path, (data) => {
  const loadedData = data;
  length = Object.keys(loadedData.words).length;
  num = Math.floor(Math.random() * length);
  word = Object.values(loadedData.words)[num];
  answer = Object.keys(loadedData.words)[num];
  questionAudio = new Audio(
    `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
  );
  //Edit page data
  $(".flag").attr("src", loadedData.flagPath);
  $(".tt").attr("title", answer);
  new bootstrap.Tooltip($(".tt"));
  $(".title").text(loadedData.title);
  $(".tabTitle").text(loadedData.title);
  $(".title").append(
    ` <img src="${loadedData.titleIcon}" width="40px;" style="margin-top:-7px;">`
  );
  $(".question").append(loadedData.languageName);
  $(".flagEmoji").text(loadedData.flagEmoji);
  $("html").css("--formMainColor", loadedData.formMainColor);
  $("html").css("--formSecondaryColor", loadedData.formSecondaryColor);

  $(".word").html(`${word}`);

  $(".form__field").keypress((e) => {
    const key = e.which;
    if (key == 13) {
      if ($(".form__field").val() === answer) {
        streak++;
        correct++;
        $(".streak").text(streak);
        $(".correct").text(correct);
        swal("You answered correctly!", "Hit continue to keep going or press Enter/Escape", "success", {
          closeOnEsc: true,
          closeOnClickOutside: true,
          className: "correct-modal",
          buttons: {
            confirm: "Continue"
          }
        })
        $(".correct-modal button").on('mouseenter', function() {$(this).css('background', '#2E8B57')})
        $(".correct-modal button").on('mouseleave', function() {$(this).css('background', '#50C878')})
        $(".swal-button-container").click(() => {
          regenerate()
        })
        length = Object.keys(loadedData.words).length;
        num = Math.floor(Math.random() * length);
        word = Object.values(loadedData.words)[num];
        answer = Object.keys(loadedData.words)[num];
        questionAudio = new Audio(
          `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
        );
        $(".tt").attr("title", answer);
        new bootstrap.Tooltip($(".tt"));
        correctAudio.play();
      } else {
        streak = 0;
        incorrect++;
        $(".streak").text(streak);
        $(".incorrect").text(incorrect);
        $(".incorrect-text").html(
          `You answered incorrectly. The correct answer was <span style="text-decoration:underline;">${answer}</span>`
        );
        swal("You answered incorrectly", `The correct answer was ${answer}, hit continue to keep going or press Enter/Escape`, "error", {
          closeOnEsc: true,
          closeOnClickOutside: true,
          className: "incorrect-modal",
          buttons: {
            confirm: "Continue"
          }
        })
        $(".incorrect-modal button").on('mouseenter', function() {$(this).css('background', '#8D021F')})
        $(".incorrect-modal button").on('mouseleave', function() {$(this).css('background', '#BF0A30')})
        $(".swal-button-container").click(() => {
          regenerate()
        })
        length = Object.keys(loadedData.words).length;
        num = Math.floor(Math.random() * length);
        word = Object.values(loadedData.words)[num];
        answer = Object.keys(loadedData.words)[num];
        questionAudio = new Audio(
          `/assets/audios/${loadedData.audioRoot}/${answer}.mp3`
        );
        $(".tt").attr("title", answer);
        new bootstrap.Tooltip($(".tt"));
        //$("#incorrect").modal("show");
        incorrectAudio.play();
      }
    }
  });
  function loadPartOfSpeechEmoji(partOfSpeech) {
    switch (partOfSpeech) {
      case "noun":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-red-circle_1f534.png";
        break;
      case "adjective":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-orange-circle_1f7e0.png";
        break;
      case "verb":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-yellow-circle_1f7e1.png";
        break;
      case "adverb":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-green-circle_1f7e2.png";
        break;
      case "pronoun":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-blue-circle_1f535.png";
        break;
      case "number":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-purple-circle_1f7e3.png";
        break;
      case "article":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/large-brown-circle_1f7e4.png";
        break;
      case "preposition":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/black-circle_26ab.png";
        break;
      case "conjunction":
        return "https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/white-circle_26aa.png";
        break;
    }
  }
  //Generate flashcards
  $(document).ready(() => {
    Object.entries(loadedData.words).forEach((pair) => {
      $("#hidden").append(
        `<div class="card"><div class="card-header"><b>${pair[0]}</b> (<i>${
          loadedData.partsOfSpeech[pair[0]][1]
        }</i>) <img src="${loadPartOfSpeechEmoji(
          loadedData.partsOfSpeech[pair[0]][0]
        )}" width="24px" style="margin-top:-4px"></div><div class="card-body">${
          pair[1]
        } <img src="https://emojipedia-us.s3.amazonaws.com/source/microsoft-teams/337/speaker-high-volume_1f50a.png" width="24px" onclick="playAudio('/assets/audios/${
          loadedData.audioRoot
        }/${pair[0]}.mp3')"></div></div>`
      );
    });
    $(".divider").append("test");
    twemoji.parse(document.body, { folder: "svg", ext: ".svg" });
  });

  //Regenerate question

  //More set information tab
});
function regenerate() {
  questionAudio.play();
  $(".word").text(word);
  $(".form__field").val("");
  $(".form__field").focus();
}