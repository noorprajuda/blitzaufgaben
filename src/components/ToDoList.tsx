import React from 'react';
import { ToDo } from "../model";
import "./style.css";
import SingleToDo from './SingleToDo';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    toDos: ToDo[];
    setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
    completedToDos: ToDo[];
    setCompletedToDos:  React.Dispatch<React.SetStateAction<ToDo[]>>;

}

const ToDoList: React.FC<Props> = ({toDos, setToDos, completedToDos, setCompletedToDos}: Props) => {
  return (
    // <div className='toDos'>
        
    //     {toDos.map((toDo)=> (
    //         <SingleToDo toDo={toDo} key={toDo.id} toDos={toDos} setToDos={setToDos}/>
    //     ))}

    // </div>

    <div className='container'>

        <Droppable droppableId='ToDosList'>
            {(provided, snapshot)=>(
                  <div className={`toDos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                  <span className='toDos_heading'>
                  Aktiven Aufgaben
                  </span>
                  {toDos.map((toDo, index)=> (
                      <SingleToDo 
                        index={index}
                        toDo={toDo} 
                        key={toDo.id} 
                        toDos={toDos} 
                        setToDos={setToDos}
                      />
                  ))}
                  {provided.placeholder}
              </div>
            )}
        </Droppable>

        <Droppable droppableId='ToDosRemove'>
            {(provided, snapshot) => (
                <div className={`toDos remove  ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className='toDos_heading'>
                    Erledigte Aufgaben
                    </span>

                    {completedToDos.map((toDo, index)=> (
                        <SingleToDo 
                            index={index}
                            toDo={toDo} 
                            key={toDo.id} 
                            toDos={completedToDos} 
                            setToDos={setCompletedToDos}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
            

    </div>
  )
}

export default ToDoList;

