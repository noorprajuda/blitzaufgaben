import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { ToDo } from './model';
import ToDoList from './components/ToDoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import BlitzAufgabenLogo from './assets/img/BlitzAufgaben.png'


const App : React.FC = () => {

  const [toDo,setToDo] = useState<string>("");
  const [toDos,setToDos] = useState<ToDo[]>([]);
  const [completedToDos,setCompletedToDos] = useState<ToDo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (toDo) {
      setToDos([...toDos, {id: Date.now(), toDo, isDone: false}]);
      setToDo("");
    }
  };

  const onDragEnd = (result: DropResult)=>{
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index ) return;
    
    let add, active = toDos, complete = completedToDos;

    if (source.droppableId === "ToDosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "ToDosList") {
      active.splice(source.index, 0, add);
    } else {
      complete.splice(source.index, 0, add);
    }

    setCompletedToDos(complete);
    setToDos(active);
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>
        <img className='img-logo' src={BlitzAufgabenLogo} alt='BlitzAufgaben Logo'/>
        </span>
        <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd}/>
        <ToDoList toDos={toDos} setToDos={setToDos} completedToDos={completedToDos} setCompletedToDos={setCompletedToDos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
