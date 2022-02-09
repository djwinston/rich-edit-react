import React from 'react'

import 'devextreme/dist/css/dx.dark.css'
import 'devexpress-richedit/dist/dx.richedit.css'

import { create, RichEdit, DocumentFormat, MailMergeTabCommandId } from 'devexpress-richedit'

import ApplyButton from './Button'
import { newDataSource } from '../data/params'
import documentAsBase64 from '../data/doc'

class RichEditComponent extends React.Component {
  rich = RichEdit
  
  handleSave = () => {
    console.log('handleSave')
    this.rich.hasUnsavedChanges = true
    this.rich.saveDocument()
  }

  componentDidMount() {
    const richEditEl = document.getElementById('richEdit')
    try {
      this.rich = create(richEditEl, this.props.options)

      this.rich.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      this.rich.saveDocument(DocumentFormat.Rtf)
      this.rich.mailMergeOptions.setDataSource(newDataSource)

      this.rich.events.saving.addHandler(function (s, e) {
        console.log('handleSave =>', e)
        e.handled = false
      })

      this.rich.events.documentLoaded.addHandler(function (s, e) {
        console.log('event doc loaded =>', e, s)
        s.executeCommand(MailMergeTabCommandId.ToggleViewMergedData, true)
      })

      // richEditEl.remove()
    } catch (error) {
      console.log('Rich ERROR', error)
    }
  }

  render() {
    return (
      <>
        <div id="richEdit"></div>
        <ApplyButton click={this.handleSave} />
      </>
    )
  }
}

export default RichEditComponent
