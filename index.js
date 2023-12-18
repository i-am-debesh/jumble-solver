const inputElement = document.querySelector('.input-field');
const findBtnElement = document.querySelector('.find-btn');
const ansElement = document.querySelector('.ans-field');

const filePath = 'words.txt'; 

let isFound = false;
let wordList = [];
function isPossible(word1, word2) {
    let v1= [];
    let v2 = [];
    for(let i=0; i<word1.length; i++) {
        v1.push(word1[i]);
    }
    for(let i=0; i<word2.length; i++) {
        v2.push(word2[i]);
    }
    v1.sort();
    v2.sort();

    if(v1.toString() === v2.toString()) {
        return true;
    }return false;
    
}

///////////////////////////
fetch(filePath)
.then(response => {
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
})
.then(content => {
    const words = content.split('\n').map(word => word.trim());

    wordList.push(...words);
    findBtnElement.addEventListener('click', ()=>{
        ansElement.innerHTML = '';
        rearrange();
        if(ansElement.innerHTML === '') {
            ansElement.innerHTML = "Not Found";
        }

    });
    
})
.catch(error => console.error('Error reading the file:', error));
////////////////////////////

function rearrange() {
    
    for(let i=0; i<wordList.length; i++) {

        if(isPossible(wordList[i],(inputElement.value.toLowerCase()))) {
            //ansElement.innerHTML = `${wordList[i]}`;
            ansElement.innerHTML += `<p>${wordList[i]}</p>`;
            isFound = true;
            
        }
    }
    
    
    return isFound;
}

