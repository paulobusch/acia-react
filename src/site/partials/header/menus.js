import NewId from "../../../common/random/random-id";
import { POST_ACTION } from "../../../reducers/posts/post-type";

export const MENU_VANTAGENS_ACIA = [
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'ACIA CRED', link: '/#/acia-cred' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'CERTIFICADO DIGITAL', link: '/#/digital-certificate' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'SERASA', link: '/#/serasa' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'CORTE CONCILIAÇÃO', link: '/#/conciliation-court' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'LIGUE ACIA', link: '/#/cell-network' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'CARTÃO DE VANTAGENS', link: '/#/advantages-card' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'AUDITÓRIO / SALA REUNIÃO', link: '/#/meeting-room' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'FOTOS', link: '/#/photos' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'VÍDEOS', link: '/#/videos' }
];

export const MENU_INSTITUCIONAL = [
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'QUEM SOMOS', link: '/#/about' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'DIRETORIA', link: '/#/boards' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'ARQUIVO HISTÓRICO', link: 'http://arquivohistoricoacia.com.br/site/' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: `${POST_ACTION.toUpperCase()}`, link: `/#/posts/${encodeURIComponent(POST_ACTION)}` },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'ACIA MULHER', link: '/#/acia-woman' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'POLO DE DEFESA', link: 'https://www.aciaanapolis.com.br/polodedefesa' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'POLÍTICA DE QUALIDADE', link: '/#/policy-quality' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'HISTÓRIA', link: '/#/history' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'INFORMAÇÕES GEOGRÁFICAS', link: '/#/geographical-information' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'INFORMAÇÕES RELEVANTES', link: '/#/relevant-informations' }
];

export const MENU_PADRAO = [
    { id: NewId(), title: 'REDE DE CONVÊNIOS', link: '/#/standards' },
    { id: NewId(), title: 'CONTATO', link: '/#/contact' },
    { id: NewId(), title: 'ASSOCIE-SE', link: '/#/subscribe', onlymobile: true }
];