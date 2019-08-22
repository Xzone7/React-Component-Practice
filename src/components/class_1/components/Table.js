import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
    render() {
        return (
            <table className="myTable">
                <tbody>
                    <tr>
                        <td></td>
                        <td>Knocky</td>
                        <td>Flor</td>
                        <td>Ella</td>
                        <td>Juan</td>
                    </tr>
                    <tr>
                        <td>Breed</td>
                        <td>Jack Russell</td>
                        <td>Poodle</td>
                        <td>StreetDog</td>
                        <td>Cocker Spaniel</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>16</td>
                        <td>9</td>
                        <td>10</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Owner</td>
                        <td>Mother-in-law</td>
                        <td>Me</td>
                        <td>Me</td>
                        <td>Sister-in-law</td>
                    </tr>
                    <tr>
                        <td>Eating Habits</td>
                        <td>Eats everyone's leftovers</td>
                        <td>Nibbles at food</td>
                        <td>Hearty eater</td>
                        <td>Will eat till he explodes</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;