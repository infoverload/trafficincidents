import React from 'react';

const IncidentLegend = () => {

    return (
        <div className="legend">
            <h5>Type</h5>
            <p>1 - unknown, 3 - accident cleared, 6 - traffic jam, 7 - roadwork, 8 - accident, 9 - long-term roadwork, 13 - unknown</p>
            <h5>Severity</h5>
            <p>0 - no delay, 1 - slow traffic, 2 - queuing traffic, 3 - stationary traffic, 4 - closed</p>
        </div>
    );
    
};

export default IncidentLegend;
