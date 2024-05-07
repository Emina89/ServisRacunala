// ServisniNaloziService.js
import { HttpService } from "./HttpService";


const ime = '/ServisniNalozi';

async function get() {
    try {
        const odgovor = await HttpService.get(ime);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function post(nalog) {
    try {
        const odgovor = await HttpService.post(ime, nalog);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function put(id, nalog) {
    try {
        const odgovor = await HttpService.put(ime + '/' + id, nalog);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function _delete(idNaloga) {
    try {
        const odgovor = await HttpService.delete(ime + '/' + idNaloga);
        return { greska: false, poruka: odgovor.data.poruka };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function getById(id) {
    try {
        const odgovor = await HttpService.get(ime + '/' + id);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

export default {
    get,
    post,
    _delete,
    getById,
    put
}