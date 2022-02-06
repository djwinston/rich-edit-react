import React from 'react'

// import 'devextreme/dist/css/dx.dark.css'
// import 'devexpress-richedit/dist/dx.richedit.css'

import { create, RichEdit, DocumentFormat } from 'devexpress-richedit'

import documentAsBase64 from '../data/doc'
import { newDataSource } from '../data/params'

const RichEditMerge = ({ options }) => {
  const richEditorRef = React.useRef(() => new RichEdit())

  React.useEffect(() => {
    try {
      // if (richEditorRef.current.document) return
      richEditorRef.current = create(document.getElementById('richEdit'), options)
      richEditorRef.current.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      richEditorRef.current.mailMergeOptions.setDataSource(newDataSource)
      // richEditorRef.current.selection.activeSubDocument.fields.create(richEditorRef.current.selection.active, 'MERGEFIELD fieldName');
      richEditorRef.current.selection.activeSubDocument.fields.createMergeField(richEditorRef.current.selection.active, 'City');
      console.log(`TCL>>> ~ richEditorRef.current.selection.activeSubDocument.fields`, richEditorRef.current.selection.activeSubDocument.fields)
      console.log(`TCL>>> ~ richEditorRef.current.selection.active`, richEditorRef.current.selection.active)
      // console.log(`TCL>>> ~ newDataSource`, newDataSource)
      // richEditorRef.current.events.saving.addHandler(function (s, e) {
      //   console.log('handleSave =>', e)
      //   e.handled = false
      // })
      // richEditorRef.current.saveDocument(DocumentFormat.Rtf)
    } catch (error) {
      console.log('rich edit merge ERROR', error)
    }
  }, [options])

  return <div id="richEdit">Rich Merge</div>
}

export default RichEditMerge
