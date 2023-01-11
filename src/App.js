import {useState} from 'react'; 
import './App.css';

function App() {
  const [todo, setTodo]=useState([{
    id: ~~(Math.random()*10000),
    title: "First",
    isEditable: false,
    isCompleted: false,
  },
  {
    id: ~~(Math.random()*10000),
    title: "Second",
    isEditable: false,
    isCompleted: true,
  },
  {
    id: ~~(Math.random()*10000),
    title: "Third",
    isEditable: false,
    isCompleted: false,
  }]);
const [todos, setTodos] = useState("");
const [history, setHistory] = useState("")

  const handleChange=e=>{
    setTodos(e.target.value);
  }

  const handaleSubmit=e=>{
    e.preventDefault();
    if(!todos.trim()){
      return false;
    }
   const newTodos ={
    id: ~~(Math.random()*10000),
    title: todos,
    isEditable: false,
    isCompleted: false,
   }
   setTodo([newTodos, ...todo]);
   setTodos("");
  }
  const handelDelete = (id)=>{
    const updateTodo=todo.filter(todos=>todos.id !== id);
    setTodo(updateTodo);
  }

  const handelEdit = (index, title)=>{

     const editable= JSON.parse(JSON.stringify(todo));
     editable[index].isEditable=true;
     setTodo(editable);
     setHistory(title) 
  }

  const handelCancle =(index)=>{
    const editable= JSON.parse(JSON.stringify(todo));
    editable[index] .title=history;
    editable[index] .isEditable=false;
    setTodo(editable);
  }

  const handelUpdate=(index)=>{
    const editable= JSON.parse(JSON.stringify(todo));
    editable[index] .isEditable=false;
    setTodo(editable);
  }

  const handelEditChange= (e, index)=>{
  
   const editable= JSON.parse(JSON.stringify(todo));
   editable[index] .title=e.target.value;
   setTodo(editable);
  }

  const toggelComplete= (index) => {
    const editable= JSON.parse(JSON.stringify(todo));
   editable[index] .isCompleted=!editable[index] .isCompleted;
   setTodo(editable);
  }
 
  const handleReset = e=>{
    e.preventDefault();
    setTodo([{
      id: ~~(Math.random()*10000),
      title: "First",
      isEditable: false,
      isCompleted: false,
    },
    {
      id: ~~(Math.random()*10000),
      title: "Second",
      isEditable: false,
      isCompleted: true,
    },
    {
      id: ~~(Math.random()*10000),
      title: "Third",
      isEditable: false,
      isCompleted: false,
    }]);    
  }
  return (
    <div className="App">
      <form>
     <input value={todos} onChange={handleChange}></input>
     <button onClick={handaleSubmit}>Save</button>
     <button onClick={handleReset}>Reset</button>
     </form>
     <div className='result'>
      <ul>{
             Array.isArray(todo) && todo.map(({id,title, isCompleted, isEditable}, index)=>{
              return(
                  isEditable ? (
                    <li key={id}>
                  <input  value={title} onChange={(e)=>handelEditChange(e,index)}/>
                  <button onClick={()=>handelUpdate(index)}>update</button>
                  <button onClick={()=>handelCancle(index)}>cancle</button>
                    </li>
                  ) : (
                    <li key={id}>
                      <input type="checkbox" checked={isCompleted ? true: false} onChange={()=>toggelComplete(index)}/>
                      <span style={isCompleted ? { "textDecoration": "line-through" } : {}}>{title}</span>
                      <button onClick={()=>handelEdit(index,title)} >Edit</button>
                      <button onClick={()=>handelDelete(id)}>Delete</button>              
                    </li>
                  )
              )
                  }

                )
                  }
        </ul>
     </div>
    </div>
  );
}

export default App;