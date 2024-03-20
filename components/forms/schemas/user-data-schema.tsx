import * as yup from 'yup';

const regExp = new RegExp("(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])")
const regExpString = new RegExp("[A-Za-z_]")

export const UserDataFormSchema = yup.object({
    firstName: yup.string().required('El nombre es obligatorio').matches(regExpString, "El nombre no puede contener números ni caracteres especiales"),
    lastName: yup.string().required('El apellido es obligatorio').matches(regExpString, "El apellido no puede contener números ni caracteres especiales"),
    dni: yup.string().required('El DNI es obligatorio').length(8, "El dni debe tener 8 digitos"),
    email: yup.string().email("El email no tiene un formato correcto").required('El email es obligatorio'),
    password: yup.string().required('Campo obligatorio').min(6, "La contraseña debe tener al menos 6 cáracteres").max(20, "La contraseña puede tener 20 cáracteres como máximo").matches(regExp, "La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número"),
    repassword: yup.string().required('Campo obligatorio').oneOf([yup.ref('password'), null], "Las contraseñas no coinciden"),
    phone: yup.string().required('El télefono es obligatorio').min(6, "El télefono debe tener al menos 6 digitos"),
  })
  1