export interface ISpeechRecognition {

    // recognition parameters
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI: string;

    // event methods
    onaudiostart: GlobalEventHandlers | any;
    onsoundstart: GlobalEventHandlers | any;
    onspeechstart: GlobalEventHandlers | any;
    onspeechend: GlobalEventHandlers | any;
    onsoundend: GlobalEventHandlers | any;
    onaudioend: GlobalEventHandlers | any;
    onresult: GlobalEventHandlers | any;
    onnomatch: GlobalEventHandlers | any;
    onerror: GlobalEventHandlers | any;
    onstart: GlobalEventHandlers | any;
    onend: GlobalEventHandlers | any;

    // methods to drive the speech interaction
    start(): void;
    stop(): void;
    abort(): void;
}

interface SpeechRecognitionError {
    ErrorCode: {
        'no-speech',
        'aborted',
        'audio-capture',
        'network',
        'not-allowed',
        'service-not-allowed',
        'bad-grammar',
        'language-not-supported'
    };

    readonly error: {
        'no-speech',
        'aborted',
        'audio-capture',
        'network',
        'not-allowed',
        'service-not-allowed',
        'bad-grammar',
        'language-not-supported'
    };

    readonly message: string;
}

// Item in N-best list
interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

// A complete one-shot simple response
interface SpeechRecognitionResult {
    readonly length: number;
    readonly final: boolean;
    item(index: number): SpeechRecognitionAlternative;
}

// A collection of responses (used in continuous mode)
interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
}

// A full response, which could be interim or final, part of a continuous response or not
interface SpeechRecognitionEvent {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
    readonly interpretation;
    readonly emma: Document;
}

//  CONSTRUCTOR
interface SpeechGrammar {
    src: string;
    weight: number;
}

// CONSTRUCTOR
interface SpeechGrammarList {
    readonly length: number;
    item(index: number): SpeechGrammar;
    addFromURI(src: string, weight?: number): void;
    ddFromString(string: string, weight?: number): void;
}
