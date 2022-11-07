import Head from 'next/head'
import * as React from 'react';
import styles from '../styles/Home.module.scss'
import new_post_styles from "../styles/create-post.module.scss"
import {Formik, Form,} from 'formik';
import { strings } from '../src/localization/localization-create-post'
import ButtonConfirm from '../src/components/general/button/button-confirm';
import ButtonDanger from '../src/components/general/button/button-danger';
import TagSelector from "../src/components/general/tagSelector"
import CustomFooter from "../src/components/general/custom-footer"

interface FormValues{
  title: string;
  postBody: string;
  tags: string[];
}

let tags = ["Racism", "Poverty", "War", "Food", "Climate Change", "Rights"]

export default function CreatePost(){
  const initialValues: FormValues = {
    title: "",
    postBody: "",
    tags: [],
  }
  const [isSubmited, setIsSubmited] = React.useState<boolean>(false)
  return(
    <div className={styles.container}>
      <Head>
        <title>{strings.title}</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={new_post_styles.main}>
        <h1>{strings.title}</h1>
        {isSubmited ?
          <h2>{strings.submitted}</h2>
          :
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) =>{
              setIsSubmited(true);
            }}
          >
            {({handleSubmit, handleChange, values}) =>(

              <Form onSubmit={handleSubmit} className={new_post_styles.form}>
                <input
                  placeholder={strings.postTitle}
                  type="text"
                  name='title'
                  id='title'
                  onChange={handleChange}
                  value={values.title}
                  required
                />
                <TagSelector
                  className={new_post_styles.tagSelector}
                  instanceId="tags"
                  tags={tags}
                  placeholder={strings.tags}
                />
                <textarea
                  placeholder={strings.postBody}
                  name='postBody'
                  id='postBody'
                  rows={10}
                  cols={100}
                  onChange={handleChange}
                  value={values.postBody}
                  required
                />
                <div className='btn-container'>
                  <ButtonDanger type='reset'>{strings.discard}</ButtonDanger>
                  <ButtonConfirm type='submit'>{strings.post}</ButtonConfirm>
                </div>
              </Form>
            )}
          </Formik>
        }
      </main>
      <CustomFooter></CustomFooter>
    </div>
  )
}