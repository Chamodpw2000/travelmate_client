
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../../context/ClientContext';

const SearchBar = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { allDetails } = useContext(ClientContext);

    useEffect(() => {
        if (allDetails) {
            const transport = allDetails.transport || [];
            console.log("tra",transport);
            
            const acc = allDetails.accommodations || [];
            const des = allDetails.destinations || [];
            const guids = allDetails.guids || [];
            const cities = allDetails.cities || [];
            const hospitals = allDetails.hospitals || [];
            setData([...cities, ...acc, ...des, ...guids, ...transport,...hospitals]);
        }
    }, [allDetails]);

    const filteredData = data
        .filter((data) => data.name && data.name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 6);

    const handleClick = (dataId, type) => {
        console.log("dataId", dataId);
        console.log("type", type);
        
        if (type === "city") {
            navigate(`/city/${dataId}`)
        }
        else if (type === "Accommodations") {
            navigate(`/accommodations/${dataId}`)
        }
        else if (type === "Destinations") {
            navigate(`/destinations/${dataId}`)
        }else if (type === "Guides") {
            navigate(`/guide/${dataId}`)
        }else if (type === "TransportationServices") {
            navigate(`/transportation/${dataId}`)
        }else if (type === "Hospitals") {
            navigate(`/hospital/${dataId}`)
        }


    };

    return (
        <div className="search-container px-5">
            <div className="">
                <Form className="">
                    <Form.Group>
                        <Form.Control
                            type="text"
                            className="search-input"
                            placeholder="Search for anything..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>

            <div className="search-results">
                {search && filteredData.length > 0 ? (
                    filteredData.map((data) => (
                        <div
                            key={data.id}
                            className="result-card"
                            onClick={() => handleClick(data.id, data.type)}
                        >
                            <div className="result-content">
                                <div className="result-info">
                                    <p style={{
                                        margin: 0,
                                        fontSize: '1rem',
                                        color: '#000000',
                                        fontWeight: 500
                                    }}>{data.name}</p>                                    <span className="result-separator">—</span>
                                    <p style={{
                                        margin: 0,
                                        fontSize: '1rem',
                                        color: '#333333',
                                        fontWeight: 400
                                    }}>{data.miniDescription}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : search && filteredData.length === 0 ? (
                    <p className="no-results">No results found</p>
                ) : null}
            </div>
        </div>
    );
};

export default SearchBar;
