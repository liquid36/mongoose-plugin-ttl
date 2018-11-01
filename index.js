

module.exports = function ExpiredAtPlugin(schema) {
    schema.add({
        expiredAt: Date
    });
    schema.index({expiredAt: 1},{expireAfterSeconds: 0});

    schema.virtual('ttl').set(function (value) {
        if (typeof value === "number") {
            this.expiredAt = new Date(Date.now() + value);
        } else if (typeof value === "string") {
            const regexp = /([0-9]+)([a-z]+)/g;
            value.match(regexp);
        }
    });
}