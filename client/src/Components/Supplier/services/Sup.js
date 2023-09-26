import axios from 'axios';
let getAllSupplierURL = "http://localhost:5000/supplier/getAllSupplier"; 
let getSupplierByIdURL = "http://localhost:5000/supplier/getSupplierById/";
let updateSupplierByIDURL = "http://localhost:5000/supplier/updateSupplierByID/";







export async function updateSupplierByID(id,data) {
    const alldata = {
      
        
        

        suppliername:data.suppliername,
        supplierCompanyName:data.supplierCompanyName,
        SupplyItemsname:data.SupplyItemsname,
        SupplyAmount:data.SupplyAmount,
        SupplyDate:data.SupplyDate,
        totalPrice:data.totalPrice,
    };


    return await axios.patch(updateSupplierByIDURL + id,alldata);
}






export async function getAllSupplier() { 
    return await axios.get(getAllSupplierURL);
}

export async function getSupplierById(id) { 
    return await axios.get(getSupplierByIdURL + id);
}





