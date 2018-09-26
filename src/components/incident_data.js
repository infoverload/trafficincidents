import React from 'react';

const IncidentData = (props) => {

    const incidents = props.data;
    
    return (
        <tbody> 
            {incidents.map((el) => {   
                return (
                    <tr key={el["id"]}>
                        <td>{el["p"]["x"]}, {el["p"]["y"]}</td>
                        <td>{el["l"]}</td>
                        <td>{el["d"]}</td>
                        <td>{el["ic"]}</td>
                        <td>{el["ty"]}</td>
                    </tr>
                )
            })} 
        </tbody>
    );

};

export default IncidentData;
