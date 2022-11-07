import Head from 'next/head'
import * as React from 'react';
import Api from '../src/api';
import styles from '../styles/Home.module.scss'
import input_styles from "../styles/input.module.scss"
import { Formik, Form } from 'formik';
import { strings } from '../src/localization/localization-login'
import ButtonConfirm from '../src/components/general/button/button-confirm';
import Link from 'next/link';

import style from "../styles/login.module.scss";
interface LoginFormValues {
  username: string;
  password: string;
}

export default function Login() {
  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  }
  return (<>
    <div className={style.login}>
      <h1>{strings.loginMessage}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // Add login API call here
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <input
              placeholder={strings.username}
              className={input_styles['text-input']}
              type="text"
              id='username'
              name='username'
              onChange={handleChange}
              value={values.username}
              required
            />
            <input
              placeholder={strings.password}
              className={input_styles['text-input']}
              type="password"
              id='password'
              name='password'
              onChange={handleChange}
              value={values.password}
              required
            />
            <ButtonConfirm>{strings.login}</ButtonConfirm>
          </Form>
        )}
      </Formik>
      <h4>{strings.noAccount} <Link href="/register">{strings.register}</Link></h4>
    </div></>)
}
