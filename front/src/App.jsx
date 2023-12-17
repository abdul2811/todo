import './index.css'
import ModalForm from './components/ModalForm'
import Add from './components/Add'
import Tasks from './components/Tasks'
import Search from './components/Search'
import { useState, useEffect } from 'react'

// const SortDropdown = ({ handleChange, isTodo }) => {
  
//   if (isTodo) {
//     return (
//       <div>
//       <label htmlFor="sort">Sort: </label>
//       <select id="sort" onChange={handleChange}>
//         <option value="dateAdded">Date Added</option>
//         <option value="name">A-Z</option>
//       </select>
//     </div>
//     )
//   }
//   else {
//   return (
//     <div>
//       <label htmlFor="sort">Sort: </label>
//       <select id="sort" onChange={handleChange}>
//         <option value="dateAdded">Date Added</option>
//         <option value="dateCompleted">Date Ended</option>
//         <option value="name">A-Z</option>
//       </select>
//     </div>
//   );
// };
// }


const Todo = ({handleClick, isTodo}) => {
  // const buttonStyle = {
  //   borderBottom: isTodo ? '2px solid black' : 'none',
  //   // transition: 'border-bottom 0.3s ease',
  // };

  const buttonClassName = isTodo ? 'active' : 'inactive'; 
  // Using this method to change styles based on variable states
  
  return (
    <button onClick={handleClick} className={buttonClassName}>To do</button>
  )
}

const Completed = ({handleClick, isCompleted}) => {
  // const buttonStyle = {
  //   borderBottom: isCompleted ? '2px solid black' : 'none',
  // };

  const buttonClassName = isCompleted ? 'active' : 'inactive';

  return (
    <button onClick={handleClick} className={buttonClassName} >Completed</button>
  )
}

const All = ({handleClick, isAll}) => {
  // const buttonStyle = {
  //   borderBottom: isAll ? '2px solid black' : 'none',
  // };
  
  const buttonClassName = isAll ? 'active' : 'inactive';

  return (
    <button onClick={handleClick} className={buttonClassName}>All</button>
  )
}

