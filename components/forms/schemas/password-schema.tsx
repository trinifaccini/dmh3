import * as yup from 'yup';

export const  PasswordFormSchema = yup.object({
    
  password: yup.string().required('Campo obligatorio'),
  repassword: yup.string().required('Campo obligatorio'),

  })
  