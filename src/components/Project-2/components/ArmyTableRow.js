import React from 'react';
import './ArmyTableRow.css';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/DeleteForeverRounded';
import Create from '@material-ui/icons/Create';

const ArmyTableRow = ({ data, handleClickEdit, handleClickDelete, handleClickSuperiorView, handleClickSubordinateView }) => {
    return (
        data.map((ele, index) => {
            return (
                <tr key={index} id={index === data.length - 1 ? "last-row" : "internal-row"}>
                    <td><img src={`data:image/jpeg;base64,${atob(base64ArrayBuffer(ele.avatar_img.data))}`} alt="logo" className="row-thumbnail-img" /></td>
                    <td>{ele.name}</td>
                    <td>{ele.sex}</td>
                    <td>{ele.rank}</td>
                    <td>{ele.start_date}</td>
                    <td><a href={`facetime:${ele.phone}`}>{ele.phone}</a></td>
                    <td><a href={`mailto:${ele.email}`} target="_blank">{ele.email}</a></td>
                    <td><span id="chenxu-2019" onClick={() => handleClickSuperiorView(ele.superior._id)}>{ele.superior.name}</span></td>
                    <td><span id="chenxu-2019" onClick={() => handleClickSubordinateView(ele._id)}>{ele.num_of_ds.length > 0 ? ele.num_of_ds.length : null}</span></td>
                    <td>
                        <Button variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleClickEdit(ele._id)}>
                            <Create fontSize="small" />
                        </Button>
                    </td>
                    <td>
                        <Button variant="outlined"
                            color="default"
                            size="small"
                            onClick={() => handleClickDelete(ele)}>
                            <Delete fontSize="small" />
                        </Button>
                    </td>
                </tr>
            );
        })
    );
}

const base64ArrayBuffer = (arrayBuffer) => {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}

export default ArmyTableRow;