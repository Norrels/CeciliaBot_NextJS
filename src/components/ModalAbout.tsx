import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Activity, Alarm, Calendar, CurrencyDollar, TwitterLogo, Umbrella, X } from 'phosphor-react';



export function ModalAbout() {
    const ceciliaLifeTime = formatDistanceToNow((new Date("Jan 31, 2023 01:29:02")), { locale: ptBR })
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='fixed h-screen w-screen inset-0 bg-overlay-background-200' />
            <Dialog.Content className='flex sm:w-auto w-11/12 flex-col gap-5 rounded-md items-center translate-y-[-50%] translate-x-[-50%] bg-modal-background-500 fixed top-2/4 left-2/4 px-10 py-7 '>
                <Dialog.Close className='ml-auto'>
                    <X size={24} />
                </Dialog.Close>
                <Dialog.Title className='font-bold text-xl'>Olá,  Seja bem <span className='text-violet-950'>Vindo!</span></Dialog.Title>
                <Dialog.Description className='sm:w-9/12 text-center text-sm font-normal' >Tenha paciência com a cici ela tem apenas <span className='text-violet-950 font-bold'>{ceciliaLifeTime}</span> de vida, e no momento ela só reconhece as seguintes palavras-chave</Dialog.Description>
                <div className='sm:flex grid sm:gap-3 gap-6 sm:justify-between grid-flow-col sm:w-10/12 w-11/12 grid-rows-3 mt-5 flex-wrap'>
                    <div className='flex flex-col justify-center items-center gap-2 text-xs font-medium hover:brightness-75 duration-300 text-zinc-300'><Activity size={30} color='#7F7FA8' /> Selic - CDI - IPCA</div>
                    <div className='flex flex-col justify-center items-center gap-2 text-xs font-medium hover:brightness-75 duration-300 text-zinc-300'><TwitterLogo size={30} color='#7F7FA8' /> Twitter</div>
                    <div className='flex flex-col justify-center items-center gap-2 text-xs font-medium hover:brightness-75 duration-300 text-zinc-300'><Calendar size={30} color='#7F7FA8' /> Feriado</div>
                    <div className='flex flex-col justify-center items-center gap-2 text-xs font-medium hover:brightness-75 duration-300 text-zinc-300'><Alarm size={30} color='#7F7FA8' /> Horas</div>

                    <div className='flex flex-col justify-center items-center gap-2 text-xs font-medium hover:brightness-75 duration-300 text-zinc-300'><Umbrella size={30} color='#7F7FA8' /> Temperatura</div>
                    <div className='flex flex-col justify-center items-center gap-2 text-xs font-medium hover:brightness-75 duration-300 text-zinc-300'><CurrencyDollar size={30} color='#7F7FA8' />  Euro - Dolar</div>
                </div>
                <strong className='text-[10px] mt-7 font-normal brightness-90 ml-auto'>Feito com 💜 por <a href="https://github.com/Norrels" target="_blank" rel="noreferrer" >Matheus Zac</a> </strong>
            </Dialog.Content>
        </Dialog.Portal>
    )

};