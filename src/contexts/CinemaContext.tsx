import React, {Component, createContext} from "react";
import {Sit, SitStatus} from "../types/CinemaTypes";

export const CinemaContext = createContext(null);

class CinemaContextProvider extends Component {
    state = {
        sits: [],
        selectedSits: []
    };

    selectSit = (sit: Sit): void => {
        if (sit.status === SitStatus.TAKEN) {
            return;
        }
        const sits = this.state.sits;
        const sitIndex = sits.findIndex(el => el.id === sit.id);

        sit.status = sit.status === SitStatus.FREE ? SitStatus.SELECTED : SitStatus.FREE;
        if (sitIndex !== -1) {
            sits[sitIndex] = sit;
            this.setState({sits: sits});
        }
    }

    saveSitAction = () => {
        const sits = this.state.sits;
        const selectedSits = this.getSelectedSits();
        selectedSits.forEach((sit) => {
            const sitIndex = sits.findIndex(el => el.id === sit.id);
            if(sitIndex !== -1){
                sits[sitIndex].status = SitStatus.TAKEN;
            }
        })
        this.setState({
            sits: sits
        })
    }

    setSits = (sits: Sit[]) => {
        let s = sits.map((sit) => {
            let st = sit.status.toString();
            sit.status = st === "FREE" ? SitStatus.FREE : SitStatus.TAKEN;
            return sit;
        })

        this.setState({sits: s});
    }

    getSelectedSits = (): Sit[] => {
        return this.state.sits.filter((sit: Sit) => sit.status === SitStatus.SELECTED);
    }

    render() {
        return (
            <CinemaContext.Provider value={{
                ...this.state,
                selectSit: this.selectSit,
                getSelectedSits: this.getSelectedSits,
                setSits: this.setSits,
                saveSitAction: this.saveSitAction
            }}>
                {this.props.children}
            </CinemaContext.Provider>
        );
    }
}

export default CinemaContextProvider;