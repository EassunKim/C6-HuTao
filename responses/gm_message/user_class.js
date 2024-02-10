class gmUser {
    constructor(name, userID, imgName, gmMessage) {
        this.name = name;
        this.userID = userID;
        this.imgName = imgName;
        this.gmMessage = gmMessage;
    }

    getUserId() {
        return this.userID;
    }
}




module.exports = gmUser;