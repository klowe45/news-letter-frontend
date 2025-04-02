import { useState } from "react";

export function useForm(inputvalues) {
  const [values, setValues] = useState(inputvalues);

  const handleChange = (e) => {
    const { values, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { vales, handleChange, setValues };
}
