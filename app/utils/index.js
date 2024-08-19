/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-14 10:55:10
 */

const omit = (obj, keys) => {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}

const updateModel = (model) => {
    return omit({
        id: model?._id,
        ...model?._doc ?? model
    }, ['__v', "_id", "participantIdsArray"]);
}

module.exports = {
    omit,
    updateModel
};