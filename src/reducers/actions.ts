export enum ActionTypes {
    GET_WEATHER = "GET_WEATHER",
    GET_WEATHER_CITY = "GET_WEATHER_CITY",
    GET_TIME = "GET_TIME",
    GET_TAXES = "GET_SELIC",
    GET_TWITTER_TOPICS = "GET_TWITTER_TOPICS",
    GET_NEXT_HOLIDAY = "GET_NEXT_HOLIDAY",
    GET_COIN_CURRENCY = "GET_EURO_CURRENCY",
    GET_CITY = 'GET_CITY',
    SET_USER_MENSAGEM = 'SET_USER_MENSAGEM',
    SET_ERROR = "SET_ERROR",
    SET_ERROR_WEATHER = "SET_ERROR_WEATHER",
    NOT_FOUND_ANSWER = "NOT_FOUND_ANSWER"
}

interface HolidayProps {
    nome: string;
    data: Date;
}

interface WeatherProps {
    main: {
        temp: string
        feels_like: string
        humidity: string
    },
    weathr: [{ description: string }]
}

export function askCity() {
    return {
        type: ActionTypes.GET_CITY,
    }
}

export function getWeather(weather: WeatherProps) {
    return {
        type: ActionTypes.GET_WEATHER_CITY,
        payload: {
            weather
        }
    }
}

export function getTime() {
    return {
        type: ActionTypes.GET_TIME,
    }
}

export function getTwitterTrendsTopics(trendsTopics: string[]) {
    return {
        type: ActionTypes.GET_TWITTER_TOPICS,
        payload: {
            trendsTopics
        }
    }
}

export function getTaxes(nome: string, valor: string) {
    return {
        type: ActionTypes.GET_TAXES,
        payload: {
            nome,
            valor
        }
    }
}

export function getNextHoliday(holiday: HolidayProps) {
    return {
        type: ActionTypes.GET_NEXT_HOLIDAY,
        payload: {
            holiday
        }
    }
}

export function getCoinCurrency(valor: number, nome: string) {
    const valorRounded = valor.toFixed(2)

    return {
        type: ActionTypes.GET_COIN_CURRENCY,
        payload: {
            valorRounded,
            nome
        }
    }
}

export function setUserMensagem(content: string) {
    return {
        type: ActionTypes.SET_USER_MENSAGEM,
        payload: {
            content
        }
    }
}

export function setErrorWeather() {
    return {
        type: ActionTypes.SET_ERROR_WEATHER
    }
}

export function setError() {
    return {
        type: ActionTypes.SET_ERROR
    }
}

export function setNotFoundAnswer() {
    return {
        type: ActionTypes.NOT_FOUND_ANSWER
    }
}