import {useState} from 'react';
import Package from './Package.js';
import EditPackage from './EditPackage.js';


function EditablePackage(props) {
    const[isEditing, setIsEditing] = useState(false);

    function savePackage(package) {
        const result = props.onEdit(package);
        if(result){
            setIsEditing(false);
        }
    }

    var packageRender;
    if(isEditing){
        packageRender = <EditPackage package={props.package} onDelete={props.onDelete} onSave={savePackage}/>;
    }else{
        packageRender = <Package package={props.package} onDelete={props.onDelete} onEdit={() => setIsEditing(true)}/>
    }
    return packageRender;
}

export default EditablePackage;