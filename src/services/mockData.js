// Fallback placeholder (kept for future reference)
const _placeholderImg =
  "https://images.unsplash.com/photo-1563897539633-7374c276c212?w=500&q=80";

// --- Product Images Imports ---

// Lanches
import imgRoosterChicken from "../assets/img-produtos/Rooster Chicken.png";
import imgRoosterClassic from "../assets/img-produtos/Rooster Classic.png";
import imgRoosterDouble from "../assets/img-produtos/Rooster double.png";
import imgTexasRooster from "../assets/img-produtos/Hamburguer Texas Rooster.png";
import imgTexasFit from "../assets/img-produtos/Texas Fit.png";

// Baldes
import imgBaldePequeno from "../assets/img-produtos/Balde Pequeno + 2 Molho Grátis.png";
import imgBalde3Pessoas from "../assets/img-produtos/Balde para 3 Pessoas + 2 molhos Grátis.png";
import imgBalde5Pessoas from "../assets/img-produtos/Balde de Frango Para 5 Pessoas + 3 molhos Grátis.png";

// Combos
import imgComboGaloMaluco from "../assets/img-produtos/Rooster double.png"; // Fallback as requested in previous state
import imgCombo7 from "../assets/img-produtos/7 em 1 - Exclusivo.png";
import imgCombo8 from "../assets/img-produtos/8 em 1 - Combo.png";
import img4Lanches from "../assets/img-produtos/4 Lanches no Precinho.png";
import imgMegaCombo from "../assets/img-produtos/10 em 1 - Famoso Mega Combo.png";
import imgComboInd from "../assets/img-produtos/Combo Lanche - Batata Frita - Refri Lata.png";
import img5em1 from "../assets/img-produtos/5 EM 1 SUPER COMBO.png";
import imgComboCasal from "../assets/img-produtos/Combo Para 2 pessoas - Balde pequeno + Refri + Porção fritas + 2 Molhos.png";
import imgComboMedio from "../assets/img-produtos/Balde Para 3 pessoas + Porção Ind.+ Refri + 2 Molho Gratis.png";
import imgComboFamiliaReal from "../assets/img-produtos/Balde Para 5 pessoas + Batata + Polenta + Refri 2litros + 3 molhos Gratís.png";
import imgComboFamiliaKids from "../assets/img-produtos/Combo tamanho família irresistível mais uma novidade balde Kids pras crianças.png";

// Porções
import imgPolentaInd from "../assets/img-produtos/Polenta Individual.png";
import imgBatataInd from "../assets/img-produtos/Batata Individual.png";
import imgOnionInd from "../assets/img-produtos/Onion Rings Individual.png";
import imgBaldeBatata from "../assets/img-produtos/Balde de Batata Frita.png";
import imgBaldeOnion from "../assets/img-produtos/Balde de Onion Rings Rooster.png";
import imgBaldePolenta from "../assets/img-produtos/Balde de Polenta Frita crocante.png";

// Molhos
import imgMolhoAlho from "../assets/img-produtos/Alho.png";
import imgMolhoBacon from "../assets/img-produtos/Molho de Bacon.png";
import imgMolhoBarbecue from "../assets/img-produtos/Molho de Barbecue.png";
import imgMolhoMostarda from "../assets/img-produtos/Mostarda e Mel.png";
import imgMolhoGoiabada from "../assets/img-produtos/Goiabada com Pimenta.png";

// Bebidas
import imgCoca350 from "../assets/img-produtos/Coca cola 350 ml.png";
import imgGuarana350 from "../assets/img-produtos/Guaraná Antartica 350ml.png";
import imgFanta350 from "../assets/img-produtos/Fanta Laranja 350ml.png";
import imgCocaZero350 from "../assets/img-produtos/Coca Zero 350ml.png";
import imgSprite350 from "../assets/img-produtos/Sprite Original 350ml.png";
import imgCoca2L from "../assets/img-produtos/Coca-Cola 2 Litros.png";
import imgGuarana2L from "../assets/img-produtos/Guaraná Antártica 2 Litros.png";
import imgCocaZero600 from "../assets/img-produtos/Coca Zero 600ml.png";
import imgHeineken from "../assets/img-produtos/Cerveja Heineken 330ml.png";

// Sobremesas & Kids
import imgSorvete from "../assets/img-produtos/sorvete.png";
import imgBaldeKids from "../assets/img-produtos/Balde Kids pras crianças.png";

