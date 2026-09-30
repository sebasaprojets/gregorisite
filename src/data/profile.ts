// Dados tirados do perfil do Instagram @gregoandres27.
// Para atualizar o site, basta editar este arquivo.

export const ig = (handle: string) => `https://instagram.com/${handle}`;

export const profile = {
  name: "Gregori Silva",
  handle: "gregoandres27",
  instagram: ig("gregoandres27"),
  dm: "https://ig.me/m/gregoandres27",
  role: "Instrutor tático e de atendimento pré-hospitalar",
  tagline: "Preparar pessoas para agir quando cada segundo conta.",
  stats: [
    { value: 411, label: "Publicações" },
    { value: 2483, label: "Seguidores" },
    { value: 6, label: "Organizações" },
  ],
};

export type Credential = {
  code: string;
  title: string;
  org: string;
  role: string;
  description: string;
  href: string;
  handle: string;
};

export const credentials: Credential[] = [
  {
    code: "CEO",
    title: "Vikings Tactical Group",
    org: "@vikingstacticalgroup22",
    role: "CEO e fundador",
    description:
      "Lidera o grupo à frente de treinamentos táticos, formação de equipes e workshops práticos.",
    href: ig("vikingstacticalgroup22"),
    handle: "vikingstacticalgroup22",
  },
  {
    code: "NATI",
    title: "NATI Tática Brasil",
    org: "@nati_tatica_brasil",
    role: "Instrutor",
    description: "Instrução tática aplicada, com foco em técnica, segurança e tomada de decisão.",
    href: ig("nati_tatica_brasil"),
    handle: "nati_tatica_brasil",
  },
  {
    code: "STB",
    title: "Stop the Bleed",
    org: "#stopthebleed",
    role: "Instrutor",
    description:
      "Ensina a controlar hemorragias graves com compressão, tamponamento e torniquete até a chegada do socorro.",
    href: "https://instagram.com/explore/tags/stopthebleed",
    handle: "stopthebleed",
  },
  {
    code: "TECC",
    title: "TECC / TCCC",
    org: "@ifimedatp",
    role: "Instrutor pela IFIMED ATP",
    description:
      "Atendimento a vítimas em ambiente tático e de combate, seguindo os protocolos TECC e TCCC.",
    href: ig("ifimedatp"),
    handle: "ifimedatp",
  },
  {
    code: "C3",
    title: "C3 Cursos",
    org: "@c3cursosoficial",
    role: "Instrutor",
    description: "Cursos de capacitação com conteúdo prático e instrutores de campo.",
    href: ig("c3cursosoficial"),
    handle: "c3cursosoficial",
  },
  {
    code: "SOB",
    title: "SOBRASA",
    org: "@sobrasa",
    role: "Voluntário",
    description:
      "Atua como voluntário da Sociedade Brasileira de Salvamento Aquático, na prevenção de afogamentos.",
    href: ig("sobrasa"),
    handle: "sobrasa",
  },
];

export const services = [
  {
    id: "01",
    title: "Controle de hemorragias",
    text: "Treinamento Stop the Bleed: reconhecer sangramentos que ameaçam a vida e agir com as mãos, gaze e torniquete.",
    icon: "droplet",
  },
  {
    id: "02",
    title: "Atendimento tático a vítimas",
    text: "TECC e TCCC na prática: prioridades de atendimento sob ameaça, evacuação e cuidados até o hospital.",
    icon: "cross",
  },
  {
    id: "03",
    title: "Treinamento tático",
    text: "Instrução de campo com exercícios de deslocamento, técnica e decisão sob pressão.",
    icon: "target",
  },
  {
    id: "04",
    title: "Workshop de proteção pessoal",
    text: "Oficinas práticas de proteção pessoal para grupos, empresas e equipes de segurança.",
    icon: "shield",
  },
] as const;

export const gallery = [
  { src: "images/certificacao.webp", alt: "Entrega de certificado ao fim de um curso", label: "Certificação" },
  { src: "images/treino-campo.webp", alt: "Instrutor montando exercício com cones em campo de areia", label: "Treino de campo" },
  { src: "images/retrato.webp", alt: "Retrato de instrutor de braços cruzados", label: "Instrutor" },
  { src: "images/equipe.webp", alt: "Dois instrutores com equipamento tático em estande de tiro", label: "Equipe" },
  { src: "images/aula.webp", alt: "Gravação de uma aula em vídeo", label: "Aula" },
];
