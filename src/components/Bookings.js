import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import EmptyState from "./EmptyState";
import BookingService from '../services/BookingService';
import AuthService from '../services/AuthService';
import Loading from './Loading';
import { Modal } from 'react-bootstrap';
import Review from './Review';

const Bookings = (data) => {
    const columns = [ 
        { name: 'ID', selector: row => row.id, sortable: true, },
        { name: 'Name', selector: row => row.name, sortable: true, },
        { name: 'Location', selector: row => row.location, sortable: true, },
        { name: 'Email', selector: row => row.email, sortable: true, },
        { name: 'From', selector: row => row.from, sortable: true, },
        { name: 'To', selector: row => row.to, sortable: true, },
        { name: 'Hours', selector: row => row.hours, sortable: true, },
        { name: 'Rate (£)', selector: row => row.rate, sortable: true, },
        { name: 'Total (£)', selector: row => row.total, sortable: true, },
        { name: 'Actions', cell: row => ((data.userType == 3 && row.status == 'expired') &&(
            <div>
              <button className="btn btn-sm w-100 primary-background" onClick={() => handleEdit(row)}>Review</button>
            </div>
          )),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true, 
        },
    ]; 
      
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setPageLoad] = useState(true);
    const [show, setShow] = useState(false);
    const [row, setRow] = useState({});
    
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        const filtered = filteredData.filter(item =>
            item.id.toString().toLowerCase().includes(value) ||
            item.name.toLowerCase().includes(value) ||
            item.location.toString().includes(value) ||
            item.email.toString().includes(value) ||
            item.from.toString().includes(value) ||
            item.to.toString().includes(value) ||
            item.hours.toString().includes(value) ||
            item.rate.toString().includes(value) ||
            item.total.toString().includes(value) 
        );

        setFilteredData(filtered);
    };

    const handleEdit = (row) => {
        setRow(row);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setRow({});
    };

    useEffect(() => {    
        BookingService.getByUser(AuthService.getUserId()).then(
          (response) => {
            setFilteredData(response.data);
            setPageLoad(false);
          },
          (error) => {
            error.response && error.response.data.error
              ? console.log(error.response.data.error)
              : console.log("Network error. Please try again later.");
            
              setPageLoad(false);
          }
        );
    }, []);

    return (
        <>        
            <div className="container">
                <h3 className="mb-3">Bookings</h3>

                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control mb-3"
                    value={searchText}
                    onChange={handleSearch}
                />
                { isLoading && <Loading /> }

                { (!isLoading && filteredData.length > 0) && (
                        <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                        />
                    ) 
                }

                { (!isLoading && filteredData.length == 0) && (
                        <EmptyState />
                    ) 
                }
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> {row.location} </Modal.Title>
                </Modal.Header>
                <Modal.Body>   
                    {Review(row)}        
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Bookings;