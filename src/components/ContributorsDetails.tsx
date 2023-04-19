import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, ListGroup, Row, Spinner, Table } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';

interface IDetails {
    "login": string, "id": 17877290, "avatar_url": string,
    "html_url": string,
}
interface IRepo {
    name: string,
    description: string
}
const ContributorsDetails = () => {
    let { login } = useParams();
    const [details, setDetails] = useState<IDetails | string>()
    const [repos, setRepos] = useState<IRepo[]>()
    useEffect(() => {
        axios.get(`/contributors/${login}`).then((data: any) => {
            setDetails(data.data.contributor)
            setRepos(data.data.repos)
        }).catch((err) => {
            setDetails(err.response.data.message)
        })
    }, [login])
    const columns: TableColumn<IRepo>[] = [
        {
            name: '#',
            cell(row, rowIndex, column, id) {
                return rowIndex + 1
            },
        },
        {
            name: 'Name',
            cell(row, rowIndex, column, id) {
                return <Link to={"/r/" + (details as IDetails).login+"/"+row.name}>{row.name}</Link>
            },
        },
        {
            name: 'Description',
            selector: row => row.description
        }
    ];
    return (
        <div className='p-1'>
            <h3>Contributor</h3>
            {typeof details === "string" ? <h2>{details}</h2> : <>
                {!details ? <div className='p-3'><Spinner animation="grow" />
                    <h2>Please Wait...</h2> </div> :
                    <> <Row>
                        <Col md={3}>
                            <img src={details.avatar_url} alt={details.login} width={100} /></Col>
                        <Col md={9}>

                            <p>User: {details.login}</p>
                            <a href={details.html_url} target='_blank'>Git Profile</a>
                        </Col>
                    </Row></>}</>}
            <hr />
            <h3>Repositories</h3>
            {repos ? <DataTable
                pagination
                columns={columns}
                data={repos}
            /> : <h3>No data found</h3>}

        </div>
    )
}

export default ContributorsDetails