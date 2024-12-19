/*https://github.com/ianmcloughlin/2425_emerging_technologies/blob/main/03_eliza.ipynb
  All of the following code has been adapted from the above repoistory and is my implementation
  of the elizachat bot based on https://dl.acm.org/doi/10.1145/365153.365168 this paper.


/* The follow



/* Declare 'patterns' as constant
   Define 'patterns' as an object that contains regex patterns and responses.
   The use of 'const' + 'Object.freeze' ensures patterns wont be reassigned and the object itself cannot be modified. 
   */

const patterns = Object.freeze({
    
    /* Regular expression to detect if user entered "hello, hi, hey"
       Responses if match is detected */
    [/(hello|hi|hey)/i]: [
        "Hello! How are you feeling today?",
        "Hi there! What’s on your mind?",
        "Hey! How can I help you?"
    ],

    /* Regular expression to detect if user entered "you remind of"
       Responses if match is detected */
    [/(you remind me of)(.*)/i]: [
        "Why do you think I remind you of {0}?",
        "What makes you think of {0} when talking to me?",
        "Is it a good feeling to be reminded of {0}?"
    ],

    /* Regular expression to detect if user entered "mother, father, family, parent"
       Responses if match is detected */
    [/(.*)(mother|father|family|parent)(.*)/i]: [
        "Tell me more about your family.",
        "How does that make you feel about your family?",
        "What role does your family play in your thoughts?"
    ],

    /* Regular expression to detect if user entered "I need x"
       Responses parsing x if match is detected. */
    [/(.*) I need (.*)/i]: [
        "Why do you need {1}?",
        "Would getting {1} really help you?",
        "What if you didn’t need {1}?"
    ],

    /* Regular expression to detect if user entered "I am x"
       Responses parsing x if match is detected. */
    [/(.*) I am (.*)/i]: [
        "Why do you think you are {1}?",
        "How long have you felt that way?",
        "What made you feel like {1}?"
    ],

    /* Regular expression to detect if user entered "I feel x"
       Responses parsing x if match is detected. */
    [/(.*) I feel (.*)/i]: [
        "Why do you feel {1}?",
        "Does feeling {1} happen often?",
        "How does that feeling affect you?"
    ],

    /* Regular expression to detect if user entered "sorry/apologize"
       Responses if match is detected. */
    [/(.*) (sorry|apologize) (.*)/i]: [
        "No need to apologize.",
        "Apologies aren't necessary. Why do you feel that way?",
        "It’s okay to feel that way."
    ],

    /* Regular expression to detect if user entered "bye, goodbye, exit"
       Responses if match is detected. */
    [/(.*) (bye|goodbye|exit) (.*)/i]: [
        "Goodbye! Take care.",
        "Thank you for sharing. Goodbye!",
        "Bye! I’m here if you need to talk again."
    ],

    /* Regular expression catch all if user enters invalid prompt"
       Responses if match is detected. */
    [/(.*)/i]:[
        "Can you tell me more?",
        "Why do you say that?",
        "How does that make you feel?",
        "What do you mean by that?",
        "Interesting... go on."
    ]

});

// reflections object to mirror user input.
const reflections = Object.freeze({
    "I": "you",
    "me": "you",
    "my": "your",
    "am": "are",
    "you": "I",
    "your": "my",
    "yours": "mine",
    "are": "am",
})

// Function to reflect responses.
function reflect(text){

    
    return text
    .toLowerCase()
    .split(' ')
    .map(word => reflections[word] || word)
    .join(' ');
}

// Function to select a suitable response based on the user's input.
function respond(user_input){
    
    // Loop through the patterns object and store the regular expression in the pattern and the responses in the responses list.
    for (const [pattern, responsesList] of Object.entries(patterns)){
        
        // regex object to store a case insensitive version of the current regular expression.
        const regex = new RegExp(pattern,'i')
        
        // run the regular expression on the user's input.
        const match = regex.exec(user_input)

        // if a match is found select the appropriate response.
        if(match){

            // https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
            // select a pseudo-random response from responses list.
            const response = responsesList[Math.floor(Math.random() * responsesList.length)]

            // https://www.decodingweb.dev/javascript-list-comprehension
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
            // Get the pars of the user input that matches the regular expression and apply the reflect function.
            const reflected_groups = match.slice(1).map(group => reflect(group))

            // if the reflected groups contains any strings inset them into response.
            if(reflected_groups.length > 0){
                
                // Replace the index in the response with the reflected group.
                return reflected_groups.reduce((response, group, index) =>
                    response.replace(`{${index}}`, group), response)
            
            // If there are no reflected groups return the response as is.
            } else {
                return response
            }
        } // EO if statement

    } // EO for loop.

    // If no suitable response was found, return a default response.
    return 'Im not sure I understand. Can you elaborate'

} // EO response function.

function sendMessage(){
    const USER_INPUT = document.getElementById("user-input").value.trim()
    
    if(!USER_INPUT) return

    const INPUT_FIELD = document.getElementById("user-input")
    INPUT_FIELD.value = ''

    const CHATBOX = document.getElementById("chat-box")
    CHATBOX.innerHTML += `
                            <div class="message user-message">
                                <div class="message-content">${USER_INPUT}</div></div>
                                `

    const RESPONSE = respond(USER_INPUT)
    CHATBOX.innerHTML += `
                            <div class="message bot-message">
                                <div class="message-content">${RESPONSE}</div>
                            </div>`

    CHATBOX.scrollTop = CHATBOX.scrollHeight
}

// tests
 test = "I am yours"
console.log(reflect(test))

test = "I am feeling funny."
console.log(respond(test))

test = " I need to talk."
console.log(respond(test))

console.log("hello")