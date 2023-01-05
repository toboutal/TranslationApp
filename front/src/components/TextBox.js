import SelectDropDown from "./SelectDropDown";

const TextBox = ({
                     style,
                     selectedLanguage,
                     setShowModal,
                     setTextToTranslate,
                     textToTranslate,
                     translatedText,
                     setTranslatedText
                 }) => {

    const handleClick = () => {
        setTextToTranslate('');
        setTranslatedText('');
    }

    return (
        <div>
            <SelectDropDown
                style={style}
                setShowModal={setShowModal}
                selectedLanguage={selectedLanguage}
            />
            <textarea
                className={style}
                placeholder={style === 'input' ? 'Enter Text' : 'Translation'}
                disabled={style === 'output'}
                onChange={(e) => setTextToTranslate(e.target.value)}
                value={style === 'input' ? textToTranslate : translatedText}
            />
            {style === 'input' && (
                <div className="delete" onClick={handleClick}>x</div>
            )}
        </div>
    )
}

export default TextBox