
export const ValidateAddNewMenu=(formData) =>{

    const messages ={
       _NAME_EMPTY :"The emaployee Name should at least be 3 letters...",
       LNAME_EMPTY : "The LAAT name  should at least be 3 letters...",
       JobPositionTYPE_EMPTY : " The job position  should at least be 3 letters...",
      Email_EMPTY : "The email should at least be 3 letters..."
    };


   

    const output ={
            status : false,
            message : null
    };

    if(formData.fname.length <= 2 )
    {
        output.message = messages._NAME_EMPTY;
        output.status = false;
        return output;
    
    }
    if(formData.lname.length <= 2)
    {
        output.message = messages.LNAME_EMPTY;
        output.status = false;
        return output;
    } 
    if(formData.JobPosition.length <= 2)
    {
        output.message = messages.JobPositionTYPE_EMPTY;
        output.status = false;
        return output;
    } 
    if(formData.email.length <= 2)
    {
        output.message = messages.Email_EMPTY;
        output.status = false;
        return output;
    } 
    else
    {
        output.status = true;
        return output;
    }
 
};