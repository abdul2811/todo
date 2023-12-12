const ModalForm = ({add, taskVal, handleChange}) => {
    return (
      <form onSubmit={add}>
        <div className="form-item">
          <label htmlFor='task'>Task</label>
          <input type='text' id='task' name='task' value={taskVal} onChange={handleChange} required/>
        </div>
        <button>Submit</button>
      </form>
    )
  }

export default ModalForm