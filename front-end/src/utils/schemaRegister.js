import { object, string } from 'yup';

const nameMin = 12;
const pwMin = 6;

const schemaRegister = object().shape({
  name: string().min(nameMin),
  email: string().email(),
  password: string().min(pwMin),
});

export default schemaRegister;
