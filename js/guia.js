// ══════════════════════════════════════════════════════════
//  GUÍA: frases de supervivencia, tarjetas culturales y fichas de alojamiento
//  (contenido fijo de consulta, separado de data.js)
//  - SURVIVAL_DICT → Inicio, «Frases de supervivencia» (buildSurvivalDictHTML)
//  - CULTURE_CARDS → Día › Resumen, «Cultura y contexto», por bloque (buildCultureHTML)
//  - HOTEL_INFO    → ficha de cada alojamiento (Alojamiento, Resumen del día y ficha emergente)
//  - TRAVEL_TIPS   → Info › Guía, «Consejos generales» (añadido el 9-oct-2026)
//  - TRIP_GUIDE    → Info › Guía, los cuatro temas plegables (29-oct-2026)
//  - EMERGENCY_HELP, EMERGENCY_EXTRA → Info › Urgencias (29-oct-2026)
//  - GUIDE_REMINDERS → avisos de Hoy la víspera de los momentos delicados (29-oct-2026)
//  - SUGGESTED_DOCS  → Info › Mi viaje, documentos sugeridos (29-oct-2026)
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
    desc: 'Hostal con piscina y pool bar (happy hour con cerveza gratis) en el pueblo de Cat Ba, a los pies del Cannon Fort y a unos 10 min a pie del mercado; las playas de Cat Co quedan a 700 m. Dos noches: la salida es el 28-nov (la excursión de Lan Ha Bay del 27 es de un día y os recogen aquí).'
  },
  'La Passion Premium Cau Go': {
    address: '7 Cầu Gỗ, Hoàn Kiếm, Hanói',
    phone: '+84 24 7301 6168', checkIn: '14:00', checkOut: '12:00',
    lat: 21.0321258, lng: 105.8535077, maps: 'La Passion Premium Cau Go Hotel',
    desc: 'Hotel boutique de 13 habitaciones, abierto en 2025 y seleccionado por la Guía Michelin, a 2 min a pie del lago Hoan Kiem, en pleno Old Quarter; azotea con bar y vistas al lago. Última noche del viaje.'
  }
};


