import { HttpService } from './HttpService';

const ime= '/PrimkaServisa';

async function get() {
    return await HttpService.get(ime)
        .then((response) => {
            return { greska: false, poruka: response.data };
        })
        .catch((error) => {
            return { greska: true, poruka: error };
        });
}

async function post(primkaServisa) {
    return await HttpService.post(ime, primkaServisa)
        .then((response) => {
            return { greska: false, poruka: response.data };
        })
        .catch((error) => {
            return { greska: true, poruka: error };
        });
}

async function put(id, primkaServisa) {
    return await HttpService.put(ime + '/'+id,primkaServisa)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function _delete(idPrimkaServisa){
    return await HttpService.delete(ime + '/'+ idPrimkaServisa)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data.poruka};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function getById(id){
    return await HttpService.get(ime+'/'+id)
    .then((o)=>{
        return {greska: false, poruka: o.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: e}
    });
}



export default {
    get,
    post,
    _delete,
    getById,
    put
};
