export const ValidateSignUp = (formData) => {
  const messages = {
    NAME_EMPTY: "The name should at least be 3 letters...",
    EMAIL_EMPTY:
      "Email must contain @ and atleast 3 letter before for the prefix...",
    MOBILE_NO_EMPTY: "Enter a valid mobile number...",
  };

  const output = {
    status: false,
    message: null,
  };

  if (formData.Fullname.length <= 2) {
    output.message = messages.NAME_EMPTY;
    output.status = false;
    return output;
  }
  if (formData.email.length <= 2) {
    output.message = messages.EMAIL_EMPTY;
    output.status = false;
    return output;
  }
  // if((formData.pNumber.length < 10) || (formData.pNumber.length > 12))
  // {
  //   output.message = messages.MOBILE_NO_EMPTY;
  //   output.status = false;
  //   return output;
  //   }
  else {
    output.message = "";
    output.status = true;
    return output;
  }
};
