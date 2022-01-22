import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TinyMCEditor = () => {
  const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent())
  }

  const API_KEY = process.env.REACT_APP_TINYMCE_APIKEY
  
  return (
    <Editor
      apiKey={API_KEY}
      initialValue="<p>Initial content</p>"
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
  )
}

export default TinyMCEditor
