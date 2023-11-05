import React, { useState } from 'react';
import PartyList from "../../Components/partyList/PartyList";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import usePartyPositions from "../../hooks/usePartyPositions";
import partiesData from '../../data/parties.json';
import styles from './PartiesPage.module.scss';
import Modal from "../../Components/modal/Modal";
import ParallaxBackground from "../../Components/parallaxBackground/ParallaxBackground";


function PartiesPage() {
    const [selectedParty, setSelectedParty] = useState(null);
    const [positions] = usePartyPositions(selectedParty);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePartySelection = (party) => {
        setSelectedParty(party);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <ParallaxBackground backgroundImage="/images/backgrounds/allemaal.png" />

            <div className={styles.partiesPageContainer}>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={[selectedParty]}
                    togglePartySelection={handlePartySelection}
                />

                <Modal isShowing={isModalOpen} hide={closeModal}>
                    {selectedParty && (
                        <div className={styles.selectedPartyInfo}>
                            <h1>Selected Party: {selectedParty}</h1>
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
    );
}

export default PartiesPage;
