import React, {FC, useContext} from "react";
import {CinemaContext} from "../contexts/CinemaContext";
import {Sit} from "../types/CinemaTypes";
import {SitElement} from "./SitElement";
import CinemaService from "../services/CinemaService";
import {v4 as uuid} from "uuid";

export const SelectedSits: FC = () => {
    const {getSelectedSits, selectSit, saveSitAction} = useContext(CinemaContext);
    const selectedSits = getSelectedSits();

    const displaySelectedSits = selectedSits.length > 0 ? selectedSits.map((sit: Sit) => {
        return <SitElement handleSelect={selectSit} sit={sit} displayRow={true} key={uuid()} index={sit.index}/>
    }) : <div>Brak wybranych miejsc</div>;

    const save = async () => {
        const response = await CinemaService.updateStatuses(selectedSits);
        if(response.status === "SUCCESS"){
            saveSitAction();
        }
    }
    return(
        <div className="selected-sits">
            <div className="selected-sits-container">
                <div>Wybrane miejsca:</div>
                <div className="mt-10">{displaySelectedSits}</div>
            </div>
            {selectedSits.length > 0 &&
                <button className="button mb-10" onClick={()=>{save()}}>Zatwierdź</button>
            }
        </div>
    );
}