// Consejos prácticos (Info › Guía › Consejos generales). Repasados el 9-oct-2026 a partir de
// los 12 que había en app.js y nunca se mostraban: corregido el clima (noviembre es el mes MÁS
// lluvioso del centro, no estación seca), quitados los precios de SIM que no se podían
// comprobar y el de visados. `html` admite <strong>. `enGuia: true` = su contenido ya está
// dentro de un tema de TRIP_GUIDE (29-oct-2026) y no se repite en «Consejos generales».
window.TRAVEL_TIPS = [
  { icon: '🌦️', title: 'Clima',
    html: 'Tres climas en un viaje. <strong>Norte</strong> (Hanói, Ninh Binh, Cat Ba): seco y fresco, 18-26 °C; una capa para la noche y el barco. <strong>Centro</strong> (Hoi An, Da Nang, Hue): noviembre es su <strong>mes más lluvioso</strong> y puede haber inundaciones en Hoi An; chubasquero y un plan B bajo techo. <strong>Sur y Camboya</strong>: empieza la estación seca, calor húmedo de ~30 °C.' },
  { icon: '💵', title: 'Dinero', enGuia: true,
    html: 'Vietnam paga en <strong>dong (VND)</strong>. En Camboya se usa el <strong>dólar</strong> para casi todo y los rieles para el cambio (unos 4.000 por dólar): lleva billetes de 1, 5 y 10 $ <strong>en buen estado</strong>, los rotos o muy gastados no los aceptan. Los cajeros cobran comisión por retirada: mejor sacar pocas veces y más cantidad.' },
  { icon: '📶', title: 'Internet y SIM', enGuia: true,
    html: 'Una <strong>eSIM</strong> comprada antes de salir funciona nada más aterrizar. Si no, SIM local con el pasaporte: <strong>Viettel</strong> en Vietnam (la de mejor cobertura, también en Cat Ba y el Delta) y <strong>Smart</strong> o Cellcard en Camboya. Para la escala en China, la <strong>VPN</strong> instalada antes de salir de España.' },
  { icon: '🚕', title: 'Moverse por la ciudad', enGuia: true,
    html: '<strong>Grab</strong> (coches y motos con precio cerrado) funciona en Vietnam y en Camboya; en Vietnam también <strong>Xanh SM</strong> (taxis eléctricos). En Camboya, <strong>PassApp</strong> para tuk-tuks. Si coges uno en la calle, <strong>precio acordado antes de subir</strong>.' },
  { icon: '🍜', title: 'Comida',
    html: 'Come donde hay <strong>cola de gente local</strong>: los puestos callejeros con mucha rotación son de lo más seguro. Agua siempre embotellada; el hielo en cubitos industriales (con agujero) es seguro. Imprescindibles: <strong>phở, bún chả, bánh mì, cao lầu</strong> y el <strong>amok</strong> camboyano.' },
  { icon: '💊', title: 'Salud',
    html: 'Botiquín básico: antidiarreico, ibuprofeno, antihistamínico, tiritas y desinfectante. <strong>Repelente</strong> todos los días (hay dengue en toda la zona, sobre todo al atardecer). El <strong>seguro de viaje con repatriación</strong> es imprescindible: su teléfono, en Info › Mi viaje › Mis documentos.' },
  { icon: '💉', title: 'Vacunas',
    html: 'Se piden en el <strong>Centro de Vacunación Internacional</strong> (Sanidad Exterior) con cita previa, idealmente 4-8 semanas antes. Las habituales para esta ruta: <strong>hepatitis A, fiebre tifoidea y tétanos</strong> al día. Lo que te digan allí manda.' },
  { icon: '☸️', title: 'Templos',
    html: '<strong>Hombros y rodillas cubiertos</strong> (en el nivel alto de Angkor Wat y en el Palacio Real de Phnom Penh lo controlan a la entrada). Zapatos fuera en pagodas y casas. No señales con el pie ni toques la cabeza de nadie, tampoco de los niños.' },
  { icon: '🔌', title: 'Enchufes',
    html: '220-230 V y enchufes de <strong>tipo A y C</strong> (y algún G en Camboya). Con un <strong>adaptador universal</strong> está todo cubierto; muchos hoteles tienen enchufes universales.' },
  { icon: '📷', title: 'Fotos',
    html: '<strong>Pide permiso</strong> antes de fotografiar a personas, sobre todo a monjes y en los mercados. En <strong>Tuol Sleng y Choeung Ek</strong>, móvil guardado y silencio. Drones: prohibidos en Angkor y muy restringidos en los dos países.' },
  { icon: '🏷️', title: 'Regatear',
    html: 'En mercados se regatea: empieza por el <strong>40-50 %</strong> de lo que piden y sube poco a poco. En tiendas con precio marcado, no. Siempre <strong>con una sonrisa</strong>: perder los nervios es perder la negociación.' },
];


// ══════════════════════════════════════════════════════════
//  GUÍA PRÁCTICA DEL VIAJE (Info › Guía), 29-oct-2026
//  Resumen de dos documentos de investigación del 28-oct-2026 que están en la raíz de MEGA
//  (INFO_GUIA_PRACTICA_VIAJE_CLAUDE_2026.md y GUIA_TARJETAS_CAJEROS_VIETNAM_CAMBOYA_2026.md),
//  fuera del repo. Tarjetas: primero en genérico; el mismo 29-oct Marcos pidió nombres y
//  comisiones claras de cada una (son tarifas públicas de cada banco; sin números de tarjeta
//  ni datos personales). Etiquetas de fiabilidad en cada punto:
//  g-ok «Oficial» (fuente oficial, 28-oct-2026) · g-info «Orientativo» (guías y viajeros) ·
//  g-warn «Confirmar allí» (cambia según el día o el sitio). Lo que tiene fecha concreta
//  (shuttle, frontera del Mekong…) va además en GUIDE_REMINDERS, que sale en Hoy la víspera.
//  Comprobado de nuevo el 29-oct: la tarjeta de llegada de Vietnam (PAI) y el plazo del pase
//  de Angkor tienen fuentes que discrepan; se dice así.
// ══════════════════════════════════════════════════════════
window.GUIDE_CHECKED = '28-29 oct 2026';

