export type modelPartyTable = {
  id?: number;
  name?: string;
  date?: string;
  maxGuests: number;
  address: string;
  city: string;
  state: string;
  postalCod: number;
  valueParty: number;
  usersId: number;
  active: number;
  peopleInvited?: number;
  dateObj?: string;
};

export type modelConvidadosTable = {
  id: string;
  nome: string;
  email: string;
  obs: string;
  pessoas: string;
  id_party: string;
  aceito: number;
  categoria: string;
  permissao: string;
};
