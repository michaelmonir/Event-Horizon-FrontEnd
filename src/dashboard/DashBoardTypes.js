import FilterApis from "../Apis/EventApis/FilterApis";

export const getBackEndCallingFunction = (filters,viewComponentIndex,page,rowsPerPage,tabIndex, userId) => {
    if (tabIndex !== '1') {
        return FilterApis.post("draftedForOrganizer/" + page + "/" + rowsPerPage + "/" + userId, filters);
    } else {
        return FilterApis.post("dashboard/" + page + "/" + rowsPerPage, filters);
    }
};