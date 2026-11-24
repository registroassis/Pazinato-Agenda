// =====================================================================
//  CONFIGURAÇÃO DO APLICATIVO — este é o único arquivo que precisa ser
//  editado para colocar o app no ar (pode editar direto no GitHub).
// =====================================================================
window.APP_CONFIG = {
  // Nome que aparece no topo, na tela de login e nos relatórios
  nomeApp: 'Pazinato',
  nomeEmpresa: 'Pazinato Climatização Automotiva',
  subtitulo: 'Agenda e Ordens de Serviço · Máquinas agrícolas e caminhões',

  // Login único: ao entrar, a pessoa toca no próprio nome. Tudo fica registrado nesse nome.
  usuarios: ['Danilo', 'Juninho'],

  // Logo oficial da Pazinato (arquivo logo.png)
  logo: 'logo.png',
  logoHorizontal: 'logo-horizontal.png', // versão sem fundo, usada no topo da tela inicial e nos PDFs

  // Cores da identidade visual (ajuste a partir das cores da logo)
  cores: {
    primaria: '#13548C',      // cor principal (topo, botões)
    primariaEscura: '#0E3F6B', // variação escura
    destaque: '#1E7BC6',      // cor de destaque
  },

  // Número da primeira OS (use se quiser continuar uma numeração já existente)
  numeroInicialOS: 1,

  // Dados do projeto Firebase (Console do Firebase > Configurações do projeto >
  // Seus apps > App da Web > "Configuração do SDK"). Cole os valores abaixo.
  firebase: {
    apiKey: 'AIzaSyClLf8zq-KcUsKbKvAsbB8LRKegNHcMecQ',
    authDomain: 'pazinato-climatizacao.firebaseapp.com',
    projectId: 'pazinato-climatizacao',
    storageBucket: 'pazinato-climatizacao.firebasestorage.app',
    messagingSenderId: '369177553145',
    appId: '1:369177553145:web:4a62049486571963eada28',
  },
};