window.TRIP_GUIDE = [
  { id: 'fronteras', icon: '🛂', title: 'Fronteras y papeles', sub: 'Shenzhen, Hanói, Siem Reap y el Mekong',
    items: [
      '<span class="g-tag g-ok">Oficial</span> <strong>Antes de salir:</strong> pasaporte original con más de 6 meses de validez y páginas libres. Copias en papel y en el móvil, por separado: una foto <strong>no sirve</strong> como pasaporte.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Escala en Shenzhen (6-7 nov):</strong> con pasaporte español no hace falta visado (exención de 30 días, hasta el 31-dic-2026). Solo compensa salir si sobra margen para volver a facturar y pasar seguridad.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Vietnam (7 y 16 nov):</strong> sin visado, hasta 45 días. <span class="g-tag g-warn">Confirmar allí</span> La tarjeta de llegada (PAI) se rellena <strong>gratis</strong> en <strong>prearrival.immigration.gov.vn</strong> en las 72 h previas: las fuentes no se ponen de acuerdo en si en Noi Bai ya es obligatoria, así que <strong>hacedla igual</strong> y guardad el QR. Hay webs falsas que cobran: solo esa.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Camboya (10 nov):</strong> la eVisa ya está tramitada: <strong>2 copias impresas por persona</strong> (una al entrar y otra al salir). Además, la <strong>e-Arrival</strong>, gratis, en <strong>arrival.gov.kh</strong> en los 7 días previos, con su QR en el móvil. No pagar a intermediarios.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Angkor:</strong> dos pases de 3 días, solo en la web oficial de Angkor Enterprise o en su taquilla, comprados <strong>antes del amanecer del 11</strong>. El plazo para usarlos es corto (la web oficial habla ahora de 7 días; guías antiguas dicen 10): con el 11, 12 y 13 seguidos, vale igual.',
      '<span class="g-tag g-warn">Confirmar allí</span> <strong>Frontera por el Mekong (16 nov):</strong> pasaportes a mano, no en la maleta. Confirmad con Hang Chau el embarcadero, la hora de presentación y si gestionan ellos los trámites. Comprobad el <strong>sello de salida de Camboya y el de entrada en Vietnam</strong>, y que os devuelven los dos pasaportes. Un pago extra: concepto y recibo.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Vuelta (29-30 nov):</strong> el Shenzhen → Barcelona sale a la 01:45 del 30, hora de China. Al facturar en Hanói, comprobad hasta dónde va la maleta.',
    ],
    sources: [
      { t: 'Exteriores: recomendaciones para Vietnam', u: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Vietnam' },
      { t: 'Exteriores: recomendaciones para Camboya', u: 'https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Detalle-recomendaciones-de-viaje.aspx?trc=Camboya' },
      { t: 'Embajada de China: exención de visado', u: 'https://es.china-embassy.gov.cn/esp/lqyw/202511/t20251105_11747149.htm' },
      { t: 'Vietnam: tarjeta de llegada (PAI)', u: 'https://prearrival.immigration.gov.vn/' },
      { t: 'Camboya: eVisa', u: 'https://www.evisa.gov.kh/' },
      { t: 'Camboya: e-Arrival', u: 'https://arrival.gov.kh/' },
      { t: 'Angkor Enterprise: entradas', u: 'https://www.angkorenterprise.gov.kh/en/available-tickets' },
    ] },

  { id: 'dinero', icon: '💳', title: 'Dinero y tarjetas', sub: 'Comisiones de cada tarjeta y qué cajeros no cobran',
    items: [
      '<strong>Qué tarjeta usar, por orden:</strong> <strong>1. Trade Republic</strong> para pagar y para sacar. <strong>2. Revolut</strong>, de respaldo (mejor entre semana). <strong>3. Openbank</strong>, solo si fallan las dos. <strong>4. Bankinter (crédito)</strong>, guardada aparte para fianzas y emergencias: <strong>nunca para sacar efectivo</strong>. Llevadlas en sitios distintos.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Comisiones de vuestras tarjetas</strong> (lo que cobra vuestro banco; el cajero puede cobrar lo suyo aparte):'
        + '<table class="g-table"><thead><tr><th>Tarjeta</th><th>Pagar con tarjeta</th><th>Sacar del cajero</th></tr></thead><tbody>'
        + '<tr><th>Trade Republic</th><td class="g-free">0 % (cambio de Visa)</td><td class="g-free">0 € si sacas 100 € o más · 1 € si menos</td></tr>'
        + '<tr><th>Revolut Standard</th><td class="g-free">0 % de lunes a viernes, hasta 1.000 € al mes · <span class="g-cost">1 % en fin de semana y por encima</span></td><td class="g-free">Gratis hasta 200 € o 5 retiradas al mes · <span class="g-cost">luego 2 % (mín. 1 €)</span></td></tr>'
        + '<tr><th>Openbank Open Debit</th><td class="g-cost">3 %</td><td class="g-cost">4,5 % (mín. 3 €)</td></tr>'
        + '<tr><th>Bankinter crédito</th><td class="g-cost">3 % (salvo exención en vuestro contrato)</td><td class="g-cost">4 % (mín. 3 €) + 3 %: evitar</td></tr>'
        + '</tbody></table>',
      '<strong>Ejemplos.</strong> Sacar el equivalente a 200 €: Trade Republic <strong>0 €</strong> · Revolut <strong>0 €</strong> (si te queda cupo del mes) · Openbank <strong>9 €</strong> · Bankinter <strong>unos 14 €</strong>, más lo del cajero. Pagar 100 €: Trade Republic y Revolut <strong>0 €</strong> (Revolut, 1 € en fin de semana) · Openbank y Bankinter <strong>3 €</strong>. Con Trade Republic, sacad de una vez <strong>100 € o más</strong>: por debajo cobra 1 €.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Rechazad siempre la «conversión a euros»</strong> del cajero o del datáfono (DCC, «guaranteed rate», «charge in EUR»): elegid la moneda local, «without conversion». Si no, el cajero aplica su cambio, que es peor.',
      '<strong>Cajeros de Vietnam</strong> (pagad siempre en dong):<br>'
        + '✅ <strong>No cobran:</strong> <strong>Shinhan Bank</strong> <span class="g-tag g-ok">Oficial</span> (no cobra a las Visa de bancos europeos) y <strong>VPBank</strong> <span class="g-tag g-info">Orientativo</span> (0 ₫ según los viajeros).<br>'
        + '⚠️ <strong>Depende del cajero:</strong> ACB y Eximbank.<br>'
        + '❌ <strong>Cobran:</strong> TPBank (~3,3 %), BIDV (hasta 3 %, mín. 50.000 ₫), Vietcombank (~50.000 ₫), Agribank y Techcombank (una cantidad fija pequeña). <span class="g-tag g-info">Orientativo</span>',
      '<strong>Cajeros de Camboya</strong> (casi todos cobran; dan dólares o rieles):<br>'
        + '✅ <strong>No cobra:</strong> <strong>Shinhan Bank</strong> <span class="g-tag g-warn">Confirmar allí</span> (0 $ según los viajeros, sin tarifa oficial).<br>'
        + '❌ <strong>Cobran:</strong> Mékong Bank (~3 $), PPCBank (5 $ <span class="g-tag g-ok">Oficial</span>), ABA (5 $ + 0,4 %), ACLEDA (~5 $), Canadia (~5 $) y BRED (entre 4 y 10 $). <span class="g-tag g-info">Orientativo</span><br>'
        + 'Si cobra una cantidad fija, sacad de una vez lo de varios días. Revisad que los billetes de dólar no estén rotos ni muy gastados: no los aceptan.',
      '<span class="g-tag g-ok">Oficial</span> <strong>Grab en Vietnam</strong> cobra un <strong>4 % extra</strong> si se paga con tarjeta extranjera (también con Trade Republic): si la app lo deja, en efectivo sale mejor.',
      '<strong>Antes de salir:</strong> Trade Republic con saldo, PIN y la tarjeta física activada; Revolut, comprobad que la tenéis <strong>física</strong> (la virtual no sirve en los cajeros) y cuándo se reinicia su cupo mensual; Bankinter, mirad en la app si vuestra tarjeta está exenta de la comisión internacional y si se paga a fin de mes. Revisad el extracto después de cada retirada.',
    ],
    sources: [
      { t: 'Trade Republic: comisiones de retirada', u: 'https://support.traderepublic.com/es-es/1666-What-are-the-withdrawal-limits-and-fees' },
      { t: 'Revolut: plan Standard', u: 'https://help.revolut.com/es-ES/help/profile-and-plan/my-plan-benefits/revolut-plans1/standard-plan/' },
      { t: 'Revolut: retiradas en otras monedas', u: 'https://help.revolut.com/es-ES/help/card-payments-withdrawals/atm-withdrawals/withdrawing-in-other-currencies/' },
      { t: 'Openbank: Open Debit', u: 'https://www.openbank.es/tarjeta-debito-open-debit/' },
      { t: 'Bankinter: tarjeta de crédito', u: 'https://www.bankinter.com/banca/cuentas-tarjetas/tarjetas/tarjeta-credito' },
      { t: 'Shinhan Bank Vietnam: cajeros', u: 'https://shinhan.com.vn/en/personal/atm.html' },
      { t: 'PPCBank Camboya: comisión de cajeros', u: 'https://www.ppcbank.com.kh/atm-fee/' },
      { t: 'Grab Vietnam: pago con tarjeta', u: 'https://help.grab.com/passenger/en-vn/115014922167-How-do-I-add-my-creditdebit-card-to-GrabPay' },
      { t: 'Comparativa de cajeros en Vietnam (no oficial)', u: 'https://povnomad.com/en/atm-fees-vietnam/' },
      { t: 'Comparativa de cajeros en Camboya (no oficial)', u: 'https://atm-fees.com/en/cambodia' },
    ] },

  { id: 'transporte', icon: '🚕', title: 'Transporte y timos', sub: 'Shuttle, tuk-tuks, bus nocturno y barcos',
    items: [
      '<strong>Antes de subir:</strong> comprobad el operador, la matrícula y el precio total (por coche o por persona, con peajes y equipaje). No creáis a quien diga que «el transporte oficial está cerrado» y <strong>nunca dejéis el pasaporte como fianza</strong> (motos, e-bikes).',
      '<strong>Apps:</strong> Grab (coche o moto, precio cerrado) en los dos países; en Vietnam también Xanh SM, y en Camboya PassApp para tuk-tuks. En la calle, precio acordado antes de subir.',
      '<span class="g-tag g-warn">Confirmar allí</span> <strong>Siem Reap (10 nov):</strong> aterrizáis a las 16:55 y el shuttle es a las 17:30. Preguntad antes cuánto espera si el vuelo se retrasa. Si no aparece, buscadlo en llegadas: no subáis al primero que diga ser «el shuttle».',
      '<strong>Angkor (11-13 nov):</strong> con tuk-tuk de día completo, acordad el precio por todo el día y los dos, el recorrido, las esperas y la vuelta. Con e-bike, mirad frenos, batería y casco.',
      '<strong>Bus nocturno (13-14 nov):</strong> llega a Phnom Penh a las 04:30: dejad pensado cómo ir al hotel (Grab o PassApp) antes de bajar. Objetos de valor pegados al cuerpo.',
      '<strong>Barcos (16 y 27 nov):</strong> chalecos a bordo y vista al tiempo. Si hay aviso de tormenta, no forcéis el embarque.',
      '<strong>Si cambian el precio o dicen que se ha cancelado:</strong> nada de suplementos sin recibo; confirmad por el canal de la reserva y, si algo no parece seguro, volved al hotel.',
    ],
    sources: [
      { t: 'Grab Vietnam: recargo con tarjeta extranjera', u: 'https://help.grab.com/passenger/en-vn/115014922167-How-do-I-add-my-creditdebit-card-to-GrabPay' },
    ] },

  { id: 'internet', icon: '📶', title: 'Internet y móvil', sub: 'SIM, roaming y la app sin conexión',
    items: [
      '<span class="g-tag g-ok">Oficial</span> <strong>El roaming de la UE no vale</strong> en Vietnam, Camboya ni China: desactivad los datos en itinerancia de la SIM española si no tenéis un bono para allí.',
      '<span class="g-tag g-info">Orientativo</span> <strong>SIM o eSIM local:</strong> una eSIM comprada antes funciona al aterrizar. Si no, en un mostrador oficial y con el pasaporte: <strong>Viettel</strong> en Vietnam (la de mejor cobertura) y <strong>Smart</strong> o Metfone en Camboya. No os vayáis del mostrador sin ver datos en el móvil.',
      '<strong>China (escala):</strong> Google, WhatsApp e Instagram están bloqueados: la VPN, instalada antes de salir de España.',
      '<strong>Esta app sin conexión:</strong> con wifi, abridla en los dos móviles hasta que Inicio diga «Lista para usar sin conexión»; probadla en modo avión y pasad por el Mapa de cada ciudad (el mapa solo se guarda en las zonas vistas). Bajad también los mapas sin conexión de Google Maps.',
      '<strong>Fuera de la app, guardad en el móvil:</strong> los PDF de las reservas, la eVisa, los QR de las tarjetas de llegada y la póliza del seguro.',
      '<strong>Sin datos:</strong> modo avión y quitarlo, reiniciar, wifi del hotel. Nada de contraseñas del banco en wifis públicas.',
    ],
    sources: [] },
];

// Urgencias › «¿Qué ha pasado?»: pasos cortos, en orden
window.EMERGENCY_HELP = [
  { icon: '🤒', title: 'Me encuentro mal o hay un accidente', steps: [
    'Si es grave, llamad a la ambulancia (botón de arriba) y dad la ubicación exacta.',
    'Después, la asistencia 24 h del seguro: os dice a qué hospital ir y lo autoriza. Su teléfono, en Mi viaje › Mis documentos.',
    'Guardad facturas e informes. En Camboya, fuera de Phnom Penh la ambulancia puede no llegar: pedid ayuda al hotel.' ] },
  { icon: '🛂', title: 'He perdido el pasaporte', steps: [
    'Buscadlo y avisad al hotel. Si no aparece, denuncia en la policía.',
    'Llamad a la embajada (botón de arriba) y avisad a la aerolínea y al seguro.',
    'En Vietnam, después del pasaporte provisional hace falta un permiso de salida que tarda varios días: actuad cuanto antes. Si el viejo aparece después de denunciarlo, ya no vale.' ] },
  { icon: '💳', title: 'Nos han robado el móvil o una tarjeta', steps: [
    'Bloquead las tarjetas desde la app del banco (con el otro móvil) o por su teléfono oficial. No pulséis enlaces de supuestos bancos.',
    'Bloquead la SIM y cambiad la contraseña del correo; cerrad sesiones.',
    'Seguid con la tarjeta de reserva guardada aparte y denunciad si hay cargos que no reconocéis.' ] },
  { icon: '👥', title: 'Nos hemos separado', steps: [
    'No sigáis andando: id al alojamiento de esta noche (abajo) o al sitio que hayáis acordado.',
    'Llamaos o escribíos; si no hay datos, pedid el wifi o el teléfono de un hotel o una cafetería.' ] },
  { icon: '🚌', title: 'Hemos perdido un transporte', steps: [
    'Revisad la reserva: punto de salida, hora local y operador (Mi viaje › Reservas).',
    'Contactad con el operador por el canal de la reserva y guardad capturas y tiques de los gastos.',
    'No deis dinero a intermediarios improvisados. Con billetes separados, el siguiente no os recoloca solo.' ] },
  { icon: '🌧️', title: 'Tormenta, inundación o barco poco seguro', steps: [
    'Seguid lo que digan las autoridades y el hotel.',
    'No subáis a un barco sin chalecos o sobrecargado, ni vayáis en moto con lluvia fuerte. La seguridad va antes que la excursión.' ] },
];

// Teléfonos públicos extra de Camboya para extranjeros (Ministerio de Turismo, vía la agencia
// oficial AKP, 3-sep-2026). Se enseñan en Urgencias junto a los de DB.localEmergency.
window.EMERGENCY_EXTRA = {
  camboya: [
    { label: 'Policía para extranjeros', phone: '+855 31 201 2345' },
    { label: 'Policía turística', phone: '+855 16 654 736' },
  ],
};

// Avisos de Hoy la víspera de los momentos delicados (además de los automáticos)
window.GUIDE_REMINDERS = [
  { date: '2026-11-09', icon: '🚐', text: 'Mañana aterrizáis en Siem Reap a las 16:55 y el shuttle es a las 17:30: confirmad hoy con Siem Reap Shuttle cuánto espera si el vuelo se retrasa.' },
  { date: '2026-11-13', icon: '🌙', text: 'El bus nocturno llega a Phnom Penh a las 04:30: dejad pensado cómo ir al hotel (Grab o PassApp) y avisad al hotel de la hora.' },
  { date: '2026-11-15', icon: '⛴️', text: 'Mañana, frontera por el Mekong: confirmad con Hang Chau el embarcadero y la hora de presentación. Pasaportes a mano (no en la maleta) y comprobad los dos sellos.' },
  { date: '2026-11-26', icon: '🌊', text: 'Mañana, excursión por Lan Ha: mirad el parte del mar y confirmad la hora de recogida en el hotel.' },
];

// Mis documentos: los que conviene tener a mano. Se enseñan como tarjetas para añadir su
// enlace (Google Drive…) hasta que hay un documento cuyo nombre encaja con `match`.
window.SUGGESTED_DOCS = [
  { name: 'Pasaportes (copias)', category: 'identificacion', match: 'pasaporte' },
  { name: 'Seguro de viaje', category: 'seguros', match: 'seguro|póliza|poliza' },
  { name: 'Billetes de avión', category: 'vuelos', match: 'billete|vuelo|embarque' },
  { name: 'eVisa de Camboya', category: 'visados', match: 'evisa|visado' },
  { name: 'Reservas de hoteles', category: 'reservas', match: 'hotel|alojamiento' },
];
