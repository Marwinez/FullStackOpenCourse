const Notification = ({ message, successful }) => {
    
    if (message === null) {
        return null
    } else {
        console.log(successful);
        
        const notificationStyle = {
            color: successful ? 'green' : 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }

        return (
            <div className='notification' style={notificationStyle}>{message}</div>
        )
    }

}

export default Notification