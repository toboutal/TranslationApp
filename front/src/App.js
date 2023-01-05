import {useEffect, useState} from "react";
import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Modal from "./components/Modal";
import axios from "axios";
import Button from "./components/Button";
import SpeechButton from "./components/SpeechButton";
import DetectButton from "./components/DetectButton";

const App = () => {
    const [showModal, setShowModal] = useState(null);
    const [inputLanguage, setInputLanguage] = useState('');
    const [outputLanguage, setOutputLanguage] = useState('Français');
    const [languages, setLanguages] = useState(null);
    const [languagesCodes, setLanguagesCodes ] = useState(null);
    const [textToTranslate, setTextToTranslate] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleClick = () => {
        setInputLanguage(outputLanguage);
        setOutputLanguage(inputLanguage);

    }

    const getLanguages = () => {
        const options = {
            method: 'GET',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
            params: {target: 'fr'},
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': 'f7c431b1dcmshecbb19d67aed064p11e427jsn9ad14d9e7e7d',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            const arrayOfLanguages = response.data.data.languages.map(language => language.name);
            const arrayOfLanguagesCodes = response.data.data.languages;
            setLanguages(arrayOfLanguages);
            setLanguagesCodes(arrayOfLanguagesCodes);
        }).catch(function (error) {
            console.error(error);
        });
    }



    const translate = async () => {
        const outputLanguageCode = getCodeFromLanguage(outputLanguage);
        const inputLanguageCode = getCodeFromLanguage(inputLanguage);
        const data = {
            textToTranslate: textToTranslate,
            outputLanguage: outputLanguageCode,
            inputLanguage: inputLanguageCode,
        }
        const response = await axios.get('http://localhost:8000/translate', {
            params : data
        })
        let translatedText = JSON.parse(response.data).data.translations[0].translatedText;
        setTranslatedText(translatedText)
    }

    const speech = async () => {
        const outputLanguageCode = getCodeFromLanguage(outputLanguage);
        const data = {
            textToSpeech: translatedText,
            language: outputLanguageCode,
        }
        const response = await axios.get('http://localhost:8001/speech', {
            params : data
        })
        let linkToSpeech = JSON.parse(response.data).speech;
        var audio = new Audio(linkToSpeech);
        audio.play();
    }

    const detect = async () => {
        const data = {
            text: textToTranslate,
        }
        const response = await axios.get('http://localhost:8002/detect', {
            params : data
        })
        let result = JSON.parse(response.data).data.detections[0][0].language;
        setInputLanguage(getLanguageFromCode(result));
    }

    const getCodeFromLanguage = (language) => {
        return languagesCodes.find(element => element.name === language).language
    }

    const getLanguageFromCode = (code) => {
        return languagesCodes.find(element => element.language === code).name
    }

    useEffect(()=> {
        getLanguages()
    }, [])

    return (
        <div className="app">
            {!showModal && <>
                {textToTranslate &&
                <div className="button-container" onClick={detect}>
                    <DetectButton/>
                </div>
                }
                <TextBox
                    selectedLanguage={inputLanguage}
                    // eslint-disable-next-line
                    style='input'
                    setShowModal={setShowModal}
                    textToTranslate={textToTranslate}
                    setTextToTranslate={setTextToTranslate}
                    setTranslatedText={setTranslatedText}
                />
                <div className="arrow-container" onClick={handleClick}>
                    <Arrows/>
                </div>

                <TextBox
                    selectedLanguage={outputLanguage}
                    // eslint-disable-next-line
                    style='output'
                    setShowModal={setShowModal}
                    translatedText={translatedText}
                />
                <div className="button-container" onClick={speech}>
                    <SpeechButton/>
                </div>
                <div className="button-container" onClick={translate}>
                    <Button/>
                </div>
            </>}

            {showModal &&
                <Modal
                    setShowModal={setShowModal}
                    languages={languages}
                    chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
                    setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
                />}
        </div>
    );
}

export default App;
