const Form = (props) => {
    return (
      <form>
          <div>
            name: <input value={props.newName} onChange={props.handleChange} />
          </div>
          <div>
            number: <input value={props.newNumber} onChange={props.handleNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={props.handleClick}>add</button>
          </div>
        </form>
    )
  }

export default Form