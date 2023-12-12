const Tasks = ({tasks, handleDetail, handleCompletion, handleDelete, status}) => {
    return (
      <div onClick={handleDetail} className="tasks">
        <p className="task-text">{tasks.name}</p> <p className="task-text">{tasks.dateAdded}</p> <p className="task-text">{tasks.dateCompleted}</p>
        <button onClick={handleDelete}>X</button>
        <button onClick={handleCompletion}>{status}</button>
      </div>
    )
  }

export default Tasks