const Button = ({ btnHandler, rating }) => {
    return (
        <button onClick={btnHandler}>{rating}</button>
    )
}

export default Button