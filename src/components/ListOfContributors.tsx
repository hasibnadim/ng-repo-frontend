import React from 'react'
import { ListGroup, Table } from 'react-bootstrap'
import { CntList, IContributors } from '../App'
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';

const ListOfContributors = ({ contributroList }: { contributroList: IContributors }) => {
    const columns: TableColumn<CntList>[] = [
        {
            name: '#',
            cell(row, rowIndex, column, id) {
                return rowIndex+1
            },
        },
        {
            name: 'Avater',
            cell(row, rowIndex, column, id) {
                return <img src={row.avatar_url} alt={row.login} width={40}/>
            },
        },
        {
            name: 'Username',
            cell(row, rowIndex, column, id) {
                return <Link to={"/c/"+row.login}>{row.login}</Link>
            },
        },
    ];
    return (
        <div>
            <h1>All Contributors list of Angular repo</h1>
            <br />
            {(contributroList && typeof contributroList !=='string')?
                <DataTable
                pagination
                    columns={columns}
                    data={contributroList}
                />
                : <h3>{contributroList}</h3>}
        </div>
    )
}

export default ListOfContributors
/**
 * const ListOfContributors = ({ contributroList }: { contributroList: IContributors }) => {
    const Row = ({ index }: { index: number }) => (
        <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} >
            {typeof contributroList === "string" ? <h1>{contributroList}</h1> :
                contributroList?.[index]?.login
            }
        </div>
    );
    return (
        <div>
            <h1>All Contributors list of Angular repo</h1>
            <br />
            
            {typeof contributroList === "string" ? <h1>{contributroList}</h1> :
                <List
                    height={"80vh"}
                    itemCount={contributroList?.length || 0}
                    itemSize={10}
                    layout="horizontal"
                    width={500}
                >
                    {Row}
                </List>
            }
        </div>
    )
}

 */