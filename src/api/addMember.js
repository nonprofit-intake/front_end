const { axiosWithAuth } = require("../utils/auth/axiosWithAuth");

export const addMember = (fam_id, member) => {
    return axiosWithAuth().post(`/api/guests/family/${fam_id}`, member).then(res => res.data)
}