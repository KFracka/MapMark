// client/src/components/TopSection.jsx
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const TopSection = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    setShowAddMarkerModal,
    setShowDeleteMarkerModal,
}) => {
    const handleSearchClick = async () => {
    await handleSearch();
};

    return (
        <Row className="mt-3 justify-content-center align-items-center" style={{ height: '10%' }}>
            <Col md={6}>
                <Form className="text-center">
                    <Form.Group controlId="searchQuery" className="mb-2 mr-sm-2">
                        <Form.Control
                            type="text"
                            placeholder="Search for a location"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </Form.Group>
                    <Button
                        variant="success"
                        onClick={() => setShowAddMarkerModal(true)}
                        className="mb-2 ml-2"
                        style={{ width: 'calc(33% - 2px)' }}
                    >
                        Add Marker
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSearchClick}
                        className="mb-2 ml-2"
                        style={{ width: 'calc(33% - 2px)' }}
                    >
                        Search
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteMarkerModal(true)}
                        className="mb-2 ml-2"
                        style={{ width: 'calc(33% - 2px)' }}
                    >
                        Delete Marker
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default TopSection;