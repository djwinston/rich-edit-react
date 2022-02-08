import React from 'react'

import 'devextreme/dist/css/dx.dark.css'
import 'devexpress-richedit/dist/dx.richedit.css'

import { create, RichEdit, DocumentFormat } from 'devexpress-richedit'

import ApplyButton from './Button'
import { newDataSource } from '../data/params'
import documentAsBase64 from '../data/doc'

class RichEditComponent extends React.Component {
  rich = RichEdit
  richEditor = React.createRef()

  handleClick = () => {
    console.log('handleClick')    
    this.rich.hasUnsavedChanges = true
    this.rich.saveDocument()
  }

  componentDidMount() {
    try {
      this.rich = create(document.getElementById('richEdit'), this.props.options)

      this.rich.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)
      this.rich.mailMergeOptions.setDataSource(newDataSource)

      this.rich.events.saving.addHandler(function (s, e) {
        console.log('handleSave =>', e)
        e.handled = false
      })

      this.rich.saveDocument(DocumentFormat.Rtf)
    } catch (error) {
      console.log('Rich ERROR', error)
    }
  }

  render() {
    return (
      <>
        <div id="richEdit" ref={this.richEditor}></div>
        <ApplyButton click={this.handleClick} />
      </>
    )
  }
}

export default RichEditComponent
