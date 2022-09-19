const translate = require('@vitalets/google-translate');

let tempObj = {}

const fruits = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "gray", "black", "white"]

const codes = ["sq"]

    fruits.forEach(fruit => {
        translate(fruit, { from: "en", to: "sq" }).then(res => {
            console.log(res.text)
        })
    })