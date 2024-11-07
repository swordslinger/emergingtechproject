// Declare 'patterns' as constant
// Define 'patterns' as an object that cointains regex patterns and responses.
// The use of 'const' + 'Object.freeze' ensures patterns wont be reassigned and the object itself cannot be modified

const patterns = Object.freeze({
    
    // Regular expression to detect if user entered "hello, hi, hey"
    // Responses if match is detected
    [/(hello|hi|hey)/i]: [
        "Hello! How are you feeling today?",
        "Hi there! What’s on your mind?",
        "Hey! How can I help you?"
    ],

    // Regular expression to detect if user entered "you remind of"
    // Responses if match is detected
    [/(you remind me of)(.*)/i]: [
        "Why do you think I remind you of {0}?",
        "What makes you think of {0} when talking to me?",
        "Is it a good feeling to be reminded of {0}?"
    ],

    // Regular expression to detect if user entered "mother, father, family, parent"
    // Responses if match is detected
    [/(.*)(mother|father|family|parent)(.*)/i]: [
        "Tell me more about your family.",
        "How does that make you feel about your family?",
        "What role does your family play in your thoughts?"
    ],

    // Regular expression to detect if user entered "I need x"
    // Responses parsing x if match is detected,
    [/(.*) I need (.*)/i]: [
        "Why do you need {1}?",
        "Would getting {1} really help you?",
        "What if you didn’t need {1}?"
    ],

    // Regular expression to detect if user entered "I am x"
    // Responses parsing x if match is detected
    [/(.*) I am (.*)/i]: [
        "Why do you think you are {1}?",
        "How long have you felt that way?",
        "What made you feel like {1}?"
    ],

    // Regular expression to detect if user entered "I feel x"
    // Responses parsing x if match is detected
    [/(.*) I feel (.*)/i]: [
        "Why do you feel {1}?",
        "Does feeling {1} happen often?",
        "How does that feeling affect you?"
    ],

    // Regular expression to detect if user entered "sorry/apologize"
    // Responses if match is detected
    [/(.*) (sorry|apologize) (.*)/i]: [
        "No need to apologize.",
        "Apologies aren't necessary. Why do you feel that way?",
        "It’s okay to feel that way."
    ],

    // Regular expression to detect if user entered "bye, goodbye, exit"
    // Responses if match is detected
    [/(.*) (bye|goodbye|exit) (.*)/i]: [
        "Goodbye! Take care.",
        "Thank you for sharing. Goodbye!",
        "Bye! I’m here if you need to talk again."
    ],

    // Regular expression catch all if user enters invalid prompt"
    // Responses if match is detected
    [/(.*)/i]:[
        "Can you tell me more?",
        "Why do you say that?",
        "How does that make you feel?",
        "What do you mean by that?",
        "Interesting... go on."
    ]

});