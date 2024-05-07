// PrimkaServisaService.js
import { HttpService } from './HttpService';

const ime = '/PrimkaServisa';

async function get() {
    try {
        const odgovor = await HttpService.get(ime);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function post(primkaServisa) {
    try {
        const odgovor = await HttpService.post(ime, primkaServisa);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function put(id, primkaServisa) {
    try {
        const odgovor = await HttpService.put(ime + '/' + id, primkaServisa);
        return { greska: false, poruka: odgovor.data };
    } catch (e) {
        return { greska: true, poruka: e };
    }
}

async function _delete(idPrimkaServisa) {
    try {
        const povezaniServisniNalozi = await HttpService.get('/ServisniNalozi/?primkaServisaId=' + idPrimkaServisa);
        if (povezaniServisniNalozi.data.length > 0) {
            return { greska: true, poruka: 'Ne možete obrisati ovu primku servisa jer je povezana s jednim ili više servisnih naloga.' };
        }
        const odgovor = await HttpService.delete(ime + '/' + idPrimkaServisa);
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
};
