import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import { useState, useRef, useEffect } from 'react';
import editIcon from './assets/edit.png';
import deleteIcon from './assets/deelete.png';

function App() {
  let date = new Date().toLocaleDateString();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [addsave, setAddsave] = useState("Add");
  const [idfromtop, idsaver] = useState("");
  const inputRef = useRef(null);

  const saveTodo = () => {
    console.log(todos, "just befor saving");
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    console.log(todostring, "getting from ls");
    if (todostring) {
      console.log( "ha ajao");
      const todosss = JSON.parse(todostring);
      console.log(todosss, "just after getting");
      setTodos(todosss);
      console.log(todos, "todos updated");
    }
  }, []);

  useEffect(() => {
    saveTodo();
    console.log(todos, "todos updated");
  }, [todos]);

  let handleSave = () => 
  {
    let index = todos.findIndex((item) => { return item.id === idfromtop });
    if (todo === "" || todo === null || todo === " ") {
      alert("You can't save an empty task.");
      return;
    } else {
      todos[index].todo = todo;
      todos[index].itemclass = "task-card bg-[#252E32] bg-opacity-[75%]  w-1/3 h-12 flex justify-between items-center p-4 rounded-3xl mb-3";
      setAddsave("Add");
      setTodo("");
      saveTodo();
    }
  };

  let handleAdd = (e) => {
    if (todo === "" || todo === null || todo === " ") return;
    if (addsave === "Save") {handleSave();}
    else {
      console.log(todos,"before adding");
      const newTodos = [...todos, { todo, isCompleted: false, id: uuidv4(), itemclass: "task-card bg-[#252E32] bg-opacity-[75%]  w-1/3 h-12 flex justify-between items-center p-4 rounded-3xl mb-3" }];
      setTodos(newTodos);
      console.log(todos, "after adding");
      setTodo("");
      
      console.log(localStorage.getItem("todos"), "local storage");
    }
  };

  let handleInputchange = (e) => { setTodo(e.target.value) };

  let handleEdit = (e) => {
    let id = e.target.name;
    idsaver(id);
    let index = todos.findIndex((item) => { return item.id === id });
    if (todos[index].isCompleted === true) {
      alert("You can't edit a completed task.");
      return;
    } else {
      if (document.getElementById("Input").value === "" || document.getElementById("Input").value === " " || document.getElementById("Input").value === null || document.getElementById("Input").value === todos[index].todo) 
        {
        setAddsave("Save");
        todos[index].itemclass = "task-card bg-[#252E32] bg-opacity-[25%]  w-1/3 h-12 flex justify-between items-center p-4 rounded-3xl mb-3";
        setTodo(todos[index].todo);
        inputRef.current.focus(); // Set focus to the input element
        }
        else
        {
           console.log(confirm("overwritten"),"hiiiiiiiiiiiiiiiiiiiiiiiiii")
           if (confirm("Warning: Anything in Input will be overwritten.")) 
          {
              setAddsave("Save");
              todos[index].itemclass = "task-card bg-[#252E32] bg-opacity-[25%]  w-1/3 h-12 flex justify-between items-center p-4 rounded-3xl mb-3";
              setTodo(todos[index].todo);
              inputRef.current.focus(); // Set focus to the input element
          }
        }
    }
  };

  let handleDelete = (e) => {
    if (confirm("Are you sure you want to delete this task?")) {
      let id = e.target.name;
      let newtodos = todos.filter((item) => { return item.id !== id; });
      setTodos(newtodos);
      saveTodo();
    } else {
      return;
    }
  };

  let handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => { return item.id === id; });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    saveTodo();
  };

  return (
    <div className="bg-gradient-to-r from-[#565657] to-[#092F41] min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="container align-center min-w-full flex justify-center items-center">
        <div className="Heading text-center justify-center text-[4.3rem] text-white mb-12">
          Just do it.<span className='text-black'>|</span>
        </div>
      </div>
      <div className="input-bar min-w-full flex justify-center items-center h-12 mb-6">
        <input type="text" placeholder="Add a task" id="Input" onChange={handleInputchange} onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }} className="input-box rounded-xl h-3/4 w-1/3 rounded-tr-[0] rounded-br-[0] p-4" value={todo} ref={inputRef} />
        <button onClick={handleAdd} className="add-button rounded-xl h-[76%] rounded-tl-[0] rounded-bl-[0] bg-black text-white w-16 hover:text-slate-300 active:text-white">
          {addsave}
        </button>
      </div>
      <div className="date min-w-full flex justify-center items-center h-6 text-gray-400 text-[0.9rem] mb-3">
        {date}
      </div>
      <div className="task-list min-w-full flex justify-center items-center flex-col">
        {todos.map((item) => {
       
          return (
            <div key={item.id} className={item.itemclass}>
              <div className="check-box size-8 flex justify-center items-center">
                <input type='checkbox' name={item.id} onChange={handleCheck} className="rounded bg-gray-800 size-[1.05rem]" value={item.isCompleted} ></input>
              </div>
              <div className={item.isCompleted ? "line-through task-name text-[#999192]" : "task-name text-white"}>{item.todo}</div>
              <div className="task-action flex flex-row justify-between items-center space-x-3">
                <button className="edit-button size-9 rounded-full flex flex-row justify-center items-center">
                  <span className='size-9 hover:size-[2.252rem] active:size-9'>
                    <img name={item.id} onClick={handleEdit} src={editIcon} alt="edit" />
                  </span>
                </button>
                <button className="delete-button size-9 rounded-full flex flex-row justify-center items-center">
                  <span className='size-9 hover:size-[2.252rem] active:size-9'>
                    <img name={item.id} onClick={handleDelete} src={deleteIcon} alt="delete" />
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
