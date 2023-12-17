const ModalForm = ({add, taskVal, handleChange}) => {
    return (
      <form onSubmit={add}>
        <div className="form-item">
          <label htmlFor='task'>Task</label>
          <input maxLength={40} type='text' id='task' name='task' value={taskVal} onInput={handleChange} required/>
        </div>
        <button>Submit</button>
      </form>
    )
  }

export default ModalForm