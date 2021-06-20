import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import "./style.css";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "No mínimo 2 caractéres")
    .max(30, "No máximo 30 caractéres")
    .required("Obrigatório"),
  lastName: Yup.string().required("Obrigatório"),
  email: Yup.string().email().required("Obrigatório"),
  age: Yup.number()
    .positive("Idade deve ser um número positivo")
    .integer("Idade deve ser um número inteiro")
    .required("Obrigatório"),
  birthday: Yup.string()
    .test("date", "O formato da data deve ser DD/MM/YYYY", function (value) {
      return dayjs(value, "DD/MM/YYYY").isValid();
    })
    .required("Obrigatório"),
});

const SignUp = () => {
  const formik = useFormik({
    validationSchema: SignUpSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      birthday: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });

  return (
    <>
      <h2>Validando formulário com Formik e Yup</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName && (
            <div className="error">{formik.errors.firstName}</div>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName && (
            <div className="error">{formik.errors.lastName}</div>
          )}
        </div>
        <div>
          <label htmlFor="birthday">Birthday</label>
          <input
            id="birthday"
            name="birthday"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.birthday}
          />
          {formik.errors.birthday && (
            <div className="error">{formik.errors.birthday}</div>
          )}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
          {formik.errors.age && (
            <div className="error">{formik.errors.age}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
