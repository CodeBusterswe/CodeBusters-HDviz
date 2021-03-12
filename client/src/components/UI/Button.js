
const MyButton = props => {
    const {
        onClickHandle
    } = props
    console.log(props)
    return (
        <div>
        <input type="button" onClick={onClickHandle}>Incrementa</input>
        </div>
    )
}
export default MyButton