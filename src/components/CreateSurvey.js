import { useState } from "react";
import Options from "./Options";
import Question from "./Question";
import TypeSelector from "./TypeSelector";
import { useHistory } from "react-router";

const CreateSurvey = ({ squestions, setSquestions }) => {

    const history = useHistory();
    const getRandom = () => { Math.floor((Math.random() * 1000) + 1);}
    const defaultOptionsState = [{uid: getRandom(), value:''}, {uid: getRandom(), value:''}]
    const [qText, setQtext] = useState('');
    const [qType, setQtype] = useState(0);
    const [options, setOptions] = useState([{uid: getRandom(), value: ''}, {uid: getRandom(), value: ''}]);

    const addOptions = () => {
        let newOptions = {
            uid: getRandom(),
            value: ''
        }
        let updatedOptions = [...options];
        updatedOptions.push(newOptions);
        setOptions(updatedOptions);
    }

    const deleteOptions = () => {
        if(options.length === 2){
            alert("Error: A select type question must have two options");
        }
        else{
            let updatedOptions = [...options];
            updatedOptions.pop();
            setOptions(updatedOptions);
        } 
        
    }

    const updatedOptionsText = (id, text) => {
        let updatedOptions = [...options];
        let changeIndex = updatedOptions.findIndex(x => x.uid === id);
        updatedOptions[changeIndex].value = text;
        setOptions(updatedOptions);
    }

    const updateSurveyQuestion = () => {
        let newSurveyQuestion = [...squestions];
        let newQ = {
            qtext : qText,
            qType : qType,
            options : options
        }
        newSurveyQuestion.push(newQ);
        setSquestions(newSurveyQuestion);
        setQtype(0);
        setQtext('');
        setOptions(defaultOptionsState);
    }

    const publish = () => {
        updateSurveyQuestion();
        history.push('/published')
    }

    return (
        <>
            <TypeSelector qtype={qType} setQtype={setQtype} />

            {qType !== 0 ?
                <>
                    <Question />

                    {options.map((opt, key) => (
                        <>
                            <Options 
                                key ={key} 
                                uid = {opt.uid}
                                addOptions = {addOptions}
                                deleteOptions = {deleteOptions}
                                updatedText = {updatedOptionsText}
                            />
                        </>
                    ))}
                    
                <button className="btn btn-danger m-1" onClick = {() => updateSurveyQuestion()}>Add Question</button>
                <button className="btn btn-danger m-1" onClick = {() => publish()}>Publish</button>
                </>
        
            :null}

        </>
    )
}

export default CreateSurvey;