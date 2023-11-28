class VerifyRequest {

    constructor(token, verifyCode) {
        this.token = token;
        this.verifyCode = verifyCode;
    }

    token;
    verifyCode;
}