import React, { useState } from 'react';
import campaignsData from './campaignsData.json';
import CampaignModal from './CampaignModal';
import "./Campaigns.css"
import Navbar from '../components/Navbar/Navbar';

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="campaigns-container">
      <Navbar/>
      <h1>Current Campaigns</h1>
      <div className="campaign-list">
        {campaignsData.map((campaign) => (
          <div className="campaign-card" key={campaign.id}>
            <div className="campaign-header">
              <h2>{campaign.name}</h2>
              <p><strong>NGO: </strong>{campaign.ngo}</p>
            </div>
            <p className="campaign-description">{campaign.description}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${campaign.progress}%` }}></div>
            </div>
            <button className="view-details-btn" onClick={() => handleViewDetails(campaign)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <CampaignModal campaign={selectedCampaign} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Campaigns;
