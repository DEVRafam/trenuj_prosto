module.exports = async () => {
    if (!__loginData) return;
    //
    const { accessToken, refreshToken } = __loginData;
    await request.post("/api/auth/logout").send({ refreshToken }).set("Authorization", `Bearer ${accessToken}`);
    __loginData = null;
};
