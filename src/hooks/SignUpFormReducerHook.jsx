
const INITIAL_STATE = {
    obraSocial: true,
    prepaga: false,
    sinCobertura: false,
    name: 'Obra Social'
}

export const SignUpFormClickReducer = (state, action) => {
    switch (action.type) {
        case '1':
            return {
                obraSocial: true,
                prepaga: false,
                sinCobertura: false,
                name: action.payload
            }    
        case '2':
            return {
                obraSocial: false,
                prepaga: true,
                sinCobertura: false,
                name: action.payload
            }    
        case '3':
            return {
                obraSocial: false,
                prepaga: false,
                sinCobertura: true,
                name: ''
            }    
        default:
            return INITIAL_STATE;
    }
}

