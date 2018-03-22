
module.exports = fieldsASTs => {
    return fieldsASTs.fieldNodes[0].selectionSet.selections.reduce(
        (projections, selection) => {
            projections[selection.name.value] = true;
            return projections;
        },
        {}
    )
}