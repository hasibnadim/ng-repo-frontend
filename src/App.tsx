import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header';
import {
  Route,
  Routes,
} from "react-router-dom";
import { Container, Spinner } from 'react-bootstrap';
import ListOfContributors from './components/ListOfContributors';
import axios from 'axios';
import ContributorsDetails from './components/ContributorsDetails';
import RepoDetails from './components/RepoDetails';


axios.defaults.baseURL = "http://localhost:3000"
export interface CntList {
  login: string,
  avatar_url: string
}
export type IContributors = CntList[] | undefined | string

function App() {
  const [contributroList, setContributroList] = useState<IContributors>()
  useEffect(() => {
    axios.get(`/contributors`).then((data: any) => {
      setContributroList(data.data);
    }).catch((err) => {
      setContributroList(err.response.data.message);
    })
  }, [])
  return (
    <div className="App">
      <Header />
      <Container>
        {!contributroList || typeof contributroList==='string' ?
          <div className='p-3'><Spinner animation="grow" />
            <h2>Please Wait...</h2>
            <h3>{contributroList||"Data proccessing"}.</h3></div> :
          <Routes>
            <Route path="/" element={<ListOfContributors contributroList={contributroList} />}></Route>
            <Route path="/c/:login" element={<ContributorsDetails />}></Route>
            <Route path="/r/:owner_name/:name" element={<RepoDetails />}></Route>
          </Routes>
        }
      </Container>

    </div>
  )
}

export default App
