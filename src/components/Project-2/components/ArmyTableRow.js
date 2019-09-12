import React from 'react';
import './ArmyTableRow.css';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/DeleteForeverRounded';
import Create from '@material-ui/icons/Create';

const ArmyTableRow = ({ data, handleClickEdit, handleClickDelete }) => {
    return (
        data.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{ele.avatar}</td>
                    <td>{ele.name}</td>
                    <td>{ele.sex}</td>
                    <td>{ele.rank}</td>
                    <td>{ele.start_date}</td>
                    <td>{ele.phone}</td>
                    <td>{ele.email}</td>
                    <td>{ele.superior.name}</td>
                    <td>{ele.num_of_ds.length > 0 ? ele.num_of_ds.length : null}</td>
                    <td>
                        <Button variant="outlined"
                            color="primary"
                            size="small">
                            <Create fontSize="medium" />
                        </Button>
                    </td>
                    <td>
                        <Button variant="outlined"
                            color="default"
                            size="small"
                            onClick={() => handleClickDelete(ele)}>
                            <Delete fontSize="medium" />
                        </Button>
                    </td>
                </tr>
            );
        })
    );
}

export default ArmyTableRow;