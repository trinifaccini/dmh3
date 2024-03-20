import * as yup from 'yup';

// const regExpDate =  new RegExp("^(?:0?[1-9]|1[0-2]) *\/ *[1-9][0-9]$")
// "expiry": yup.string().required('La fecha de expiración es requerida').matches(regExpDate, "El formato de la fecha de expiración no es el correcto, debe ser 'MM/YY'").min(5, "El formato de la fecha de expiración no es el correcto, debe ser 'MM/YY'" ),

const regExpDateMonth =  new RegExp("^(0[1-9]|1[0-2]){1,2}");
const regExpDateYear=  new RegExp("^(2[2-9])|^[3-9]+[0-9]{1,2}");
const regExpString = new RegExp("[A-Za-z_]")


export const PaymentSchema = yup.object({
    "number": yup.string().required('El número de tarjeta es requerido').min(16, 'El número de tarjeta debe tener 16 números como mínimo').max(18, 'El número de tarjeta debe tener 18 números como máximo'),
    "name": yup.string().required('El nombre es requerido').matches(regExpString, "Este campo no puede contener números ni caracteres especiales").min(3, 'El nombre debe tener mínimo 3 caracteres'),
    "expiryMonth": yup.string().required('El mes de expiración es requerido').matches(regExpDateMonth, "El mes de expiración no es válido").max(2, "El mes de expiración no es válido"),
    "expiryYear": yup.string().required('El año de expiración es requerido').matches(regExpDateYear, "El año de expiración no es válido").max(2, "El año de expiración no es válido"),
    "cvc": yup.string().required('El código de seguridad es requerido').min(3, "El código de seguridad debe tener al menos 3 digitos").max(4, "El código de seguridad no debe tener más de 4 digitos")
}).required();