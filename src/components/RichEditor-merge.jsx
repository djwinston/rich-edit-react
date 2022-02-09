import React from 'react'

// import 'devextreme/dist/css/dx.dark.css'
// import 'devexpress-richedit/dist/dx.richedit.css'

import {
  create,
  RichEdit,
  DocumentFormat,
  /* MergeMode,
  UpdateFieldsOptions, */
  MailMergeTabCommandId,
} from 'devexpress-richedit'

import documentAsBase64 from '../data/doc'
import { newDataSource } from '../data/params'
import ApplyButton from './Button'

const RichEditMerge = ({ options }) => {
  const richEditorRef = React.useRef(() => new RichEdit())

  const handleClick = () => {
    richEditorRef.current.hasUnsavedChanges = true
    richEditorRef.current.saveDocument()
  }

  React.useEffect(() => {
    try {
      const el = document.getElementById('richEdit')
      richEditorRef.current = create(el, options)
      richEditorRef.current.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      richEditorRef.current.mailMergeOptions.setDataSource(newDataSource)
      richEditorRef.current.saveDocument(DocumentFormat.Rtf)

      richEditorRef.current.executeCommand(MailMergeTabCommandId.ToggleViewMergedData, true)
      
      el.remove()
    } catch (error) {
      console.log('rich edit merge ERROR', error)
    }
  }, [options])

  return (
    <>
      <div /* style={{display: 'none'}} */>
        <div id="richEdit">{/* Rich Merge */}</div>
      </div>
      <ApplyButton click={handleClick} />
    </>
  )
}

export default RichEditMerge
