// ══════════════════════════════════════════════════════════
//  GUÍA: frases de supervivencia, tarjetas culturales y fichas de alojamiento
//  (contenido fijo de consulta, separado de data.js)
//  - SURVIVAL_DICT → Inicio, «Frases de supervivencia» (buildSurvivalDictHTML)
//  - CULTURE_CARDS → Día › Resumen, «Cultura y contexto», por bloque (buildCultureHTML)
//  - HOTEL_INFO    → ficha de cada alojamiento (Alojamiento, Resumen del día y ficha emergente)
//  Creado el 6-oct-2026 (PC del trabajo). Frases jemer contrastadas con
//  bhasaly.com/khmer-phrases y lostplate.com (guía de comida en jemer).
// ══════════════════════════════════════════════════════════

window.SURVIVAL_DICT = {
  vi: {
    lang: 'Vietnamita',
    note: 'Es un idioma tonal: dilo despacio y, si no te entienden, enseña la frase escrita.',
    phrases: [
      { es: 'Hola',                    local: 'Xin chào',             pron: 'sin chao' },
      { es: 'Gracias',                 local: 'Cảm ơn',               pron: 'cam ón' },
      { es: 'No, gracias',             local: 'Không, cảm ơn',        pron: 'jom, cam ón' },
      { es: 'Perdón / disculpe',       local: 'Xin lỗi',              pron: 'sin loi' },
      { es: 'Sí / No',                 local: 'Vâng / Không',         pron: 'vang / jom' },
      { es: '¿Cuánto cuesta?',         local: 'Bao nhiêu tiền?',      pron: 'bao ñiu tien' },
      { es: 'Muy caro',                local: 'Đắt quá',              pron: 'dat kuá' },
      { es: 'La cuenta, por favor',    local: 'Tính tiền',            pron: 'tin tien' },
      { es: 'Sin picante',             local: 'Không cay',            pron: 'jom cai' },
      { es: 'Sin hielo',               local: 'Không đá',             pron: 'jom da' },
      { es: 'Una botella de agua',     local: 'Một chai nước',        pron: 'mot chai nuoc' },
      { es: 'Dos cervezas',            local: 'Hai bia',              pron: 'jai bia' },
      { es: '¡Qué rico!',              local: 'Ngon quá!',            pron: 'ngon kuá' },
      { es: '¡Salud! (1, 2, 3, ¡arriba!)', local: 'Một, hai, ba, dô!', pron: 'mot, jai, ba, yo' },
      { es: '¿Dónde está el baño?',    local: 'Nhà vệ sinh ở đâu?',   pron: 'ña ve sin o dau' },
      { es: 'Pare aquí',               local: 'Dừng ở đây',           pron: 'yung o dei' },
      { es: '¡Ayuda!',                 local: 'Giúp tôi với!',        pron: 'yup toi vói' },
      { es: 'Hospital',                local: 'Bệnh viện',            pron: 'ben vien' },
      { es: 'Adiós',                   local: 'Tạm biệt',             pron: 'tam biet' }
    ]
  },
  km: {
    lang: 'Jemer',
    note: 'En hoteles, tuk-tuks y restaurantes turísticos se habla inglés; el jemer se agradece mucho.',
    phrases: [
      { es: 'Hola (formal, con el saludo sampeah)', local: 'ជំរាបសួរ', pron: 'chum-riap suor' },
      { es: 'Hola (informal)',         local: 'សួស្តី',              pron: 'suos-déi' },
      { es: 'Gracias',                 local: 'អរគុណ',              pron: 'o-kún' },
      { es: 'No, gracias',             local: 'ទេ អរគុណ',           pron: 'te, o-kún' },
      { es: 'Perdón / disculpe',       local: 'សុំទោស',              pron: 'som-toh' },
      { es: 'Sí (lo dice él / ella)',  local: 'បាទ / ចាស',          pron: 'bat / chas' },
      { es: 'No',                      local: 'ទេ',                  pron: 'te' },
      { es: '¿Cuánto cuesta esto?',    local: 'នេះថ្លៃប៉ុន្មាន?',      pron: 'nih tlai pon-man' },
      { es: 'Muy caro',                local: 'ថ្លៃពេក',              pron: 'tlai pek' },
      { es: 'La cuenta, por favor',    local: 'សូមគិតលុយ',           pron: 'som kit lui' },
      { es: 'Sin picante',             local: 'អត់ហឹរ',              pron: 'ot jer' },
      { es: 'Sin hielo',               local: 'អត់ទឹកកក',            pron: 'ot tuk kok' },
      { es: 'Agua',                    local: 'ទឹក',                 pron: 'tuk' },
      { es: '¡Qué rico!',              local: 'ឆ្ងាញ់',               pron: 'chngañ' },
      { es: '¿Dónde está el baño?',    local: 'បង្គន់នៅណា?',          pron: 'bang-kun nou na' },
      { es: 'Pare aquí',               local: 'ឈប់ទីនេះ',             pron: 'chop ti nih' },
      { es: '¡Ayuda!',                 local: 'ជួយខ្ញុំផង',             pron: 'chuoi kñom pong' },
      { es: 'Adiós',                   local: 'លាហើយ',               pron: 'lia jaey' }
    ]
  }
};

