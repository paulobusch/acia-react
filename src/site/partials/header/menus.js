import innerText from 'react-innertext';

import { POST_ACTION } from "../../../reducers/posts/post-type";
import NewId from "../../../common/random/random-id";

import About from "../../pages/static/about";
import AciaCred from '../../pages/static/acia-cred';
import AciaWoman from '../../pages/static/acia-woman';
import AdvantagesCard from '../../pages/static/advantages-card';
import CellNetwork from '../../pages/static/cell-network';
import ConciliationCourt from '../../pages/static/conciliation-court';
import Certificate from '../../pages/static/digital-certificate';
import GeographicalInformation from '../../pages/static/geographical-information';
import History from '../../pages/static/history';
import MeetingRoom from '../../pages/static/meeting-room';
import PolicyQuality from '../../pages/static/policy-quality';
import RelevantInformations from '../../pages/static/relevant-informations';
import Serasa from '../../pages/static/serasa';
import President from '../../pages/static/president';

export const MENU_VANTAGENS_ACIA = [
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'ACIA CRED', link: '/#/acia-cred', text: innerText(AciaCred()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'CERTIFICADO DIGITAL', link: '/#/digital-certificate', text: innerText(Certificate()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'SERASA', link: '/#/serasa', text: innerText(Serasa()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'CORTE CONCILIAÇÃO', link: '/#/conciliation-court', text: innerText(ConciliationCourt()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'LIGUE ACIA', link: '/#/cell-network', text: innerText(CellNetwork()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'CARTÃO DE VANTAGENS', link: '/#/advantages-card', text: innerText(AdvantagesCard()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'AUDITÓRIO / SALA REUNIÃO', link: '/#/meeting-room', text: innerText(MeetingRoom()) },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'FOTOS', link: '/#/photos' },
    { id: NewId(), parent: 'VANTAGENS ACIA', title: 'VÍDEOS', link: '/#/videos' }
];

export const MENU_INSTITUCIONAL = [
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'QUEM SOMOS', link: '/#/about', text: innerText(About()) },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'DIRETORIA', link: '/#/boards' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'ARQUIVO HISTÓRICO', link: 'http://arquivohistoricoacia.com.br/site/' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: `${POST_ACTION.toUpperCase()}`, link: `/#/posts/${encodeURIComponent(POST_ACTION)}` },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'ACIA MULHER', link: '/#/acia-woman', text: innerText(AciaWoman()) },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'POLO DE DEFESA', link: 'https://www.aciaanapolis.com.br/polodedefesa' },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'POLÍTICA DE QUALIDADE', link: '/#/policy-quality', text: innerText(PolicyQuality()) },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'HISTÓRIA', link: '/#/history', text: innerText(History()) },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'INFORMAÇÕES GEOGRÁFICAS', link: '/#/geographical-information', text: innerText(GeographicalInformation()) },
    { id: NewId(), parent: 'INSTITUCIONAL', title: 'INFORMAÇÕES RELEVANTES', link: '/#/relevant-informations', text: innerText(RelevantInformations()) }
];

export const MENU_PADRAO = [
    { id: NewId(), title: 'REDE DE CONVÊNIOS', link: '/#/standards' },
    { id: NewId(), title: 'CONTATO', link: '/#/contact' },
    { id: NewId(), title: 'ASSOCIE-SE', link: '/#/subscribe', onlymobile: true }
];

export const MENU_PESQUISA = [
    { id: NewId(), title: 'Palavras do Presidente', link: '/#/president', text: innerText(President()) },
];