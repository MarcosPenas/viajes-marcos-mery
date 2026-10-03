// ============================================================
//  DATOS POR DEFECTO — Vietnam & Camboya 2026  (v15 — datos reales del planning)
// ============================================================

const DEFAULT_DATA = {
  trips: [
    {
      id: 'vietnam-camboya-2026',
      name: 'Vietnam & Camboya',
      subtitle: '25 días por el sudeste asiático',
      emoji: '🌏',
      coverGradient: 'linear-gradient(135deg, #1a472a 0%, #2d6a4f 50%, #40916c 100%)',
      coverImage: 'img/places/lan_ha_bay.jpg',
      myMapsUrl: 'https://www.google.com/maps/d/embed?mid=194Es7AqKfUlcUO6Jttbp0-7O_fFw3Zk',
      startDate: '2026-11-05',
      endDate:   '2026-11-29',
      days: [
        {
          date: '2026-11-05', city: 'Aeropuerto de Barcelona-El Prat', country: '🇪🇸 España', block: 'Vuelos',
          summary: 'Vuelo Santiago–Barcelona (Vueling, localizador FJUFTJ). Noche en Barcelona antes del vuelo intercontinental del día siguiente.',
          places: [],
          restaurants: [],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo Santiago→Barcelona — Vueling, localizador FJUFTJ. María: 15 kg facturado + cabina. Marcos: 20 kg facturado + cabina.', from: 'Santiago', to: 'Barcelona', time: '18:50–20:25 (1h 35min)' }
          ],
          hotel: { name: 'B&B Hotel Barcelona Viladecans', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-06', city: 'Aeropuerto de Shenzhen (escala)', country: '🇪🇸 España → 🇨🇳 China', block: 'Vuelos',
          summary: 'Bus L99 al aeropuerto (07:50). Vuelo internacional Barcelona–Shenzhen (Shenzhen Airlines, localizador ME0D7S). Escala en Shenzhen de 5h 40min antes de continuar a Hanói al día siguiente.',
          places: [],
          restaurants: [],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Bus L99 al aeropuerto de Barcelona', from: 'Barcelona centro', to: 'Aeropuerto BCN', time: '07:50' },
            { type: 'flight', icon: '✈️', details: 'Vuelo internacional Barcelona→Shenzhen — Shenzhen Airlines, localizador ME0D7S. María: 23 kg facturado + cabina 5 kg. Marcos: 23 kg facturado + cabina 5 kg. Escala en Shenzhen de 5h 40min.', from: 'Barcelona', to: 'Shenzhen', time: '11:20–07:10 (+1) · 12h 50min' }
          ],
          hotel: { name: '', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-07', city: 'Hanói', country: '🇨🇳 China → 🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Vuelo Shenzhen→Hanói. Llegada y alojarse; ruta circular corta por el Barrio Antiguo si hay tiempo.',
          places: [
            { name: 'Old Quarter (Barrio Antiguo)', type: 'monument', lat: 21.0372109, lng: 105.8508312,
              notes: 'Primer paseo. Bia Hoi Corner, street food, caos maravilloso.',
              photo: 'img/fotos/old-quarter.jpg',
              description: 'El Old Quarter es un laberinto de 36 calles históricas especializadas en gremios artesanales: Hàng Bạc (Plata), Hàng Mã (Farolillos), Hàng Quạt (Altares), Hàng Chiếu (Esterillas). Las Casas Tubo tienen fachadas de 2-4m pero hasta 60m de profundidad — los impuestos se pagaban por anchura. Los fines de semana se corta al tráfico y hay mercado nocturno (vie-dom 18:30-23:30).',
              tips: 'Bia Hoi Corner: esquina Lương Ngọc Quyến y Tạ Hiện — cerveza callejera 0,30 USD. Ancient House 87 Ma May: 10.000 VND para ver interior de casa tubo. Puerta Ô Quan Chưởng: única de la muralla del s.XVIII. TIMO mujeres con sombrero cónico y fruta: rechazar desde el primer momento.' },
            { name: 'Catedral de San José', type: 'temple', lat: 21.0286483, lng: 105.8488566,
              notes: 'Neogótica de 1886 inspirada en Notre-Dame. Fachada ennegrecida muy fotogénica. Gratuita.',
              photo: 'img/fotos/catedral-de-san-jose.jpg',
              description: 'La iglesia católica más antigua de Hanói (1886), con dos torres de 31 metros. Al entrar, los vitrales franceses del XIX contrastan con el altar de madera lacada en rojo y oro estilo vietnamita. La Plaza de la Virgen frente a la entrada es un punto de reunión icónico.',
              tips: 'Nhà Chung 40. 8:00-11:00 y 14:00-17:00. Gratuita. Se llena en misas dominicales.' },
            { name: 'Lago Hoan Kiem y Templo Ngoc Son', type: 'temple', lat: 21.0288313, lng: 105.8525357,
              notes: 'El corazón espiritual de Hanói. Puente rojo, tortuga disecada 250 kg, leyenda de la espada.',
              photo: 'img/fotos/lago-hoan-kiem-y-templo-ngoc-son.jpg',
              description: 'El Hồ Hoàn Kiếm (Lago del Espíritu Devuelto) es el corazón de Hanói. El Puente Huc (rojo brillante) conecta la orilla con el Templo Ngọc Sơn, donde se conserva una tortuga disecada de 250 kg. La Torre de la Tortuga emerge de un islote en el centro del lago. A las 6-7:30 h, cientos de locales practican Tai Chi y yoga en las orillas.',
              tips: 'Templo Ngoc Son: 8:00-18:00, 30.000 VND. Lago: gratuito 24h. Los domingos se cierra al tráfico todo alrededor — el mejor momento. Fines de semana hay mercado peatonal nocturno.' },
            { name: 'Café Phố Cổ (azotea secreta sobre el lago)', type: 'cafe', lat: 21.0288313, lng: 105.8525357,
              notes: 'Las mejores vistas del Lago Hoan Kiem. Entrada por una tienda de sedas en Hàng Gai 11.',
              description: 'El café con mejores vistas secretas del lago. Completamente oculto a pie de calle. Hay que entrar por una tienda de sedas del nº 11 de Hàng Gai, cruzar el pasillo oscuro hasta el patio interior antiguo, y subir 4 pisos por escaleras de caracol empinadas.',
              tips: 'Hàng Gai nº 11. 8:00-23:00. Entra en la tienda de sedas → fondo del pasillo → patio → escaleras de caracol al 4º piso. Terraza panorámica espectacular. Precio económico.' },
            { name: 'Tạ Hiện (Beer Street)', type: 'monument', lat: 21.0341902, lng: 105.852079,
              notes: 'La calle de la fiesta y la Bia Hoi Corner del Barrio Antiguo — taburetes de plástico, cerveza a 0,30 USD y ambiente hasta tarde.',
              photo: 'img/fotos/ta-hien.jpg',
              description: 'La calle más animada del Barrio Antiguo por las noches, sobre todo en su cruce con Lương Ngọc Quyến (la "Bia Hoi Corner"): terrazas improvisadas con taburetes bajos de plástico ocupan toda la acera, cerveza artesanal recién hecha a 0,30 USD el vaso, y ambiente mixto de locales y turistas hasta bien entrada la noche.',
              tips: 'Se anima sobre todo a partir de las 19:00-20:00, fines de semana especialmente. Fácil combinarlo con el paseo del Old Quarter.' }
          ],
          restaurants: [
            { name: 'Phở Bò', type: 'restaurant', photo: 'img/fotos/pho-bo.jpg', notes: 'Desayuno clásico de reencuentro con Vietnam.' },
            { name: 'Bia Hơi', type: 'restaurant', photo: 'img/fotos/bia-hoi.jpg', notes: 'Cerveza artesanal callejera a 0,30 USD el vaso, el ritual social de cualquier tarde en Hanói.' },
            { name: 'Nem Rán (Chả Giò)', type: 'restaurant', notes: 'Rollitos de primavera fritos con cerdo, gambas y verdura — el acompañante clásico de cualquier comida vietnamita.',
              photo: 'img/fotos/nem-ran.jpg' },
            { name: 'Bún Đậu Mắm Tôm', type: 'restaurant', notes: 'Fideos de arroz, tofu frito y cerdo cocido mojados en pasta de gambas fermentada — un clásico de culto del Barrio Antiguo, no apto para todos los olfatos.',
              photo: 'img/fotos/bun-dau-mam-tom.jpg' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo Shenzhen→Hanói', from: 'Shenzhen', to: 'Hanói (HAN)', time: '12:50–13:55 (2h 50min)' }
          ],
          hotel: { name: 'Secret Garden Hanoi', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Llegada a Vietnam — qué hacer al aterrizar en Nội Bài (HAN): el avión llega a la Terminal T2 (terminal internacional), donde están los controles de inmigración, la recogida de maletas y la aduana. 1) Inmigración: enseñar el pasaporte y el eVisa (imprimido o en el móvil) — con eVisa se pasa directo a control, sin gestión adicional en el aeropuerto. Importante: desde junio de 2026 hace falta rellenar también la "Vietnam Digital Arrival Card" ONLINE antes de volar, en prearrival.immigration.gov.vn — se hace dentro de las 72h antes del vuelo (o sea, el día 6 o muy temprano el día 7), genera un código QR que hay que enseñar al agente de inmigración junto al pasaporte. No sustituye al eVisa, es un trámite aparte. 2) Recogida de equipaje y aduana (todo el proceso de inmigración+maletas suele llevar 30-60 min según cuánta gente haya). 3) Ir a la ciudad: el aeropuerto está a unos 27 km del Old Quarter (35-50 min en coche). Opción más cómoda: Grab (app de VTC, se pide en el propio aeropuerto con wifi) por 250.000-350.000 VND. Taxi oficial (Mai Linh u otro con distintivo del aeropuerto) algo más caro, 350.000-450.000 VND. Opción económica: bus 86 (línea exprés turística a Old Quarter/Estación de tren), 45.000 VND por persona, sale cada 25-30 min. Evitar a cualquiera que ofrezca taxi/transporte dentro de la terminal antes de la zona oficial de taxis — es la estafa clásica de todos los aeropuertos del sudeste asiático. Alojamiento Secret Garden Hanoi: entrada 7-nov, salida 10-nov.'
        },
        {
          date: '2026-11-08', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Plan: Historia y Política (Distrito de Ba Dinh y Oeste).',
          places: [
            { name: 'Mausoleo de Ho Chi Minh y Pagoda de un Solo Pilar', type: 'monument', photo: 'img/fotos/mausoleo-de-ho-chi-minh-y-pagoda-de-un-solo-pila.jpg', lat: 21.0367831, lng: 105.8346888,
              notes: '¡CIERRA LUNES Y VIERNES! El cuerpo embalsamado de Ho Chi Minh. Pagoda de loto en una sola columna.',
              description: 'Edificio de granito gris inspirado en el mausoleo de Lenin, con guardia de honor y cambio de guardia cada hora en punto. Detrás, la Pagoda de un Solo Pilar (1049) imita una flor de loto sobre el agua. La Casa de la Zancuda (jardines + vivienda de madera donde vivió Ho Chi Minh, rechazando el Palacio Presidencial de al lado) se visita con una entrada aparte de 40.000 VND.',
              tips: 'Exterior 5:00-22:00, interior (cuerpo) 8:00-11:00. Cierra lunes y viernes, y también sept-nov por el reembalsamamiento anual en Rusia. Entrada gratuita al recinto exterior.' },
            { name: 'Ciudadela Imperial de Thang Long', type: 'monument', lat: 21.0383903, lng: 105.8406237,
              notes: 'Patrimonio UNESCO. 13 siglos de poder imperial. Búnker secreto a 9m de profundidad con los mapas de guerra intactos.',
              photo: 'img/fotos/ciudadela-imperial-de-thang-long.jpg',
              description: 'Centro del poder político vietnamita durante 13 siglos. La Puerta Doan Mon (entrada sur, subible) da vistas a la Torre de la Bandera; se conservan escalinatas de piedra del s.XV con dragones tallados. Escondido detrás, el búnker de hormigón de 1967 (Casa D67) baja 9m bajo tierra con las salas de mapas y teléfonos desde donde el general Giap dirigió la guerra. Las excavaciones del sector 18 Hoang Dieu siguen activas.',
              tips: 'Hoang Dieu 19, dist. Ba Dinh. Ma-Do 8:00-17:00, 30.000 VND. Poca sombra: sombrero y agua. Muy pocos turistas.' },
            { name: 'Calle Phan Đình Phùng', type: 'monument', lat: 21.0242022, lng: 105.8578344,
              notes: 'La avenida más bonita de Hanói — túnel verde de árboles, favorita para fotos con Ao Dai.',
              photo: 'img/fotos/calle-phan-dinh-phung.jpg',
              description: 'Avenida de 1,5km flanqueada por árboles gigantes que forman un túnel verde, apodada "la calle del otoño". Conecta el norte del Old Quarter con West Lake. Verás vendedoras ambulantes de flores en bicicleta y la Iglesia de Cửa Bắc (1932, amarilla).',
              tips: 'Mejor entre 7:00-9:30h, sobre todo en otoño (sept-nov) con las hojas caídas. Parada obligatoria de té helado (Trà Chanh) en los callejones laterales.' },
            { name: 'Lago B-52 (Hữu Tiệp Lake)', type: 'monument', lat: 21.0379603, lng: 105.8269943,
              notes: 'Restos de un B-52 derribado en 1972, hundidos en un estanque de barrio. Gratis, 24h.',
              photo: 'img/fotos/lago-b-52.jpg',
              description: 'En mitad de un pequeño estanque residencial del barrio de Ngọc Hà sobresalen los restos oxidados del tren de aterrizaje de un bombardero B-52 estadounidense, derribado la noche del 27 de diciembre de 1972. A 5 min andando, el Museo de la Victoria B-52 (157 Đội Cấn) tiene restos más grandes, misiles SAM y fotos de la época.',
              tips: 'Callejón 55, calle Hoàng Hoa Thám. Combínalo a pie con el Mausoleo (10-15 min andando). Mejor luz al amanecer o al atardecer, para el reflejo en el agua.' },
            { name: 'Templo de la Literatura', type: 'temple', photo: 'img/fotos/templo-de-la-literatura.jpg', lat: 21.0287903, lng: 105.8359533,
              notes: 'Primera universidad de Vietnam (1070). El Pabellón Khue Van está en los billetes de 100.000 VND.',
              description: 'Primera academia imperial de Vietnam (1070), dedicada a Confucio, organizada en 5 patios sucesivos. El Pabellón Khue Van (ventana circular) es el símbolo oficial de Hanói. Las 82 estelas de piedra sobre tortugas talladas conmemoran a los doctores graduados entre los siglos XV-XVIII.',
              tips: 'Quoc Tu Giam, dist. Dong Da. 8:00-17:00, 30.000 VND. Entrar a primera hora para evitar grupos.' },
            { name: 'Hanoi Train Street', type: 'monument', photo: 'img/fotos/hanoi-train-street.jpg', lat: 21.0301529, lng: 105.8440687,
              notes: 'El tren pasa rozando las fachadas. Entrar por cafeterías autorizadas (consume algo y te dejan pasar).',
              description: 'En las calles Phùng Hưng y Trần Phú del Old Quarter, un tren de pasajeros pasa a centímetros de las terrazas de los cafés. Para entrar hay que dejarse "reclutar" como cliente por los dueños de los cafés del interior, que te identifican ante la policía. 5 min antes del tren, todo el mundo pega la espalda a la pared — prohibido sacar brazos o palos de selfie.',
              tips: 'L-V solo noche: 19:00, 19:45, 20:30, 22:00. S-D también de día: 9:15, 11:20, 15:20, 17:30, 18:00. Llegar 30-45 min antes. Tramo alternativo menos turístico: Ngõ 222 Lê Duẩn.' },
            { name: 'Prisión de Hoa Lo', type: 'museum', photo: 'img/fotos/prision-de-hoa-lo.jpg', lat: 21.0254222, lng: 105.8465093,
              notes: 'Prisión colonial francesa. Guillotina original. El traje de piloto de John McCain. Audioguía en español imprescindible.',
              description: 'Construida por los franceses para torturar a disidentes vietnamitas; décadas después retuvo a pilotos americanos derribados, apodada irónicamente "Hanoi Hilton". Dos bloques: época colonial (más oscura, guillotina original, celdas de castigo) y Guerra de Vietnam (versión suavizada, incluye el traje de piloto de John McCain).',
              tips: 'Calle Hoa Lo, dist. Hoan Kiem. 8:00-17:00, 50.000 VND. Audioguía en español: 100.000 VND extra, muy recomendable. Necesitas 1,5-2h; algunas salas son duras emocionalmente.' },
            { name: 'Palacio de la Ópera y Hotel Sofitel Legend Metropole', type: 'monument', photo: 'img/fotos/palacio-de-la-opera-y-hotel-sofitel-legend-metro.jpg', lat: 21.0242022, lng: 105.8578344,
              notes: 'Lujo colonial francés del s.XIX. Terraza parisina y un búnker antiaéreo secreto bajo el patio.',
              description: 'La Ópera (inspirada en la de París) y, a pocos metros, el Sofitel Metropole (1901, por donde pasaron Chaplin o Somerset Maugham). Bajo su patio se descubrió en 2011 un búnker antiaéreo de la guerra de Vietnam.',
              tips: 'Corazón del Barrio Francés, 5 min a pie del Lago Hoan Kiem. Tomar algo en "La Terrasse" (zona común, sin necesidad de ser huésped). El búnker es solo para huéspedes salvo que preguntes con educación en recepción.' },
            { name: 'Teatro de Marionetas de Agua', type: 'monument', photo: 'img/fotos/teatro-de-marionetas-de-agua.jpg', lat: 21.0317043, lng: 105.853455,
              notes: 'Arte del siglo XI. Marionetas de madera en el agua con orquesta tradicional en vivo.',
              description: 'Los artistas manejan marionetas de madera desde detrás de una pantalla, sumergidos en agua hasta la cintura, con orquesta "Cheo" en directo. Las escenas muestran vida rural (siembra, pesca) y leyendas locales, incluida la propia Leyenda de la Espada del Lago Hoan Kiem.',
              tips: 'Đinh Tiên Hoàng 57B. Pases de 45 min (15:00, 16:10, 17:20, 18:30, 20:00), 100.000-200.000 VND. Comprar con antelación. Filas 1-2 salpican.' }
          ],
          restaurants: [
            { name: 'Bún Chả Hương Liên', type: 'restaurant', photo: 'img/fotos/bun-cha-huong-lien.jpg',
              notes: 'El local donde comieron Obama y Bourdain en 2016.',
              description: 'Bún chả (albóndigas y panceta a la parrilla sobre fideos de arroz, en un caldo agridulce) en el local que se hizo mundialmente famoso tras la visita de Barack Obama y Anthony Bourdain en 2016 para el programa "Parts Unknown". Desde entonces tiene la mesa donde comieron protegida bajo una vitrina de cristal.',
              tips: '24 Lê Văn Hưu, dist. Hai Bà Trưng. Pide el "Combo Obama" (bún chả + nem + Bia Hà Nội), el mismo menú que sirvieron aquel día. Suele haber cola a la hora de comer.' },
            { name: 'Café Giảng (Cà Phê Trứng)', type: 'restaurant', photo: 'img/fotos/cafe-giang.jpg',
              notes: 'Café de huevo, invento de 1946 cuando escaseaba la leche. Café Giảng es la cafetería original.',
              description: 'Nguyen Van Giang, antiguo barman del Sofitel Metropole, inventó el cà phê trứng en 1946 batiendo yema de huevo con azúcar y leche condensada hasta formar una espuma cremosa sobre café caliente, como sustituto de la leche fresca (escasa entonces en Hanói). Café Giảng, fundado por él, sigue siendo la referencia del plato, servido en un cuenco de barro con agua caliente debajo para mantenerlo templado.',
              tips: '39 Nguyễn Hữu Huân, dist. Hoan Kiem — entrada discreta por un callejón, subir a la 2ª planta. Local pequeño y muy turístico a mediodía; mejor a media mañana. Pide también el cacao de huevo si no eres de café.' },
            { name: 'Bún Riêu', type: 'restaurant', notes: 'Sopa de fideos con tomate y un pastel de cangrejo de río, uno de los desayunos más queridos de Hanói.',
              photo: 'img/fotos/bun-rieu.jpg' },
            { name: 'Xôi Xéo', type: 'restaurant', notes: 'Arroz glutinoso amarillo con mung bean, cebolla frita y a veces pollo — el desayuno para llevar más clásico de la ciudad.',
              photo: 'img/fotos/xoi-xeo.jpg' }
          ],
          transport: [],
          hotel: { name: 'Secret Garden Hanoi', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-09', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Plan: Hanói Alternativo y los Lagos del Norte.',
          places: [
            { name: 'Puente de Long Bien', type: 'monument', photo: 'img/fotos/puente-de-long-bien.jpg', lat: 21.0430652, lng: 105.8580334,
              notes: 'Puente metálico colonial sobre el Río Rojo, con trenes, motos y peatones compartiendo vía.',
              description: 'Construido en el periodo colonial francés de comienzos del s.XX, conecta el centro con el distrito de Long Biên. Conserva su estructura de vigas de hierro envejecida, con vistas al Río Rojo y a la Isla de los Plátanos.',
              tips: 'Acceso libre 24h. A media altura del puente hay unas escaleras metálicas que bajan a la Isla de los Plátanos.' },
            { name: 'Isla de los Plátanos (Bãi Giữa)', type: 'nature', lat: 21.0285, lng: 105.8542,
              notes: 'Isla rural en el Río Rojo bajo el Puente Long Bien. Vietnam agrícola a 5 min del Old Quarter.',
              photo: 'img/fotos/isla-de-los-platanos.jpg',
              description: 'Bajo el Puente Long Bien, en mitad del Río Rojo, una isla de plataneras, papayas y huertas donde desaparece el caos de motos. Hay una comunidad flotante en los márgenes y una piscina pública rodeada de bananeros.',
              tips: 'Bajar por las escaleras a mitad del puente (algo oxidadas) o en bici con rampa. Piscina ~100.000 VND. Zona norte: locales nadando en el río al atardecer.' },
            { name: 'Mercado Dong Xuan', type: 'market', photo: 'img/fotos/mercado-dong-xuan.jpg', lat: 20.9488749, lng: 105.7472641,
              notes: 'El mercado cubierto más grande y bullicioso del Old Quarter.',
              description: 'Edificio de varias plantas con ropa, textiles y alimentación, más un puñado de puestos de comida local alrededor. Las calles exteriores, con vendedores de fruta y flores en la acera, son casi más interesantes que el interior.',
              tips: 'Calle Đồng Xuân, extremo norte del Old Quarter. Aprox. 6:00-18:00, entrada gratuita. Ir más por el ambiente que a "ver un mercado".' },
            { name: 'Templo Bach Ma', type: 'temple', lat: 21.0372109, lng: 105.8508312,
              notes: 'El templo más antiguo de Hanói, escondido entre tiendas del Old Quarter.',
              photo: 'img/fotos/templo-bach-ma.jpg',
              description: 'Su nombre significa "Caballo Blanco", por la leyenda de un caballo que ayudó al emperador a trazar las murallas de la ciudad. Interior pequeño pero cargado de incienso, estatuas y ofrendas — un contraste silencioso con el bullicio de alrededor.',
              tips: 'Calle Hàng Buồm. Aprox. 8:00-17:00, gratuito. No hace falta mucho tiempo, pero está de paso en la ruta del Old Quarter.' },
            { name: 'Murales de Phùng Hưng (Street Art)', type: 'monument', photo: 'img/fotos/murales-de-phung-hung.jpg', lat: 20.9610277, lng: 105.9564614,
              notes: 'Galería al aire libre bajo los arcos del viaducto del tren. Gratuito y muy fotogénico.',
              description: 'Los arcos de piedra del viaducto junto a la Train Street se han convertido en una galería de murales gigantes en 3D pintados por artistas vietnamitas y coreanos. Recrean escenas del Hanói antiguo: el tranvía desaparecido, vendedores ambulantes, tiendas tradicionales.',
              tips: 'Calle Phùng Hưng, tramo hacia Mercado Dong Xuan. Gratuito. Combinarlo con Train Street.' },
            { name: 'El Callejón Colectivo Cũ (Cư xá Cũ)', type: 'monument', lat: 21.0283334, lng: 105.854041,
              notes: 'Bloque de viviendas comunistas de los 80. Vida de barrio real, cafés nostálgicos escondidos.',
              description: 'Bloque de viviendas comunales de cemento de la época socialista, con pasillos exteriores elevados donde se ve la vida vecinal real: ropa tendida, plantas en latas y vecinos jugando al ajedrez chino. Dentro se esconden cafeterías decoradas con TVs de tubo y carteles de racionamiento.',
              tips: 'Detrás de la calle Tôn Thất Tùng, dist. Đống Đa. Zona sur, mejor en Grab. Entrada libre, mañana o media tarde.' },
            { name: 'Lago Truc Bach', type: 'nature', photo: 'img/fotos/lago-truc-bach.jpg', lat: 21.0463247, lng: 105.8384008,
              notes: 'Lago pequeño e íntimo pegado a West Lake, con hidropedales y el mejor Phở Cuốn de Hanói.',
              description: 'Separado de West Lake solo por la avenida Thanh Nien. Ambiente local, cafeterías tranquilas e hidropedales en forma de cisne. En una isleta unida por puentecitos está el barrio del Phở Cuốn (rollitos de fideo de arroz con ternera).',
              tips: '10 min en Grab desde el Mausoleo. Mejor a partir de 16:30-17:00 para el atardecer sobre West Lake.' },
            { name: 'Pagoda Tran Quoc', type: 'temple', photo: 'img/fotos/pagoda-tran-quoc.jpg', lat: 21.0478837, lng: 105.8368375,
              notes: 'La pagoda budista más antigua de Hanói (siglo VI), sobre una isla en West Lake.',
              description: 'Su hilera de torres rojas (Cửu Phẩm Liên Hoa) sobre el agua es una de las imágenes más reconocibles de la ciudad. Conserva un árbol Bodhi descendiente del árbol original bajo el que Buda alcanzó la iluminación, traído de la India.',
              tips: 'Thanh Niên Road, isla en West Lake. Aprox. 8:00-16:00, entrada gratuita. Vestir con cierta modestia.' },
            { name: 'Templo Quan Thanh', type: 'temple', photo: 'img/fotos/templo-quan-thanh.jpg', lat: 21.0430059, lng: 105.8365874,
              notes: 'Templo taoísta del s.XI con una estatua de bronce de 4 toneladas.',
              description: 'Dedicado a Huyền Thiên Trấn Vũ, dios protector del norte — una faceta religiosa taoísta distinta a las pagodas budistas. Su pieza estrella es una imponente estatua negra de bronce de varios metros, espada y serpiente en mano.',
              tips: 'Thanh Niên Road, junto a Truc Bach y muy cerca de Tran Quoc — se visitan los tres seguidos sin desplazamiento extra. Aprox. 8:00-17:00, entrada de pago simbólica.' },
            { name: 'West Lake (Tây Hồ)', type: 'nature', photo: 'img/fotos/west-lake.jpg', lat: 21.0580419, lng: 105.8139655,
              notes: 'El lago más grande de Hanói (15km de perímetro), con templos flotantes y atardeceres.',
              description: 'Inmenso "mar interior" favorito de locales y expatriados para escapar del centro, con cafeterías boutique con terraza en toda la orilla este.',
              tips: 'A 2,5km del Old Quarter, ~10 min en Grab. Mejor luz a partir de 16:30-17:00h.' }
          ],
          restaurants: [
            { name: 'Bánh Mì', type: 'restaurant', notes: 'Bocadillo callejero, del desayuno a la cena.',
              photo: 'img/fotos/banh-mi.jpg' },
            { name: 'Chả Cá Lã Vọng', type: 'restaurant', photo: 'img/fotos/cha-ca-la-vong.jpg', notes: 'Pescado a la parrilla con eneldo y cúrcuma, plato único de un restaurante centenario.' },
            { name: 'Chè', type: 'restaurant', photo: 'img/fotos/che.jpg', notes: 'Postre dulce de judías, coco, gelatina de arroz y hielo picado — la merienda callejera por excelencia, con decenas de variantes.' },
            { name: 'Bánh Cuốn', type: 'restaurant', notes: 'Crepes finísimas de arroz al vapor rellenas de carne y champiñón, servidas con salsa de pescado y chalota frita.',
              photo: 'img/fotos/banh-cuon.jpg' }
          ],
          transport: [],
          hotel: { name: 'Secret Garden Hanoi', address: '', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [],
          notes: 'Salida del hotel Secret Garden hoy.'
        },
        {
          date: '2026-11-10', city: 'Hanói → Siem Reap', country: '🇻🇳 Vietnam → 🇰🇭 Camboya', block: 'Angkor',
          summary: 'Traslado a Siem Reap. Vuelo Hanói→Siem Reap. Alojarse y primera toma de contacto.',
          places: [
            { name: 'Wat Preah Prom Rath', type: 'temple', lat: 13.3678252, lng: 104.2155068,
              notes: 'Templo budista activo en el centro de Siem Reap. Buda reclinado de 1500. Entrada gratuita.',
              photo: 'img/fotos/wat-preah-prom-rath.jpg',
              description: 'Uno de los templos budistas más hermosos del centro de Siem Reap. A diferencia de las ruinas grises de Angkor, este complejo destaca por sus tejados dorados y ser un monasterio vivo donde residen monjes. En el interior: Buda reclinado histórico de ~1500, jardines con estatuas coloridas narrando la vida de Buda y murales pintados a mano.',
              tips: 'En la orilla occidental del río de Siem Reap, a pocos pasos de Pub Street y Old Market. Entrada gratuita (dejar donativo). Mejor a primera hora o al atardecer para coincidir con los rezos de los monjes.' },
            { name: 'Siem Reap River', type: 'nature', photo: 'img/fotos/siem-reap-river.jpg', lat: 13.3540791, lng: 103.8564441,
              notes: 'El río que atraviesa la ciudad, con paseo arbolado en ambas orillas — agradable para pasear al atardecer.',
              description: 'Un río estrecho y tranquilo que cruza el centro de Siem Reap, con un paseo peatonal arbolado en ambas orillas que conecta buena parte de los sitios de esta primera toma de contacto: Wat Preah Prom Rath, el Old Market y Pub Street están todos a pocos minutos andando de su orilla.',
              tips: 'El tramo más agradable para pasear es entre el puente de Old Market y el Royal Independence Gardens, especialmente al atardecer con las luces de los templos encendidas.' },
            { name: 'Old Market (Phsar Chas)', type: 'monument', photo: 'img/fotos/old-market.jpg', lat: 13.3542461, lng: 103.8549606,
              notes: 'El mercado más antiguo de Siem Reap: producto fresco, especias, pescado seco y un ala entera de souvenirs y artesanía.',
              description: 'El mercado tradicional más antiguo de la ciudad, con dos caras bien distintas: la parte de siempre, con pescado, carne, especias y producto fresco para los vecinos; y una ampliación hacia el lado turístico con puestos de kramas (los pañuelos a cuadros camboyanos), tallas de madera, plata y todo tipo de souvenirs, a precio de regateo.',
              tips: 'Justo al lado de Pub Street, orilla del río. Mejor por la mañana para ver la parte de producto fresco en pleno funcionamiento; por la tarde predomina la zona de souvenirs. Regatear es lo normal, empezar pidiendo la mitad del precio inicial.' },
            { name: 'Wat Damnak y alrededores', type: 'temple', photo: 'img/fotos/wat-damnak-y-alrededores.jpg', lat: 13.3505018, lng: 103.8573174,
              notes: 'Pagoda tranquila junto al río, lejos del circuito turístico. Sede de Cambodian Living Arts (música y danza tradicional jemer).' },
            { name: 'Pub Street', type: 'monument', lat: 13.3678252, lng: 104.2155068,
              notes: 'El corazón del ocio de Siem Reap. Desde las 18:00 se corta al tráfico. Angkor Beer a 0,50 USD.',
              photo: 'img/fotos/pub-street.jpg',
              description: 'Pub Street (Street 08) se corta al tráfico a las 18:00 y se llena de viajeros. Precios bajos: jarras de cerveza local desde 0,50-1 USD. Amok (curry jemer) y barbacoa camboyana. El bar más famoso: The Red Piano (donde Angelina Jolie tomaba cócteles durante el rodaje de Tomb Raider).',
              tips: 'Old Market (Phsar Chas) justo al lado: artesanías, kramas (pañuelos camboyanos) y souvenirs. Le Pain Du Coeur: panadería a la vuelta que a partir de las 18:00 pone todo a mitad de precio.' }
          ],
          restaurants: [
            { name: 'Cena de comida Khmer', type: 'restaurant', notes: '',
              photo: 'img/fotos/cena-de-comida-khmer.jpg' },
            { name: 'Nom Kroeung', type: 'restaurant', notes: 'Ensalada de pomelo o mango verde con cacahuetes, hierbas y chile — el plato fresco y ácido típico para empezar una cena jemer.',
              photo: 'img/fotos/nom-kroeung.jpg' },
            { name: 'Num Pang', type: 'restaurant', notes: 'El bocadillo camboyano, primo del bánh mì vietnamita, con pollo o cerdo a la parrilla y verduras encurtidas.',
              photo: 'img/fotos/num-pang.jpg' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo Hanói→Siem Reap — Vietnam Airlines, localizador ZCSDYH. María: 23 kg facturado + cabina 8 kg. Marcos: 23 kg facturado + cabina 8 kg.', from: 'Hanói (HAN)', to: 'Siem Reap', time: '15:10–16:55 (1h 40min)' }
          ],
          hotel: { name: 'The Nest', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento The Nest: entrada 10-nov, salida 13-nov.'
        },
        {
          date: '2026-11-11', city: 'Siem Reap', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Plan: Angkor imprescindible 🚲. Mirar si se puede coger e-bike justo después del amanecer.',
          places: [
            { name: 'Amanecer en Angkor Wat', type: 'monument', photo: 'img/fotos/amanecer-en-angkor-wat.jpg', lat: 13.3671, lng: 103.8448,
              notes: 'El monumento religioso más grande del mundo. Llegar 1h antes del amanecer, entrada comprada el día anterior.',
              description: 'El símbolo nacional de Camboya (en su bandera): 162 hectáreas protegidas por un foso de 190m, cinco torres que representan el Monte Meru, y más de 2.000 apsaras talladas. Orientado al oeste (poco habitual), construido en el s.XII por Suryavarman II como templo hinduista a Vishnú y adaptado después al budismo.',
              tips: 'Mejor punto de foto: estanque frontal derecho. Truco de guías locales: ver el amanecer, irte a Angkor Thom/Ta Prohm mientras hacen cola, y volver a media mañana con mucha más tranquilidad. 2-3h mínimo. Código de vestimenta estricto: hombros y rodillas cubiertos.' },
            { name: 'Ta Prohm', type: 'temple', photo: 'img/fotos/ta-prohm.jpg', lat: 13.3671, lng: 103.8448,
              notes: 'El "Templo de Tomb Raider" — raíces gigantes devorando las piedras.',
              description: 'Los franceses lo dejaron en el s.XIX casi tal cual lo encontraron: raíces de ceiba e higuera estrangulando los muros. Templo-monasterio construido 1186-1218 por Jayavarman VII en memoria de su madre, con relieves de devatas y un curioso grabado que algunos ven como un estegosaurio.',
              tips: '60 min. Mejor a primera hora: menos gente y se oye la selva. No te saltes las zonas restringidas — es por seguridad y conservación.' },
            { name: 'Banteay Kdei', type: 'temple', photo: 'img/fotos/banteay-kdei.jpg', lat: 13.429957, lng: 103.8986434,
              notes: '"Ciudadela de las Celdas", monasterio budista del s.XII semiderruido y con encanto tranquilo.',
              description: 'Templo budista mandado construir por Jayavarman VII como monasterio y lugar de meditación Mahayana. Menos famoso que Ta Prohm pero con el mismo aire misterioso entre la selva.',
              tips: '30 min de visita. Justo enfrente, cruzando la calle, está el reservorio de Srah Srang — visitar los dos juntos.' },
            { name: 'Ta Nei', type: 'temple', photo: 'img/fotos/ta-nei.jpg', lat: 13.452459, lng: 103.8855665,
              notes: 'Templo "perdido en la jungla", casi olvidado y muy tranquilo.',
              description: 'Templo monástico del s.XII (Jayavarman VII) semiabsorbido por la vegetación, cerca del canal que conecta con el Baray Occidental — pudo tener un papel en el sistema de irrigación del imperio.',
              tips: '30 min. Poco conocido: ideal si buscas la experiencia de templo-en-la-selva sin aglomeraciones.' },
            { name: 'Angkor Thom (South Gate)', type: 'monument', photo: 'img/fotos/angkor-thom.jpg', lat: 13.4275303, lng: 103.8597733,
              notes: '"La Gran Ciudad", última capital del Imperio Jemer. Entrar por la Puerta Sur.',
              description: 'Área amurallada de 9km² con 5 puertas monumentales coronadas por caras de Avalokiteshvara y calzadas con devas y asuras sosteniendo una naga (mito del Batido del Océano de Leche). Construida por Jayavarman VII en el s.XII tras la invasión cham de 1177.',
              tips: 'Medio día mínimo (o 2,5h si solo los puntos clave). Entrar a primera hora para evitar aglomeraciones en Bayon. Cuidado con los monos: no alimentarlos, pueden quitar mochilas.' },
            { name: 'Bayon', type: 'temple', photo: 'img/fotos/bayon.jpg', lat: 13.3671, lng: 103.8448,
              notes: '54 torres con 216 caras gigantes de piedra sonriendo.',
              description: 'El templo central y más enigmático de Angkor Thom — se debate si las caras representan a Avalokiteshvara o al propio rey Jayavarman VII. Simboliza la intersección entre cielo y tierra.',
              tips: 'Entrar a primera hora de la mañana para evitar aglomeraciones en el punto más fotografiado de Angkor Thom.' },
            { name: 'Baphuon', type: 'temple', photo: 'img/fotos/baphuon.jpg', lat: 13.4437935, lng: 103.8562189,
              notes: 'Templo-montaña dedicado a Shiva, con un Buda reclinado añadido siglos después.',
              description: 'Al noroeste de Bayon, evoca el Monte Meru. Originalmente hinduista, siglos más tarde se le integró una gigantesca estatua de Buda reclinado en su fachada oeste.',
              tips: 'Se visita seguido con Bayon, dentro del recorrido de Angkor Thom.' },
            { name: 'Terraza de los Elefantes (templo Tep Pranam)', type: 'monument', photo: 'img/fotos/terraza-de-los-elefantes.jpg', lat: 13.4457855, lng: 103.8588744,
              notes: 'Plataforma ceremonial con esculturas de elefantes y garudas.',
              description: 'Escenario de desfiles y eventos públicos del imperio, junto a la Terraza del Rey Leproso (esculturas asociadas a Yama, dios hinduista de la muerte). Cerca, Tep Pranam guarda una estatua de Buda y Preah Palilay mezcla elementos hindúes y budistas.',
              tips: 'Parte final del recorrido de Angkor Thom, junto a las puertas de la Victoria y del Sur (las mejor conservadas para foto).' },
            { name: 'Phare, The Cambodian Circus', type: 'monument', photo: 'img/fotos/phare-the-cambodian-circus.jpg', lat: 13.3671, lng: 103.8448,
              notes: 'Circo contemporáneo camboyano, sin animales, con historia y folclore del país.',
              description: 'Estilo Cirque du Soleil pero con alma local: teatro, acrobacias, danza y música en vivo contando el folclore y la historia reciente de Camboya. Todo lo recaudado financia Phare Ponleu Selpak, una escuela de artes gratuita para jóvenes vulnerables en Battambang.',
              tips: '$18-38 según zona. Función diaria a las 20:00, 1h sin intermedio. Sok San Road, 5-10 min en tuk-tuk desde Pub Street. Llegar 30-45 min antes por el mercadillo de artesanía de la entrada.' }
          ],
          restaurants: [
            { name: 'Amok', type: 'restaurant', photo: 'img/fotos/cena-de-comida-khmer.jpg', notes: 'Curry jemer de pescado al vapor en hoja de plátano, el plato nacional camboyano.' },
            { name: 'Kuy Teav', type: 'restaurant', photo: 'img/fotos/kuy-teav.jpg', notes: 'Sopa de fideos de arroz con cerdo, desayuno popular en Camboya.' },
            { name: 'Trey Aing', type: 'restaurant', notes: 'Pescado entero a la brasa, servido con salsa de lima, pimienta y hierbas — sencillo y muy popular junto a los lagos y ríos de Camboya.',
              photo: 'img/fotos/trey-aing.jpg' },
            { name: 'Khmer Red Curry (Kari Sach Moan)', type: 'restaurant', photo: 'img/fotos/khmer-red-curry.jpg', notes: 'Curry de pollo con leche de coco, patata y berenjena, más suave y menos picante que sus primos tailandeses.' }
          ],
          transport: [],
          hotel: { name: 'The Nest', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Por la noche: Phare, The Cambodian Circus.'
        },
        {
          date: '2026-11-12', city: 'Siem Reap', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Plan: Angkor menos turístico + Camboya rural. Tuk-tuk con conductor, salida temprano.',
          places: [
            { name: 'Banteay Srei ⭐', type: 'temple', photo: 'img/fotos/banteay-srei.jpg', lat: 13.5991582, lng: 103.9630491,
              notes: 'La "Joya de Angkor" — piedra arenisca rosada tallada con una finura extrema.',
              description: 'Apodada "Ciudadela de las Mujeres" por lo delicado de sus tallas (se creía que solo mujeres podían haberlas hecho). Construido en 967 por un sacerdote de la corte, no por un rey, dedicado a Shiva. Relieves del Ramayana, incluido Ravana sacudiendo el Monte Kailash.',
              tips: 'A 25km al noreste de Angkor Wat, ~1h de trayecto. 45-60 min de visita.' },
            { name: 'Banteay Samré', type: 'temple', photo: 'img/fotos/banteay-samre.jpg', lat: 13.4421683, lng: 103.9591344,
              notes: 'Muy parecido a Angkor Wat en estilo, pero casi sin turistas.',
              description: 'Templo hinduista del s.XII dedicado a Vishnú, en piedra arenisca con bajorrelieves intrincados. Su nombre honra a los samré, una etnia local de la región.',
              tips: '30 min. Algo apartado de los circuitos principales — eso es justo lo que lo hace tranquilo. Fácil en tuk-tuk, bici o moto.' },
            { name: 'Museo de Minas Terrestres de Camboya', type: 'museum', lat: 13.53957, lng: 103.9458,
              notes: 'Fundado por Aki Ra, ex-niño soldado convertido en desminador. De camino a Banteay Srei.',
              photo: 'img/fotos/museo-de-minas-terrestres-de-camboya.jpg',
              description: 'Museo fundado por Aki Ra, antiguo niño soldado de los Jemeres Rojos que de adulto se dedicó a desactivar minas a mano y hoy dirige una ONG de desminado. Expone miles de minas y artefactos explosivos ya inertes recuperados por todo el país, y explica con crudeza el legado de las guerras de Camboya (se calcula que aún quedan millones de minas sin detonar en el país). Parte de la entrada financia directamente el desminado real.',
              tips: 'Está en la carretera hacia Banteay Srei, se puede combinar con la visita a ese templo. Tema sensible — valorar si encaja con el ánimo del día.' },
            { name: 'Banteay Srey Butterfly Centre', type: 'nature', lat: 13.5086887, lng: 103.9409963,
              notes: 'Santuario de mariposas tropicales, justo al lado del Museo de Minas, de camino a Banteay Srei.',
              photo: 'img/fotos/banteay-srey-butterfly-centre.jpg',
              description: 'El mayor santuario de mariposas tropicales del Sudeste Asiático, con cientos de ejemplares nativos volando libres dentro de una gran carpa de malla y un pequeño centro de interpretación sobre su ciclo de vida.',
              tips: 'Justo al lado del Museo de Minas Terrestres, en la misma carretera hacia Banteay Srei — fácil combinar los dos.' },
            { name: 'Lotus Silk Farm', type: 'monument', lat: 13.355487, lng: 103.8608382,
              notes: 'Extracción y tejido artesanal de "seda de loto", una fibra rarísima sacada del tallo de la flor.',
              description: 'Granja y taller donde se extrae a mano la fibra de los tallos de la flor de loto para tejer una tela muy rara y cara, alternativa vegetal a la seda de gusano. Se puede ver todo el proceso, desde el corte del tallo hasta el hilado y el telar tradicional.',
              tips: 'Visita guiada corta (20-30 min) que explica el proceso paso a paso. Tienda propia de bufandas y textiles de seda de loto a la salida.' },
            { name: 'Pueblos rurales, arrozales y palmeras de azúcar', type: 'nature', lat: 13.355487, lng: 103.8608382, notes: 'Casas tradicionales Khmer, pequeñas pagodas/templos locales.',
              photo: 'img/fotos/pueblos-rurales-arrozales-y-palmeras-de-azucar.jpg' },
            { name: 'Preah Khan', type: 'temple', photo: 'img/fotos/preah-khan.jpg', lat: 13.4619307, lng: 103.8716297,
              notes: '"Espada Sagrada" — uno de los templos más grandes de Angkor, con higueras estranguladoras.',
              description: 'Diseño rectangular de galerías concéntricas hacia un santuario central (Monte Meru), con 4 gopuras talladas con el mito del Batido del Océano de Leche. Construido en el s.XII por Jayavarman VII en el lugar donde derrotó a los cham; fue templo budista, centro administrativo y universidad, con cientos de sacerdotes y estudiosos.',
              tips: '60 min — es laberíntico, tómatelo con calma. Elige 2 de los 3 templos de la tarde (Preah Khan / Ta Som / Pre Rup), no los tres.' },
            { name: 'Ta Som', type: 'temple', photo: 'img/fotos/ta-som.jpg', lat: 13.332001, lng: 103.8750183,
              notes: 'Puerta este envuelta en raíces de higuera — la estampa más fotogénica del templo.',
              description: 'Gopuras con caras sonrientes estilo Bayon (Avalokiteshvara o el rey). Templo budista Mahayana de finales del s.XII (Jayavarman VII), mucho menos masificado que Ta Prohm pese al mismo efecto naturaleza-devorando-piedra.',
              tips: '30 min. Cruza todo el complejo hasta la puerta este — es la foto que no te puedes perder.' },
            { name: 'Pre Rup (atardecer)', type: 'temple', photo: 'img/fotos/pre-rup.jpg', lat: 13.4349829, lng: 103.9206233,
              notes: 'Templo-montaña piramidal del s.X, ideal para el atardecer.',
              description: 'Del año 961, dedicado a Shiva, con estructura de 3 niveles (inframundo/tierra/cielo) y cinco torres en la cima dispuestas como un dado. Su nombre ("girar el cuerpo") se asocia a antiguos rituales de cremación real.',
              tips: '30-45 min. Vistas espectaculares desde la cima, mejores al amanecer o atardecer.' }
          ],
          restaurants: [
            { name: 'Lok Lak', type: 'restaurant', notes: 'Ternera salteada camboyana con arroz y huevo frito.',
              photo: 'img/fotos/lok-lak.jpg' },
            { name: 'Khmer BBQ', type: 'restaurant', notes: 'Parrilla camboyana para compartir, típica de las salidas rurales de un día completo.',
              photo: 'img/fotos/khmer-bbq.jpg' },
            { name: 'Prahok Ktis', type: 'restaurant', notes: 'Dip de cerdo picado con pasta de pescado fermentado (prahok) y leche de coco, para mojar verduras crudas — el sabor más "de verdad" de la cocina jemer.',
              photo: 'img/fotos/prahok-ktis.jpg' },
            { name: 'Nom Banh Chok Samlor Khmer', type: 'restaurant', notes: 'Versión rural de los fideos de arroz jemer, con un caldo verde de pescado y hierbas machacadas a mano.',
              photo: 'img/fotos/nom-banh-chok-samlor-khmer.jpg' }
          ],
          transport: [],
          hotel: { name: 'The Nest', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-13', city: 'Siem Reap → Phnom Penh (bus nocturno)', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Plan A: Siem Reap rural en bicicleta eléctrica (West Baray). Plan B: Beng Mealea + Camboya rural. Por la noche, sleeper bus a Phnom Penh.',
          places: [
            { name: 'West Baray (Plan A)', type: 'nature', lat: 13.4126499, lng: 103.7906771,
              notes: 'El embalse artificial más grande del mundo antiguo (8km x 2km), hecho a mano por los jemeres.',
              photo: 'img/fotos/west-baray.jpg',
              description: 'Diques transitables llanos, ideales para bici eléctrica. Lado sur: "playa" con restaurantes y hamacas sobre el agua. Lado norte: rural y virgen, entre arrozales y palmeras de azúcar. De camino se pasa cerca de las ruinas de Ak Yum (templo del s.VIII, sepultado al construir el dique) y del West Mebon, un templo en isla en el centro del lago (en la foto).',
              tips: '12km desde Siem Reap, ~30-35km si rodeas el perímetro en bici eléctrica — noviembre es buen mes, el agua está alta y los arrozales muy verdes. Hamaca + coco por <$1 en el dique sur.' },
            { name: 'Beng Mealea ⭐⭐⭐⭐⭐ (Plan B)', type: 'monument', lat: 13.4684285, lng: 104.2287539,
              notes: 'A 40 km. El templo más selvático de Angkor. La selva lo devora sin restauración. $10 fuera del pase.',
              photo: 'img/fotos/beng-mealea.jpg',
              description: 'A 40 km del núcleo principal. A diferencia de los templos del circuito principal, Beng Mealea ha sido prácticamente dejado a la selva: raíces gigantescas, piedras derrumbadas y pasillos que se hunden bajo la vegetación crean una atmósfera de exploración auténtica.',
              tips: 'A 40 km: en tuk-tuk ~1,5h, en coche 45 min. Entrada: $10 (no incluida en el pase). Combinar con los Roluos de camino de vuelta.' }
          ],
          restaurants: [
            { name: 'Cena ligera antes del bus nocturno', type: 'restaurant', notes: 'Algo sencillo antes de 6 horas de autobús — nada demasiado copioso ni picante.' },
            { name: 'Loc Lac de despedida de Siem Reap', type: 'restaurant', notes: 'Última oportunidad de probar los clásicos camboyanos antes de dejar Angkor atrás.',
              photo: 'img/fotos/lok-lak.jpg' }
          ],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Sleeper Bus Siem Reap→Phnom Penh — Giant Ibis', from: 'Siem Reap', to: 'Phnom Penh', time: '22:30–04:30' }
          ],
          hotel: { name: '', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Otras cosas vistas en Siem Reap sin encajar aún en el día: Cambodia Landmine Museum, Preah Dak + azúcar de palma, Angkor Silk Farm, Ox-cart ride, Lotus Silk Farm, ACCB, Banteay Srei Butterfly Centre, Roluos Group / Bakong.'
        },
        {
          date: '2026-11-14', city: 'Phnom Penh', country: '🇰🇭 Camboya', block: 'Phnom Penh',
          summary: 'Llegada de madrugada en bus nocturno. Plan: Norte-centro y Riverside.',
          places: [
            { name: 'Wat Phnom', type: 'temple', photo: 'img/fotos/wat-phnom.jpg', lat: 11.5564, lng: 104.9282,
              notes: 'El templo que da nombre a la ciudad, en la única colina de Phnom Penh.',
              description: 'Escalinatas decoradas con nagas (serpientes mitológicas) y guardianes, sobre la única elevación natural de la capital. Rotonda ajardinada donde confluyen Norodom Boulevard y la Calle 96.',
              tips: '07:00-18:00, 1 USD extranjeros. Se puede llegar andando desde el centro.' },
            { name: 'Central Market (Phsar Thmei)', type: 'market', photo: 'img/fotos/central-market.jpg', lat: 11.569584, lng: 104.9210814,
              notes: 'Cúpula Art Déco amarilla de 1937, sin columnas, con 4 brazos de puestos.',
              description: 'Obra maestra Art Déco francesa: cúpula central de 26m sin soporte y cuatro brazos abovedados. Bajo la cúpula, joyería y oro; en los brazos, ropa y electrónica; en los pasillos exteriores, mercado de alimentos frescos y comida preparada.',
              tips: 'L-D 7:00-17:00, mejor 9:30-11:30 o 14:30-16:00 (a partir de 16:30 empiezan a recoger). Solo efectivo (USD o KHR), billetes pequeños y sin roturas. Regatea con educación: 20-40% de rebaja es normal. Ojo con los carteristas en los pasillos estrechos.' },
            { name: 'Museo Nacional de Camboya', type: 'museum', photo: 'img/fotos/museo-nacional-de-camboya.jpg', lat: 11.5654592, lng: 104.929295,
              notes: 'La mayor colección del mundo de arte de la era de Angkor.',
              description: 'Edificio de estilo jemer tradicional con la colección más importante del planeta de esculturas y piezas de la era de Angkor.',
              tips: '08:00-17:00, $10. Audioguía en español $5 extra, muy recomendable (los carteles son breves y solo en inglés/francés/jemer).' },
            { name: 'Palacio Real de Phnom Penh', type: 'monument', lat: 11.5637725, lng: 104.9301471,
              notes: '5.329 baldosas de plata pura. Buda de oro macizo de 90 kg con 9.584 diamantes. Sala del Trono.',
              photo: 'img/fotos/palacio-real-de-phnom-penh.jpg',
              description: 'Complejo de 1866, residencia oficial del monarca. La Pagoda de Plata (Wat Preah Keo Morakot) tiene 5.329 baldosas de plata de ~1kg cada una, un Buda de oro macizo de 90kg con 9.584 diamantes, un Buda de esmeralda de cristal de Baccarat del s.XVII y murales del Reamker (versión camboyana del Ramayana).',
              tips: 'Mañana 8:00-11:00, tarde 14:00-17:00. $10, solo efectivo. Guía oficial en español: $10 extra por grupo (muy recomendable, apenas hay carteles). Entrar a las 8:00 para evitar el calor. Hombros y rodillas cubiertos.' },
            { name: 'Riverside (Sisowath Quay)', type: 'nature', photo: 'img/fotos/riverside.jpg', lat: 11.5616584, lng: 104.9350962,
              notes: 'Paseo fluvial del Tonlé Sap, con crucero al atardecer.',
              description: 'Avenida peatonal junto al río que se llena de vida al atardecer, con locales paseando y haciendo ejercicio. Se pueden contratar cruceros de madera de 1h por el Mekong (~$5) para ver el skyline iluminado desde el agua.',
              tips: 'Mejor al atardecer. El 25 de noviembre aquí se celebra el Festival del Agua (Bon Om Touk) — ver aviso aparte.' }
          ],
          restaurants: [
            { name: 'Nom Banh Chok', type: 'restaurant', notes: 'Fideos de arroz con salsa de pescado y hierbas, desayuno típico camboyano.',
              photo: 'img/fotos/nom-banh-chok-samlor-khmer.jpg' },
            { name: 'Bai Sach Chrouk', type: 'restaurant', notes: 'Cerdo a la parrilla sobre arroz partido, clásico desayuno-almuerzo de Phnom Penh.',
              photo: 'img/fotos/bai-sach-chrouk.jpg' },
            { name: 'Samlor Kor Ko', type: 'restaurant', notes: 'Sopa espesa de verduras de temporada con pasta de pescado fermentado — considerado el plato camboyano más tradicional de todos.',
              photo: 'img/fotos/samlor-kor-ko.jpg' },
            { name: 'Cerveza Angkor junto al Tonlé Sap', type: 'restaurant', notes: 'Una Angkor Beer bien fría en una terraza de Sisowath Quay, viendo el atardecer sobre el río.',
              photo: 'img/fotos/cerveza-angkor-junto-al-tonle-sap.jpg' }
          ],
          transport: [],
          hotel: { name: 'Jungle Addition', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento Jungle Addition: entrada 14-nov, salida 16-nov.'
        },
        {
          date: '2026-11-15', city: 'Phnom Penh', country: '🇰🇭 Camboya', block: 'Phnom Penh',
          summary: 'Plan: Historia y zona sur.',
          places: [
            { name: 'Museo del Genocidio Tuol Sleng (S-21)', type: 'museum', photo: 'img/fotos/museo-del-genocidio-tuol-sleng.jpg', lat: 11.5494532, lng: 104.9176255,
              notes: 'Antigua escuela convertida en cámara de tortura del régimen de Pol Pot. Audioguía en español imprescindible.',
              description: 'Antigua escuela secundaria (Tuol Svay Prey) convertida en prisión de alta seguridad — de más de 18.000 prisioneros, solo se conocen un puñado de supervivientes. 4 bloques: A (celdas con instrumentos originales), B (miles de fotos de prisioneros, lo más sobrecogedor), C (celdas de aislamiento), D (documentación del régimen). A veces hay supervivientes firmando sus libros.',
              tips: 'Calle 113. L-D 8:00-17:00, $5 + audioguía español $10 (indispensable). Grab desde el centro: 10-15 min, $2-3. Necesitas 2-3 horas.' },
            { name: 'Choeung Ek (The Killing Fields)', type: 'museum', photo: 'img/fotos/choeung-ek.jpg', lat: 11.4844062, lng: 104.9020082,
              notes: 'Los Campos de la Muerte — fosas comunes y la Estupa Memorial con miles de cráneos.',
              description: 'A donde trasladaban a los prisioneros de S-21 para ser ejecutados. La Gran Estupa (17 pisos) alberga más de 9.000 cráneos clasificados por sexo y edad. El Árbol Chankiri, donde mataban a bebés y niños, está hoy cubierto de miles de pulseras de colores dejadas como homenaje.',
              tips: '15km del centro, 40-50 min en tuk-tuk ($5-7, o $15-20 ida+espera+vuelta). $6 con audioguía española incluida obligatoria. L-D 8:00-17:30, 2h de visita.' },
            { name: 'Mercado Ruso (Tuol Tom Poung)', type: 'market', photo: 'img/fotos/mercado-ruso.jpg', lat: 11.5564, lng: 104.9282,
              notes: 'Mercado laberíntico y local, mejores precios que el Central.',
              description: 'Techos bajos de hojalata y pasillos estrechos, más caótico y auténtico que el Central Market. Ropa de marca de fábrica (excedentes de Nike, Adidas, Zara...) a precios muy bajos, artesanía, kramas, y una zona de comida local con café helado por 1 USD.',
              tips: 'L-D 6:00-16:30, mejor 8:30-10:30 (luego hace mucho calor dentro). A 5 min de Tuol Sleng. Regatea con firmeza en souvenirs (30-40% menos), la ropa admite menos rebaja.' },
            { name: 'Monumento a la Independencia', type: 'monument', photo: 'img/fotos/monumento-a-la-independencia.jpg', lat: 11.5564351, lng: 104.9281898,
              notes: 'Torre en forma de loto (1958) por el fin de la colonización francesa.',
              description: 'Diseñada por Vann Molyvann, el arquitecto camboyano más célebre, imitando las torres de Angkor Wat. Decorada con cabezas de nagas (serpientes guardianas mitológicas). Conmemora la independencia de 1953 y honra a los caídos por la patria.',
              tips: 'Se ve bien desde fuera, de paso hacia el Riverside.' }
          ],
          restaurants: [
            { name: 'Lap Khmer', type: 'restaurant', notes: 'Ceviche de ternera camboyano, marinado en cítricos.' },
            { name: 'Amok', type: 'restaurant', notes: 'El plato nacional camboyano — curry de pescado al vapor en hoja de plátano. También hay versión de pollo o verduras.',
              photo: 'img/fotos/cena-de-comida-khmer.jpg' },
            { name: 'Bobor', type: 'restaurant', notes: 'Congee de arroz camboyano, a veces con pescado o cerdo — comida reconfortante para una noche más tranquila en la capital.',
              photo: 'img/fotos/bobor.jpg' },
            { name: 'Nom Ansom Chek', type: 'restaurant', notes: 'Pastel de arroz glutinoso y plátano envuelto en hoja de plátano y cocido al vapor — dulce de calle muy popular.',
              photo: 'img/fotos/nom-ansom-chek.jpg' }
          ],
          transport: [],
          hotel: { name: 'Jungle Addition', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'El Festival del Agua de Camboya (Bon Om Touk) cae el 25 de noviembre, cuando ya estaréis en Vietnam — decidido no reordenar el viaje por esto.'
        },
        {
          date: '2026-11-16', city: 'Phnom Penh → Chau Doc', country: '🇰🇭 Camboya → 🇻🇳 Vietnam', block: 'Delta del Mekong',
          summary: 'Cruzar la frontera hacia Vietnam. Ferry rápido a Chau Doc por el río Mekong, con parada en frontera de ~2h.',
          places: [
            { name: 'Monumento a la Hamburguesa del Delta (Estatua del Pez Basa)', type: 'monument', lat: 10.7132188, lng: 105.1194555,
              notes: 'Escultura gigante de un pez basa a la entrada de Chau Doc, apodada así por su forma redondeada.',
              photo: 'img/fotos/monumento-a-la-hamburguesa-del-delta.jpg',
              description: 'Una gran escultura circular de un pez basa (pangasius), el pez de piscifactoría que sostiene buena parte de la economía pesquera del Delta del Mekong y llena los mercados y menús de la zona. Vista desde ciertos ángulos su silueta redondeada y las "capas" del pez le han valido el apodo cariñoso de "la hamburguesa" entre los viajeros. Marca simbólicamente la entrada/salida de Chau Doc junto al río Hậu.',
              tips: 'Está de paso, junto a la carretera de acceso a la ciudad — parada rápida de 5 minutos para la foto, no hace falta planificarla aparte.' },
            { name: 'Chợ Châu Đốc (Mercado Central de Chau Doc)', type: 'market', lat: 11.5564, lng: 104.9282,
              notes: 'Mercado fronterizo famoso por sus puestos de pescado seco y mắm (pasta de pescado fermentado).',
              photo: 'img/fotos/cho-chau-doc.jpg',
              description: 'El mercado central de esta ciudad fronteriza del Delta, conocido en todo Vietnam por sus filas interminables de pescado seco colgado al sol y sus enormes tinajas de mắm (pasta/salsa de pescado fermentado), producto estrella de Chau Doc gracias a la abundancia de pesca del río Hậu. También hay puestos de fruta, especias y productos camboyanos, reflejo de la cercanía con la frontera.',
              tips: 'Mejor por la mañana, cuando hay más movimiento y los puestos de pescado seco están en pleno montaje. El olor a mắm es intenso — parte de la experiencia, pero aviso para quien sea sensible.' }
          ],
          restaurants: [
            { name: 'Bun Ca', type: 'restaurant', notes: 'Sopa de pescado del Delta del Mekong, con fuerte influencia jemer.',
              photo: 'img/fotos/bun-ca.jpg' },
            { name: 'Chao Ca', type: 'restaurant', photo: 'img/fotos/chao-ca.jpg', notes: 'Congee de pescado, desayuno reconfortante típico de la zona fronteriza.' },
            { name: 'Lẩu Mắm', type: 'restaurant', notes: 'El hotpot con más carácter del Delta: caldo de pasta de pescado fermentado con berenjena, verduras de río y marisco.' },
            { name: 'Cá Lóc Nướng Trui', type: 'restaurant', notes: 'Pez cabeza de serpiente asado entero sobre paja ardiendo, envuelto en hoja de loto con fideos de arroz.',
              photo: 'img/fotos/ca-loc-nuong-trui.jpg' }
          ],
          transport: [
            { type: 'ferry', icon: '⛴️', details: 'Ferry rápido Phnom Penh→Chau Doc por el río Mekong — Hang Chau Tourist, reservado y pagado, localizador HC105830. Salida: International Floating Port, 103 Sisowath Quay 1 (llegar 30 min antes). Llegada: muelle Victoria Chau Doc Hotel, 01 Le Loi, Chau Doc Ward.', from: 'Phnom Penh', to: 'Chau Doc', time: '12:30–18:30 (6h, parada en frontera ~2h)' }
          ],
          hotel: { name: 'The Ck Hotel', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento The Ck Hotel: entrada 16-nov, salida 17-nov. Otras cosas por ver en Chau Doc: Bosque de Cajuput de Tra Su (a 1h en coche, valorar), Chợ Cũ Vinh Tế (Mercado Rural de Vinh Te).'
        },
        {
          date: '2026-11-17', city: 'Chau Doc → Can Tho', country: '🇻🇳 Vietnam', block: 'Delta del Mekong',
          summary: 'Plan de mañana: visitar algo en Chau Doc antes del bus. Autobús local hacia Can Tho. Por la tarde/noche, paseo por Ninh Kieu.',
          places: [
            { name: 'El Río Hậu: Aldeas Flotantes y Comunidad Cham', type: 'nature', lat: 10.0485585, lng: 105.7706286,
              notes: 'Casas flotantes y comunidad musulmana Cham en el brazo del Mekong que pasa por Chau Doc.',
              photo: 'img/fotos/el-rio-hau-aldeas-flotantes-y-comunidad-cham.jpg',
              description: 'El brazo del Mekong (río Hậu) frente a Chau Doc está lleno de casas flotantes de aluminio que son a la vez vivienda y piscifactoría — debajo de cada una, una red gigante cría pescado (sobre todo bagre y "cá vồ đém") para vender. Al otro lado del río, en la isla de Con Tien, está Da Phuoc, uno de los mayores pueblos de la etnia musulmana Cham de Vietnam: casas sobre pilotes y mujeres tejiendo telas con turbantes tradicionales Cham, sobre todo en temporada seca.',
              tips: 'Se visita en barco (tour de ~3h que suele incluir mercado flotante + aldea flotante + pueblo Cham + canal Vinh Te). Mejor por la mañana. Respetar las normas de vestimenta conservadora si se entra a la mezquita del pueblo Cham.' },
            { name: 'Chợ Châu Đốc en hora punta', type: 'market', lat: 10.701, lng: 105.1258, notes: 'El mismo mercado central, pero viéndolo en plena actividad matinal.',
              photo: 'img/fotos/cho-chau-doc.jpg',
              description: 'Chau Doc es la capital vietnamita del pescado y la pasta de pescado fermentado (mắm) — su mercado central, además de fruta y verdura, tiene pasillos enteros dedicados a mắm de todos los colores y pescado seco colgado al sol. Verlo en plena hora punta de la mañana (no al mediodía ya de vuelta) es lo que lo diferencia de una visita de paso.',
              tips: 'Mejor entre 6:30 y 8:30h, antes de que apriete el calor. Llevar algo de cambio pequeño si se quiere probar fruta o un café de puesto.' },
            { name: 'Mausoleo de Thoại Ngọc Hầu (Tomb of Thoai Ngoc Hau)', type: 'monument', lat: 10.0452, lng: 105.7469,
              notes: 'Tumba de un mandarín de la dinastía Nguyễn, a los pies de la Montaña Sam, junto a sus dos esposas.',
              photo: 'img/fotos/mausoleo-de-thoai-ngoc-hau.jpg',
              description: 'Thoại Ngọc Hầu (1761-1829) fue el general y mandarín de la dinastía Nguyễn que dirigió la construcción del canal Vĩnh Tế (1819-1824), la obra de ingeniería que conecta Chau Doc con el golfo de Tailandia. Él mismo diseñó y mandó construir su propio mausoleo a los pies de la Montaña Sam en los años 1820, con laterita traída desde la provincia de Dong Nai. En el centro está su tumba, con la de su primera esposa a la derecha y la de la segunda a la izquierda.',
              tips: 'Entrada gratuita, a los pies de la Montaña Sam — fácil de combinar con la subida a la montaña o con el templo de Ba Chua Xu, justo enfrente. Cada sexto mes lunar hay una gran peregrinación conmemorativa.' },
            { name: 'Montaña Sam (Nui Sam)', type: 'nature', lat: 10.3188672, lng: 105.0432488, notes: 'Misticismo y vistas panorámicas.',
              photo: 'img/fotos/montana-sam.jpg',
              description: 'Montaña sagrada de 284m a las afueras de Chau Doc, con varios templos y pagodas en sus laderas — el más famoso es el templo de Ba Chua Xu, destino de peregrinación de todo el sur de Vietnam. Desde la cima, vistas panorámicas de los arrozales de la frontera con Camboya.',
              tips: 'Se puede subir en moto-taxi hasta cerca de la cima (hay una carretera) o caminar por el sendero de peregrinos, más lento pero con más templos de camino. Mejor luz al atardecer para las vistas sobre los arrozales.' },
            { name: 'Victoria Nui Sam Lodge (mirador de los arrozales)', type: 'nature', lat: 10.3188672, lng: 105.0432488,
              notes: 'Terraza/restaurante en la ladera de la Montaña Sam con vistas a los arrozales de la frontera con Camboya.',
              description: 'Hotel-boutique en plena ladera de la Montaña Sam, con una terraza/restaurante abierta al público que mira directamente a los arrozales que se extienden hasta la frontera con Camboya — uno de los miradores más cómodos de la zona sin tener que seguir subiendo a pie.',
              tips: 'Se puede entrar a tomar algo en la terraza sin ser huésped del hotel. Mejor luz a media tarde, cuando el sol ya no pega de frente sobre los arrozales.' },
            { name: 'Bosque de Tra Su (Cajuput)', type: 'nature', photo: 'img/fotos/bosque-de-tra-su.jpg', lat: 10.7101604, lng: 105.1174982,
              notes: 'Reserva de aves en barca de remo entre un bosque inundado verde fluorescente. A 1h de Chau Doc.',
              description: 'Un bosque de melaleuca (cajuput) permanentemente inundado, con el agua cubierta de una capa de lentejas de agua de un verde casi fosforescente. Se recorre en dos tramos: primero en barca a motor por el canal principal hasta una torre-mirador de 4 pisos con vistas a todo el humedal, y luego el tramo bueno en barca de remo silenciosa entre los árboles, ideal para ver garzas, cigüeñas y otras aves acuáticas — mejor de noviembre a abril, temporada alta de aves.',
              tips: 'A ~30 km / 1h en coche de Chau Doc. Entrada + barca motor ~100.000 VND, tramo en barca de remo aparte (~150.000 VND, negociable). Necesita medio día — compite con el resto del plan de la mañana en Chau Doc, elegir según el tiempo disponible antes del bus a Can Tho.' },
            { name: 'Bến Ninh Kiều (Muelle de Ninh Kieu)', type: 'nature', lat: 10.0342, lng: 105.7875, notes: 'Paseo marítimo y parque costero de Can Tho, de tus mapas guardados.',
              photo: 'img/fotos/ben-ninh-kieu.jpg',
              description: 'El paseo marítimo histórico de Can Tho, junto a la confluencia del río Can Tho con el Hậu — desde aquí salen los barcos hacia los mercados flotantes de Cai Rang. De día es el embarcadero de siempre; de noche se llena de luces, puestos y gente paseando, con el perfil del puente Can Tho iluminado al fondo.',
              tips: 'Mejor al atardecer/noche para el ambiente. Punto de partida habitual para contratar un barco a Cai Rang de madrugada (mejor reservar la noche anterior aquí mismo).' },
            { name: 'Ninh Kieu Footbridge', type: 'monument', lat: 10.0362046, lng: 105.7872656, notes: 'Puente peatonal iluminado por la noche.',
              photo: 'img/fotos/ninh-kieu-footbridge.jpg',
              description: 'Puente peatonal con un pabellón central en forma de flor de loto que cruza un brazo del río junto al muelle de Ninh Kieu. Iluminado de noche con cientos de luces de colores, es uno de los puntos más fotografiados de Can Tho después de oscurecer.',
              tips: 'Gratis, abierto toda la noche. Mejor justo después de la puesta de sol, cuando el cielo todavía tiene algo de luz y contrasta con las luces del puente.' },
            { name: 'Chùa Ông Cần Thơ', type: 'temple', lat: 10.0362046, lng: 105.7872656, notes: 'Templo taoísta chino, uno de los más antiguos de Can Tho.',
              photo: 'img/fotos/chua-ong-can-tho.jpg',
              description: 'Construido entre 1894 y 1896 por la comunidad china de Cantón (Guangdong) asentada en Can Tho desde el siglo XVII, originalmente como "Quảng Triệu Hội Quán" — sede de la comunidad y lugar de ayuda mutua entre comerciantes, además de templo. Dedicado a Quan Công (el general chino venerado por su lealtad e integridad), y también a la diosa del mar Thiên Hậu y al dios de la fortuna. Reconocido como monumento histórico-cultural nacional en 1993.',
              tips: 'La mayoría de los materiales de construcción se trajeron directamente de Guangdong. Entrada libre; respetar como templo activo (descalzarse si se pide, no interrumpir a quien esté orando).' },
            { name: 'Nhà cổ Bình Thủy', type: 'monument', lat: 10.0362046, lng: 105.7872656, notes: 'Casa antigua colonial, mezcla de arquitectura vietnamita y francesa.',
              photo: 'img/fotos/nha-co-binh-thuy.jpg',
              description: 'Casa familiar de 1870 construida por la familia Dương, terminada en 1911 por la generación siguiente — fusión poco común de estilo colonial francés con motivos tradicionales vietnamitas y una orientación feng shui muy marcada. Declarada "reliquia artística nacional" en 2009; ha servido de set de rodaje para varias películas, entre ellas "El amante" (The Lover) de Jean-Jacques Annaud.',
              tips: 'Sigue habitada por la familia Dương, que cobra una pequeña entrada. Las columnas de mármol de Italia y las baldosas originales francesas son de los detalles más llamativos.' },
            { name: 'Thiền viện Trúc Lâm Phương Nam', type: 'temple', lat: 10.0362046, lng: 105.7872656, notes: 'El monasterio zen más grande del Delta del Mekong.',
              photo: 'img/fotos/thien-vien-truc-lam-phuong-nam.jpg',
              description: 'El monasterio budista zen más grande del Delta del Mekong (más de 38.000 m²), construido en apenas 10 meses (2013-2014) para continuar la tradición Truc Lam Yen Tu fundada por el rey Trần Nhân Tông. Arquitectura inspirada en las dinastías Lý y Trần, con más de 20 construcciones: casa del patriarca, salón principal, pabellón sobre el agua, estupa de 9 pisos, torres de tambor y campana.',
              tips: 'Entrada gratuita, dawn a dusk. Se visita en unos 30 min. Hay un gran restaurante vegetariano dentro del recinto.' }
          ],
          restaurants: [
            { name: 'Pescado de agua dulce del Mekong', type: 'restaurant', notes: 'Chau Doc es la mayor región productora de pescado de agua dulce de Vietnam.',
              photo: 'img/fotos/ca-loc-nuong-trui.jpg' },
            { name: 'Bún Cá Châu Đốc', type: 'restaurant', notes: 'Sopa de fideos con pescado, especialidad local de Chau Doc.',
              photo: 'img/fotos/bun-ca.jpg' },
            { name: 'Mắm Châu Đốc', type: 'restaurant', notes: 'La pasta/salsa de pescado fermentado por la que es famosa Chau Doc en todo Vietnam — se vende en el mercado y se usa en guisos y hotpots.',
              photo: 'img/fotos/mam-chau-doc.jpg' },
            { name: 'Khô Cá Lóc', type: 'restaurant', notes: 'Pescado seco al sol típico del Delta, frito o a la parrilla, muy salado — el souvenir gastronómico más llevado de Chau Doc.' }
          ],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Autobús local Chau Doc→Can Tho', from: 'Chau Doc', to: 'Can Tho', time: '~13:00 o 14:00 (3h)' }
          ],
          hotel: { name: 'De Rive Homestay - Ben Ninh Kieu', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento De Rive Homestay: entrada 17-nov, salida 18-nov. Chợ nổi Cái Răng se deja para la mañana del día 18, justo antes del vuelo. Otras opciones nocturnas si hay tiempo: Chợ đêm Đề Thám, Bờ kè Cái Khế, Chợ đêm Cần Thơ.'
        },
        {
          date: '2026-11-18', city: 'Can Tho → Hoi An', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Mercado flotante de Cai Rang por la mañana. Vuelo Can Tho→Da Nang y traslado a Hoi An.',
          places: [
            { name: 'Chợ nổi Cái Răng (Mercado Flotante de Cai Rang)', type: 'market', lat: 9.998907, lng: 105.787806,
              notes: 'El mercado flotante más grande del Delta del Mekong. Decenas de barcas cargadas de fruta y verdura al amanecer.',
              photo: 'img/fotos/cho-noi-cai-rang.jpg',
              description: 'El mayor y más auténtico de los mercados flotantes del Delta del Mekong: decenas de barcas de mayoristas cargadas hasta arriba de piñas, sandías, coles y demás producto, cada una con un "bẹo" (palo vertical) del que cuelga una muestra de lo que vende, para no tener que gritar por encima del ruido de los motores. Los barqueros más pequeños venden fruta, café y fideos directamente a otras barcas y a los turistas, sin bajarse nunca del agua.',
              tips: 'Hay que ir muy temprano — el ambiente real es entre 5:30 y 7:30, después empieza a vaciarse. Se contrata una barca pequeña desde el muelle de Ninh Kieu (~45 min de trayecto) o más cerca desde el propio Cai Rang. Llevar efectivo pequeño para comprar fruta o un café flotante.' },
            { name: 'Old Quarter Hoi An (paseo introductorio)', type: 'monument', lat: 15.8801, lng: 108.338, notes: 'Comprar bono y escoger 5 monumentos.',
              photo: 'img/fotos/old-quarter-hoi-an.jpg',
              tips: 'Primer vistazo general al casco antiguo antes de dedicarle el bono de 5 monumentos otro día — buen momento para orientarse y decidir qué 5 elegir.' },
            { name: 'Calle Trần Phú', type: 'cafe', lat: 15.8795863, lng: 108.3319406,
              notes: 'Corazón del Old Quarter. Azoteas de Faifo Coffee. Mot Hoi An: té helado en vaso de bambú con pétalo de loto.',
              photo: 'img/fotos/calle-tran-phu.jpg',
              description: 'La calle principal del casco antiguo tiene azoteas fotogénicas: Faifo Coffee y 92 Station Restaurant & Cafe. Mot Hoi An es famoso por el té helado servido en un vaso de bambú con un pétalo de loto flotando.',
              tips: 'Faifo Coffee y 92 Station: azoteas con vistas al casco antiguo. Mot Hoi An: calle Trần Phú, famoso por el té de bambú.' },
            { name: 'Chợ đêm Hội An (Mercado Nocturno de los Farolillos)', type: 'market', lat: 10.0315282, lng: 105.7875681,
              notes: 'Puestos y farolillos de seda a lo largo del río Thu Bon, al cruzar el puente hacia An Hội.',
              photo: 'img/fotos/cho-dem-hoi-an.jpg',
              description: 'Al anochecer, la orilla del río en la isleta de An Hội (al otro lado del puente desde el casco antiguo) se llena de puestos de ropa, artesanía y comida callejera bajo cientos de farolillos de seda de colores. La estampa más fotografiada es la de las barcas con velas de colores remando por el río, y los vendedores de farolillos de papel flotantes que se sueltan al agua con un deseo.',
              tips: 'Cruza el puente An Hội desde el casco antiguo, orilla sur del río Thu Bon. Mejor justo después de la puesta de sol, cuando se encienden los farolillos. Un paseo en barca con farolillo flotante cuesta unos 50.000-100.000 VND, negociable.' }
          ],
          restaurants: [
            { name: 'Fruta y café flotante en Cai Rang', type: 'restaurant', photo: 'img/fotos/fruta-y-cafe-flotante-en-cai-rang.jpg', notes: 'Los barcos del mercado flotante venden fruta y sirven café/fideos sin bajarse de la barca.' },
            { name: 'Hủ Tiếu', type: 'restaurant', photo: 'img/fotos/hu-tieu.jpg', notes: 'Sopa de fideos suave, plato bandera de Can Tho y todo el Delta.' },
            { name: 'Bánh Xèo', type: 'restaurant', notes: 'Crepe de arroz crujiente con gambas, cerdo y brotes de soja, para envolver en hoja de lechuga — gigante en su versión sureña del Delta.',
              photo: 'img/fotos/banh-xeo.jpg' },
            { name: 'Nem Nướng Cái Răng', type: 'restaurant', notes: 'Brochetas de cerdo a la parrilla, típicas de los puestos junto al mercado flotante de Cai Rang, para comer con fideos de arroz y hierbas.',
              photo: 'img/fotos/nem-nuong-cai-rang.jpg' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo Can Tho→Da Nang — Via Jet, localizador R6JUT5. María: 20 kg facturado + cabina 7 kg. Marcos: 20 kg facturado + cabina 7 kg.', from: 'Can Tho', to: 'Da Nang', time: '12:40–14:10 (1h 30min)' },
            { type: 'car', icon: '🚖', details: 'Transporte desde el Aeropuerto de Da Nang a Hoi An', from: 'Da Nang', to: 'Hoi An', time: '' }
          ],
          hotel: { name: 'Volar', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento Volar: entrada 18-nov, salida 20-nov.'
        },
        {
          date: '2026-11-19', city: 'Hoi An', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Plan: Corazón histórico y espectáculo.',
          places: [
            { name: 'Mercado central Chợ Hội An', type: 'market', lat: 15.8768181, lng: 108.3313443,
              notes: 'Abre a las 06:00. Entre las 5:00 y las 7:00 se ve llegar a los pescadores para la puja.',
              photo: 'img/fotos/mercado-central-cho-hoi-an.jpg' },
            { name: 'Chùa Cầu (Puente Japonés)', type: 'monument', lat: 15.8771173, lng: 108.326023,
              notes: 'El símbolo de Hoi An — sale en el billete de 20.000 VND. Construido por comerciantes japoneses en el s.XVII.',
              photo: 'img/fotos/chua-cau.jpg',
              description: 'El monumento más fotografiado de Hoi An y su imagen oficial (aparece en el billete de 20.000 VND). Construido a finales del s.XVI por la comunidad de comerciantes japoneses para conectar su barrio con el chino, cruza un pequeño canal con tejado curvo cubierto y vigas de madera talladas. En el centro hay un templete con un altar dedicado a Tran Vo Bac De, dios protector de los marineros — por eso el puente también hace de templo. Está flanqueado por estatuas de un mono y un perro (se dice que la construcción empezó en año del Mono y terminó en año del Perro).',
              tips: 'Incluido en el bono de entradas del Old Quarter. Recién restaurado — mejor luz al atardecer, cuando se encienden los farolillos alrededor. Suele haber cola para cruzarlo en las horas centrales del día.' },
            { name: 'Old Quarter (bono, 5 monumentos)', type: 'monument', lat: 15.8801, lng: 108.338,
              notes: 'Casco antiguo UNESCO. Farolillos, casas tubo centenarias, canales. Elige 5 monumentos del bono de entrada.',
              photo: 'img/fotos/old-quarter-hoi-an.jpg',
              description: 'El casco antiguo de Hoi An es Patrimonio Mundial UNESCO desde 1999: un puerto comercial del s.XV-XIX que se conservó casi intacto al perder importancia frente a otros puertos vietnamitas. Sus calles peatonales de casas-tubo amarillas, farolillos de seda de colores y canales tranquilos se recorren mejor a pie o en bici. La entrada única (120.000 VND) da acceso a elegir 5 de entre ~20 monumentos (casas antiguas, salones de asambleas chinos, museos, templos).',
              tips: 'Los farolillos se encienden al anochecer — mucho más bonito de noche que de día. Los días 14 del calendario lunar hay "Noche de los Farolillos": se apaga la luz eléctrica del casco antiguo entero.' },
            { name: 'Casas Antiguas y Capillas Familiares', type: 'monument', lat: 15.8795863, lng: 108.3319406, notes: '6 sitios posibles dentro del bono.',
              photo: 'img/fotos/casas-antiguas-y-capillas-familiares.jpg',
              description: 'Una de las 5 categorías del bono de entrada: casas-tubo de comerciantes del s.XVIII-XIX que han pasado de generación en generación en la misma familia, con su mobiliario y altares originales. Las más visitadas: Casa Tan Ky (la más completa, con influencia japonesa/china/vietnamita), Casa Phung Hung, Casa Quan Thang y la Capilla familiar Tran.',
              tips: 'Tan Ky es la más recomendada si solo se puede elegir una — un miembro de la familia suele hacer de guía improvisado y explica la mezcla de estilos arquitectónicos.' },
            { name: 'Salones de Asambleas Chinos', type: 'monument', lat: 15.8795863, lng: 108.3319406, notes: '5 sitios posibles dentro del bono.',
              photo: 'img/fotos/salones-de-asambleas-chinos.jpg',
              description: 'Salones construidos por las distintas comunidades de comerciantes chinos (Fujian, Cantón, Hainan, Teochew/Trieu Chau) que se asentaron en Hoi An entre los siglos XVII-XIX — mitad templo, mitad sede social para hacer negocios y ayudarse entre paisanos. El más vistoso con diferencia es el de Fujian (Phuc Kien), con una entrada monumental roja y dorada y un patio con fuente de dragones.',
              tips: 'Si solo se visita uno, que sea el de Fujian. El de Cantón (Quang Dong) tiene un patio con jardín más tranquilo si se busca escapar de los grupos.' },
            { name: 'Museos Históricos', type: 'museum', lat: 15.880315, lng: 108.3304896, notes: '5 sitios posibles dentro del bono.',
              photo: 'img/fotos/museos-historicos.jpg',
              description: 'Categoría del bono con varios museos pequeños y rápidos de ver: el Museo de Cerámica Comercial (piezas recuperadas de pecios y del puerto antiguo), el Museo de Hoi An (historia general de la ciudad), el Museo de la Cultura Sa Huynh (civilización prehistórica anterior a los Cham) y el Museo de Folklore (artesanía y vida tradicional).',
              tips: 'El de Cerámica Comercial es el más interesante para entender por qué Hoi An fue un puerto internacional tan importante entre los siglos XV-XIX.' },
            { name: 'Puentes, Templos y Casas Comunales', type: 'monument', lat: 15.8795863, lng: 108.3319406, notes: '3 sitios posibles dentro del bono.',
              photo: 'img/fotos/puentes-templos-y-casas-comunales.jpg',
              description: 'Categoría del bono centrada en el Templo de Quan Cong (dedicado al mismo general chino venerado que el templo de Can Tho, con una estatua dorada muy fotografiada) y en casas comunales/templos de culto a los fundadores de gremios locales — un contrapunto más religioso a las casas de comerciantes y los salones de asambleas.',
              tips: 'El Puente Japonés (Chùa Cầu) va aparte, ya incluido siempre en el bono base — no hace falta elegirlo de esta categoría.' },
            { name: 'Espectáculos, Demostraciones y Tumbas', type: 'monument', lat: 15.8880397, lng: 108.3367883, notes: '3 sitios posibles dentro del bono.',
              photo: 'img/fotos/espectaculos-demostraciones-y-tumbas.jpg',
              description: 'La categoría más "en vivo" del bono: la Casa de Artes Tradicionales (mini-espectáculo de música y danza vietnamita tradicional, varios pases al día), demostraciones de artesanía local (bordado, carpintería) y las tumbas históricas de comerciantes japoneses del s.XVII que se quedaron en Hoi An.',
              tips: 'Consultar el horario de los pases de música/danza al comprar el bono — son a horas fijas, no continuos, y suelen durar 15-20 min.' },
            { name: 'Hoi An Memories Show', type: 'monument', lat: 15.8795863, lng: 108.3319406,
              notes: 'Gran espectáculo en la isla Hen. 500 actores. 20:00-21:00. Eco 22€ / HI 28€ / VIP 45€.',
              photo: 'img/fotos/hoi-an-memories-show.jpg',
              description: 'El espectáculo de luz y sonido más grande de Vietnam, en el parque temático Hoi An Impression de la isla Hen. El parque abre a las 17:00 con mini shows cada 20 min. El gran espectáculo es de 20:00-21:00 (500 actores, escenografía épica sobre la historia de Hoi An). Tres categorías de asiento: Eco (laterales, 22€), HI (zona media, 28€), VIP (planta superior, totalmente techado, 45€).',
              tips: 'Comprar en klook.com/en-US/activity/17514 con antelación (10% descuento). La categoría HI ofrece buena relación calidad-precio.' }
          ],
          restaurants: [
            { name: 'Cao Lầu', type: 'restaurant', photo: 'img/fotos/cao-lau.jpg', notes: 'Fideos gruesos típicos de Hoi An — dicen que solo saben igual con el agua de un pozo concreto de la ciudad.' },
            { name: 'Mì Quảng', type: 'restaurant', photo: 'img/fotos/mi-quang.jpg', notes: 'Fideos de cúrcuma con gambas y cerdo, el otro gran plato de fideos del centro de Vietnam.' },
            { name: 'Cơm Gà Hội An', type: 'restaurant', notes: 'Arroz cocido en caldo de pollo y cúrcuma, con pollo desmenuzado, cebolla encurtida y hierbas — el plato de pollo más famoso de la ciudad.' },
            { name: 'Hoành Thánh Chiên', type: 'restaurant', photo: 'img/fotos/hoanh-thanh-chien.jpg', notes: 'Wontons fritos crujientes cubiertos de salsa de tomate con gambas y verdura — herencia de la antigua comunidad china de Hoi An.' }
          ],
          transport: [],
          hotel: { name: 'Volar', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-20', city: 'Hoi An', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Plan: Bicicleta, rutas rurales y playas.',
          places: [
            { name: 'Santuario de My Son', type: 'monument', lat: 15.8801, lng: 108.338,
              notes: 'Ruinas hindúes Cham, Patrimonio UNESCO — la "hermana pequeña" de Angkor, en un valle a 1h de Hoi An.',
              photo: 'img/fotos/santuario-de-my-son.jpg',
              description: 'Conjunto de más de 70 templos y torres de ladrillo rojo construidos entre los siglos IV y XIV por los reyes del reino Cham, dedicados sobre todo a Shiva. Fue el centro religioso e intelectual más importante del reino de Champa, en un valle rodeado de montañas selváticas. Varios templos quedaron muy dañados por los bombardeos estadounidenses durante la guerra de Vietnam (todavía se ven cráteres), pero el conjunto sigue siendo Patrimonio Mundial UNESCO desde 1999.',
              tips: 'A ~40 km / 1h en coche de Hoi An (también hay tours en barco por el río Thu Bon). Mejor a primera hora (6:30-8:00) para evitar calor y autobuses de grupo. Entrada ~150.000 VND. Necesita medio día contando el trayecto.' },
            { name: 'Mercado de pescado de Thanh Ha', type: 'market', lat: 15.8795863, lng: 108.3319406,
              notes: 'Subasta de pescado de madrugada (03:00-07:00), pegado a la aldea de cerámica.',
              photo: 'img/fotos/mercado-de-pescado-de-thanh-ha.jpg' },
            { name: 'Aldea de cerámica de Thanh Ha', type: 'monument', lat: 15.8801, lng: 108.338,
              notes: 'A 3 km en bici. Demostración de alfarería y souvenir de arcilla incluido con la entrada.',
              photo: 'img/fotos/aldea-de-ceramica-de-thanh-ha.jpg',
              description: 'Aldea artesanal a 3 km del casco antiguo en bici. La entrada (35.000 VND) incluye acceso a las calles de la aldea, ver las demostraciones de alfarería en torno y un souvenir de arcilla. Pegada a la aldea está el mercado de pescado de Thanh Ha (si se va de madrugada).',
              tips: '8:00-17:30, 35.000 VND. Museo de Terracota aparte: 50.000 VND. En bici desde el casco antiguo: ~15 min.' },
            { name: 'Ruta en bici isla de Cam Kim (Vietnam rural)', type: 'nature', lat: 15.9156674, lng: 108.3368743,
              notes: 'Vietnam rural a 5 min del casco antiguo. Los artesanos que tallaron los palacios imperiales de Hue.',
              photo: 'img/fotos/ruta-en-bici-isla-de-cam-kim.jpg',
              description: 'Justo enfrente del casco antiguo. Sus artesanos en madera tallaron los palacios de Hue y las casas de Hoi An. Ruta circular cruzando por el Puente Cầu Cẩm Kim y volviendo por Cầu sắt Cẩm Kim, que está junto a la aldea de cerámica.',
              tips: 'Cruzar en bici por el puente Cầu Cẩm Kim (junto al Old Town). Ruta circular de ~1,5h. Sin turistas.' },
            { name: 'Mercado de Tan An (Tiger Market)', type: 'market', lat: 15.8795863, lng: 108.3319406, notes: 'Abierto de 06:00 a 18:00.' },
            { name: 'Mercado de Ba Le', type: 'market', lat: 15.8795863, lng: 108.3319406, notes: 'Abierto de 05:00 a 19:00.' },
            { name: 'Playa An Bang (ruta en bici)', type: 'beach', lat: 15.9156674, lng: 108.3368743,
              notes: '4-5 km en bici por Hai Bà Trưng. Pasando por la aldea de Trà Quế (hierbas aromáticas).',
              photo: 'img/fotos/playa-an-bang.jpg',
              description: 'El paseo en bici más popular de Hoi An. Desde la calle Hai Bà Trưng hasta la playa de An Bang (4-5 km). De camino se pasa por la aldea de Trà Quế (desvío a la derecha), famosa por sus cultivos de hierbas aromáticas.',
              tips: 'Punto de partida: calle Hai Bà Trưng. ~20-25 min en bici. Parar en la aldea de Trà Quế de camino.' },
            { name: 'Clases de Cocina', type: 'activity', photo: 'img/fotos/clases-de-cocina.jpg', lat: 15.8880397, lng: 108.3367883,
              notes: 'Dos opciones en islas rurales del río Thu Bon: mercado + barco + cocina (35€) o cocina tradicional con huertos (34€).',
              description: 'Opción 1 (Isla de Thuan Tinh, 08:30-11:30, 35€): visita al mercado local, paseo en barco por el río Thu Bon hasta una zona rural de cocoteros de agua, y clase de cocina en una cocina abierta con vistas al río. Incluye paseo en barca tradicional por el bosque de cocoteros de Cam Thanh. Opción 2 (Cocina Tradicional, 09:30-13:00, 34€): en una isla rural del delta, con visita a huertos locales y técnicas como la elaboración de leche de arroz o papel de arroz para nems.',
              tips: 'Reservar con antelación, son experiencias de medio día. La opción 1 combina mejor con el paseo en barca por Cam Thanh si no se hace aparte.' },
            { name: 'Talleres Artesanales', type: 'activity', lat: 15.87662, lng: 108.32735,
              notes: 'Farolillos de cera (~5€) o artesanía con impacto social en Reaching Out (calle Nguyễn Thái Học, 103).',
              description: 'Taller de farolillos de cera de seda, el souvenir por excelencia de Hoi An (~5€). Alternativa con impacto social: Reaching Out Vietnam, un taller de artesanos locales con discapacidades, en el número 103 de la calle Nguyễn Thái Học.',
              tips: 'Reaching Out es una buena parada de compras además de taller — venden directamente lo que se fabrica allí.' }
          ],
          restaurants: [
            { name: 'White Rose (Bánh Bao Vạc)', type: 'restaurant', photo: 'img/fotos/white-rose.jpg', notes: 'Empanadillas de gambas translúcidas, receta exclusiva de una familia de Hoi An.' },
            { name: 'Bánh Mì Phượng', type: 'restaurant', notes: 'Considerado por muchos el mejor bánh mì del mundo, siempre con cola en la puerta.',
              photo: 'img/fotos/banh-mi-phuong.jpg' },
            { name: 'Bánh Đập', type: 'restaurant', notes: '"Pan roto" — un bánh tráng crujiente y otro blando prensados juntos, para mojar en salsa de gambas fermentada (mắm nêm).' },
            { name: 'Chè Bắp', type: 'restaurant', notes: 'Postre dulce de maíz tierno de la isla de Cẩm Nam, con leche de coco — un clásico de las noches de Hoi An.',
              photo: 'img/fotos/che-bap.jpg' }
          ],
          transport: [],
          hotel: { name: 'Volar', address: '', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [],
          notes: 'Otras cosas por hacer en Hoi An: Ba Na Hills (ver día 21, Da Nang). Salida del hotel Volar hoy.'
        },
        {
          date: '2026-11-21', city: 'Da Nang', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Plan: Marble Mountains & Da Nang.',
          places: [
            { name: 'Marble Mountains', type: 'nature', lat: 16.00402, lng: 108.2627745,
              notes: '5 montañas de mármol con cuevas, santuarios y miradores. La Cueva Huyen Khong tiene un rayo de sol vertical sobre el Buda.',
              photo: 'img/fotos/marble-mountains.jpg',
              description: 'Cinco montañas de mármol llenas de senderos, santuarios y cuevas. Ruta recomendada: ascensor (pagar el extra), Torre Xa Loi, Pagoda Linh Ung, Cueva Tang Chon y la gran joya, la Cueva Huyen Khong — el techo colapsó naturalmente y los rayos de sol entran en vertical iluminando el Buda de piedra. Bajar a pie por 156 escalones de piedra. Extra: Cueva Am Phu (20.000 VND) recreando el infierno budista.',
              tips: '7:00-17:30, 40.000 VND. Ascensor: 60.000 VND extra (muy recomendable). Cueva Am Phu: 20.000 VND adicionales. En bus LK-02 desde Da Nang (~20 min). Se puede visitar de camino a Hoi An con las maletas y dejárselas a un tendero de souvenirs.' },
            { name: 'Península de Son Tra (Montaña de los Monos)', type: 'nature', lat: 16.1210876, lng: 108.3061358,
              notes: 'Reserva natural con la Pagoda Linh Ung y su Buda blanco de 67m, la "Dama de Son Tra". Vistas de toda la bahía de Da Nang.',
              photo: 'img/fotos/peninsula-de-son-tra.jpg',
              description: 'Montaña-península boscosa que cierra la bahía de Da Nang, apodada "Monkey Mountain" por sus colonias de monos y por ser hogar del langur de Douc de patas rojas, un primate en peligro de extinción que solo vive aquí y en pocos lugares más. En lo alto, la Pagoda Linh Ung (no confundir con la de Ba Na Hills) tiene la estatua de Buda/Avalokiteshvara más alta de Vietnam: 67 metros de altura blanca, visible desde gran parte de la ciudad.',
              tips: 'A 10-15 km del centro de Da Nang, se visita en moto/taxi por la carretera que rodea la península (buenas vistas al mar). La pagoda es gratuita. Mejor por la mañana, antes de que llegue el calor y la neblina marina.' },
            { name: 'Puente del Dragón', type: 'monument', lat: 16.0611682, lng: 108.2278968,
              notes: 'Sábados y domingos a las 21:00: 15 min escupiendo fuego y luego agua. Ver desde el Muelle Bach Dang.',
              photo: 'img/fotos/puente-del-dragon.jpg',
              description: 'El puente con forma de dragón dorado de Da Nang escupe fuego por la boca los sábados y domingos a las 21:00 durante 15 minutos (primero fuego, luego agua). Uno de los espectáculos nocturnos más vistosos de Vietnam.',
              tips: '⚠️ SOLO sábados y domingos a las 21:00. Duración: ~15 min. Mejor desde el paseo marítimo Muelle Bach Dang o las terrazas de las cafeterías cercanas. El Love Lock Bridge (faroles rojos y dragones-pez) está justo al lado.' },
            { name: 'Mercado nocturno Son Tra', type: 'market', lat: 16.0425792, lng: 108.1971613,
              notes: 'Chợ Đêm Sơn Trà, 18:00-24:00. El mercado nocturno más grande de Da Nang, junto al Puente del Dragón.',
              description: 'En la orilla este del río Han, a los pies del Puente del Dragón. Dividido en dos zonas: la de comida, con tanques de marisco fresco (langosta, cangrejo, almejas) que se elige, se pesa y se cocina al momento a la parrilla; y la de compras, con ropa, artesanía de madera y souvenirs de las Montañas de Mármol.',
              tips: '18:00-24:00 (ambiente real desde 19:30). Los fines de semana se llena el doble por el show del puente. Regatear: pedir entre 30-40% menos del primer precio.' },
            { name: 'Love Lock Bridge', type: 'monument', lat: 16.0513135, lng: 108.2309046,
              notes: 'Pequeño muelle junto al Puente del Dragón, con faroles rojos y estatuas de dragones-pez.',
              photo: 'img/fotos/love-lock-bridge.jpg',
              description: 'Justo al lado del Puente del Dragón — un pequeño muelle decorado con faroles rojos en forma de corazón y estatuas de dragones-pez, donde las parejas cuelgan candados.',
              tips: 'Combina bien con la espera del espectáculo de fuego del Puente del Dragón (sábados y domingos, 21:00).' },
            { name: 'Aldea de Frescos de Da Nang', type: 'monument', lat: 16.0425792, lng: 108.1971613,
              notes: 'Làng Bích Họa Đà Nẵng — callejón de murales a 2 min del hotel LaDa\'s House. Abierto 24h.',
              description: 'Proyecto cultural comunitario de 2018 que transformó un callejón residencial gris en un museo urbano al aire libre, con más de 30 murales de gran tamaño pintados por artistas y estudiantes locales sobre la cultura y vida cotidiana vietnamitas. Al ser un callejón habitado, se convive con el día a día de los vecinos.',
              tips: 'Escondido en el callejón Hẻm 75 Nguyễn Văn Linh. Abierto 24h, pero mejor 8:00-10:00 o desde las 16:00 para evitar el calor y tener mejor luz. A 2 min a pie del hotel LaDa\'s House. Hay pequeñas cafeterías locales dentro de los callejones.' },
            { name: 'Ba Na Hills', type: 'monument', lat: 16.0255198, lng: 108.0308928,
              notes: 'El "puente de las manos" — parque temático a 1.500m de altura, a 40km de Da Nang/Hoi An.',
              photo: 'img/fotos/ba-na-hills.jpg',
              description: 'Parque temático en la cima de una montaña, con el famoso Puente Dorado (Cầu Vàng) sostenido en el aire por dos manos gigantes de piedra. Se sube en uno de los teleféricos más largos y altos del mundo (>5km). Dentro también hay un Pueblo Francés a escala real (castillos, catedral gótica, de 1919), el Fantasy Park (parque de atracciones cubierto estilo Julio Verne) y la Pagoda Linh Ung con un Buda blanco de 27m.',
              tips: '8:00-22:00, entrada ~35€ (incluye teleférico y atracciones). También se puede ir desde Da Nang. Día completo — valorar si encaja mejor en vez de la ruta rural en bici.' }
          ],
          restaurants: [
            { name: 'Mì Quảng', type: 'restaurant', photo: 'img/fotos/mi-quang.jpg', notes: 'Fideos de cúrcuma con gambas y cerdo, plato bandera de la región de Da Nang.' },
            { name: 'Marisco de Da Nang', type: 'restaurant', notes: 'Ciudad costera con mucho mejor marisco y más barato que en las zonas turísticas.',
              photo: 'img/fotos/marisco-de-da-nang.jpg' },
            { name: 'Bánh Tráng Cuốn Thịt Heo', type: 'restaurant', notes: 'Panceta de cerdo cocida envuelta en papel de arroz junto con fideos, hierbas frescas y vegetales — plato emblemático de Da Nang, para montar tú mismo en la mesa.',
              photo: 'img/fotos/banh-trang-cuon-thit-heo.jpg' },
            { name: 'Bún Mắm Nêm', type: 'restaurant', photo: 'img/fotos/bun-mam-nem.jpg', notes: 'Fideos con cerdo a la parrilla y una salsa intensa de pescado fermentado con piña — de sabor fuerte, muy querido por los locales de Da Nang.' }
          ],
          transport: [],
          hotel: { name: 'LaDa\'s House Da Nang', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento LaDa\'s House Da Nang: entrada 21-nov, salida 22-nov.'
        },
        {
          date: '2026-11-22', city: 'Da Nang → Hue', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Tren panorámico bordeando la costa desde Da Nang hacia Hue. Plan: esencia de Hue, del corazón del imperio al atardecer en el río Perfume.',
          places: [
            { name: 'Ciudad Imperial de Hue', type: 'monument', lat: 16.4689726, lng: 107.5781266,
              notes: 'Enorme complejo amurallado inspirado en la Ciudad Prohibida de Pekín. Patrimonio UNESCO.',
              photo: 'img/fotos/ciudad-imperial-de-hue.jpg',
              description: 'El corazón del Imperio Nguyen (1802-1945), la última dinastía imperial de Vietnam. Tres recintos amurallados: Puerta Ngo Mon (sube al 2º piso para vistas de la plaza), Palacio Thai Hoa (trono imperial original de oro), Ciudad Púrpura Prohibida (área exclusiva de la familia real, parcialmente reconstruida), Teatro Real Duyet Thi Duong (a veces con música tradicional en vivo) y Pabellón Hien Lam con las Nueve Urnas Dinásticas de bronce.',
              tips: '8:00-17:30, 200.000 VND. TICKET COMBINADO con las tumbas imperiales: 420.000 VND, válido 2 días consecutivos. Visita: 2-3 horas. Bus hop-on hop-off incluye parada aquí.' },
            { name: 'Pagoda Thien Mu', type: 'temple', lat: 16.4637, lng: 107.5909,
              notes: 'Símbolo no oficial de Hue. Torre de 7 pisos. El coche en el que el monje Thich Quang Duc fue a quemarse en 1963.',
              photo: 'img/fotos/pagoda-thien-mu.jpg',
              description: 'A 5 km al oeste, sobre una colina con vistas al Río Perfume. La Torre Phuoc Duyen (7 pisos, 21m, cada piso = una reencarnación de Buda) es la postal de Hue. En el garaje acristalado de los jardines traseros: el Austin de color azul claro en el que el monje Thich Quang Duc viajó a Saigón en 1963 para quemarse vivo en protesta — la fotografía dio la vuelta al mundo.',
              tips: '8:00-18:00. Entrada gratuita. Monasterio activo: descalzarse si se entra al templo. Los jardines traseros tienen un estanque de peces y el cementerio de los monjes.' },
            { name: 'Mercado nocturno de Dong Ba', type: 'market', photo: 'img/fotos/mercado-nocturno-de-dong-ba.jpg', lat: 16.4724474, lng: 107.5886452,
              notes: 'El mercado más grande y antiguo de Hue, en la orilla norte del río Perfume. Ropa, comida y los característicos sombreros cónicos "nón bài thơ" con poemas.',
              description: 'Mercado cubierto de 3 plantas junto al río, el centro comercial tradicional de Hue desde 1899. Planta baja: productos secos, pescado seco, pastas de gambas y salsas. Planta 2: artesanía (incienso, cerámica, madera tallada). Planta 3: telas y ropa. Es más un mercado diurno que nocturno pese al nombre — por la tarde-noche lo que queda activo son los puestos de comida callejera de los alrededores, no el mercado cubierto en sí.',
              tips: 'Abierto 5:00-19:00. Mejor para comprar ingredientes frescos 6:30-9:00h, para artesanía y souvenirs 15:00-17:00h, para fotos (luz en la torre del reloj) 7:00-8:00h. Regatear siempre, los vendedores suelen pedir hasta el doble. Solo efectivo. Curiosidad local: evitar "mirar sin comprar" muy temprano — hay quien lo considera mala suerte para el primer cliente del día.' },
            { name: 'Paseo junto al río Perfume', type: 'nature', photo: 'img/fotos/paseo-junto-al-rio-perfume.jpg', lat: 16.4277921, lng: 107.5637682,
              notes: 'El río que cruza Hue de oeste a este. Los barcos-dragón ofrecen paseos al atardecer, algunos con música tradicional ca Huế en directo.',
              description: 'El Sông Hương cruza Hue de oeste a este bajo el puente Trường Tiền, iluminado de noche con un juego de luces que cambia de color. Los barcos-dragón de madera (dragón tallado en la proa) salen cada tarde-noche con música ca Huế en directo — canto tradicional de cámara declarado Patrimonio Inmaterial UNESCO, con instrumentos de cuerda y percusión — y en algunas rutas se sueltan farolillos de flor de loto al agua.',
              tips: 'El cruce de ca Huế más popular dura ~1h con 3 salidas (19:00, 20:00, 21:00), 100.000-250.000 VND según el operador. Alternativa más barata: alquilar un barco entero por tu cuenta desde 300.000 VND/hora. El paseo peatonal de la orilla (Công viên Tứ Tượng) es gratis y agradable al atardecer sin necesidad de subir a ningún barco.' }
          ],
          restaurants: [
            { name: 'Bánh Khoái', type: 'restaurant', photo: 'img/fotos/banh-khoai.jpg', notes: 'Crepe crujiente típico de Hue, hermano pequeño del bánh xèo.' },
            { name: 'Bánh Bèo, Nậm y Lọc', type: 'restaurant', photo: 'img/fotos/banh-beo-nam-y-loc.jpg', notes: 'El trío imperial de Hue: tres tipos de pastelitos de arroz al vapor en miniatura.' },
            { name: 'Nem Lụi Huế', type: 'restaurant', notes: 'Brochetas de cerdo a la parrilla con hierba limón, para envolver en papel de arroz con hierbas y mojar en una salsa de cacahuete espesa.',
              photo: 'img/fotos/nem-lui-hue.jpg' },
            { name: 'Chè Huế', type: 'restaurant', notes: 'La ciudad imperial tiene su propia tradición de más de 30 tipos de chè — de judía mungo, loto, maíz o plátano — herencia de los postres de la corte real.' }
          ],
          transport: [
            { type: 'train', icon: '🚂', details: 'Tren panorámico Da Nang→Hue bordeando la costa (Hai Van Pass)', from: 'Da Nang', to: 'Hue', time: '' }
          ],
          hotel: { name: 'Hue Sweethouse 2 Homestay', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento Hue Sweethouse 2 Homestay: entrada 22-nov, salida 23-nov.'
        },
        {
          date: '2026-11-23', city: 'Hue → Tam Coc (bus nocturno)', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Plan: Hue Alternativo — templos, secretos abandonados y esencia local. Por la noche, sleeper bus a Tam Coc.',
          places: [
            { name: 'Cementerio City of Ghosts (valorar si ir)', type: 'monument', lat: 16.4689726, lng: 107.5781266,
              notes: 'El cementerio más fotogénico de Asia. Lápidas de colores entre la vegetación. Ángulo opuesto al turístico.',
              photo: 'img/fotos/cementerio-city-of-ghosts.jpg',
              description: 'El vasto cementerio en los alrededores de Hue, conocido popularmente como "Ciudad de los Fantasmas", es uno de los más grandes y visualmente impactantes de Asia. Las tumbas de cerámica pintadas en tonos turquesa, rojo y dorado se extienden entre la vegetación subtropical durante kilómetros. Muchas siguen el estilo imperial en miniatura, con puertas de entrada, jardines y estanques diminutos.',
              tips: 'Al sur de la ciudad, en los alrededores de la zona de tumbas imperiales. Se puede recorrer en bici desde el centro (~8 km). Sin entrada. No hay carteles turísticos — es un cementerio activo. Respetar el espacio. Mejor al atardecer para la luz dorada sobre las cerámicas de colores.' },
            { name: 'Puente Thanh Toan', type: 'monument', lat: 16.4667729, lng: 107.6427024,
              notes: 'Puente cubierto del s.XVIII menos conocido que el de Hoi An. Aldea de Thanh Toan a 8 km.',
              photo: 'img/fotos/puente-thanh-toan.jpg',
              description: 'Construido en 1776 por la nieta de un mandarín imperial, este puente cubierto de estilo japonés sobre el canal de la aldea de Thanh Toan es el primo más tranquilo del Puente Japonés de Hoi An. En el interior del puente hay un pequeño altar y bancos de madera donde los aldeanos se sientan a charlar. La aldea alrededor mantiene el ritmo de vida rural vietnamita intacto.',
              tips: 'A 8 km al este del centro de Hue. En bici: 30-40 min por carretera rural entre arrozales. En Grab: 10 min. Entrada: 20.000 VND. Si vas a Hue 2 días, es una excursión perfecta para la tarde del segundo día.' },
            { name: 'Ho Thuy Tien (parque acuático abandonado)', type: 'monument', lat: 16.4098334, lng: 107.5767096,
              notes: 'Dragón gigante emergiendo de un lago, toboganes oxidados y vegetación devorando todo. 8 km de Hue.',
              photo: 'img/fotos/ho-thuy-tien.jpg',
              description: 'Parque acuático abandonado con un dragón gigante de tres cabezas emergiendo de un lago cubierto de vegetación. Toboganes oxidados y estructuras cubiertas por la selva. Este año parece que han rehabilitado alguna zona.',
              tips: 'A 8 km de Hue. En taxi: 10 min desde Khai Dinh, 10 min de Minh Mang. Alquilar una bici local para recorrer el parque: ~1€. La visita dura ~1 hora.' },
            { name: 'Tumba de Tu Duc', type: 'monument', lat: 16.4330399, lng: 107.5655159,
              notes: 'La más poética de las tumbas imperiales — pabellones sobre un lago de lotos, donde el emperador escribía versos.',
              photo: 'img/fotos/tumba-de-tu-duc.jpg',
              description: 'Tu Duc (r. 1848-1883) diseñó su propia tumba como residencia de retiro mientras aún vivía — de hecho la usaba para escapar de la corte, pescar y escribir poesía (dejó más de 4.000 poemas). A diferencia de otras tumbas, aquí el conjunto de pabellones de madera, el lago de lotos Luu Khiem y el pabellón Xung Khiem (donde componía) priman sobre la grandiosidad militar. Irónicamente, pese a tener 104 concubinas, no dejó descendencia.',
              tips: '5 km al sur de Hue. Incluida en el ticket combinado con la Ciudadela (420.000 VND, 2 días). 7:00-17:30. La más tranquila y menos masificada de las tumbas grandes.' },
            { name: 'Tumba de Minh Mang', type: 'monument', lat: 16.4689726, lng: 107.5781266,
              notes: 'La más simétrica y solemne — arquitectura confuciana clásica entre lagos y jardines.',
              photo: 'img/fotos/tumba-de-minh-mang.jpg',
              description: 'Minh Mang (r. 1820-1841), el emperador que más reforzó el poder centralizado, encargó la tumba más ortodoxa y simétrica de todas: un eje central de 700m que atraviesa patios, el Templo Sung An (culto al emperador y su esposa) y termina en un túmulo circular rodeado por el lago Tan Nguyet, con forma de media luna. Representa el orden confuciano llevado a la arquitectura funeraria.',
              tips: 'A 12 km de Hue, la más alejada de las tres grandes. Incluida en el ticket combinado. Menos concurrida que Khai Dinh; ideal para combinar con la Calle del Incienso de Thuy Xuan, que queda de camino.' },
            { name: 'Calle del incienso de Thuy Xuan', type: 'monument', lat: 16.4277921, lng: 107.5637682,
              notes: 'Puestos fabricando varillas de incienso de colores artesanales. Entre la Tumba Tu Duc y Khai Dinh.',
              photo: 'img/fotos/calle-del-incienso-de-thuy-xuan.jpg',
              description: 'Calle llena de puestos artesanales donde fabrican varillas de incienso de todos los colores. Las flores de incienso extendidas en aros de bambú son la foto más característica de Hue.',
              tips: '7:00-18:00. Entre la Tumba Tu Duc (5 min en taxi) y la Tumba Khai Dinh. ⚠️ Evitar si llueve — no sacan el incienso a la calle.' }
          ],
          restaurants: [
            { name: 'Bún bò Huế', type: 'restaurant', photo: 'img/fotos/bun-bo-hue.jpg', notes: 'La sopa picante con limoncillo más famosa de Vietnam, nacida en Hue.' },
            { name: 'Cơm hến', type: 'restaurant', photo: 'img/fotos/com-hen.jpg', notes: 'Arroz con almejas diminutas del río Perfume, plato humilde y muy local de Hue.' },
            { name: 'Bánh Ép', type: 'restaurant', notes: 'Masa de tapioca prensada con huevo y panceta, típica de merienda callejera en Hue — más fina y crujiente que el bánh xèo.' },
            { name: 'Vả Trộn', type: 'restaurant', notes: 'Ensalada de higos verdes vietnamitas con cacahuetes, cerdo y gambas — un contraste fresco y ácido en medio de tanto plato especiado.' }
          ],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Sleeper Bus Hue→Tam Coc — HK Buslines. Salida: 35 Nguyen Cong Tru, Hue. Llegada: Tam Coc Agency, Ninh Binh.', from: 'Hue', to: 'Tam Coc', time: '22:00–07:15 (9h 15min)' }
          ],
          hotel: { name: '', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-24', city: 'Tam Coc', country: '🇻🇳 Vietnam', block: 'Ninh Binh',
          summary: 'Llegada de madrugada en bus nocturno. Plan: Tam Coc en bici — paisajes de piedra caliza y el secreto de Bich Dong.',
          places: [
            { name: 'Tam Coc', type: 'nature', lat: 20.2172113, lng: 105.9406594,
              notes: 'Tam Coc al atardecer desde la bicicleta. Arrozales, búfalos y montañas kársticas.',
              photo: 'img/fotos/tam-coc.jpg',
              description: 'El pueblo de Tam Coc, junto al embarcadero, es la base perfecta para explorar Ninh Binh. Al llegar, si hay luz, un paseo en bici por los arrozales revela un paisaje de montañas kársticas que recuerda a Ha Long pero sobre tierra — razón por la que Ninh Binh se conoce como "Ha Long en tierra".',
              tips: 'El hotel Tam Coc Serenity tiene bicicletas disponibles. El embarcadero de Tam Coc (Van Lam Wharf) está a pocos metros.' },
            { name: 'Pagoda Bich Dong', type: 'temple', lat: 20.2506, lng: 105.9745,
              notes: 'Pagoda de 3 niveles construida dentro de un acantilado. A 2 km en bici de Tam Coc.',
              photo: 'img/fotos/pagoda-bich-dong.jpg',
              description: 'Pagoda de tres niveles construida literalmente dentro del acantilado de una montaña. La entrada tiene un fotogénico puente de piedra sobre un estanque.',
              tips: 'A 2 km en bici desde Tam Coc. Visitar temprano, antes de las excursiones del día.' }
          ],
          restaurants: [
            { name: 'Cơm Cháy', type: 'restaurant', photo: 'img/fotos/com-chay.jpg', notes: 'Arroz de corteza tostada y crujiente, especialidad de Ninh Binh.' },
            { name: 'Dê nướng (cabra a la parrilla)', type: 'restaurant', notes: 'La carne de cabra en todas sus formas es la especialidad de la zona.',
              photo: 'img/fotos/de-nuong.jpg' },
            { name: 'Nem Chua Yên Mạc', type: 'restaurant', photo: 'img/fotos/nem-chua-yen-mac.jpg', notes: 'Embutido de cerdo fermentado envuelto en hoja de guayaba, especialidad de un pueblo de Ninh Binh — se come crudo, de sabor ácido y picante.' },
            { name: 'Rượu Kim Sơn', type: 'restaurant', photo: 'img/fotos/ruou-kim-son.jpg', notes: 'El licor de arroz destilado más famoso del norte de Vietnam, de la comarca costera de Kim Sơn — para acompañar la cabra a la parrilla.' }
          ],
          transport: [],
          hotel: { name: 'Tam coc Serenity', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento Tam coc Serenity: entrada 24-nov, salida 26-nov.'
        },
        {
          date: '2026-11-25', city: 'Tam Coc / Ninh Binh', country: '🇻🇳 Vietnam', block: 'Ninh Binh',
          summary: 'Plan: Ninh Binh — miradores, barcas e historia.',
          places: [
            { name: 'Hang Mua (mejor al amanecer)', type: 'nature', lat: 20.2308971, lng: 105.9377858,
              notes: 'Escaleras estilo Gran Muralla China. Arriba: dragón de piedra y vistas a todo el valle. Timo del parking.',
              photo: 'img/fotos/hang-mua.jpg',
              description: 'La subida imita la arquitectura de la Gran Muralla China con escalones de piedra irregular. Se bifurca en dos picos: izquierda (Pico del Dragón — el más alto, con enorme dragón de piedra y vistas al río Ngô Đồng con los botes de Tam Coc); derecha (Mini Pagoda — menos masificado). Al bajar no te pierdas el puente de madera sobre el estanque de lotos.',
              tips: '6:00-19:00, 100.000 VND (se paga arriba). En bici desde el pueblo: 20 min. En Grab/Xanh SM: ~70.000 VND. ⚠️ TIMO DEL PARKING: al quedar 500m para llegar, locales te bloqueará en la carretera obligándote a aparcar. IGNORARLOS y continuar hasta el fondo — el parking oficial cuesta solo 10.000 VND.' },
            { name: 'Trang An', type: 'nature', lat: 20.2506, lng: 105.9745,
              notes: 'Patrimonio UNESCO. Barca por cuevas y templos flotantes. Escenario de Kong: Skull Island.',
              photo: 'img/fotos/trang-an.jpg',
              description: 'A 10 km de Tam Coc (en bici). Tres rutas diferentes en barca (4 personas). La Ruta 2 (recomendada, 2h30) incluye el Palacio Real de Vu Lam (pabellón flotante) y el set original de Kong: Skull Island. La Ruta 1 (3h30) es la más larga con más tiempo bajo tierra.',
              tips: '7:00-17:00, 300.000 VND/persona. Mejor antes de las 8:00 o a partir de las 15:30 para menos turistas. La barca es para 4 personas. Llevar ropa cubriendo hombros y rodillas para los templos.' },
            { name: 'Ciudadela de Hoa Lu (antigua capital)', type: 'monument', lat: 20.2572484, lng: 105.9718894,
              notes: 'Antigua capital de Vietnam del s.X. A 10 km en bici. Templos del s.XVII.',
              photo: 'img/fotos/ciudadela-de-hoa-lu.jpg',
              description: 'La primera capital unificada de Vietnam (s.X). Los palacios reales de madera desaparecieron pero quedan reconstrucciones del s.XVII: Templo de Dinh Tien Hoang (patio con lecho de dragón de piedra) y Templo de Le Dai Hanh (estatuas y tambores de bronce). La Puerta Oriental sobre el río es la postal del lugar.',
              tips: 'A 10 km de Tam Coc, en bici (paisaje precioso). 7:00-17:00, 20.000 VND. Justo al lado está la Pagoda Nhat Tru (de un solo pilar), un templo budista pequeño que se visita en 5 min de paso.' },
            { name: 'Pagoda de Bai Dinh', type: 'temple', lat: 20.2890477, lng: 105.8792558,
              notes: 'El complejo budista más grande de Vietnam. 5 récords nacionales. Torre Bao Thien de 100m.',
              photo: 'img/fotos/pagoda-de-bai-dinh.jpg',
              description: 'A 15 km de Trang An. El complejo más grande de Vietnam (500 hectáreas). Torre de la Campana octogonal, Palacio de Avalokitesvara (estatua de 80 toneladas con mil ojos y mil manos), el Gran Buda de 100 toneladas y la Torre Bao Thien de 100m (13 pisos, se puede subir en ascensor).',
              tips: '7:00-18:00, 60.000 VND (100.000 con coche eléctrico). 3-4 horas de visita. El coche eléctrico (40.000 VND) ahorra mucho con el calor. La pagoda antigua al fondo (Hang Sang y Dong Toi) son cuevas naturales convertidas en templos.' },
            { name: 'Parque nacional de Cuc Phuong (descartar por distancia)', type: 'nature', lat: 20.3162835, lng: 105.6176593,
              notes: 'A 45 km. Centro de rescate de primates en peligro. Árbol milenario de 45m. Solo si hay día extra.',
              photo: 'img/fotos/parque-nacional-de-cuc-phuong.jpg',
              description: 'El parque nacional más antiguo de Vietnam. Cerca de la entrada: centro de rescate de gibones y langures, centro de conservación de tortugas, y rescate de pangolines. En el interior: Cueva del Hombre Prehistórico (7.500 años de antigüedad) y el Árbol Milenario (45m de altura, 20 personas para rodearlo).',
              tips: 'A 45 km de Tam Coc. Conductor privado o excursión ~40€. 6:00-18:00, 60.000 VND. Negociar que el conductor entre hasta el 2º parking (Bong Station) — no quedarse en la entrada.' }
          ],
          restaurants: [
            { name: 'Dê (cabra) en distintas preparaciones', type: 'restaurant', notes: 'Guiso, salteado o a la parrilla — Ninh Binh es la capital vietnamita de la cabra.',
              photo: 'img/fotos/de-nuong.jpg' },
            { name: 'Ốc (caracoles de río)', type: 'restaurant', notes: 'Tapa callejera muy popular en la zona rural de Ninh Binh.',
              photo: 'img/fotos/oc.jpg' },
            { name: 'Cá Rô Tổng Trường', type: 'restaurant', notes: 'Perca de agua dulce de los arrozales inundados de Ninh Binh, frita o cocinada en caldo agridulce.' },
            { name: 'Miến Lươn', type: 'restaurant', notes: 'Fideos de celofán con anguila frita crujiente y caldo especiado — un plato muy apreciado en todo el norte de Vietnam.',
              photo: 'img/fotos/mien-luon.jpg' }
          ],
          transport: [],
          hotel: { name: 'Tam coc Serenity', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-26', city: 'Tam Coc → Cat Ba', country: '🇻🇳 Vietnam', block: 'Vuelta al Norte',
          summary: 'Bus a Cat Ba. Plan: paseo tranquilo y atardecer.',
          places: [
            { name: 'Ruta de playas Cat Co', type: 'beach', lat: 20.7254614, lng: 107.0483578,
              notes: 'Sendero costero de madera entre las tres playas Cat Co.',
              photo: 'img/fotos/ruta-de-playas-cat-co.jpg',
              description: 'Un sendero costero de madera conecta las playas Cat Co 1, 2 y 3. La más grande y popular es Cat Co 1. Paisaje de acantilados calizos y agua verde esmeralda.',
              tips: 'A pie desde el hotel (~15-20 min). El sendero pasa por el Flamingo Resort.' },
            { name: 'Playa salvaje de Tung Thu', type: 'beach', lat: 20.7254614, lng: 107.0483578,
              notes: 'Playa salvaje a 1,5 km del paseo marítimo. 20 min andando desde el puerto.',
              photo: 'img/fotos/playa-salvaje-de-tung-thu.jpg',
              description: 'A 1,5 km del paseo marítimo principal (¼ Road). Mucho menos concurrida que las Cat Co. Paseo plano y agradable.',
              tips: 'Desde el puerto: caminar por la calle Hung Vuong hacia el interior (sube al mercado de Cat Ba), girar a la izquierda en calle Tung Thu y seguir hasta que se abra la bahía. 20 min andando.' },
            { name: 'Atardecer en Flamingo Cat Ba Resort', type: 'nature', lat: 20.7321609, lng: 107.0587067, notes: 'Chiringuito/resort en la ruta de las playas Cat Co, buen sitio para parar a tomar algo viendo el atardecer sobre la bahía.',
              photo: 'img/fotos/atardecer-en-flamingo-cat-ba-resort.jpg',
              description: 'Resort de diseño "bosque vertical" (plantas en cada balcón de sus 3 torres) a pie de las playas Cat Co 1 y 2, a 5 min andando del pueblo de Cat Ba. La piscina infinita de la azotea mira directamente a la bahía — se puede entrar a tomar algo sin ser cliente del hotel, es el mirador de atardecer más cómodo de la zona.',
              tips: 'Mejor ir 30-40 min antes de la puesta de sol para coger sitio en la piscina/terraza. Las playas Cat Co 1 y 2, justo al lado, están entre las de mejor arena y agua de la isla si apetece un baño antes del atardecer.' },
            { name: 'Cannon Fort (Pháo Đài Thần Công)', type: 'monument', lat: 20.7254614, lng: 107.0483578,
              notes: 'El mejor mirador 360° de la isla. Cañones franceses de la IIGM y túneles excavados a mano.',
              photo: 'img/fotos/cannon-fort.jpg',
              description: 'En lo alto de una colina sobre el pueblo de Cat Ba, este fuerte construido por los franceses durante la Segunda Guerra Mundial (y reutilizado después por vietnamitas y estadounidenses) conserva los cañones originales apuntando a la bahía, además de túneles y búnkeres excavados a mano que se pueden recorrer. Desde arriba, la vista panorámica de 360° abarca el pueblo, el puerto y los islotes kársticos de Lan Ha Bay — el mejor mirador de la isla sin necesidad de barco.',
              tips: '15-20 min a pie cuesta arriba desde el pueblo (o mototaxi). Entrada ~200.000 VND. Mejor al atardecer — hay un pequeño café-mirador arriba para esperar la puesta de sol con vistas a la bahía.' }
          ],
          restaurants: [
            { name: 'Marisco de Cat Ba', type: 'restaurant', notes: 'Marisco recién sacado del agua en las balsas flotantes de la bahía.',
              photo: 'img/fotos/marisco-de-da-nang.jpg' },
            { name: 'Chả Mực Cát Bà', type: 'restaurant', photo: 'img/fotos/cha-muc-cat-ba.jpg', notes: 'Hamburguesa de calamar a la plancha, especialidad reconocida de la isla.' },
            { name: 'Tu Hài Nướng', type: 'restaurant', notes: 'Almeja navaja gigante criada en las jaulas de Lan Ha Bay, a la parrilla con mantequilla y ajo — el marisco estrella de Cat Ba.' },
            { name: 'Bề Bề Rang Muối', type: 'restaurant', notes: 'Galeras (mantis shrimp) salteadas con sal y chile — muy populares en los restaurantes de la bahía.' }
          ],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Bus Tam Coc→Cat Ba — Cat Ba Discovery. Salida: Tam Coc Queen Travel Office. Llegada: 6 Tung Dinh, Hai Phong.', from: 'Tam Coc', to: 'Cat Ba', time: '09:00–13:00 (4h)' }
          ],
          hotel: { name: 'The Oversleep Catba Hostel & Pool', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento The Oversleep Catba Hostel & Pool: entrada 26-nov, salida 27 o 28-nov (por confirmar según se reserve el crucero de Lan Ha Bay).'
        },
        {
          date: '2026-11-27', city: 'Cat Ba', country: '🇻🇳 Vietnam', block: 'Vuelta al Norte',
          summary: 'Plan: navegar por los islotes.',
          places: [
            { name: 'Lan Ha Bay (crucero 2d/1n o excursión de 1 día)', type: 'nature', lat: 20.7321609, lng: 107.0587067,
              notes: 'La hermana tranquila de Ha Long Bay — mismos islotes kársticos, muchísimos menos cruceros masivos.',
              photo: 'img/fotos/lan-ha-bay.jpg',
              description: 'Lan Ha Bay comparte la misma bahía y los mismos picos de piedra caliza que la famosa Ha Long Bay, pero al estar administrada desde Cat Ba (no desde Ha Long City) recibe una fracción de los cruceros masivos — aguas más limpias y playas casi vacías entre semana. Un día o dos típicos de crucero incluyen navegación entre los islotes, kayak o paddle surf en calas escondidas, parada para nadar en aguas turquesa, y si es de 2D/1N, noche a bordo o en un bungalow flotante con cena de marisco.',
              tips: 'Reservar con antelación (Flamingo Cruises o similar tienen buena fama). La excursión de 1 día suele incluir kayak + baño + comida; la de 2D/1N añade noche a bordo y más paradas. Llevar bañador puesto y protección solar — el sol en el agua pega fuerte.' },
            { name: 'Trekking al pueblo de Viet Hai', type: 'nature', photo: 'img/fotos/trekking-al-pueblo-de-viet-hai.jpg', lat: 20.7321609, lng: 107.0587067,
              notes: 'Pueblo rural aislado dentro del Parque Nacional, solo accesible en barco + sendero o en bici.',
              description: 'Viet Hai es un pequeño pueblo agrícola escondido en un valle dentro del Parque Nacional de Cat Ba, sin carretera de acceso directo — solo se llega en barco hasta un embarcadero y luego a pie o en bici por un sendero entre arrozales y selva (unos 45-60 min caminando). Vida rural tradicional, casas de adobe y mucha tranquilidad, en fuerte contraste con el ambiente turístico del pueblo de Cat Ba.',
              tips: 'Suele venir incluido en los tours de kayak/Lan Ha Bay como parada de medio día. Se puede alquilar bici en el pueblo para el tramo final. Buena opción de comida casera vietnamita en alguna de las pocas casas-restaurante locales.' },
            { name: 'Ba Trai Dao (Isla de los 3 melocotones)', type: 'beach', photo: 'img/fotos/ba-trai-dao.jpg', lat: 20.7321609, lng: 107.0587067, notes: 'Parada clásica de los cruceros por Lan Ha Bay para nadar — de tus mapas guardados.',
              description: 'Tres islotes kársticos con forma de melocotón que encierran una cala diminuta de arena blanca y agua turquesa muy tranquila, protegida del oleaje. Es de las playas más fotogénicas de Lan Ha Bay, pero tiene truco: la marea se la traga por completo varias horas al día — solo es una playa de verdad durante la bajamar.',
              tips: 'Solo accesible en barco/kayak, no por tierra. Ventana de baño real de apenas 2-4h al día (coincidiendo con marea baja) — si el tour para aquí fuera de esa ventana, puede que no quede arena visible. Buena para kayak y snorkel ligero además de nadar.' }
          ],
          restaurants: [
            { name: 'Banquete de marisco a bordo', type: 'restaurant', notes: 'Los cruceros por Lan Ha Bay suelen incluir una comida de varios platos de marisco recién pescado, servida en cubierta.',
              photo: 'img/fotos/marisco-de-da-nang.jpg' },
            { name: 'Comida casera en Viet Hai', type: 'restaurant', notes: 'Alguna de las pocas casas-restaurante del pueblo sirve cocina vietnamita rural sencilla — pollo de corral, verduras del huerto y arroz.' },
            { name: 'Coco fresco en la playa', type: 'restaurant', notes: 'Un coco recién abierto en cualquier parada de playa o islote del crucero — el refresco de toda la bahía.',
              photo: 'img/fotos/coco-fresco-en-la-playa.jpg' }
          ],
          transport: [],
          hotel: { name: 'The Oversleep Catba Hostel & Pool', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: ''
        },
        {
          date: '2026-11-28', city: 'Cat Ba → Hanói', country: '🇻🇳 Vietnam', block: 'Vuelta al Norte',
          summary: 'Plan: ver amanecer y despedida. Bus a Hanói.',
          places: [
            { name: 'Ngu Lam Peak', type: 'nature', lat: 20.7321609, lng: 107.0587067,
              notes: 'Mirador del Parque Nacional. Vistas al archipiélago. Sin las masas del Canon Fort.',
              photo: 'img/fotos/ngu-lam-peak.jpg',
              description: 'El pico Ngu Lam dentro del Parque Nacional de Cat Ba ofrece vistas panorámicas al archipiélago kárstico similares al Canon Fort pero sin la afluencia turística. El sendero sube entre vegetación subtropical densa con avistamiento de monos langur dorados — el mamífero más amenazado del mundo, con menos de 70 individuos en libertad, exclusivo de Cat Ba.',
              tips: 'Entrada al Parque Nacional: 85.000 VND. Subida: 1-2 horas por sendero marcado. Llevar agua y calzado cerrado. El parque cierra a las 16:00. Guía local recomendado para no perderse en la selva.' },
            { name: 'Cueva Trung Trang', type: 'nature', lat: 20.8063272, lng: 107.0383362,
              notes: 'La mayor cueva del Parque Nacional de Cat Ba. Estalactitas gigantes y formaciones kársticas.',
              photo: 'img/fotos/cueva-trung-trang.jpg',
              description: 'La cueva más grande del Parque Nacional de Cat Ba, con más de 300 metros de recorrido accesible. Su interior alberga formaciones kársticas de estalactitas y estalagmitas de millones de años. Durante la guerra de Vietnam sirvió también como refugio para la población local.',
              tips: 'En el interior del Parque Nacional de Cat Ba. Acceso en taxi o Xanh SM desde el pueblo (~20 min). Llevar linterna propia para explorar mejor los rincones. Combinar con la visita al Hospital Cave en el mismo trayecto.' },
            { name: 'Hospital Cave', type: 'museum', lat: 20.8063272, lng: 107.0383362,
              notes: 'Hospital secreto a prueba de bombas durante la guerra. Salas médicas intactas.',
              photo: 'img/fotos/hospital-cave.jpg',
              description: 'Sirvió como hospital secreto y refugio militar durante la guerra de Vietnam. Sus salas médicas y habitaciones se conservan intactas. Visita de 1 hora.',
              tips: '8:00-17:00, 40.000-80.000 VND. En Grab: 15 min desde el pueblo (app Xanh SM en Cat Ba, no Grab). También en bus local parada "Hang Quân Y".' }
          ],
          restaurants: [
            { name: 'Último marisco en Cat Ba', type: 'restaurant', notes: 'Última comida en la isla antes del bus de vuelta a Hanói.',
              photo: 'img/fotos/marisco-de-da-nang.jpg' },
            { name: 'Bánh Mì de viaje en bus', type: 'restaurant', notes: 'Un bánh mì para llevar al bus — fácil de comer en el trayecto de 3h de vuelta a Hanói.',
              photo: 'img/fotos/banh-mi.jpg' }
          ],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Bus Cat Ba→Hanói — Cat Ba Discovery. Salida: Good Morning Cat Ba Office, Dao Cat Ba. Llegada: 128 Tran Nhat Duat, Old Quarter, Hanoi.', from: 'Cat Ba', to: 'Hanói', time: '~3h' }
          ],
          hotel: { name: 'La Passion Premium Cau Go', address: '', phone: '', checkIn: '', checkOut: '', breakfast: false },
          tasks: [],
          notes: 'Alojamiento La Passion Premium Cau Go: entrada 28-nov, salida 29-nov.'
        },
        {
          date: '2026-11-29', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Cierre',
          summary: 'Último paseo y despedida. Vuelta a casa.',
          places: [
            { name: 'Sitios pendientes del Old Quarter', type: 'monument', photo: 'img/fotos/old-quarter.jpg', lat: 21.0372109, lng: 105.8508312, notes: 'Visitar lo que haya quedado pendiente de días anteriores.' }
          ],
          restaurants: [
            { name: 'Último Phở o Bánh Mì antes del vuelo', type: 'restaurant', photo: 'img/fotos/ultimo-pho-o-banh-mi-antes-del-vuelo.jpg', notes: 'Despedida de Vietnam con un último plato callejero en el Old Quarter.' },
            { name: 'Café de despedida en el Old Quarter', type: 'restaurant', notes: 'Un último cà phê sữa đá (café con leche condensada y hielo) o cà phê trứng antes de ir al aeropuerto.',
              photo: 'img/fotos/cafe-de-despedida-en-el-old-quarter.jpg' }
          ],
          transport: [],
          hotel: { name: '', address: '', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [],
          notes: 'Hasta la próxima aventura. 🌏'
        }
      ],
      tripNotes: {
        freeNotes: [],
        packingList: [
          { id: 'p01', text: '🛂 Pasaportes (validez +6 meses desde la vuelta)', done: false },
          { id: 'p02', text: '🛂 eVisa Vietnam impresa o en móvil', done: false },
          { id: 'p03', text: '🛂 eVisa Camboya ($30) impresa o en móvil', done: false },
          { id: 'p04', text: '📄 Seguro de viaje con cobertura médica y repatriación', done: false },
          { id: 'p05', text: '📄 Reservas de vuelos y hoteles impresas', done: false },
          { id: 'p06', text: '💳 Tarjeta sin comisiones internacionales (Revolut / Wise)', done: false },
          { id: 'p07', text: '💵 Efectivo en USD (Camboya) y algo de EUR', done: false },
          { id: 'p08', text: '👕 Ropa ligera: camisetas, pantalones cortos (5-7 días)', done: false },
          { id: 'p09', text: '🧣 Pañuelo/pareo para cubrir hombros y rodillas en templos', done: false },
          { id: 'p10', text: '🥿 Calzado cómodo para caminar (senderismo ligero)', done: false },
          { id: 'p11', text: '🩴 Chanclas o sandalias para playa y crucero', done: false },
          { id: 'p12', text: '🩱 Bañador/bikini (Lan Ha, Koh Rong)', done: false },
          { id: 'p13', text: '🌂 Chubasquero ultraligero o poncho (nov = época de lluvias)', done: false },
          { id: 'p14', text: '🔌 Adaptador universal de enchufes', done: false },
          { id: 'p15', text: '🔋 Power bank (10.000 mAh mínimo)', done: false },
          { id: 'p16', text: '📷 Cámara de fotos + tarjetas SD + cargador', done: false },
          { id: 'p17', text: '📱 Móvil desbloqueado para SIM local vietnamita', done: false },
          { id: 'p18', text: '🎧 Auriculares para vuelos y audioguías', done: false },
          { id: 'p19', text: '☀️ Protector solar SPF50+ (biodegradable para la bahía)', done: false },
          { id: 'p20', text: '🦟 Repelente de mosquitos (DEET o Icaridina)', done: false },
          { id: 'p21', text: '💊 Botiquín: ibuprofeno, antidiarreicos, antihistamínico, tiritas', done: false },
          { id: 'p22', text: '💊 Pastillas potabilizadoras de agua (zonas rurales)', done: false },
          { id: 'p23', text: '🩺 Vacunas al día: tifoidea, hepatitis A, tétanos', done: false },
          { id: 'p24', text: '🧴 Gel hidroalcohólico y toallitas húmedas', done: false },
          { id: 'p25', text: '🚿 Artículos de higiene en formato pequeño (100ml para cabina)', done: false },
          { id: 'p26', text: '👓 Gafas de sol (imprescindible para el tren Hai Van Pass)', done: false },
          { id: 'p27', text: '🧢 Sombrero o gorra de sol (calor extremo en Angkor)', done: false },
          { id: 'p28', text: '🎒 Mochila de día ligera (para excursiones, templos, playa)', done: false },
          { id: 'p29', text: '🔒 Candado pequeño para taquillas de hostales', done: false },
          { id: 'p30', text: '🌙 Antifaz y tapones para sleeper buses nocturnos', done: false },
          { id: 'p31', text: '💧 Botella de agua reutilizable', done: false },
          { id: 'p32', text: '📖 Guía o e-book de Vietnam y Camboya', done: false },
          { id: 'p33', text: '🔦 Linterna pequeña (Koh Rong, cuevas, apagones)', done: false },
          { id: 'p34', text: '🧦 Calcetines extra (para templos donde piden quitarse zapatos)', done: false }
        ],
        preTripTasks: [
          { id: 'pre_t01', text: '✅ Informar al banco de los destinos para evitar bloqueos', done: false },
          { id: 'pre_t02', text: '✅ Descargar mapas offline de Vietnam y Camboya en Maps.me o Google Maps', done: false },
          { id: 'pre_t03', text: '✅ Instalar Grab (taxis Vietnam y Camboya) y Xanh SM (Cat Ba)', done: false },
          { id: 'pre_t04', text: '✅ Descargar Google Translate con paquetes de vietnamita y jemer offline', done: false },
          { id: 'pre_t05', text: '✅ Activar VPN en el móvil (útil en Vietnam)', done: false },
          { id: 'pre_t06', text: '✅ Comprar billete tren Hue→Da Nang en 12go.asia', done: false },
          { id: 'pre_t07', text: '✅ Reservar crucero Lan Ha Bay 2D/1N', done: false },
          { id: 'pre_t08', text: '✅ Reservar entradas Hoi An Memories Show en klook.com', done: false },
          { id: 'pre_t09', text: '✅ Pase Angkor 3 días: angkorenterprise.gov.kh ($62)', done: false },
          { id: 'pre_t10', text: '✅ Vuelo de regreso confirmado (check-in online 24h antes)', done: false }
        ]
      }
    }
  ],

  tasks: [
    { id: 'pre1', date: '2026-11-07', text: 'Comprar seguros de viaje', done: false },
    { id: 'pre2', date: '2026-11-07', text: 'Solicitar visado Vietnam (eVisa)', done: false },
    { id: 'pre3', date: '2026-11-07', text: 'Solicitar visado Camboya (eVisa $30)', done: false },
    { id: 'pre3b', date: '2026-11-06', text: 'Rellenar la Vietnam Digital Arrival Card (prearrival.immigration.gov.vn) — dentro de las 72h antes del vuelo a Hanói, genera QR para inmigración', done: false },
    { id: 'pre4', date: '2026-11-10', text: 'Reservar crucero Lan Ha Bay', done: false },
    { id: 'pre5', date: '2026-11-15', text: 'Comprar billete tren Hue→Da Nang (12go.asia)', done: false },
    { id: 'pre6', date: '2026-11-17', text: 'Reservar entradas Hoi An Memories Show (klook.com)', done: false },
    { id: 'pre7', date: '2026-11-21', text: 'Comprar pase Angkor 3 días ($62, angkorenterprise.gov.kh)', done: false },
    { id: 'pre8', date: '2026-11-29', text: 'Informar al banco de los destinos para evitar bloqueos de tarjeta', done: false }
  ],

  contacts: [
    { country: '🇻🇳 Vietnam',  city: 'Hanói',      name: 'Embajada de España', phone: '+84 24 3771 5207', address: 'Calle Lieu Giai 16, Ba Dinh' },
    { country: '🇰🇭 Camboya', city: 'Phnom Penh', name: 'Embajada de España',  phone: '+855 23 211 881',  address: 'N/A – gestiona desde Hanói' }
  ],

  localEmergency: [
    { country: '🇻🇳 Vietnam',  police: '113', ambulance: '115', fire: '114' },
    { country: '🇰🇭 Camboya', police: '117', ambulance: '119', fire: '118' }
  ]
};

// ============================================================
//  AppData — persistencia en localStorage
// ============================================================

const DATA_VERSION = 65;
const LS_KEY  = 'viajes_db';
const LS_VER  = 'viajes_db_version';

const AppData = {
  loadData() {
    try {
      const stored = localStorage.getItem(LS_KEY);
      const ver    = parseInt(localStorage.getItem(LS_VER) || '0', 10);
      if (stored && ver >= DATA_VERSION) {
        return JSON.parse(stored);
      }
    } catch (e) { /* ignore */ }
    // Primera carga o versión antigua → usar defaults y persistir
    const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.saveData(fresh);
    return fresh;
  },

  saveData(data) {
    try {
      localStorage.setItem(LS_KEY,  JSON.stringify(data));
      localStorage.setItem(LS_VER,  String(DATA_VERSION));
    } catch (e) { /* ignore */ }
  },

  resetData() {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_VER);
  }
};