// Claves = valor de `block` de cada día en data.js. «Vuelos» y «Vuelta a casa» no llevan tarjetas.
window.CULTURE_CARDS = {
  'El Norte': [
    { icon: '🛵', title: 'Cruzar la calle entre motos',
      text: 'Camina a ritmo constante, sin correr ni pararte en seco: las motos calculan tu trayectoria y te esquivan. Mira a los conductores y cruza con decisión.' },
    { icon: '💸', title: 'Billetes con muchos ceros',
      text: 'Los de 20.000 y 500.000 dong son casi del mismo azul: revisa los ceros antes de pagar. Las propinas no son obligatorias, pero se agradecen.' },
    { icon: '☕', title: 'La cultura del café',
      text: 'Vietnam es el segundo productor de café del mundo. El café con huevo (cà phê trứng) se inventó en Hanói en 1946, cuando escaseaba la leche.' },
    { icon: '🏛️', title: 'Ho Chi Minh, el «tío Hồ»',
      text: 'Pidió ser incinerado, pero se le embalsamó. En el mausoleo: hombros y rodillas cubiertos, silencio, nada de manos en los bolsillos ni fotos dentro.' }
  ],
  'Angkor': [
    { icon: '🏛️', title: 'El Imperio jemer',
      text: 'Entre los siglos IX y XV, Angkor fue una de las mayores ciudades del mundo. Angkor Wat se levantó a principios del XII para Visnú y luego pasó a ser budista; mira al oeste, por eso el sol sale detrás de sus torres.' },
    { icon: '👕', title: 'Vestimenta en los templos',
      text: 'Hombros y rodillas cubiertos: en los niveles altos de Angkor Wat los guardias no dejan pasar sin ello. Lleva una prenda ligera de manga y pantalón largo o falda.' },
    { icon: '💃', title: 'Las apsaras',
      text: 'Angkor Wat tiene cerca de 1.800 bailarinas celestiales talladas en sus muros. La danza apsara sigue viva: es el ballet real de Camboya, patrimonio de la UNESCO.' },
    { icon: '💵', title: 'Dólares y rieles',
      text: 'Casi todo se paga en dólares y el cambio pequeño se da en rieles (unos 4.000 por dólar). No aceptan billetes de dólar rotos o muy gastados.' }
  ],
  'Phnom Penh': [
    { icon: '🕯️', title: 'Los Jemeres Rojos (1975-1979)',
      text: 'El régimen de Pol Pot vació las ciudades y causó la muerte de cerca de una cuarta parte de la población. Tuol Sleng y Choeung Ek se visitan en silencio y con respeto.' },
    { icon: '🙏', title: 'El saludo sampeah',
      text: 'Palmas juntas a la altura del pecho y una leve inclinación; cuanto más altas las manos, más respeto. No toques la cabeza de nadie ni señales con los pies.' },
    { icon: '🌊', title: 'El río que cambia de sentido',
      text: 'El Tonlé Sap se une aquí al Mekong. En la época de lluvias su corriente se invierte y llena el gran lago; en noviembre vuelve a su curso y lo celebra el Festival del Agua.' },
    { icon: '👑', title: 'Una monarquía',
      text: 'Camboya es una monarquía constitucional; el rey Norodom Sihamoní reina desde 2004. Verás sus retratos por todas partes: trátalos con respeto.' }
  ],
  'Delta del Mekong': [
    { icon: '🛶', title: 'Mercados flotantes',
      text: 'Cada barca cuelga lo que vende de un palo alto (cây bẹo) para anunciarlo desde lejos. Hay que ir muy temprano: lo mejor es al amanecer.' },
    { icon: '🕌', title: 'Chau Doc, un mosaico',
      text: 'Junto a la frontera conviven vietnamitas, jemeres, chinos y la comunidad cham musulmana, con mezquitas a orillas del río. La Montaña Sam es lugar de peregrinación.' },
    { icon: '🌾', title: 'El arrozal de Vietnam',
      text: 'El delta produce cerca de la mitad del arroz del país. Canales, frutales y barcas son aquí la carretera principal.' }
  ],
  'El Centro': [
    { icon: '🏮', title: 'Hoi An, puerto de mercaderes',
      text: 'Entre los siglos XVI y XIX comerciaban aquí japoneses, chinos y europeos; de ahí sus casas y el Puente Japonés. Es patrimonio de la UNESCO desde 1999.' },
    { icon: '✂️', title: 'Los sastres de Hoi An',
      text: 'Hacen ropa a medida en 24-48 horas. Encarga el primer día para tener tiempo de pruebas y retoques.' },
    { icon: '🐉', title: 'El Puente del Dragón',
      text: 'En Da Nang, los sábados y domingos a las 21:00 el dragón escupe fuego y luego agua. Si estás cerca, apártate: moja.' },
    { icon: '👑', title: 'Hue, la ciudad imperial',
      text: 'Fue la capital de la dinastía Nguyễn (1802-1945), la última de Vietnam. La ciudadela quedó muy dañada en la ofensiva del Tet de 1968.' }
  ],
  'Ninh Binh': [
    { icon: '⛰️', title: '«Ha Long en tierra»',
      text: 'Montañas de piedra caliza entre arrozales y ríos. El conjunto de Tràng An es patrimonio mixto (natural y cultural) de la UNESCO desde 2014.' },
    { icon: '🚣', title: 'Remar con los pies',
      text: 'En Tam Coc muchas barqueras reman con los pies para descansar los brazos. Al final del paseo es costumbre dar una propina.' },
    { icon: '🏯', title: 'Hoa Lu, la primera capital',
      text: 'Fue la capital del país en el siglo X, con las dinastías Đinh y Tiền Lê, hasta que en 1010 se trasladó a Thăng Long, la actual Hanói.' }
  ],
  'Vuelta al Norte': [
    { icon: '🐉', title: 'Donde desciende el dragón',
      text: 'Hạ Long significa «dragón que desciende»: según la leyenda, un dragón escupió joyas que se convirtieron en islas para frenar a los invasores. Lan Ha es su continuación junto a Cat Ba, más tranquila.' },
    { icon: '🐒', title: 'El langur de Cat Ba',
      text: 'El Parque Nacional de Cat Ba protege al langur de cabeza dorada, uno de los primates más amenazados del mundo: quedan menos de un centenar.' },
    { icon: '🏝️', title: 'Patrimonio ampliado',
      text: 'Desde 2023 la UNESCO incluye el archipiélago de Cat Ba en el mismo patrimonio natural que la bahía de Ha Long.' }
  ],
  'El Cierre': [
    { icon: '🍺', title: 'Bia hơi',
      text: 'Cerveza de barril que se elabora a diario, sin conservantes, y se bebe en taburetes de plástico en la acera. Muy barata: ideal para la última noche.' },
    { icon: '🛍️', title: 'Regatear con una sonrisa',
      text: 'En mercados y puestos se regatea; en tiendas con precio marcado, no. Si no te convence, despídete amablemente: a menudo bajan el precio entonces.' }
  ]
};

