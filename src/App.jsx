import { useState } from 'react'

import Navbar from './components/Navbar'


function App() {
   let date = new Date().toLocaleDateString();
   const [todo , setTodo] = useState(" ");
   const [todos , setTodos] = useState([]);
  
   let handleAdd = () => {     
                console.log(todo);
                                 setTodos([...todos,{todo , isCompleted : false}]) 
                                  setTodo(" ");                 };
   let handleInputchange = (e) => { setTodo(e.target.value) };
   let handleEdit = () => {};
   let handleDelete = () => {};
   let handleCheck = () => {};
  return (
    <div className="bg-gradient-to-r from-[#565657] to-[#092F41] min-h-screen flex flex-col  items-center ">
      <Navbar />
      <div className="container align-center min-w-full flex justify-center items-center">
        <div className="Heading text-center justify-center text-[4.3rem] text-white mb-12 ">
          Just do it.<span className='text-black'>|</span>  
        </div>
      </div>
      <div className="input-bar min-w-full flex justify-center items-center h-12 mb-6">
        <input type="text" placeholder="Add a task"  onChange={handleInputchange} className="input-box rounded-xl h-3/4 w-1/3 rounded-tr-[0] rounded-br-[0] p-4" value={todo}  />
        <button onClick={handleAdd}  className="add-button rounded-xl h-[76%] rounded-tl-[0] rounded-bl-[0] bg-black text-white w-16 hover:text-slate-300 active:text-white">
          Add
        </button>
      </div>
      <div className="date min-w-full flex justify-center items-center h-6 text-gray-400 text-[0.9rem] mb-3">
        {date}
      </div>
      <div className="task-list min-w-full flex justify-center items-center flex-col">
      {todos.map((item) => {
        return (
        <div className="task-card bg-slate-950  bg-opacity-60 w-1/3 h-12 flex justify-between items-center p-4 rounded-3xl mb-3">
          <div className="check-box size-8 flex justify-center items-center">
            <input type='checkbox' className='rounded bg-gray-800 size-[1.05rem]'></input>
          </div>
          <div className="task-name text-white">{item.todo}</div>
          <div className="task-action flex flex-row justify-between items-center space-x-3">
            <button className="edit-button  size-9 rounded-full   flex flex-row justify-center items-center">
              <span className='size-9 hover:size-[2.252rem] active:size-9'>
                <img src="  https://cdn-icons-png.flaticon.com/512/10336/10336582.png  " alt="edit" />
              </span>
            </button>
            <button className="delete-button  size-9 rounded-full   flex flex-row justify-center items-center">
              <span className='size-9 hover:size-[2.252rem] active:size-9'>
                <img src=" https://cdn-icons-png.flaticon.com/512/10336/10336279.png " alt="delete" />
              </span>
            </button>
          </div>
        </div> )
      }  ) }
      
      
        
      </div>
    </div>
  )
}

export default App
