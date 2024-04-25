import { HttpService } from "./HttpService";

const ime = '/ServisniNalozi';

async function get() {
    return await HttpService.get(ime)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}



async function post(nalog) {
    return await HttpService.post(ime, nalog)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function put(id, nalog) {
    return await HttpService.put(ime + '/' + id, nalog)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function _delete(idNaloga) {
    return await HttpService.delete(ime + '/' + idNaloga)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data.poruka };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function getById(id) {
    return await HttpService.get(ime + '/' + id)
        .then((o) => {
            return { greska: false, poruka: o.data }
        })
        .catch((e) => {
            return { greska: true, poruka: e }
        });
}

export default {
    get,
    post,
    _delete,
    getById,
    put
}
