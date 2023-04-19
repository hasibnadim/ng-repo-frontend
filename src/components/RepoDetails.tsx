import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';
interface IDetails {
    name: string
    full_name: string
    description: string
    watchers: number
    forks: number
    language: string
}
interface IContributors {
    login: string,
    avatar_url: string,
    contributions: number
}
const RepoDetails = () => {
    let { name,owner_name } = useParams();
    const [details, setDetails] = useState<IDetails | string>()
    const [contributors, setContributors] = useState<IContributors[]>()
    useEffect(() => {
        axios.get(`/repo/${owner_name}/${name}`).then((data: any) => {
            setDetails(data.data.repo)
            setContributors(data.data.contributors)
        }).catch((err) => {
            setDetails(err.response.data.message)
        })
    }, [name])
    const columns: TableColumn<IContributors>[] = [
        {
            name: '#',
            cell(row, rowIndex, column, id) {
                return rowIndex + 1
            },
        },
        {
            name: 'Avater',
            cell(row, rowIndex, column, id) {
                return <img src={row.avatar_url} alt={row.login} width={40} />
            },
        },
        {
            name: 'Username',
            cell(row, rowIndex, column, id) {
                return <Link to={"/c/" + row.login}>{row.login}</Link>
            },
        },
        {
            name:"Contributions",
            selector:row=>row.contributions
        }
    ];
    return (
        <div className='p-1'>
            <h3>Repository</h3>
            {typeof details === "string" ? <h2>{details}</h2> : <>
                {!details ? <div className='p-3'><Spinner animation="grow" />
                    <h2>Please Wait...</h2> </div> :
                    <> <Row>
                        <Col md={6}>
                            <h4><b>{details.full_name}</b></h4>
                            <h5>{details.description}</h5>
                            <p>{details.language}</p>

                        </Col>
                        <Col md={6}>
                            <p>Watchers: {details.watchers}</p>
                            <p>Forks: {details.forks}</p>

                        </Col>
                    </Row></>}</>}
            <hr />
            <h3>Contributors</h3>
            {contributors ? <DataTable
                pagination
                columns={columns}
                data={contributors}
            /> : <h3>No data found</h3>}

        </div>
    )
}

export default RepoDetails