function Package(props) {

    return(
        <tr>
            <td>{props.package.code}</td>
            <td>{props.package.quantity}</td>
            <td>{props.package.delivery_date}</td>
            <td>{props.package.status}</td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.package)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.package)}>Delete</button>
            </td>

        </tr>
    )
    
}

export default Package;