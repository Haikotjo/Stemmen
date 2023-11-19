import React, { useState } from 'react';
import PartyList from "../../Components/partyList/PartyList";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import usePartyPositions from "../../hooks/usePartyPositions";
import partiesData from '../../data/parties.json';
import styles from './PartiesPage.module.scss';
import Modal from "../../Components/modal/Modal";
import textData from '../../data/textData.json';
import { getPartyImage, getRandomImagePage } from "../../utils/utils";
import { useLanguage } from "../../context/LanguageContext";
import PageHeader from "../../Components/pageHeader/PageHeader";

// PartiesPage component definition
// This component displays a list of parties and their respective positions on various topics
function PartiesPage() {
    // State for handling selected party and modal visibility
    const [selectedParty, setSelectedParty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const randomHeaderImage = getRandomImagePage();

    // Access language context for localization
    const { language } = useLanguage();
    const textContent = textData[language];

    // Retrieve party positions using a custom hook
    const [positions] = usePartyPositions(selectedParty);

    // Handler for selecting a party and opening the modal
    const handlePartySelection = (party) => {
        setSelectedParty(party);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.partiesOuterPageContainer}>
                <div className={styles.partiesPageContainer}>
                    {/* PageHeader component to display the page header with a random image */}
                    <PageHeader imageSrc={randomHeaderImage} title="STANDPUNTEN" />

                    {/* Display page description */}
                    <div className={styles.pageDescriptionsDetails}>
                        <h2>{textContent.pages.partiesPage.detail}</h2>
                    </div>

                    {/* PartyList component to list all parties */}
                    <PartyList
                        parties={partiesData.partijen}
                        selectedParties={[selectedParty]}
                        togglePartySelection={handlePartySelection}
                    />

                    {/* Modal component to display selected party's information */}
                    <Modal isShowing={isModalOpen} hide={closeModal}>
                        {selectedParty && (
                            <div className={styles.selectedPartyInfo}>
                                <img
                                    src={getPartyImage(selectedParty)}
                                    alt={`${selectedParty} logo`}
                                    className={styles.partyImage}
                                    onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/images/puppets/default.png`; }}
                                />
                                {Object.keys(positions).map((topic) => (
                                    <PartyPosition
                                        key={topic}
                                        topic={topic}
                                        position={positions[topic]}
                                    />
                                ))}
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default PartiesPage;