export const categories = [
  { id: "todos", name: "Todos" },
  { id: "ofertas", name: "Ofertas" },
  { id: "baldes", name: "Baldes" },
  { id: "lanches", name: "Lanches" },
  { id: "combos", name: "Combos" },
  { id: "porcoes", name: "Porções" },
  { id: "molhos", name: "Molhos" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
  { id: "kids", name: "Kids" },
];

export const products = [
  // --- MAIS PEDIDOS (Categorized) ---
  {
    id: 1,
    name: "Tiras de Frango Extra Crocante!",
    description:
      "A nossa Sugestão é você provar essa delicia!!! São 4 tiras de frango extra Crocante, com um tempero inconfundível da Evolve! Haaa antes que eu me esqueça, você leva um Molho De brinde!!! Venha conferir...",
    price: 26.7,
    category: "porcoes",
    isBestSeller: true,
    image: imgRoosterChicken, // Using generic chicken image as specific one not found
  },
  {
    id: 2,
    name: "Balde pequeno + Molho Grátis",
    description:
      "O nosso Frango é Crocante, sequinho e delicioso, ideal para degustar Sozinho! frango variados, + 1 molho. Eu comi e aprovei e você?",
    price: 58.7,
    category: "baldes",
    isBestSeller: true,
    image: imgBaldePequeno,
  },
  {
    id: 3,
    name: "Combo Galo Maluco",
    description:
      "2 Lanches (50% off no 2º) + 1 Batata Ind. + 1 Refri Lata 350ml. (Serve até 2 pessoas)",
    price: 59.9,
    originalPrice: 77.9,
    category: "ofertas",
    image: imgComboGaloMaluco,
  },

  // --- LANCHES EXCLUSIVOS ---
  {
    id: 4,
    name: "Rooster Chicken",
    description:
      "Pão selado na manteiga, maionese caseira, 2 filés de sassami crocante, queijo cheddar.",
    price: 33.5,
    category: "lanches",
    image: imgRoosterChicken,
  },
  {
    id: 5,
    name: "Rooster Classic",
    description:
      "Pão selado, maionese de alho, 2 filés de sassami crocante, tomate e queijo cheddar.",
    price: 33.5,
    category: "lanches",
    image: imgRoosterClassic,
  },
  {
    id: 6,
    name: "Rooster Double",
    description:
      "Tudo em dobro! Pão, maionese caseira, 2 sassamis, 2 cheddars, 2 bacons.",
    price: 35.5,
    category: "lanches",
    image: imgRoosterDouble,
  },

  // --- COMBOS ---
  {
    id: 7,
    name: "Combo 7 em 1 - Exclusivo",
    description:
      "2 lanches + 2 sassami + 1 batata frita + 1 refri 600ml + 1 molho.",
    price: 105.7,
    category: "combos",
    image: imgCombo7,
  },
  {
    id: 8,
    name: "Combo 8 em 1",
    description: "2 lanches + 4 tiras de Frango + 2 molhos a sua escolha.",
    price: 89.7,
    category: "combos",
    image: imgCombo8,
  },
  {
    id: 9,
    name: "4 Lanches no Precinho",
    description: "Você escolhe os seus 4 lanches favoritos!",
    price: 97.7,
    category: "combos",
    image: img4Lanches,
  },
  {
    id: 10,
    name: "10 em 1 - Famoso Mega Combo",
    description:
      "4 tiras de Sassami + 2 lanches + 2 refri 350ml + 1 Batata Frita + 1 molho.",
    price: 112.5,
    category: "combos",
    image: imgMegaCombo,
  },

  // --- BALDES ---
  {
    id: 11,
    name: "Balde p/ 3 Pessoas + 2 Molhos",
    description:
      "Frango estilo Americano, crocante e suculento. Serve 3 pessoas. (Acompanha 2 molhos)",
    price: 85.7,
    category: "baldes",
    image: imgBalde3Pessoas,
  },
  {
    id: 12,
    name: "Balde p/ 5 Pessoas + 3 Molhos",
    description: "Muita crocância! Serve 5 pessoas e leva 3 molhos de brinde.",
    price: 105.7,
    category: "baldes",
    image: imgBalde5Pessoas,
  },

  // --- LANCHES PREMIUM ---
  {
    id: 13,
    name: "Hamburguer Texas Rooster",
    description:
      "Pão, molho, alface, frango, Catupiry, queijo cheddar e bacon.",
    price: 42.7,
    category: "lanches",
    image: imgTexasRooster,
  },
  {
    id: 14,
    name: "Texas Fit",
    description:
      "Pão Brioche, Maionese caseira, alface, tomate, cebola roxa, 2 Sassami crocante.",
    price: 41.7,
    category: "lanches",
    image: imgTexasFit,
  },

  // --- COMBOS PREMIUM ---
  {
    id: 15,
    name: "Combo Individual Completo",
    description:
      "Lanche + Batata Frita Individual + Refri Lata 350ml + sachês.",
    price: 66.7,
    category: "combos",
    image: imgComboInd,
  },
  {
    id: 16,
    name: "5 EM 1 SUPER COMBO",
    description: "1 Lanche + 3 Tiras de Frango + Batata + Refri + Molho.",
    price: 75.7,
    category: "combos",
    image: img5em1,
  },
  {
    id: 17,
    name: "Combo Balde Casal",
    description:
      "Balde pequeno + Refri Lata + Porção (Batata ou Polenta) + 2 Molhos.",
    price: 69.7,
    category: "combos",
    image: imgComboCasal,
  },
  {
    id: 18,
    name: "Combo Balde Médio (3 Pessoas)",
    description:
      "Balde Médio + Porção (Batata ou Polenta) + Refri 350ml + 2 Molhos.",
    price: 95.7,
    category: "combos",
    image: imgComboMedio,
  },
  {
    id: 19,
    name: "Combo Família Real (5 Pessoas)",
    description:
      "Balde Grande + Polenta Ind. + Batata Ind. + 3 Molhos + Coca 2L.",
    price: 149.9,
    category: "combos",
    image: imgComboFamiliaReal,
  },

  // --- PORÇÕES ---
  {
    id: 20,
    name: "Polenta Individual",
    description: "Polenta Frita Saborosa e Crocante.",
    price: 23.7,
    category: "porcoes",
    image: imgPolentaInd,
  },
  {
    id: 21,
    name: "Batata Individual",
    description: "180g de Batata Frita Crocante e sequinha.",
    price: 23.7,
    category: "porcoes",
    image: imgBatataInd,
  },
  {
    id: 22,
    name: "Onion Rings Individual",
    description: "Cebola Empanada sequinha e saborosa.",
    price: 23.7,
    category: "porcoes",
    image: imgOnionInd,
  },
  {
    id: 23,
    name: "Balde de Batata Frita",
    description: "Ideal para 3 pessoas.",
    price: 39.9,
    category: "porcoes",
    image: imgBaldeBatata,
  },
  {
    id: 24,
    name: "Balde de Onion Rings",
    description: "Anéis de cebola empanados.",
    price: 39.99,
    category: "porcoes",
    image: imgBaldeOnion,
  },
  {
    id: 25,
    name: "Balde de Polenta Frita",
    description: "Sequinha e crocante, serve 3.",
    price: 39.99,
    category: "porcoes",
    image: imgBaldePolenta,
  },

  // --- MOLHOS ---
  {
    id: 26,
    name: "Molho de Alho",
    description: "Famoso Molho de Alho da Evolve.",
    price: 7.0,
    category: "molhos",
    image: imgMolhoAlho,
  },
  {
    id: 27,
    name: "Molho de Bacon",
    description: "Delicioso molho de Bacon com sabor incomparável.",
    price: 7.0,
    category: "molhos",
    image: imgMolhoBacon,
  },
  {
    id: 28,
    name: "Molho Barbecue",
    description: "Lendário Molho de Barbecue.",
    price: 7.0,
    category: "molhos",
    image: imgMolhoBarbecue,
  },
  {
    id: 29,
    name: "Mostarda e Mel",
    description: "Combinação perfeita... Experimente!",
    price: 7.0,
    category: "molhos",
    image: imgMolhoMostarda,
  },
  {
    id: 30,
    name: "Goiabada com Pimenta",
    description: "A mistura do doce com o toque da pimenta.",
    price: 7.0,
    category: "molhos",
    image: imgMolhoGoiabada,
  },

  // --- BEBIDAS ---
  {
    id: 31,
    name: "Coca-Cola 350ml",
    description: "Lata super gelada.",
    price: 8.0,
    category: "bebidas",
    image: imgCoca350,
  },
  {
    id: 32,
    name: "Guaraná Antarctica 350ml",
    description: "Lata.",
    price: 8.0,
    category: "bebidas",
    image: imgGuarana350,
  },
  {
    id: 33,
    name: "Fanta Laranja 350ml",
    description: "Lata.",
    price: 8.0,
    category: "bebidas",
    image: imgFanta350,
  },
  {
    id: 34,
    name: "Coca Zero 350ml",
    description: "Lata.",
    price: 8.0,
    category: "bebidas",
    image: imgCocaZero350,
  },
  {
    id: 35,
    name: "Sprite Original 350ml",
    description: "Lata.",
    price: 8.0,
    category: "bebidas",
    image: imgSprite350,
  },
  {
    id: 36,
    name: "Coca-Cola 2 Litros",
    description: "Garrafa.",
    price: 18.5,
    category: "bebidas",
    image: imgCoca2L,
  },
  {
    id: 37,
    name: "Guaraná Antarctica 2 Litros",
    description: "Garrafa.",
    price: 17.0,
    category: "bebidas",
    image: imgGuarana2L,
  },
  {
    id: 38,
    name: "Coca Zero 600ml",
    description: "Garrafa.",
    price: 14.0,
    category: "bebidas",
    image: imgCocaZero600,
  },
  {
    id: 39,
    name: "Cerveja Heineken 330ml",
    description: "Long neck. (Para maiores de 18 anos)",
    price: 13.0,
    category: "bebidas",
    image: imgHeineken,
  },

  // --- SOBREMESAS ---
  {
    id: 40,
    name: "Sorvete",
    description: "Deliciosa sobremesa refrescante.",
    price: 12.0,
    category: "sobremesas",
    image: imgSorvete,
  },

  // --- KIDS e Outros ---
  {
    id: 41,
    name: "Combo Família + Kids",
    description:
      "Balde Grande + 2 porções + Balde Kids (Batata/Nuggets) + 5 molhos + Refri 2L.",
    price: 185.9,
    category: "combos",
    image: imgComboFamiliaKids,
  },
  {
    id: 42,
    name: "Balde Kids",
    description: "Balde com batata e nuggets, pensado para crianças.",
    price: 29.9,
    category: "kids",
    image: imgBaldeKids,
  },
];

// --- ADMIN MOCK DATA ---

export const mockOrders = [
  {
    id: "#1024",
    customer: "João Silva",
    items: "1x Balde Clássico, 2x Coca-Cola",
    total: 73.9,
    status: "Pronto",
    time: "18:30",
    type: "delivery",
  },
  {
    id: "#1025",
    customer: "Maria Oliveira",
    items: "1x Combo Casal",
    total: 74.9,
    status: "Preparando",
    time: "19:15",
    type: "pickup",
  },
  {
    id: "#1026",
    customer: "Carlos Souza",
    items: "2x Batata Frita",
    total: 31.8,
    status: "Recebido",
    time: "19:42",
    type: "delivery",
  },
  {
    id: "#1027",
    customer: "Ana Lima",
    items: "1x Balde Família",
    total: 89.9,
    status: "Recebido",
    time: "19:45",
    type: "pickup",
  },
];

export const mockFinancials = {
  dailyRevenue: 2850.0,
  monthlyRevenue: 45200.0,
  expenses: [
    {
      id: 1,
      name: "Fornecedor Frango",
      amount: 1200.0,
      date: "2023-10-25",
      status: "Pago",
    },
    {
      id: 2,
      name: "Conta de Luz",
      amount: 450.0,
      date: "2023-10-28",
      status: "Pendente",
    },
    {
      id: 3,
      name: "Embalagens",
      amount: 300.0,
      date: "2023-10-30",
      status: "Pendente",
    },
    {
      id: 4,
      name: "Marketing Insta",
      amount: 150.0,
      date: "2023-11-01",
      status: "Agendado",
    },
  ],
};

export const mockInventory = [
  {
    id: 1,
    name: "Frango (kg)",
    quantity: 45,
    unit: "kg",
    minLevel: 20,
    status: "Ok",
  },
  {
    id: 2,
    name: "Óleo (L)",
    quantity: 12,
    unit: "L",
    minLevel: 10,
    status: "Ok",
  },
  {
    id: 3,
    name: "Embalagem Balde",
    quantity: 8,
    unit: "un",
    minLevel: 50,
    status: "Baixo",
  },
  {
    id: 4,
    name: "Batata (kg)",
    quantity: 30,
    unit: "kg",
    minLevel: 15,
    status: "Ok",
  },
  {
    id: 5,
    name: "Refrigerante 2L",
    quantity: 24,
    unit: "un",
    minLevel: 12,
    status: "Ok",
  },
];

export const mockSalesData = [
  { name: "Seg", vendas: 1200 },
  { name: "Ter", vendas: 1400 },
  { name: "Qua", vendas: 1100 },
  { name: "Qui", vendas: 1800 },
  { name: "Sex", vendas: 3200 },
  { name: "Sáb", vendas: 4500 },
  { name: "Dom", vendas: 3800 },
];
