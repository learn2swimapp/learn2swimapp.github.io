const puppeteer = require("puppeteer");
const fs = require('fs');

const data = {
    set: {
        "one": "een",
        "two": "twee",
        "three": "drie",
        "four": "vier",
        "five": "vyf",
        "six": "ses",
        "seven": "sewe",
        "eight": "agt",
        "nine": "nege",
        "ten": "tien"
      },
      languageCode: "af",
      filename: "af-ZA-WillemNeural.mp3"
}

const ttsLinks = {
    "af": "https://micmonster.com/text-to-speech/afrikaans-south-africa/"
}

let reversedData = {}

function swap(json){
    for(var key in json){
      reversedData[json[key]] = key;
    }
  }
  swap(data["set"])

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function main() {
    const languageCode = data.languageCode
    for (let word of Object.values(data.set)) {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(ttsLinks[languageCode])
        await page.type("#app > div:nth-child(1) > section > div:nth-child(2) > textarea", word)
        await delay(1000)
        await page.click("#app > div:nth-child(1) > section > div:nth-child(2) > div.row-center-between.mt-2 > button")
        await delay(17000)
        await page.click("#app > div:nth-child(1) > section > div.container.upgrade-section > div.card.text-center.mx-auto.p-5.border-0 > button")
        await delay(1500)
        fs.renameSync(`C:/Users/User/Downloads/${data.filename}`, `C:/Users/User/Downloads/${reversedData[word]}.mp3`)
        await delay(1500)
        await browser.close()
    }
}
main()