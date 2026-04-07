import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface BrowserSpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onstart: (() => void) | null;
    onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
    onerror: ((event: BrowserSpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
}

interface BrowserSpeechRecognitionEvent {
    resultIndex: number;
    results: {
        [index: number]: {
            [index: number]: {
                transcript: string;
            };
        };
    };
}

interface BrowserSpeechRecognitionErrorEvent {
    error: string;
}

interface SpeechRecognitionWindow extends Window {
    webkitSpeechRecognition?: {
        new (): BrowserSpeechRecognition;
    };
    SpeechRecognition?: {
        new (): BrowserSpeechRecognition;
    };
}

export const useVoiceInput = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

    const Recognition = useMemo(() => {
        if (typeof window === 'undefined') return null;
        const speechWindow = window as SpeechRecognitionWindow;
        return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition || null;
    }, []);

    useEffect(() => {
        if (!Recognition) return;

        const recognition = new Recognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const text = event.results[current][0].transcript;
            setTranscript(text);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            setError(`Error: ${event.error}`);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
            recognitionRef.current = null;
        };
    }, [Recognition]);

    const startListening = useCallback(() => {
        if (!Recognition) {
            setError("Your browser doesn't support speech recognition.");
            return;
        }

        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (eventError) {
                console.error(eventError);
            }
        }
    }, [Recognition]);

    const stopListening = useCallback(() => {
        recognitionRef.current?.stop();
    }, []);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        resetTranscript
    };
};
