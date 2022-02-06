import RichEditComponent from './components/RichEditor'
import RichEditComponent2 from './components/RichEditor2'
import RichEditMerge from './components/RichEditor-merge'
import HTMLEditor from './components/HtmlEditor'
import TinyMCEditor from './components/TinyMCE'
import FroalaEdit from './components/FroalaEditor'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
// import Home from './pages/Home'
import { ReactComponent as DevExpressLogo } from './img/devexpress.svg'
import { ReactComponent as TinyLogo } from './img/tiny.svg'

import options from './data/options'

const imgStyle = {
  verticalAlign: 'middle',
  padding: '0 10px 0 10px',
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/rich">
              <span>Rich Editor</span>
              <DevExpressLogo width={20} height={20} style={imgStyle} />
            </Link>
          </li>
          <li>
            <Link to="/rich2">
              <span>Rich Editor Clean function</span>
              <DevExpressLogo width={20} height={20} style={imgStyle} />
            </Link>
          </li>
          <li>
            <Link to="/rich3">
              <span>Rich Editor Merge</span>
              <DevExpressLogo width={20} height={20} style={imgStyle} />
            </Link>
          </li>
          <li>
            <Link to="/html">
              <span>HTML Editor</span>
              <DevExpressLogo width={20} height={20} style={imgStyle} />
            </Link>
          </li>
          <li>
            <Link to="/tiny">
              <span>Tiny MCE Editor</span>
              <TinyLogo height={25} style={{ verticalAlign: 'middle' }} />
            </Link>
          </li>
          <li>
            <Link to="/froala">
              <span>Froala Editor</span>
              <img
                src="https://froala.com/wp-content/uploads/2019/10/froala.svg"
                alt="Floara"
                height={35}
                style={imgStyle}
              ></img>
            </Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="rich" index element={<RichEditComponent />} />
        <Route path="rich2" index element={<RichEditComponent2 options={options} />} />
        <Route path="rich3" index element={<RichEditMerge options={options}/>} />
        <Route path="html" element={<HTMLEditor />} />
        <Route path="tiny" element={<TinyMCEditor />} />
        <Route path="froala" element={<FroalaEdit />} />
      </Route>
      <Route path="*" element={<p>Sorry, nothing here</p>} />
    </Routes>
  )
}

export default App
