import React, {FC} from "react";
import {Sit, SitStatus} from "../types/CinemaTypes";

interface SitProps{
    sit: Sit,
    index: number,
    handleSelect: any
    displayRow?: boolean
}

export const SitElement: FC<SitProps> = (props: SitProps) => {
    props.sit.index = props.index;
    const { sit, index, displayRow, handleSelect} = props;

    const getStatus = (status:SitStatus) => {
        if(status === SitStatus.FREE){
            return "sit-free";
        }
        if(status === SitStatus.TAKEN){
            return "sit-taken";
        }
        if(status === SitStatus.SELECTED){
            return "sit-selected";
        }
    }

    return(
        <div className={"sit "+getStatus(sit.status)} onClick={() => {handleSelect(sit)}}>
            { !displayRow ?  (index+1) : "m:" + (index+1) + " rz:" + sit.row}
        </div>
    );
}