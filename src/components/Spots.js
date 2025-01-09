import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import { ButtonGroup, Modal } from 'react-bootstrap';
import EmptyState from "./EmptyState";
import AuthService from '../services/AuthService';
import SpotService from '../services/SpotService';
import Spot from './Spot';
import Loading from './Loading';
import Confirmation from './Confirmation';

const Spots = (data) => {
    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Image', selector: row => row.image, sortable: false },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Rate (£)', selector: row => row.rate, sortable: true },
        { name: 'Owner', selector: row => row.owner, sortable: true },
        { name: 'Actions', cell: row => (data.userType == 2 &&(
            <ButtonGroup className="w-100">
              <button className="btn btn-sm w-100 primary-background mr-2" onClick={() => handleShow(row)}>Edit</button>
              <button className="btn btn-sm w-100 btn-danger" onClick={() => handleDelete(row.id)}>Delete</button>
            </ButtonGroup>
          )),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true, 
        },
    ];
    
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [show, setShow] = useState(false);
    const [spot, setSpot] = useState({});
    const [isLoading, setPageLoad] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMEssage] = useState({ title: '', message: '', type: ''}); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        setSpot({});
        setShow(false);
    };

    const handleShow = (spot) => {
        setSpot(spot);
        setShow(true);
    };
    
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        const filtered = filteredData.filter(item =>
            item.id.toString().toLowerCase().includes(value) ||
            item.name.toLowerCase().includes(value) ||
            item.description.toLowerCase().includes(value) ||
            item.rate.toString().toLowerCase().includes(value) ||
            item.owner.toLowerCase().includes(value) 
        );

        setFilteredData(filtered);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDialog(true);
        setIsSubmitting(false);
    };
    
    const handleConfirm = () => {

        setIsSubmitting(true);

        SpotService.delete(deleteId).then(
            (response) => {
                setShowAlert(true);
                setAlertMEssage({
                    title: 'Success',
                    message: 'Spot deleted successfully.',
                    type: 'success'
                });
                
                setShowDialog(false);                

                setIsSubmitting(true);
                
                setTimeout(() => {
                    window.location.reload();
                }, 1000); 
            },
            (error) => {          
                const apiError = error.response && error.response.data.error
                    ? error.response.data.error
                    : 'Network error. Please try again later.';
                setShowAlert(true);
                setAlertMEssage({
                    title: 'Error',
                    message: apiError,
                    type: 'error'
                });
                setShowDialog(false);

                setIsSubmitting(true);
            }
        );
    };

    const handleCancel = () => {        
        setDeleteId(0);
        setShowDialog(false);
    };

    useEffect(() => {   
        SpotService.getByUser(AuthService.getUserId()).then(
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Spots</h3>
                    { data.userType == 2 && (
                        <button className="btn primary-background-color" onClick={() => handleShow(spot)}>
                            Add Spot
                        </button>
                    )}
                </div>

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
                    <Modal.Title> {spot?.id ? 'Update' : 'Add'} Spot</Modal.Title>
                </Modal.Header>
                <Modal.Body>   
                    {Spot(spot)}                        
                </Modal.Body>
            </Modal>
            <Confirmation
                show={showDialog}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item? This action cannot be undone."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default Spots;