const App = () => {
  const [tasks, setTasks] = useState([
    { name: 'Exercise', dateAdded: "Dec 1, '23", dateCompleted: "", id: 1, completed: false, status: 'In Progress' },
    { name: 'Code', dateAdded: "Dec 2, '23", dateCompleted: "", id: 2, completed: false, status: 'In Progress' }
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState(tasks.filter(task => !task.completed))
  const [isTodo, setIsTodo] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [search, setSearch] = useState('');
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  // const [sortOption, setSortOption] = useState('dateAdded');
  // const [sortedTasks, setSortedTasks] = useState([...tasks]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  const addTask = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const options = { month: 'short', day: 'numeric', year: '2-digit' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/(\d{2})$/, "'$1");
    const id = Math.max(...tasks.map(task => task.id)) + 1;

    setTasks(tasks.concat({ name: newTask, dateAdded: formattedDate, dateCompleted: "", id: id, completed: false, status: 'In Progress' }))
    setNewTask('')
    closeModal()
    // if (isTodo) {
    //   handleTodo()
    // }
  }

  const handleTaskChange = (e) => {
    if (e.target.value.length <= 40) {
      setNewTask(e.target.value);
    } else {
      // Truncate the input value if it exceeds the limit
      setNewTask(e.target.value.slice(0, 40));
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleCompletion = (id) => {
    const task = tasks.find(t => t.id === id)
    if (task.completed === false) {
      const currentDate = new Date();
      const options = { month: 'short', day: 'numeric', year: '2-digit' };
      const completionDate = currentDate.toLocaleDateString('en-US', options).replace(/(\d{2})$/, "'$1");
      const changedTask = { ...task, dateCompleted: completionDate , completed: !task.completed, status: 'Done' }
      setTasks(updatedTasks => updatedTasks.map(t => (t.id !== id ? t : changedTask)));
    }
    else {
      const changedTask = { ...task, dateCompleted: "", completed: !task.completed, status: 'In Progress' }
      setTasks(updatedTasks => updatedTasks.map(t => (t.id !== id ? t : changedTask)));
    }
    // setTasks(tasks.map(t => t.id !== id ? t : changedTask))
    console.log(task.completed)
    // if (isTodo) {
    //   setFilter(tasks.filter((task) => !task.completed))
    // }
  };

  useEffect(() => {
    if (isTodo) {
      setFilter(tasks.filter(task => !task.completed));
    }
    else if (isCompleted) {
      setFilter(tasks.filter(task => task.completed));
    }
    else if (isAll) {
      setFilter(tasks)
    }
  }, [isTodo, isAll, isCompleted, tasks]);

  const handleCompleted = () => {
    // setFilter(tasks.filter(task => task.completed));
    setIsTodo(false)
    setIsAll(false)
    setIsCompleted(true)
  }

  const handleAll = () => {
    // setFilter(tasks);
    setIsTodo(false)
    setIsAll(true)
    setIsCompleted(false)
  }

  const handleTodo = () => {
    // setFilter(tasks.filter(task => !task.completed));
    setIsTodo(true)
    setIsAll(false)
    setIsCompleted(false)
  }

  let filteredTasks = filter.filter(task => task.name && task.name.toLowerCase().includes(search.toLowerCase()))

  const handleSearchChange = event => setSearch(event.target.value)

  // useEffect(() => {
  //   if (sortOption === 'name') {
  //     setSortedTasks([...filter].sort((a, b) => a.name.localeCompare(b.name)));
  //   } else if (sortOption === 'dateAdded') {
  //     setSortedTasks([...filter].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)));
  //   } else if (sortOption === 'dateCompleted') {
  //     setSortedTasks(
  //       [...filter].sort(
  //         (a, b) =>
  //           new Date(a.dateCompleted || '1970-01-01') - new Date(b.dateCompleted || '1970-01-01')
  //       )
  //     );
  //   }
  // }, [sortOption])

  // const handleSortChange = event => {
  //   setSortOption(event.target.value)
//     if (sortOption === 'name') {
//        filteredTasks = [...filteredTasks].sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortOption === 'dateAdded') {
//        filteredTasks = [...filteredTasks].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
//     } else if (sortOption === 'dateCompleted') {
//        filteredTasks = 
//         [...filteredTasks].sort(
//           (a, b) =>
//             new Date(a.dateCompleted || '1970-01-01') - new Date(b.dateCompleted || '1970-01-01')
//         )
      
//   }
  //  }

  const handleMouseEnter = () => {
    isFocus ? setIsHover(false) : setIsHover(true)
    // setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const handleFocus = () => {
    setIsHover(false)
    setIsFocus(true)
    // setIsHoverClick(true)
  }

  const handleBlur = () => {
    setIsFocus(false)
  }
 
  const inlineStyle = isHover ? 'hovered-search' : 'unhovered-search'

  return (
    <div className='body'>
      <h1>To-do</h1>
      <Add openModal={openModal} />
      <div className='header-buttons'>
        <div>
          <Todo isTodo={isTodo} handleClick={() => handleTodo()}/><Completed isCompleted={isCompleted} handleClick={() => handleCompleted()}/><All isAll={isAll} handleClick={() => handleAll()}/>
        </div>
        <div>
          <Search inlineStyle={inlineStyle} handleChange={handleSearchChange} handleMouseLeave={() => handleMouseLeave()} handleMouseEnter={() => handleMouseEnter()} handleFocus={() => handleFocus()} handleBlur={() => handleBlur()} />
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <h2>Add Task</h2>
            <ModalForm className='modal-form' add={addTask} taskVal={newTask} handleChange={handleTaskChange} />
          </div>
        </div>
      )}
      <div className='header'><div>Name</div><div>Start</div><div>End</div><div>Delete</div><div>Status</div></div>
      {filteredTasks.map((task) =>
        <Tasks className='tasks' status={task.status} tasks={task} key={task.id} handleDelete={() => handleDelete(task.id)} handleCompletion={() => handleCompletion(task.id)} />
        )}
    </div>
  )
}

export default App
