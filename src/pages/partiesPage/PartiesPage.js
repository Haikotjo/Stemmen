import React, { useState } from 'react';
import PartyList from "../../Components/partyList/PartyList";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import usePartyPositions from "../../hooks/usePartyPositions";
import partiesData from '../../data/parties.json';
import styles from './PartiesPage.module.scss';
import Modal from "../../Components/modal/Modal";
import textData from '../../data/textData.json';
import {getPartyImage, getRandomImagePage} from "../../utils/utils";
import {useLanguage} from "../../context/LanguageContext";



function PartiesPage() {
    const [selectedParty, setSelectedParty] = useState(null);
    const [positions] = usePartyPositions(selectedParty);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const randomHeaderImage =  getRandomImagePage();

    const { language } = useLanguage();
    const textContent = textData[language];

    const handlePartySelection = (party) => {

        console.log("Geselecteerde partij:", party);
        console.log("Posities voor de partij:", positions);
        setSelectedParty(party);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/*<ParallaxBackground backgroundImage="/images/backgrounds/keuzes.png" />*/}
            <div className={styles.headerWrapper}>
                <img src={randomHeaderImage} alt="Header" className={styles.backgroundImage} />
                <h1 className={styles.headerText}>DE PARTIJEN</h1>
            </div>
            <div className={styles.partiesPageContainer}>
                <div className={styles.pageDescriptionsDetails}>
                    <h2>{textContent.pageDescriptionsDetails.partiesPage}</h2>
                </div>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={[selectedParty]}
                    togglePartySelection={handlePartySelection}
                />

                <Modal isShowing={isModalOpen} hide={closeModal}>
                    {selectedParty && (
                        <div className={styles.selectedPartyInfo}>
                            <h1>{selectedParty}</h1>
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
    );
}

export default PartiesPage;
