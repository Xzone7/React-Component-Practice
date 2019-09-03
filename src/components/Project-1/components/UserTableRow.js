import React from 'react';
import "./UserTableRow.css";
import Button from '@material-ui/core/Button';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/DeleteRounded';

const UserTableRow = ({ data, handleClickDelete }) => {
    return (
        data.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>
                        <Button variant="outlined" color="primary" size="small">
                            <div  className="project-1-editButton">
                                <span>
                                    <Create fontSize="small" />
                                </span>
                                <div>
                                    Edit
                                </div>
                            </div>
                        </Button>
                    </td>
                    <td>
                        <Button variant="outlined" color="default" size="small" onClick={() => handleClickDelete(ele._id)}>
                            <div  className="project-1-deleteButton">
                                <span>
                                    <Delete fontSize="small" />
                                </span>
                                <div>
                                    Delete
                                </div>
                            </div>
                        </Button>
                    </td>
                    <td>{ele.firstname}</td>
                    <td>{ele.lastname}</td>
                    <td>{ele.sex}</td>
                    <td>{ele.age}</td>
                </tr>
            );
        })
    );
};

export default UserTableRow;