const mongoose = require("mongoose");

mongoose.plugin((schema) => {
    schema.options.toJSON = {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret._id;
            delete ret.password;
        }
    };
    schema.options.toObject = {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret._id;
            delete ret.password;
        }
    };
    schema.statics.findOneOrCreate = async function findOneOrCreate(condition, doc) {
        const one = await this.findOne(condition);
        return one || this.create(doc);
    };
});

const connecToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONN_URL);
    } catch(err) {
        console.log('Error connection monogdb.');
    }
}

module.exports = connecToDb;