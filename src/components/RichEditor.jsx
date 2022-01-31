import React from 'react'
// import './App.css';

import 'devextreme/dist/css/dx.dark.css'
import 'devexpress-richedit/dist/dx.richedit.css'

import { richEditSelectBoxOptions, richEditSelectBoxOptions2 } from '../data/params'

import {
  create,
  createOptions,
  RichEdit,
  ViewType,
  RichEditUnit,
  DocumentFormat,
  RibbonButtonItem,
  RibbonSelectBoxItem,
} from 'devexpress-richedit'

import ArrayStore from 'devextreme/data/array_store'
import ApplyButton from './Button'

class RichEditComponent extends React.Component {
  rich = RichEdit
  richEditor = React.createRef()

  handleClick = () => {
    console.log('handleClick')
    // console.log(this.rich.document.length);
    // this.rich.fullScreen = true
    this.rich.hasUnsavedChanges = true
    this.rich.saveDocument()
  }

  componentDidMount() {
    // the createOptions() method creates an object that contains RichEdit options initialized with default values
    const options = createOptions()

    console.log('options', options)

    const ribonTabs = options.ribbon.tabs.filter((tab) => !tab.contextTab)
    const getTabIndexByName = (tabName) => ribonTabs.findIndex((tab) => tab.title === tabName)
    console.log(getTabIndexByName('Insert'))

    console.log('RibbonButtonItem', RibbonButtonItem.prototype)
    const newButton = new RibbonButtonItem('template_params', 'Template', {
      showText: true,
      icon: 'dxre-icon-AlignFloatingObjectBottomLeft',
    })

    const sourceData = new ArrayStore({ data: richEditSelectBoxOptions2, key: 'id' })
    console.log(`TCL>>> ~ sourceData`, sourceData)

    console.log(`TCL>>> ~ richEditSelectBoxOptions`, richEditSelectBoxOptions)
    const newSelectBox = new RibbonSelectBoxItem(
      'templateSelect',
      new ArrayStore({ data: richEditSelectBoxOptions2[0].collection, key: 'key' }),
      {
        beginGroup: true,
        width: 150,
        displayExpr: 'name',
        valueExpr: 'key',
        placeholder: 'Parameter',
      }
    )

    const tabNameInsert = options.ribbon.getTab(getTabIndexByName('Insert'))
    tabNameInsert.insertItem(newButton, 10)
    tabNameInsert.insertItem(newSelectBox, 4)

    console.log(tabNameInsert.items[0], newButton)

    options.bookmarks.visibility = true
    options.bookmarks.color = '#ff0000'

    options.confirmOnLosingChanges.enabled = true
    options.confirmOnLosingChanges.message =
      'Are you sure you want to perform the action? All unsaved document data will be lost.'

    options.fields.updateFieldsBeforePrint = true
    options.fields.updateFieldsOnPaste = true
    options.document.protect = 'www'

    options.mailMerge.activeRecord = 2
    options.mailMerge.viewMergedData = true
    options.mailMerge.dataSource = [
      { Name: 'Indy', age: 32 },
      { Name: 'Andy', age: 29 },
    ]

    // events
    options.events.activeSubDocumentChanged = () => {}
    options.events.autoCorrect = () => {}
    options.events.calculateDocumentVariable = () => {}
    options.events.characterPropertiesChanged = () => {}
    options.events.contentInserted = () => {}
    options.events.contentRemoved = () => {}
    options.events.documentChanged = () => {}
    options.events.documentFormatted = () => {}
    options.events.documentLoaded = () => {}
    options.events.gotFocus = () => {}
    options.events.hyperlinkClick = () => {}
    options.events.keyDown = () => {}
    options.events.keyUp = () => {}
    options.events.paragraphPropertiesChanged = () => {}
    options.events.lostFocus = () => {}
    options.events.pointerDown = () => {}
    options.events.pointerUp = () => {}
    options.events.saving = (e) => {
      console.log('saving ======>', e)
    }
    options.events.saved = (e) => {
      console.log('>>>>>Saved', e)
    }
    options.events.selectionChanged = (s, e) => {
      // console.log('selection', s.selection.active)
    }
    options.events.customCommandExecuted = (s, e) => {
      console.log('s', s)
      console.log('e', e)
      switch (e.commandName) {
        case 'insertEmailSignature':
          s.document.insertParagraph(s.document.length)
          s.document.insertText(s.document.length, '_________')
          s.document.insertParagraph(s.document.length)
          s.document.insertText(s.document.length, 'Best regards,')
          s.document.insertParagraph(s.document.length)
          s.document.insertText(s.document.length, 'John Smith')
          s.document.insertParagraph(s.document.length)
          s.document.insertText(s.document.length, 'john@example.com')
          s.document.insertParagraph(s.document.length)
          s.document.insertText(s.document.length, '+1 (818) 844-0000')
          break
        case 'template_params':
          s.document.insertText(s.document.length, '{{ custom Template }}')
          break
        case 'templateSelect':
          s.document.insertText(s.selection.active, `{{ ${e.parameter} }}`)
          break
        default:
          console.log('RichEditor custom command not found')
      }
    }

    options.unit = RichEditUnit.Inch

    options.view.viewType = ViewType.PrintLayout
    options.view.simpleViewSettings.paddings = {
      left: 15,
      top: 15,
      right: 15,
      bottom: 15,
    }
    options.exportUrl = 'http://localhost:3030/richserver'

    options.readOnly = false
    options.width = '1400px'
    options.height = '1400px'

    this.rich = create(document.getElementById('richEdit'), options)

    var documentAsBase64 =
      'e1xydGYxXGRlZmYwe1xmb250dGJse1xmMCBDYWxpYnJpO319e1xjb2xvcnRibCA7XHJlZDB' +
      'cZ3JlZW4wXGJsdWUyNTUgO1xyZWQyNTVcZ3JlZW4yNTVcYmx1ZTI1NSA7fXtcKlxkZWZjaHAgXGZzMjJ9e1xzdHl' +
      'sZXNoZWV0IHtccWxcZnMyMiBOb3JtYWw7fXtcKlxjczFcZnMyMiBEZWZhdWx0IFBhcmFncmFwaCBGb250O317XCp' +
      'cY3MyXGZzMjJcY2YxIEh5cGVybGluazt9e1wqXHRzM1x0c3Jvd2RcZnMyMlxxbFx0c3ZlcnRhbHRcdHNjZWxsY2J' +
      'wYXQyXHRzY2VsbHBjdDBcY2x0eGxydGIgTm9ybWFsIFRhYmxlO319e1wqXGxpc3RvdmVycmlkZXRhYmxlfXtcaW5' +
      'mb31cbm91aWNvbXBhdFxzcGx5dHduaW5lXGh0bWF1dHNwXGV4cHNocnRuXHNwbHRwZ3BhclxkZWZ0YWI3MjBcc2V' +
      'jdGRcbWFyZ2xzeG4xNDQwXG1hcmdyc3huMTQ0MFxtYXJndHN4bjE0NDBcbWFyZ2JzeG4xNDQwXGhlYWRlcnk3MjB' +
      'cZm9vdGVyeTcyMFxwZ3dzeG4xMjI0MFxwZ2hzeG4xNTg0MFxjb2xzMVxjb2xzeDcyMFxwYXJkXHBsYWluXHFse1x' +
      'mczIyXGNmMFxjczEgRG9jdW1lbnQgdGV4dH1cZnMyMlxjZjBccGFyfQ=='
    this.rich.openDocument(documentAsBase64, 'DocumentName', DocumentFormat.Rtf)

    this.rich.events.saving.addHandler(function (s, e) {
      console.log('handleSave =>', e)
      e.handled = false
    })

    this.rich.saveDocument(DocumentFormat.Rtf)
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
