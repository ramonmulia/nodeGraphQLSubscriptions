const {
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = require('graphql');
const EventType = require('../types/event');
const getProjection = require('../utils/projection');

module.exports = {
    type: new GraphQLList(EventType),
    args: {
        first: {
            name: 'fisrt',
            type: GraphQLInt
        },
        skip: {
            name: 'skip',
            type: GraphQLInt
        }
    },
    resolve: (root, {first=null, skip=null}, { db: { Event } }, fieldAsts) => {
        return new Promise((resolve, reject) => {
            try {
                const projection = getProjection(fieldAsts);

                Event.find({})
                    .select(projection)
                    .skip(skip)
                    .limit(first)
                    .exec()
                    .then(data => resolve(data))
                    .catch(errors => reject(errors));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}