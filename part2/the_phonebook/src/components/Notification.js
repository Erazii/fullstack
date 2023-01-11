const Notification = ({message, errorMessage}) => {
    const style = {
        color: 'green',
        background: 'white',
        fontsize: 20,
        borderstyle: 'solid',
        borderradius: 5,
        padding: 10,
        marginbottom: 10
    }
    const errorStyle = {
        color: 'red',
        background: 'white',
        fontsize: 20,
        borderstyle: 'solid',
        borderradius: 5,
        padding: 10,
        marginbottom: 10
    }
    if (message === null && errorMessage === null){
        return null
    }else if(message != null){
        return (
            <div style={style}>
                {message}
            </div>
        )
    }else if(errorMessage != null){
        return (
            <div style={errorStyle}>
                {errorMessage}
            </div>
        )
    }

}
export default Notification


