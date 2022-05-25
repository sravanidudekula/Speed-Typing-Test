let spinner = document.getElementById('spinner');
let timer = document.getElementById('timer');
let quoteDisplay = document.getElementById('quoteDisplay');
let result = document.getElementById('result');
let quoteInput = document.getElementById('quoteInput');
let counter = 0;
let uniqueId = '';
let submit = document.getElementById('submitBtn'); // done
let reset = document.getElementById('resetBtn'); // done
let speedTypingTest = document.getElementById('speedTypingTest');

function verify(uniqueId, counter) {
    if (quoteDisplay.textContent === quoteInput.value) {
        quoteInput.value = '';
        clearInterval(uniqueId);
        result.textContent = 'You typed in ' + counter + ' seconds';
        counter = 0;
    } else {
        result.textContent = 'You typed incorrect sentence';
    }
}

function start(value) {
    spinner.classList.add('d-none');
    result.textContent = '';
    uniqueId = setInterval(function() {
        quoteDisplay.textContent = value;
        counter += 1;
        timer.textContent = counter;

        resetBtn.onclick = function() {
            quoteInput.value = '';
            clearInterval(uniqueId);
            result.textContent = '';
            counter = 0;
            request();


        }
    }, 1000)
}
submitBtn.onclick = function() {
    verify(uniqueId, counter);
}

function request() {
    let option = {
        method: 'GET'
    }
    spinner.classList.remove('d-none');
    fetch('https://apis.ccbp.in/random-quote', option)
        .then(function(response) {
            console.log(response.status);
            return response.json();
        })
        .then(function(data) {
            console.log(data.content);
            start(data.content);
        })
}


reset.onclick = function() {
    quoteInput.value = '';
    clearInterval(uniqueId);
    result.textContent = '';
    counter = 0;
    request();
}

request();