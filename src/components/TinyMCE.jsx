import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import ApplyButton from './Button'
import CONTENT from '../data/content'

const TinyMCEditor = () => {
  const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent())
  }

  const API_KEY = process.env.REACT_APP_TINYMCE_APIKEY
  const editorRef = useRef(null)

  const handleClick = () => {
    console.log('handleClick')
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey={API_KEY}
        initialValue={CONTENT}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',
        }}
        onChange={handleEditorChange}
      />
      <ApplyButton click={handleClick} />
    </>
  )
}

export default TinyMCEditor
