import React, {FC, useContext, useEffect} from "react";
import {Sit} from "../types/CinemaTypes";
import {CinemaContext} from "../contexts/CinemaContext";
import {SitElement} from "./SitElement";
import CinemaService from "../services/CinemaService";
import {v4 as uuid} from "uuid";

export const Cinema: FC = () => {
    const {sits, selectSit, setSits} = useContext(CinemaContext);

    useEffect(()=>{
        async function fetchData(){
            const sits = await CinemaService.getSits();
            if(sits.status === "SUCCESS"){
                setSits(sits.data);
            }
        }
        fetchData()
    }, [])

    function groupBy(arr: Sit[], prop: string): Array<Sit[]> {
        const map = new Map(Array.from(arr, obj => [obj[prop], []]));
        arr.forEach(obj => map.get(obj[prop]).push(obj));
        return Array.from(map.values());
    }

    let sitGroup = groupBy(sits, "row")

    const handleSelectSit = (sit: Sit) => {
        selectSit(sit);
    }

    const displaySits = sitGroup.length > 0 ? (sitGroup.map((sits: Sit[]) => {
        return (
            <div key={uuid()} className="sit-row">{
                sits.map((sit: Sit, index: number) => {
                    return <SitElement sit={sit} index={index} handleSelect={handleSelectSit} key={index}/>
                })
            }</div>
        )})) : (<div>Brak danych</div>);

    const displayColumn = () => {
        return(
            <div className="index-row">
                {sitGroup.map((sit: Sit[], index: number) => {
                    return <div className="sit-index" key={uuid()}>{index+1}</div>
                })}
            </div>
        );
    }

    return(
        <div className="cinema">
            <h1>Miejsca na sali kinowej</h1>
            <div className="center-sits">
                {sitGroup.length > 0 &&
                    <div>Miejsca</div>
                }
                {displaySits}
            </div>
            <div className="index-column">
                {sitGroup.length > 0 &&
                    <div>Rząd</div>
                }
                <div>{displayColumn()}</div>
            </div>
        </div>
    );
}