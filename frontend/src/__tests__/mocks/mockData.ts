import type { Product } from '../../types';

export const mockProducts: Product[] = [
  {
    code: 'D22-2077-006',
    name: 'Tênis Nike Revolution 7 Feminino - Preto+Branco',
    available: true,
    visible: true,
    details: {
      name: 'Tênis Nike Revolution 7 Feminino - Preto+Branco',
      description:
        'Carregamos o Revolution 7 com o tipo de amortecimento e suporte macio que pode mudar o seu mundo de corrida. Elegante como sempre, confortvel quando a borracha encontra a estrada e performtico para o ritmo desejado, uma evoluo de um favorito dos fs que oferece uma conduo macia e suave.',
    },
    fullPriceInCents: '39999',
    salePriceInCents: '30399',
    rating: 4.5,
    image:
      'https://static.netshoes.com.br/produtos/tenis-nike-revolution-7-feminino/26/JD8-6363-026/JD8-6363-026_zoom1.jpg?ts=1708096757?ims=544x',
    stockAvailable: true,
  },
  {
    code: 'NQQ-4378-028',
    name: 'Bola de Futebol Society Penalty 8 X - Branco+Verde Limão',
    available: true,
    visible: true,
    details: {
      name: 'Bola de Futebol Society Penalty 8 X - Branco+Verde Limão',
      description:
        'Junte os amigos e desenvolva suas melhores jogadas com a Bola de Futebol Society da Penalty. Fabricada com material resistente, o modelo recebe uma dupla camada de colagem, reforçando ainda mais a junção dos gomos e garantindo a vida útil da bola por muito mais tempo.As cores contrastantes ajudam na visualização dentro das quatro linhas. Seja o melhor do jogo e domine o adversário com a Penalty. Garanta já a sua!',
    },
    fullPriceInCents: '22000',
    salePriceInCents: '17499',
    rating: 4,
    image:
      'https://static.netshoes.com.br/produtos/bola-de-futebol-society-penalty-8-x/78/D23-5694-078/D23-5694-078_zoom1.jpg?ts=1695700132?ims=544x',
    stockAvailable: true,
  },
  {
    code: '3R2-0087-240-02',
    name: 'Kit 4 Camiseta Masculina Segunda Pele Proteção Solar UV Térmica Praia Manga Longa Blusa Camisa - Cinza+Azul',
    available: false,
    visible: true,
    details: {
      name: 'Kit 4 Camiseta Masculina Segunda Pele Proteção Solar UV Térmica Praia Manga Longa Blusa Camisa - Cinza+Azul',
      description:
        'As camisetas proteção UV masculina da Dellas, são produzidas em 100% Poliéster, permitindo movimentos mais intensos, e por um maior tempo de forma confortável. Elas se ajustam perfeitamente ao corpo, podendo ser usadas como segunda pele.',
    },
    fullPriceInCents: '20000',
    salePriceInCents: '8690',
    rating: 3.5,
    image:
      'https://static.netshoes.com.br/produtos/kit-4-camiseta-masculina-segunda-pele-protecao-solar-uv-termica-praia-manga-longa-blusa-camisa/40/3R2-0087-240/3R2-0087-240_zoom1.jpg?ts=1690411979?ims=544x',
    stockAvailable: false,
  },
];

export const mockWishlistItems: Product[] = [mockProducts[0]];
