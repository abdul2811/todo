import trashImage from '../images/trash.png'

const Tasks = ({tasks, handleDetail, handleCompletion, handleDelete, status}) => {
    return (
      <div onClick={handleDetail} className="tasks">
        <p className="task-text">{tasks.name}</p> <p className="task-text">{tasks.dateAdded}</p> <p className="task-text">{tasks.dateCompleted}</p>
        <button id='trash-button' onClick={handleDelete}><img id='trash' src= {trashImage} /></button>
        <button id='status-button' onClick={handleCompletion}>{status}</button>
      </div>
    )
  }

export default Tasks