import React, { useEffect, useRef, useState } from 'react';
import { ToDo } from "../model";
import { AiFillEdit,AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css"
import ToDoList from './ToDoList';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number,
    toDo: ToDo,
    toDos: ToDo[],
    setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>
    
}

const SingleToDo = ({index, toDo, toDos, setToDos}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editToDo, setEditToDo] = useState<string>(toDo.toDo);

    const handleDone = (id: number) => {
        setToDos(
            toDos.map((toDo) => 
                toDo.id === id ? {...toDo, isDone: !toDo.isDone} : toDo
            )
        );
    }

    const handleDelete = (id: number) => {
        setToDos(
            toDos.filter((toDo) => toDo.id !== id)
        );
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setToDos(
            toDos.map((toDo) => toDo.id === id ? {...toDo, toDo: editToDo} : toDo)
        );

        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    

    return (
    <Draggable draggableId={toDo.id.toString()} index={index}>
        {(provided, snapshot) => (
            <form className={`toDos_single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e)=>handleEdit(e,toDo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
                { edit ? (
                    <input 
                    ref={inputRef}
                    value={editToDo}
                    onChange={(e)=> setEditToDo(e.target.value)}
                    className="toDos_single-text"/>
                ) :
                    toDo.isDone ? (
                        <s className='toDos_single-text'>{toDo.toDo}</s>
                    ) : (
                        <span className='toDos_single-text'>{toDo.toDo}</span>
                    )
                }
                

                <div>
                    <span className='icon'
                    onClick={()=>{
                        if (!edit && !toDo.isDone) {
                            setEdit(!edit);
                        }
                    }}>
                    <AiFillEdit/>
                    </span>
                    <span className='icon' onClick={()=>handleDelete(toDo.id)}>
                    <AiFillDelete/>
                    </span>
                    <span className='icon' onClick={()=>handleDone(toDo.id)}>
                    <MdDone/>
                    </span>
                </div>
            </form>
        )}
    </Draggable>
  )
}

export default SingleToDo;