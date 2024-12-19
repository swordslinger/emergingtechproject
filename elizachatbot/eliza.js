/*https://github.com/ianmcloughlin/2425_emerging_technologies/blob/main/03_eliza.ipynb
  All of the following code has been adapted from the above repoistory and is my implementation
  of the elizachat bot based on https://dl.acm.org/doi/10.1145/365153.365168 this paper.


/* The follow



/* Declare 'patterns' as constant
   Define 'patterns' as an object that contains regex patterns and responses.
   The use of 'const' + 'Object.freeze' ensures patterns wont be reassigned and the object itself cannot be modified. 
   */

const patterns = {
    greetingPatterns:[
        {   
            // Regular expression to detect if user entered "hello, hi, hey" 
            regex:/\b(hello|hi|hey)(\s+.+)?/i,

            // Responses if match is detected
            responses: [
                        "Hello! How are you feeling today?",
                        "Hi there! What’s on your mind?",
                        "Hey! How can I help you?"
                        ],
        }
    ],
    reminderPatterns:[
        {
            // Regular expression to detect if user entered "you remind of"
            regex: /you\s*remind\s*me\s*of\s*(.+)/i,

            // Responses if match is detected */
            responses: [
                        "Why do you think I remind you of {0}?",
                        " What makes you think of {0} when talking to me?",
                        "Is it a good feeling to be reminded of {0}?"

                       ]
        }
    ],
    familyPatterns:[
        {
            // Regular expression to detect if user entered "mother, father, family, parent"
            regex: /you\s*remind\s*me\s*of\s*(.+)/i,

            // Responses if match is detected.
            responses:[
                "Tell me more about your family.",
                "How does that make you feel about your family?",
                "What role does your family play in your thoughts?"
            ]
        }
    ],

    needPatterns:[
        {
            // Regular expression to detect if user entered "I need x"
            regex:/i\s*need\s+to\s+(.+)/i,
            
            // Responses parsing x if match is detected.
            responses:[
                "Why do you need {1}?",
                "Would getting {1} really help you?",
                "What if you didn’t need {1}?"
            ]
        }
    ],

    feelingPatterns: [
        {
            // Regular expression to detect if user entered "I am x".
            regex: /i\s*am\s+(feeling\s+)?(.+)/i,

            //Responses parsing x if match is detected.
            responses:[
                "Why do you think you are {1}?",
                "How long have you felt that way?",
                "What made you feel like {1}?"
            ],
        },

        {
            // Regular expression to detect if user entered "I feel x"
            regex: /i\s*feel\s+(.+)/i,

            // Responses parsing x if match is detected. */
            responses: [
                "Why do you feel {1}?",
                "Does feeling {1} happen often?",
                "How does that feeling affect you?"
            ],
        }
    ],

    sorryPatterns: [
        {
             // Regular expression to detect if user entered "sorry/apologize" 
            regex: /\b(sorry|apologize)\b/i,

            // Responses if match is detected.
            responses: [
                "No need to apologize.",
                "Apologies aren't necessary. Why do you feel that way?",
                "It’s okay to feel that way."
            ]
        }
    ],

    goodbyePatterns: [
        {
            // Regular expression to detect if user entered "bye, goodbye, exit"
            regex: /\b(sorry|apologize)\b/i,

            //  Responses if match is detected. 
            responses: [
                "Goodbye! Take care.",
                "Thank you for sharing. Goodbye!",
                "Bye! I’m here if you need to talk again "
            ]
        }
    ],

    generalPatterns: [
        {
            // Regular expression catch all if user enters invalid prompt.
            regex: /.+/i,

            // Responses if match is detected.
            responses: [
                "Can you tell me more?",
                "Why do you say that?",
                "How does that make you feel?",
                "What do you mean by that?",
                "Interesting... go on."
            ]
        }
    ]

}

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
    for(const [pattern, responses] of Object.entries(patterns)){
        
        // regex object to store a case insensitive version of the current regular expression.
        const regex = new RegExp(pattern[0], "i")
        
        // run the regular expression on the user's input.
        const match = regex.exec(user_input)

        // if a match is found select the appropriate response.
        if(match){

            // https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
            // select a pseudo-random response from responses list.
            
            const response = responses[Math.floor(Math.random() * responses.length)]

            // https://www.decodingweb.dev/javascript-list-comprehension
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
            // Get the pars of the user input that matches the regular expression and apply the reflect function.
            const reflected_groups = match.slice(1).map(group => reflect(group))

            // if the reflected groups contains any strings inset them into response.
            if(reflected_groups.length > 0){
                // Replace the index in the response with the reflected group.
                return reflected_groups.reduce((response, group, index) => {
                        return response.replace(`{${index + 1}}`, group)
                }, response)
            } else {
                return response
            }
            
            // If there are no reflected groups return the response as is.
             // EO if statement
        }

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