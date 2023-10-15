export interface ToDo {
    id: number;
    toDo: string;
    isDone: boolean;
}

// type Actions = {
//     | {type: "add"; payload: string}
//     | {type: "remove"; payload: number};
//     | {type: "done"; payload: number};
// }

// const ToDoReducer = (state: ToDo[], action: Actions) =>{
//     switch (action.type) {
//         case "add":
//             return [
//                 ...state,
//                 {id: Date.now(), toDo: action.payload, isDone: false}
//             ]
//             break;
//         case "remove":
//             return state.filter((toDo) => toDo.id !== action.payload)
//             break;

//         case "done":
//             return state.map((toDo) => 
//             toDo.id !== action.payload ? { ...toDo, isDone: !toDo.isDone} : toDo )
//             break;
    
//         default:
//             break;
//     }
// }

// import { useReducer } from "react";

// const ReducerExample = () => {
//     const [state, dispatch] = useReducer(ToDoReducer, []);

//     return (
//         // <div></div>
//     );
// }
