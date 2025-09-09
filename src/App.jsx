import { useState, useEffect } from 'react'
import './App.css'
import Button from './Component/Button/Button'
import Task from './Component/Task/Task';
function App() {
  // let taskList=JSON.parse(localStorage.getItem())
  const [input, setInput]=useState('');
  const [task, setTask] = useState(() => {
  // Lấy dữ liệu từ localStorage
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : []; // Nếu chưa có thì trả về []
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(task));
}, [task]);

  function AddTodo(){
    if (input.trim()==="") return; //chặn khoảng trắng và rỗng
    setTask([...task, input]);
    setInput('');
  }
  function DelTodo(index){
    setTask(task.filter((_,i)=>i!=index))
  }
  function UpdateToDo(index, newTask) {
  const updated = [...task]
  updated[index] = newTask
  setTask(updated)
}

  return (
    <>
        <div className='layout TodoList'>
          <h1>Todo List</h1>
          <div className='layout input'>
            <textarea placeholder='Nhập công việc' 
            value={input}
            onChange={(e)=>setInput(e.target.value)}></textarea>
            <Button handle={AddTodo}>
              +
              </Button>
          </div>
          <div className='Todo'>
            {
              task.map((value, index)=>(
                <Task key={index} 
                onDelete={()=>DelTodo(index)}
                onUpdate={(newText)=>UpdateToDo(index,newText)}>{value}</Task>
              ))
              
            }
          </div>
        </div>
    </>
  )
}

export default App
