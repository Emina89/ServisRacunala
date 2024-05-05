import { HttpService } from "./HttpService";

const ime = '/AktivnostServis';

async function get() {
    return await HttpService.get(ime)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function post(aktivnost) {
    return await HttpService.post(ime, aktivnost)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function put(id, aktivnost) {
    return await HttpService.put(ime + '/' + id, aktivnost)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function _delete(id) {
    return await HttpService.delete(ime + '/' + id)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data.poruka };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

async function getById(id) {
    return await HttpService.get(ime + '/' + id)
        .then((odgovor) => {
            return { greska: false, poruka: odgovor.data };
        })
        .catch((e) => {
            return { greska: true, poruka: e };
        });
}

export default {
    get,
    post,
    put,
    _delete,
    getById
};
