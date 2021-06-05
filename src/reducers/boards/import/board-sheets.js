import { BOARD_PRESIDENT, BOARD_VICE_PRESIDENCY, BOARD_SECRETARY, BOARD_DIRECTOR, BOARD_TREASURER } from './../board-type';

export const BOARD_IMPORT_PRESIDENT = 'Presidência';
export const BOARD_IMPORT_VICE_PRESIDENCY = 'Vice Presidência';
export const BOARD_IMPORT_SECRETARY = 'Secretários';
export const BOARD_IMPORT_TREASURER = 'Tesoureiros';
export const BOARD_IMPORT_DIRECTOR = 'Diretores';

export const BOARD_IMPORT_TYPE = {
  [BOARD_IMPORT_PRESIDENT]: BOARD_PRESIDENT,
  [BOARD_IMPORT_VICE_PRESIDENCY]: BOARD_VICE_PRESIDENCY,
  [BOARD_IMPORT_SECRETARY]: BOARD_SECRETARY,
  [BOARD_IMPORT_TREASURER]: BOARD_TREASURER,
  [BOARD_IMPORT_DIRECTOR]: BOARD_DIRECTOR
};