// Clave = `hotel.name` exacto de data.js. Lo que tenga el propio día en data.js (address,
// phone, checkIn, checkOut) manda sobre esto. Dirección, teléfono y coordenadas sacados de
// la ficha de Google Maps de cada alojamiento; horarios de entrada/salida de sus fichas en
// Booking/Trip/Agoda (6-oct-2026). Sin fotos: las de los hoteles tienen derechos y el repo
// es público — el botón de Google Maps lleva a sus fotos y opiniones.
window.HOTEL_INFO = {
  'B&B Hotel Barcelona Viladecans': {
    address: 'Carrer de la Tecnologia, 24 (junto a Av. Olof Palme), 08840 Viladecans',
    phone: '+34 932 99 36 58', checkIn: '14:00', checkOut: '12:00',
    lat: 41.3102234, lng: 2.0273573, maps: 'B&B HOTEL Barcelona Viladecans',
    desc: 'Hotel de cadena junto a los centros comerciales Vilamarina y The Style Outlets, a unos 5 km del aeropuerto de El Prat: solo para dormir antes del vuelo a Shenzhen. Se llega y se vuelve al aeropuerto en el bus L99 (ver los transportes del 5 y del 6-nov).'
  },
  'Secret Garden Hanoi': {
    address: '182 Hàng Bông (al fondo del callejón), Hoàn Kiếm, Hanói',
    phone: '+84 837 515 698', checkIn: '14:00', checkOut: '12:00',
    lat: 21.0288999, lng: 105.844301, maps: "Christina's Hanoi - Secret Garden",
    desc: 'Hotel pequeño (unas 15 habitaciones), también llamado «Christina\'s Hanoi - Secret Garden», en el borde oeste del Old Quarter: a unos 15 min a pie del lago Hoan Kiem y de la Calle del Tren, y a 8 min de la Estación de Tren de Hanói, de donde sale el bus 86 al aeropuerto.'
  },
  'The Nest': {
    address: 'Funky Lane, junto al Angkor Night Market, Siem Reap',
    phone: '+855 61 991 839', checkIn: '14:00', checkOut: '12:00',
    lat: 13.3558749, lng: 103.8504437, maps: 'The Nest Siem Reap',
    desc: 'Alojamiento pequeño en el centro de Siem Reap, junto al Angkor Night Market, a 500 m de Pub Street y del Old Market y a 700 m del río. Base para los tres días de templos. La miniván reservada desde el aeropuerto (10-nov, 17:30) os deja aquí.'
  },
  'Jungle Addition': {
    address: '70 Street 244, Daun Penh, Phnom Penh',
    phone: '+855 16 800 492', checkIn: '14:00', checkOut: '12:00',
    lat: 11.560271, lng: 104.9307588, maps: 'Jungle Addition Hotel Phnom Penh',
    desc: 'Hotel boutique de 18 habitaciones con jardín tropical y piscina (de 7:00 a 22:00), a 400 m del Palacio Real, a 500 m del paseo del río (Sisowath Quay) y a 600 m del Museo Nacional.'
  },
  'The Ck Hotel': {
    address: '86 Bạch Đằng, Châu Đốc (An Giang)',
    phone: '+84 296 3561 561', checkIn: '14:00', checkOut: '12:00',
    lat: 10.7108701, lng: 105.1181776, maps: 'The CK Hotel Chau Doc',
    desc: 'Hotel sencillo (antes Hotel Trung Nguyên) en el centro de Chau Doc, a 180 m del mercado central y cerca del río y de las oficinas de autobuses y barcos; habitaciones con balcón. Una sola noche, tras el ferry desde Phnom Penh.'
  },
  'De Rive Homestay - Ben Ninh Kieu': {
    address: '20 Thủ Khoa Huân, Ninh Kiều, Cần Thơ',
    phone: '+84 704 804 777', checkIn: '14:00', checkOut: '12:00',
    lat: 10.0345527, lng: 105.7881594, maps: 'De Rivé Homestay - Bến Ninh Kiều',
    desc: 'Homestay a un paso del muelle de Ninh Kiều y del paseo del río, de donde salen los barcos al mercado flotante de Cái Răng (mañana del 18). Ojo: De Rivé tiene tres casas en esta misma calle (nº 9A, 10 y 20): comprobad el número en la reserva.'
  },
  'Villa Soleil Hoi An': {
    address: '9 Phạm Hồng Thái, Hội An',
    phone: '+84 828 890 909', checkIn: '14:00', checkOut: '12:00',
    lat: 15.8777362, lng: 108.3356827, maps: 'Villa Soleil Hoi An',
    desc: 'Villa con ascensor y recepción 24 h en el extremo este del casco antiguo, a unos 500 m de los salones de asambleas chinos y a 1 km del Puente Japonés: todo el centro histórico y el mercado nocturno se hacen a pie.'
  },
  "LaDa's House Da Nang": {
    address: '58A Hoàng Văn Thụ, Hải Châu, Đà Nẵng',
    phone: '+84 913 869 866', checkIn: '14:00-18:00', checkOut: '12:00',
    lat: 16.0629584, lng: 108.2206911, maps: "LaDa's House Da Nang",
    desc: 'Casa de huéspedes en el centro de Da Nang (Hải Châu): a 3 min a pie del callejón de murales (Làng Bích Họa), a 700 m del Puente del Dragón y a 1,5 km de la estación de tren (unos 5 min en Grab para el tren de las 07:05 del día 22). La recepción es de 14:00 a 18:00: avisad de la hora de llegada.'
  },
  'Hue Sweethouse 2 Homestay': {
    address: 'Callejón 33, nº 17 de Nguyễn Công Trứ, Phú Hội, Huế',
    phone: '+84 795 669 199', checkIn: '13:00-22:00', checkOut: '11:30',
    lat: 16.4724063, lng: 107.5972699, maps: 'Hue Sweethouse 2 Homestay',
    desc: 'Homestay familiar en la orilla sur del río Perfume, en la zona de restaurantes y bares de Phú Hội. El sleeper bus a Tam Coc del día 23 sale del nº 35 de esta misma calle. La salida es a las 11:30: pedid dejar las mochilas hasta el bus nocturno.'
  },
  'Tam Coc Serenity': {
    address: 'Thôn Khê Ngoài, Ninh Thắng (Hoa Lư), Ninh Bình',
    phone: '+84 812 699 958', checkIn: '14:00', checkOut: '12:00',
    lat: 20.216607, lng: 105.9311456, maps: 'Tam Coc Serenity Hotel & Bungalow',
    desc: 'Hotel con bungalows y piscina al aire libre, abierto en 2024, entre arrozales a 1 km del embarcadero de las barcas de Tam Coc (5 min en bici) y a 1,7 km de Hang Mua. Alquilan bicis y motos.'
  },
  'The Oversleep Catba Hostel & Pool': {
    address: '180 Núi Ngọc, pueblo de Cát Bà',
    phone: '+84 888 220 529', checkIn: '14:00', checkOut: '11:00',
    lat: 20.724753, lng: 107.0524103, maps: 'The Oversleep Catba Hostel',
    desc: 'Hostal con piscina y pool bar (happy hour con cerveza gratis) en el pueblo de Cat Ba, a los pies del Cannon Fort y a unos 10 min a pie del mercado; las playas de Cat Co quedan a 700 m. La salida (27 o 28-nov) depende de si hacéis la excursión de un día o el crucero por Lan Ha.'
  },
  'La Passion Premium Cau Go': {
    address: '7 Cầu Gỗ, Hoàn Kiếm, Hanói',
    phone: '+84 24 7301 6168', checkIn: '14:00', checkOut: '12:00',
    lat: 21.0321258, lng: 105.8535077, maps: 'La Passion Premium Cau Go Hotel',
    desc: 'Hotel boutique de 13 habitaciones, abierto en 2025 y seleccionado por la Guía Michelin, a 2 min a pie del lago Hoan Kiem, en pleno Old Quarter; azotea con bar y vistas al lago. Última noche del viaje.'
  }
};
