
export const ValidateAddNewMenu=(formData) =>{

    const messages ={
       _NAME_EMPTY :"The emaployee Name should at least be 3 letters...",
       CompanyTYPE_EMPTY : " The Company  should at least be 3 letters...",
      Supplies_EMPTY : "The supllies should at least be 3 letters..."
    };


   

    const output ={
            status : false,
            message : null
    };

    if(formData.suppliername.length <= 2 )
    {
        output.message = messages._NAME_EMPTY;
        output.status = false;
        return output;
    
    }
    if(formData.supplierCompanyName.length <= 2)
    {
        output.message = messages.CompanyTYPE_EMPTY;
        output.status = false;
        return output;
    } 
    if(formData.SupplyItemsname.length <= 2)
    {
        output.message = messages.Supplies_EMPTY;
        output.status = false;
        return output;
    } 
    else
    {
        output.status = true;
        return output;
    }
 
};