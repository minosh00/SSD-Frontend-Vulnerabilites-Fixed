
export const ValidateAddNewMenu=(formData) =>{

    const messages ={
       FOOD_NAME_EMPTY :"The Food Name should at least be 3 letters...",
       PRICE_EMPTY : "The price should at least be 3 letters...",
       DESCRIPTION_EMPTY : "The description should at least be 3 letters..."
    };

    const output ={
            status : false,
            message : null
    };

    if(formData.name.length <= 2 )
    {
        output.message = messages.FOOD_NAME_EMPTY;
        output.status = false;
        return output;
    
    }
    if(formData.price.length <= 2)
    {
        output.message = messages.PRICE_EMPTY;
        output.status = false;
        return output;
    }  
    if(formData.description.length <= 2)
    {
        output.message = messages.DESCRIPTION_EMPTY;
        output.status = false;
        return output;
    } 
    else
    {
        output.status = true;
        return output;
    }
 
};