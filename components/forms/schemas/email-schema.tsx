import * as yup from 'yup';

export const EmailFormSchema = yup.object({
    
    email: yup.string().email().required('Campo obligatorio'),
  })
  