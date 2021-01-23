import { useState } from 'react';

function EditPackage(props) {

    const [quantity, setQuantity] = useState(props.package.quantity);
    const [delivery_date, setDelivery_date] = useState(props.package.delivery_date);
    const [status, setStatus] = useState(props.package.status);    

    return(
        <tr>
            <td><td><input className="form-control" nanme="quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></td></td>
            <td><td><input className="form-control" nanme="delivery_date" value={delivery_date} onChange={(event) => setDelivery_date(event.target.value)} /></td></td>
            <td><td><input className="form-control" nanme="status" value={status} onChange={(event) => setStatus(event.target.value)} /></td></td>
            <td>
                <button className="btn btn-primary" onClick={() => props.onSave({quantity: quantity, delivery_date: delivery_date, status: status})}>Save</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.package)}>Delete</button>
            </td>
        </tr>
    )
}

export default EditPackage;