import { format, isAfter } from 'date-fns'
import { PaperPlaneRight, CircleNotch, Lightbulb } from 'phosphor-react'
import { FormEvent, useEffect, useReducer, useRef, useState } from 'react'
import { Mensagem } from '../components/Mensagem'
import CecilaFoto from '../imagens/cecilia.png'
import axios from 'axios'
import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog';
import { MensagemReducer } from '../reducers/reducer'
import { askCity, getCoinCurrency, getNextHoliday, getTaxes, getTime, getTwitterTrendsTopics, getWeather, setError, setErrorWeather, setNotFoundAnswer, setUserMensagem } from '../reducers/actions'
import { ModalAbout } from '../components/ModalAbout'
import Head from 'next/head'

export default function Home() {

  const [mensagemState, dispatch] = useReducer(MensagemReducer, {
    mensagem: [{ author: 'Cecilia', content: 'Olá, tudo bem ?' }],
  });
  const [isLoading, setIsLoading] = useState(false)
  const [newMensagem, setNewMensagem] = useState("")

  //Variavel que verfica o tipo da conversa
  const [topic, setTopic] = useState("")

  //TO FIX
  //Utilizar somente o metedo Date() faz com que retorne um erro em produção
  //Basicamente o component "Text" não possui o mesmo valor do servidor :/
  const [nowDate, setNowDate] = useState("")

  useEffect(() => {
    setNowDate(format(new Date(), "HH:mm"))
  }, [])

  const messageList = useRef<null | HTMLDivElement>(null)
  const textInput = useRef<null | HTMLInputElement>(null);

  //Metédo de submit do formulario
  function handleNewMensagem(event: FormEvent) {
    event.preventDefault()
    dispatch(setUserMensagem(newMensagem))
    setIsLoading(true)
  }

  async function fetchWeather(city: string) {
    setNewMensagem("")
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53c7160acc821c2f2b82363eda5a0bd6&lang=pt_br`)
      dispatch(getWeather(data))
      setIsLoading(false)

      setTopic("")
    } catch (error) {
      dispatch(setErrorWeather())
      setIsLoading(false)
    }
  }

  async function getResponse() {
    const userMensagems = newMensagem.split(" ")
    setNewMensagem('')
    let loop_control = false

    for (let index = 0; index < userMensagems.length; index++) {

      switch (userMensagems[index].toLowerCase()) {
        case "horas":
          loop_control = true
          setTimeout(() => {
            dispatch(getTime())
            setIsLoading(false)
          }, 1000);
          break;
        case "cdi":
          loop_control = true
          try {
            const { data } = await axios.get('https://brasilapi.com.br/api/taxas/v1/cdi')
            setIsLoading(false)
            dispatch(getTaxes(data.nome, data.valor))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "selic":
          loop_control = true
          try {
            const { data } = await axios.get('https://brasilapi.com.br/api/taxas/v1/selic')
            setIsLoading(false)
            dispatch(getTaxes(data.nome, data.valor))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "ipca":
          loop_control = true
          try {
            const { data } = await axios.get('https://brasilapi.com.br/api/taxas/v1/ipca')
            setIsLoading(false)
            dispatch(getTaxes(data.nome, data.valor))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "feriado":
          loop_control = true
          try {
            const { data } = await axios.get('https://brasilapi.com.br/api/feriados/v1/' + new Date().getFullYear())
            for (let index = 0; index < data.length; index++) {
              if (isAfter(new Date(data[index].date), new Date())) {
                setIsLoading(false)
                dispatch(getNextHoliday(data[index]))
                break
              }
            }
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "dolar":
          case "dólar":
          loop_control = true
          try {
            const { data } = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL')
            setIsLoading(false)
            dispatch(getCoinCurrency(parseFloat(data.USDBRL.high), "Dólar"))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "euro":
          loop_control = true
          try {
            const { data } = await axios.get('https://economia.awesomeapi.com.br/json/last/EUR-BRL')
            setIsLoading(false)
            dispatch(getCoinCurrency(parseFloat(data.EURBRL.high), "Euro"))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "twitter":
          loop_control = true
          try {
            const { data } = await axios.get('/api/trends')
            setIsLoading(false)
            dispatch(getTwitterTrendsTopics(data))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;
        case "temperatura":
          loop_control = true
          setTimeout(() => {
            dispatch(askCity())
            setTopic("weather")
            setIsLoading(false)
          }, 900);
          break;
        case "selic":
          loop_control = true
          try {
            const { data } = await axios.get('https://brasilapi.com.br/api/taxas/v1/selic')
            setIsLoading(false)
            dispatch(getTaxes(data.nome, data.valor))
          } catch (error) {
            setIsLoading(false)
            dispatch(setError())
          }
          break;

        default:
          if (index === userMensagems.length - 1) {
            setTimeout(() => {
              setIsLoading(false)
              dispatch(setNotFoundAnswer())
            }, 1000)
          }
      }

      if (loop_control) {
        break
      }
    }
  }

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      textInput?.current?.focus();
    }
    messageList?.current?.scrollIntoView({ behavior: 'smooth' });
    topic === "weather" && newMensagem !== "" ? fetchWeather(newMensagem) : newMensagem !== "" && getResponse()
  }, [mensagemState]);

  return (
    <>
      <Head>
        <title>Cecília - Chat</title>
      </Head>

      <main className='flex justify-center sm:h-screen h-fit'>
        <div className='w-10/12  relative sm:h-auto h-full'>
          <header className='flex sm:mt-8 mt-3 justify-between items-center sm:pb-3 pb-4' >
            <div className='flex gap-5 items-center'>
              <Image
                className='rounded-full w-16'
                src={CecilaFoto}
                priority
                alt="" />
              <div className='flex flex-col'>
                <strong className='font-bold text-base'>Cecilia Adams</strong>
                <span className="
            flex flex-row items-center gap-1 text-xs text-green-600 font-normal
            before:content-[''] before:rounded-full before:bg-green-600 before:block before:w-2 before:h-2">Online</span>
              </div>
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className='flex items-center text-xs leading-none'>
                  <Lightbulb size={20} weight={'bold'} />
                </button>
              </Dialog.Trigger>
              <ModalAbout />
            </Dialog.Root>
          </header>
          <section className='overflow-auto sm:h-[calc(100vh-15rem)] h-[calc(100vh-16rem)] w-full'>
            <span className='flex justify-center mt-3 text-xs'>
              Hoje ás {nowDate}
            </span>
            {
              mensagemState.mensagem.map((mensagen, index) => {
                return (
                  <Mensagem
                    key={index}
                    author={mensagen.author}
                    content={mensagen.content} />
                )
              })
            }
            <span ref={messageList}></span>
            {
              isLoading && <span className='md:mt-4 mt-9 bg-violet-950 flex items-center gap-2 h-9 w-max p-6 
              rounded-br-l rounded-bl-lg rounded-tr-lg'>
                <CircleNotch weight='bold' className='animate-spin' />
                Carregando...
              </span>
            }
          </section>
          <form onSubmit={handleNewMensagem}>
            <div className='sm:absolute sm:bottom-0 bg-dark-blue-200  w-full flex justify-between mt-4 sm:mb-8 rounded-full h-14 items-center pr-7 pl-7'>
              <input
                ref={textInput}
                disabled={isLoading}
                autoFocus={true}
                className='bg-transparent w-full outline-0 placeholder:text-xs placeholder:text-slate-200 placeholder:font-normal'
                type="text"
                maxLength={100}
                value={newMensagem}
                onChange={e => setNewMensagem(e.target.value)}
                placeholder='Digite sua mensagem'
              />
              <button className='ml-3 disabled:cursor-not-allowed	' type='submit' disabled={newMensagem.trim() == "" && newMensagem.length < 150}>
                <PaperPlaneRight size={20} weight='fill'></PaperPlaneRight>
              </button>
            </div>
          </form>
          <span className='sm:absolute sm:bottom-2.5 text-[0.7rem] sm:right-0 mr-auto brightness-50 flex my-2 sm:my-0 justify-end'>{100 - newMensagem.length} Caracteres restante</span>
        </div>
      </main >
    </>
  )
}
