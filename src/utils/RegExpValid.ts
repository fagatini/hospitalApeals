export const isEmailValid = (email:string) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return reg.test(email);
  };

export const isPhoneValid = (phone:string): boolean => {
    const reg = /^[\+][0-9]{1}?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return reg.test(phone);
  };