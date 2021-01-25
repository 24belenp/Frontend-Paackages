import  EditablePackage from './EditablePackage.js';
import { Fragment, useEffect, useState } from 'react';
import Alert from './Alert.js';
import NewPackage from './NewPackage.js';
import PackagesAPI from './PackagesApi.js';



function Packages(props) {


    const [message, setMessage] = useState(null);
    const [packages, setPackages] = useState([]);
    
    useEffect(() => {
        async function fetchPackages() {
            try {
                const c = await PackagesAPI.getAllPackages();
                setPackages(c);
            } catch(error) {
                setMessage('An unexpected error happened');
            }
        }
        fetchPackages();

    }, []);

    function onAlertClose() {
        setMessage(null);
    };

    function validatePackageCode(paackage) {
        if(paackage.code === ''){
            setMessage('A code must be provided');
            return false;
        }

        return true;
        
    }

    function onPackageEdit(newPackage, oldPackage) {
        const validation =  validatePackageCode(newPackage);
        if(! validation) {
            return false;
        }
                PackagesAPI.updateById(newPackage).then(resp =>{
                    console.log("Success")

                });

        if(newPackage.code !== oldPackage.code){
            setMessage('Cannot change the code since it must be unique');
            return false;
        }

        setPackages((prevPackages) => {
            return prevPackages.map((c) => c.code === oldPackage.code ? newPackage : c);
            
        });

        return true;
       
    }

    function onPackageDelete(paackage) {
        PackagesAPI.deleteById(paackage.code).then(res =>{
           setPackages((prevPackages) => {
               return prevPackages.filter((c) => c.name !== paackage.name)
        })
    });
          
    }



    function onAddPackage(paackage) { 

        const validation = validatePackageCode(paackage);
        if(! validation) {
            return false;
        }else {
            async function addPackage() {
                try {
                     const response = await PackagesAPI.postPackage(paackage);
                } catch(error) {
                    setMessage('An unexpected error happened');
                }
            }

            addPackage();
        }


        setPackages((prevPackages) => {
            if(! prevPackages.find(c => c.code === paackage.code)){
             return [...prevPackages, paackage]
            } else {
                setMessage('Duplicate code')
                return prevPackages;
            }
         });     
    }

    

    return(
        <Fragment>
            <Alert message={message} onClose={onAlertClose}/>
            <table className="table">
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>QUANTITY</th>
                        <th>DELIVERY_DATE</th>
                        <th>STATUS</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <NewPackage onAddPackage={onAddPackage}/>
                    {packages.map((paackage) => 
                        <EditablePackage key={paackage.code} package={paackage} onEdit={(newPackage) => onPackageEdit(newPackage, paackage)} onDelete={onPackageDelete}/>
                    )}
                </tbody>
            </table>
        </Fragment>
    )

}

export default Packages;
