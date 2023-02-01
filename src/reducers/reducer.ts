import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActionTypes } from "./actions";

export interface MensagemProps {
    author: "Cecilia" | "User"
    content: string
}

interface MensagemStateProps {
    mensagem: MensagemProps[];
}

export function MensagemReducer(state: MensagemStateProps, action: any) {
    const TimeRightNow = new Date()
    const periodoTime = parseInt(format(TimeRightNow, 'H')) // Esse metódo me retorna a hora atual
    //Aqui eu descubro que perido do dia estámos
    const periodo = periodoTime >= 6 && periodoTime < 12 ? "manhã" : periodoTime < 6 ? "noite" : "tarde"

    switch (action.type) {
        case ActionTypes.GET_TIME:
            const newMensagem: MensagemProps = {
                author: "Cecilia",
                content: `Segundo meus cálculos \n \nAgora são ${format(TimeRightNow, "kk:mm")} tenha uma boa ${periodo} ❤️`,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, newMensagem]
            }

        case ActionTypes.SET_USER_MENSAGEM:
            const userMensagem: MensagemProps = {
                author: "User",
                content: String(action.payload.content),
            }
            return {
                ...state,
                mensagem: [...state.mensagem, userMensagem]
            }

        case ActionTypes.GET_TAXES:
            const taxMensagem: MensagemProps = {
                author: "Cecilia",
                content: `Atualmente ${action.payload.nome === "ipca" ? "a taxa" : "a taxa do"} ${action.payload.nome} é de ` + action.payload.valor,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, taxMensagem]
            }

        case ActionTypes.SET_ERROR_WEATHER:
            const weatherErrorMensagem: MensagemProps = {
                author: "Cecilia",
                content: `Opss... eu não conseguir encontrar essa ciadade \n\nVamos tentar novamente lembre-se de colocar acento e espaço quando for necessário, \ncidades em estrangerias precisam ser escritas em ingles 🫡`,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, weatherErrorMensagem]
            }

        case ActionTypes.SET_ERROR:
            const taxMensagemSchema: MensagemProps = {
                author: "Cecilia",
                content: `Opss... eu não entendi muito bem \n\nVamos tentar novamente, \nse o erro persistir sinta-se livre para abrir uma issue no github 🫡`,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, taxMensagemSchema]
            }

        case ActionTypes.GET_NEXT_HOLIDAY:
            const nextHolidayMensagem: MensagemProps = {
                author: "Cecilia",
                content: `O proximo feriado é daqui ${formatDistanceToNow(new Date(action.payload.holiday.date), {
                    locale: ptBR
                })}, \nNo dia ` + format(new Date(action.payload.holiday.date), "dd/MM/yyyy") + " - " + action.payload.holiday.name,
            }

            return {
                ...state,
                mensagem: [...state.mensagem, nextHolidayMensagem]
            }

        case ActionTypes.GET_TWITTER_TOPICS:
            const trendsTopicsMensagem: MensagemProps = {
                author: "Cecilia",
                content: `Sabia que o twitter é a minha rede social favorita ? 🐦\nNo momento os assuntos mais comentados são: \n\n-${action.payload.trendsTopics[0]} \n\n-${action.payload.trendsTopics[1]} \n\n-${action.payload.trendsTopics[2]} \n\n-${action.payload.trendsTopics[3]} \n\n-${action.payload.trendsTopics[4]}`,
            }

            return {
                ...state,
                mensagem: [...state.mensagem, trendsTopicsMensagem]
            }

        case ActionTypes.GET_CITY:
            const askCityMensagem: MensagemProps = {
                author: "Cecilia",
                content: `OK \n \nVocê poderia me informa o nome da sua cidade ? `,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, askCityMensagem]
            }

        case ActionTypes.GET_WEATHER_CITY:
            const cityWeatherMensagem: MensagemProps = {
                author: "Cecilia",
                content: `Eu acho linda essa cidade! 🫶🏽 \n\nBom agora está ${action.payload.weather.weather[0].description} e fazendo ${Math.trunc(action.payload.weather.main?.temp - 273.15)}ºC \ncom uma sensação termica de ${Math.trunc(action.payload?.weather.main?.feels_like - 273.15)}ºC e ${action.payload?.weather.main?.humidity}% de humidade\n\nSegundo o OpenWeather`,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, cityWeatherMensagem]
            }

        case ActionTypes.NOT_FOUND_ANSWER:
            const notFoundAnswer: MensagemProps = {
                author: "Cecilia",
                content: `Infelizmente eu ainda não tenho essa resposta! \n\nVocê pode consutar o que eu posso fazer acessando o icone "?" \nno lado superior direito 😉`,
            }
            return {
                ...state,
                mensagem: [...state.mensagem, notFoundAnswer]
            }

        case ActionTypes.GET_COIN_CURRENCY:
            const coinCurrencyMensagem: MensagemProps = {
                author: "Cecilia",
                content: `O valor do ${action.payload.nome} nesse momento é de ${action.payload.valorRounded} 😎`

            }
            return {
                ...state,
                mensagem: [...state.mensagem, coinCurrencyMensagem]
            }

    }

    return state
}