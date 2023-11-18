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
        setSelectedParty(party);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.partiesOuterPageContainer}>
            <div className={styles.partiesPageContainer}>
                <div className={styles.headerWrapper}>
                    <img src={randomHeaderImage} alt="Header" className={styles.backgroundImage} />
                    <h1 className={styles.headerText}>{textContent.pages.partiesPage.name}</h1>
                </div>
                <div className={styles.pageDescriptionsDetails}>
                    <h2>{textContent.pages.partiesPage.detail} </h2>
                </div>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={[selectedParty]}
                    togglePartySelection={handlePartySelection}
                />

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
