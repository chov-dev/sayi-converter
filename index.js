let normalTextarea = document.querySelector(".normal-textarea")
let sayiTextarea = document.querySelector(".sayi-textarea")
let normalTextareaChangerEventHandler = undefined;
let sayiTextareaChangerEventHandler = undefined;

try{const {ipcRenderer} = require("electron")}
catch{}

const utf8ToBinary = (utf8) =>{
    let arr = [];
    for (let i = 0; i < utf8.length; i++) {
        arr.push(utf8.charCodeAt(i).toString(2));
    }
    return arr
}

const binaryToUtf8 = (binary) =>{
    let arr = [];
    let binaryArr = binary.split(" ")
    let isContainOther = false
    let nowIndex = 0
    while(!isContainOther && nowIndex < binary.length){
        if(binary[nowIndex] === "0"){nowIndex++}
        else if(binary[nowIndex] === "1"){nowIndex++}
        else if(binary[nowIndex] === " "){nowIndex++}
        else if(binary[nowIndex] === `
`){nowIndex++}
        else isContainOther = true
    }
    if(!isContainOther){
        for (let i = 0; i < binaryArr.length; i++) {
            arr.push(String.fromCharCode(parseInt(`${binaryArr[i]}`, 2)));
        }
    }
    else{
        arr = ["ㅅ,ㅇ 외에 다른 문자가 포함되어있습니다"]
    }
    return arr
}

normalTextarea.addEventListener("focus", (event)=>{
    if(normalTextareaChangerEventHandler === undefined){
        if(sayiTextareaChangerEventHandler !== undefined){
            sayiTextarea.removeEventListener("input", sayiTextareaChangerEventHandler)
            normalTextareaChangerEventHandler = event.target.addEventListener("input", ()=>{
                sayiTextarea.value = utf8ToBinary(normalTextarea.value).join(" ").replaceAll("0", "ㅇ").replaceAll("1", "ㅅ")
            })
        }
        else{
            normalTextareaChangerEventHandler = event.target.addEventListener("input", ()=>{
                sayiTextarea.value = utf8ToBinary(normalTextarea.value).join(" ").replaceAll("0", "ㅇ").replaceAll("1", "ㅅ")
            })
        }
    }
})
sayiTextarea.addEventListener("focus", (event)=>{
    normalTextareaChangerEventHandler === undefined
    if(sayiTextareaChangerEventHandler === undefined){
        if(normalTextareaChangerEventHandler !== undefined){
            normalTextarea.removeEventListener("input", normalTextareaChangerEventHandler)
            sayiTextareaEventHandler = event.target.addEventListener("input", ()=>{
                normalTextarea.value = binaryToUtf8(sayiTextarea.value.replaceAll("ㅇ", "0").replaceAll("ㅅ", "1")).join("")
            })
        }
        else{
            sayiTextareaEventHandler = event.target.addEventListener("input", ()=>{
                normalTextarea.value = binaryToUtf8(sayiTextarea.value.replaceAll("ㅇ", "0").replaceAll("ㅅ", "1")).join("")
            })
        }
    }
})



document.querySelector(".quit-button").addEventListener("click", ()=>{
    try{ipcRenderer.send('close-me')}
    catch{window.close()}
})