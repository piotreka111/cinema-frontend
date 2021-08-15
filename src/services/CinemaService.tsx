import ApiService from "./ApiService";
import {Sit} from "../types/CinemaTypes";

const CinemaService = () => { };

CinemaService.getSits = async () =>{
    try {
        const response = await ApiService.request( {
            url: "/cinema",
            method: 'get'
        });
        return {
            status: 'SUCCESS',
            data: response.data.sits
        }
    }
    catch (error) {
        return {
            status: 'ERROR',
            error: error
        }
    }
}

CinemaService.updateStatuses = async (sits: Sit[]) =>{
    try {
        const response = await ApiService.request( {
            url: "/cinema",
            method: 'put',
            data: {
                sits: sits
            }
        });
        return {
            status: 'SUCCESS',
            data: response.data
        }
    }
    catch (error) {
        return {
            status: 'ERROR',
            error: error
        }
    }
}

export default CinemaService;