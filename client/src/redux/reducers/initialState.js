export const initialState = {
    isLogin : {
        isLogin : false,
        accessToken : "",
    },
    isLoading : {
        isLoading : true
    },
    accessToken: {
        accessToken: ''
    },
    modal : {
        isShowLoginModal : false, 
        isShowSignUpModal : false,
        isShowOotdImageModal : false,
    },
    // isShowLoginModal: {
    //     isShowLoginModal : false
    // },
    // isShowSignUpModal: {
    //     isShowSignUpModal: false
    // },
    // accessToken: {
    //     accessToken: ''
    // },
    weatherData: {
        weatherData: ''
    }
}