import React, { useRef } from 'react';
import "./style.css";

interface Props{
    toDo: string;
    setToDo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({toDo, setToDo, handleAdd}) => {
    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={(e)=>{
            handleAdd(e);
            inputRef.current?.blur();
        }}>
        <input type='input' 
        ref={inputRef}
        value={toDo}
        onChange={
            (e)=>setToDo(e.target.value)
        }
        placeholder='Eine Aufgabe hinzufügen' className='input_box'></input>
        <button className='input_submit' type='submit'>OK</button>
    </form>
  )
}

export default InputField;
