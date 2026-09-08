// ============================================================
//  DATOS POR DEFECTO — Vietnam & Camboya 2026  (v15 — datos reales del planning)
// ============================================================

const DEFAULT_DATA = {
  trips: [
    {
      id: 'vietnam-camboya-2026',
      name: 'Vietnam & Camboya',
      subtitle: '23 días por el sudeste asiático',
      emoji: '🌏',
      coverGradient: 'linear-gradient(135deg, #1a472a 0%, #2d6a4f 50%, #40916c 100%)',
      coverImage: 'img/places/lan_ha_bay.jpg',
      myMapsUrl: 'https://www.google.com/maps/d/embed?mid=194Es7AqKfUlcUO6Jttbp0-7O_fFw3Zk',
      startDate: '2026-11-07',
      endDate:   '2026-11-29',
      days: [
        {
          date: '2026-11-07', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Llegada a Hanói a las 14:00. Bus 86 o Grab al hotel y primer paseo por el Old Quarter al atardecer.',
          places: [
            { name: 'Old Quarter — primera noche', type: 'monument',
              notes: 'Primer paseo. Bia Hoi Corner, street food, caos maravilloso.',
              photo: 'https://picsum.photos/seed/hanoi-old-quarter-night/200/200',
              description: 'El Old Quarter es un laberinto de 36 calles históricas especializadas en gremios artesanales: Hàng Bạc (Plata), Hàng Mã (Farolillos), Hàng Quạt (Altares), Hàng Chiếu (Esterillas). Las Casas Tubo tienen fachadas de 2-4m pero hasta 60m de profundidad — los impuestos se pagaban por anchura. Los fines de semana se corta al tráfico y hay mercado nocturno (vie-dom 18:30-23:30).',
              tips: 'Bia Hoi Corner: esquina Lương Ngọc Quyến y Tạ Hiện — cerveza callejera 0,30 USD. Ancient House 87 Ma May: 10.000 VND para ver interior de casa tubo. Puerta Ô Quan Chưởng: única de la muralla del s.XVIII. TIMO mujeres con sombrero cónico y fruta: rechazar desde el primer momento.' }
          ],
          restaurants: [
            { name: 'Street food Old Quarter', type: 'restaurant',
              notes: 'Phở, bia hơi y primeras impresiones vietnamitas.',
              photo: 'https://picsum.photos/seed/vietnam-street-food-pho/200/200',
              description: 'Puestos de phở, bún chả, bánh mì y brochetas a la brasa (Xiên Nướng) desde 1 USD en cada esquina. El Night Market (vie-dom) recorre Hang Dao, Hang Ngang y Hang Duong desde el Lago Hoan Kiem hasta el Mercado Dong Xuan.',
              tips: 'Locales auténticos: solo taburetes bajos de plástico. Bia Hoi Corner es el epicentro. Evita locales con menú en inglés en letrero grande y precio fijo.' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Llegada a Hanói — 14:00 h', from: 'España', to: 'Hanói (HAN)', time: '14:00',
              pickup: 'Aeropuerto Nội Bài (HAN) · Terminal 2 · BUS 86 (recomendado): 45.000 VND en efectivo al revisor. Marquesina NARANJA a la izquierda al salir de T2. Cada 25-30 min (6:15-23:00). Bajar en el nº 162 Trần Quang Khải (hotel Embrace). · GRAB: 250-350k VND, punto de encuentro en carriles de recogida cruzando la primera calzada de T2.' }
          ],
          hotel: { name: 'Embrace Boutique Hanoi Hotel', address: 'Old Quarter, Hanói', phone: '', checkIn: '15:00', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't1', text: 'Comprar SIM vietnamita en el aeropuerto', done: false },
            { id: 't2', text: 'Cambiar dinero a VND (cajero en aeropuerto)', done: false },
            { id: 't3', text: 'Check-in hotel Embrace Boutique', done: false }
          ],
          notes: 'Día de llegada: sin prisa. Phở y bia hơi para estrenarse.'
        },
        {
          date: '2026-11-08', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Día completo en Hanói: templos, el lago, la prisión colonial, el tren que roza las casas y los cafés más secretos de la ciudad.',
          places: [
            { name: 'Lago Hoan Kiem y Templo Ngoc Son', type: 'temple',
              notes: 'El corazón espiritual de Hanói. Puente rojo, tortuga disecada 250 kg, leyenda de la espada.',
              photo: 'https://picsum.photos/seed/hoan-kiem-red-bridge-temple/200/200',
              description: 'El Hồ Hoàn Kiếm (Lago del Espíritu Devuelto) es el corazón de Hanói. El Puente Huc (rojo brillante) conecta la orilla con el Templo Ngọc Sơn, donde se conserva una tortuga disecada de 250 kg. La Torre de la Tortuga emerge de un islote en el centro del lago. A las 6-7:30 h, cientos de locales practican Tai Chi y yoga en las orillas.',
              tips: 'Templo Ngoc Son: 8:00-18:00, 30.000 VND. Lago: gratuito 24h. Los domingos se cierra al tráfico todo alrededor — el mejor momento. Fines de semana hay mercado peatonal nocturno.' },
            { name: 'Teatro de Marionetas de Agua Thang Long', type: 'monument',
              notes: 'Arte del siglo XI. Marionetas de madera en el agua con orquesta tradicional en vivo.',
              photo: 'https://picsum.photos/seed/water-puppet-hanoi-performance/200/200',
              description: 'En la esquina noreste del Lago Hoan Kiem (Đinh Tiên Hoàng 57B). Los artistas manejan pesadas marionetas de madera desde detrás de una pantalla, sumergidos en agua hasta la cintura, mientras una orquesta toca en vivo. Los espectáculos de 45 min incluyen la leyenda de la tortuga y escenas de la vida rural.',
              tips: 'Pases: 15:00, 16:10, 17:20, 18:30 y 20:00. Entradas: 100.000-200.000 VND según fila. COMPRAR el día anterior en taquilla — los pases de tarde se agotan. Filas 1-2 te salpicarán. Perfecto si llueve.' },
            { name: 'Templo de la Literatura (Văn Miếu)', type: 'temple',
              notes: 'Primera universidad de Vietnam (1070). El Pabellón Khue Van está en los billetes de 100.000 VND.',
              photo: 'https://picsum.photos/seed/temple-literature-hanoi-estelas/200/200',
              description: 'Primera academia imperial de Vietnam, fundada en 1070. Cinco patios sucesivos. El Pabellón Khue Van (ventana circular = estrella de la literatura) es el símbolo oficial de Hanói y aparece en los billetes de 100.000 VND. Las 82 estelas de tortuga de piedra conmemoran a los doctores graduados entre los siglos XV-XVIII.',
              tips: 'Quoc Tu Giam, dist. Dong Da. 8:00-17:00, 30.000 VND. Entrar a primera hora para evitar grupos. Las estelas de tortuga son el elemento más significativo.' },
            { name: 'Mausoleo Ho Chi Minh y Pagoda de un Solo Pilar', type: 'monument',
              notes: '¡CIERRA LUNES Y VIERNES! El cuerpo embalsamado de Ho Chi Minh. Pagoda de loto en una sola columna.',
              photo: 'https://picsum.photos/seed/ho-chi-minh-mausoleum-granite/200/200',
              description: 'El austero edificio de granito gris alberga el cuerpo embalsamado de Ho Chi Minh, custodiado por guardias de honor en blanco. La Pagoda de un Solo Pilar (1049) imita una flor de loto sobre el agua. La humilde Casa de la Zancuda (40.000 VND) muestra cómo el líder vivió rechazando los lujos del Palacio Presidencial francés de al lado.',
              tips: 'Recinto exterior: 5:00-22:00. Interior (cuerpo): 8:00-11:00. ⚠️ CIERRA LUNES Y VIERNES. También cierra sept-nov cuando envían el cuerpo a Rusia para re-embalsamamiento. Cambio de guardia cada hora en punto. Entrada gratuita.' },
            { name: 'Catedral de San José', type: 'temple',
              notes: 'Neogótica de 1886 inspirada en Notre-Dame. Fachada ennegrecida muy fotogénica. Gratuita.',
              photo: 'https://picsum.photos/seed/hanoi-saint-joseph-cathedral/200/200',
              description: 'La iglesia católica más antigua de Hanói (1886), con dos torres de 31 metros. Al entrar, los vitrales franceses del XIX contrastan con el altar de madera lacada en rojo y oro estilo vietnamita. La Plaza de la Virgen frente a la entrada es un punto de reunión icónico.',
              tips: 'Nhà Chung 40. 8:00-11:00 y 14:00-17:00. Gratuita. Se llena en misas dominicales.' },
            { name: 'Prisión Hoa Lo (Hanoi Hilton)', type: 'museum',
              notes: 'Prisión colonial francesa. Guillotina original. El traje de piloto de John McCain. Audioguía en español imprescindible.',
              photo: 'https://picsum.photos/seed/hoa-lo-prison-museum-hanoi/200/200',
              description: 'Construida por los franceses en el XIX para torturar a disidentes vietnamitas. Décadas después retuvo a pilotos americanos derribados, incluyendo a John McCain (su traje de piloto se expone). Los americanos la llamaron irónicamente "Hanoi Hilton". Dividida en dos bloques: época colonial (más oscura, guillotina original) y guerra de Vietnam (visión más suavizada).',
              tips: 'Calle Hoa Lo, dist. Hoan Kiem. 8:00-17:00, 50.000 VND. AUDIOGUÍA EN ESPAÑOL: 100.000 VND extra — totalmente imprescindible, con efectos de sonido y testimonios reales. Necesitas 1,5-2 h. Algunas salas son oscuras y duras emocionalmente.' },
            { name: 'Hanoi Train Street', type: 'monument',
              notes: 'El tren pasa rozando las fachadas. Entrar por cafeterías autorizadas (consume algo y te dejan pasar).',
              photo: 'https://picsum.photos/seed/hanoi-train-street-close/200/200',
              description: 'En las calles Phùng Hưng y Trần Phú del Old Quarter. Para entrar legalmente: al acercarte a las vallas, los dueños de los cafés del interior salen a buscarte, te acompañan ante la policía como "cliente" y te asignan mesa (consumición ~2 USD). Al pasar el tren: pegarse a la pared, sin brazos ni selfie sticks fuera.',
              tips: 'Horarios L-V (solo noche): 19:00, 19:45, 20:30, 22:00. S-D (todo el día): 9:15, 11:20, 15:20, 17:30, 18:00 + nocturnos. Llegar 30-45 min antes. TRAMO ALTERNATIVO menos turístico: Ngõ 222 Lê Duẩn (L-D: 15:30/18:00/19:10/19:50 h) — casas reales de vecinos, sin cafés de moda.' },
            { name: 'Murales de Phùng Hưng (Street Art)', type: 'monument',
              notes: 'Galería al aire libre bajo los arcos del viaducto del tren. Gratuito y muy fotogénico.',
              photo: 'https://picsum.photos/seed/hanoi-mural-viaduct-street-art/200/200',
              description: 'Los arcos de piedra del viaducto junto a la Train Street se han convertido en una galería de murales gigantes en 3D pintados por artistas vietnamitas y coreanos. Recrean escenas del Hanói antiguo: el tranvía desaparecido, vendedores ambulantes, tiendas tradicionales.',
              tips: 'Calle Phùng Hưng, tramo hacia Mercado Dong Xuan. Gratuito. Combinarlo con Train Street.' },
            { name: 'Bún Chả Hương Liên (Obama Restaurant)', type: 'restaurant',
              notes: 'Donde Obama y Bourdain cenaron en 2016. 2º piso: urna con la mesa y botellas originales.',
              photo: 'https://picsum.photos/seed/bun-cha-pork-grilled-vietnam/200/200',
              description: 'El local más famoso de Hanói desde que Obama y Anthony Bourdain cenaron aquí en 2016 en taburetes de plástico. En el 2º piso, una urna de metacrilato protege la mesa, platos y botellas exactas de esa noche. Ambiente local total, servicio rapidísimo.',
              tips: 'Lê Văn Hưu nº 24, dist. Hai Ba Trung. 8:00-20:30. Combo Obama: 120.000 VND (bún chả + nem hải sản + cerveza Hanoi). Ir a las 11:30 o entre 15-17h para evitar cola. Las toallitas de la mesa se cobran 3.000 VND si las usas.' },
            { name: 'Café Giang (Café de Huevo)', type: 'cafe',
              notes: 'Inventado en 1946. Pasillo secreto de 1m de ancho. Cà phê trứng: yema de huevo como sustituto de la leche.',
              photo: 'https://picsum.photos/seed/vietnamese-egg-coffee-cup/200/200',
              description: 'Inventado en 1946 cuando escaseaba la leche: yema de huevo batida sobre café vietnamita. El local original está en un pasillo de 1 metro de ancho entre tiendas de Nguyễn Hữu Huân — hay que entrar sin miedo por ese pasillo oscuro y subir al piso colonial.',
              tips: 'Nguyễn Hữu Huân nº 39. Busca la tienda normal, a su lado el pasillo oscuro estrecho, camina 10m y sube. Ir antes de 10:00 o después de 15:00. Menos de 2€. Solo efectivo. Pide la versión caliente.' },
            { name: 'Café Phố Cổ (azotea secreta sobre el lago)', type: 'cafe',
              notes: 'Las mejores vistas del Lago Hoan Kiem. Entrada por una tienda de sedas en Hàng Gai 11.',
              photo: 'https://picsum.photos/seed/hanoi-rooftop-lake-hoan-kiem/200/200',
              description: 'El café con mejores vistas secretas del lago. Completamente oculto a pie de calle. Hay que entrar por una tienda de sedas del nº 11 de Hàng Gai, cruzar el pasillo oscuro hasta el patio interior antiguo, y subir 4 pisos por escaleras de caracol empinadas.',
              tips: 'Hàng Gai nº 11. 8:00-23:00. Entra en la tienda de sedas → fondo del pasillo → patio → escaleras de caracol al 4º piso. Terraza panorámica espectacular. Precio económico.' },
            { name: 'Isla de los Plátanos (Bãi Giữa)', type: 'nature',
              notes: 'Isla rural en el Río Rojo bajo el Puente Long Bien. Vietnam agrícola a 5 min del Old Quarter.',
              photo: 'https://picsum.photos/seed/banana-island-hanoi-river/200/200',
              description: 'Bajo el histórico Puente Long Bien, en mitad del Río Rojo, una isla de campos de plátanos, granjas flotantes y caminos de tierra sin motos. Comunidades flotantes en los márgenes. Hay una piscina pública entre bananeros.',
              tips: 'Caminar por el Puente Long Bien desde el Old Quarter. A mitad del puente, unas escaleras de metal algo oxidadas bajan a la isla. En bici hay rampas. Piscina: ~100.000 VND. Mejor al atardecer.' },
            { name: 'Ciudadela Imperial de Thang Long', type: 'monument',
              notes: 'Patrimonio UNESCO. 13 siglos de poder imperial. Búnker secreto a 9m de profundidad con los mapas de guerra intactos.',
              photo: 'https://picsum.photos/seed/thang-long-citadel-imperial/200/200',
              description: 'Centro del poder político durante 13 siglos. Además de las ruinas imperiales medievales, escondido detrás hay un búnker de hormigón de 1967 (Casa D67) a 9m de profundidad con salas de mapas, teléfonos y mesas desde donde el General Giap dirigió la guerra contra EE.UU. Las excavaciones del sector 18 Hoang Dieu siguen activas.',
              tips: 'Hoang Dieu nº 19, dist. Ba Dinh. Ma-Do 8:00-17:00, 30.000 VND. A 5 min a pie de Train Street, 10 min del Mausoleo. Poca sombra: sombrero y agua imprescindibles. Muy pocas colas.' },
            { name: 'Lago B-52 (Hữu Tiệp Lake)', type: 'monument',
              notes: 'Restos de un B-52 americano derribado en 1972 sumergidos en un estanque residencial. Gratuito.',
              photo: 'https://picsum.photos/seed/b52-wreck-lake-hanoi/200/200',
              description: 'En el barrio de Ngọc Hà sobresalen del agua los restos del tren de aterrizaje de un B-52 derribado la noche del 27 de diciembre de 1972. Contraste surrealista entre el metal oxidado y la vida cotidiana del vecindario.',
              tips: 'Callejón 55, calle Hoàng Hoa Thám. Gratuito, 24h. A 10-15 min a pie del Mausoleo. Mejor amanecer o atardecer para fotografiar el reflejo. El Museo de la Victoria B-52 está a 5 min (Đội Cấn 157).' },
            { name: 'Mercado Mayorista de Long Bien (madrugada)', type: 'market',
              notes: 'El epicentro del comercio nocturno de Hanói. Pico 2:00-4:30 AM. Brutal experiencia sensorial.',
              photo: 'https://picsum.photos/seed/long-bien-market-night/200/200',
              description: 'Bajo el Puente Long Bien, este mercado opera toda la noche pero el pico de actividad es entre las 2:00 y las 4:30 AM: camiones de frutas y verduras de todo el país, mujeres portadoras con canastas de mimbre, pirámides de sandías y fruta del dragón, gritos de regateo.',
              tips: 'Pico: 2:00-4:30 AM. Gratuito. Discreto con la cámara: es un lugar de trabajo duro. Pedir permiso con una sonrisa antes de fotografiar a los trabajadores.' },
            { name: 'Lago Truc Bach y West Lake (Tây Hồ)', type: 'nature',
              notes: 'Pulmón de Hanói. Pagoda Tran Quoc (más antigua de Hanói), el mejor Phở Cuốn y la captura de John McCain.',
              photo: 'https://picsum.photos/seed/west-lake-hanoi-sunset/200/200',
              description: 'Los dos lagos del norte de Hanói, separados por la avenida arbolada Thanh Nien. El West Lake tiene 15 km de perímetro con la Pagoda Tran Quoc (s.VI, la más antigua de Hanói). En el Lago Truc Bach hay un monumento donde John McCain fue capturado en 1971. Los mejores restaurantes de Phở Cuốn están en la isla del Lago Truc Bach (Ngũ Xã).',
              tips: 'Mejor a partir de las 16:30 para el atardecer. A 10 min a pie del Mausoleo. Pagoda Tran Quoc: gratuita, cierra a las 16:00. Phở Cuốn Hương Mai (25 Ngũ Xã): el más famoso. Rival: nº 31 y nº 7 de la misma calle.' },
            { name: 'Calle Phan Đình Phùng (La más bonita de Hanói)', type: 'monument',
              notes: '1,5 km de avenida arbolada. En otoño las hojas alfombran las aceras de amarillo.',
              photo: 'https://picsum.photos/seed/hanoi-tree-boulevard-autumn/200/200',
              description: 'Conocida como "la calle del otoño", esta avenida de 1,5 km está flanqueada por hileras de árboles gigantescos cuyas copas se cruzan en lo alto creando un túnel verde. Es el rincón favorito de los jóvenes de Hanói para sesiones fotográficas con el Ao Dai tradicional. Vendedoras ambulantes con bicicletas de flores son la postal más icónica.',
              tips: 'Mejor 7:00-9:30 AM (luz difusa mágica) o en otoño (hojas amarillas). Conecta el Old Quarter con el West Lake. La Iglesia de Cửa Bắc (amarilla, 1932) y la Puerta Norte de la Ciudadela están en esta calle.' }
          ],
          restaurants: [
            { name: 'Café Giang', type: 'cafe',
              notes: 'Cà phê trứng original desde 1946. Nguyễn Hữu Huân 39, pasillo secreto.',
              photo: 'https://picsum.photos/seed/egg-coffee-hanoi-traditional/200/200',
              description: 'Ver descripción en Lugares.',
              tips: 'Solo efectivo. Antes de 10:00 o después de 15:00 para evitar espera.' },
            { name: 'Bún Chả Hương Liên', type: 'restaurant',
              notes: 'Lê Văn Hưu 24. Combo Obama 120.000 VND. El más famoso de la ciudad.',
              photo: 'https://picsum.photos/seed/bun-cha-grilled-pork-noodle/200/200',
              description: 'Cerdo a la parrilla en caldo agridulce con fideos de arroz, nem de marisco y cerveza Hanoi.',
              tips: 'Ir a las 11:30 o entre 15-17h. Subir al 2º piso a ver la urna de Obama.' },
            { name: 'Phở Cuốn Hương Mai', type: 'restaurant',
              notes: 'Los rollitos de fideo de arroz más famosos de Hanói. Isla del Lago Truc Bach.',
              photo: 'https://picsum.photos/seed/pho-cuon-fresh-rolls/200/200',
              description: 'Rollitos de masa de fideo de arroz rellenos de ternera salteada y hierbas aromáticas, mojados en salsa agridulce. Pedir también el Phở Chiên Phồng (cuadrados fritos crujientes con salsa de ternera).',
              tips: '25 Ngũ Xã (isla Lago Truc Bach). Rivales en nº 31 y nº 7.' },
            { name: 'The Note Coffee', type: 'cafe',
              notes: 'La cafetería tapizada de millones de post-its de viajeros de todo el mundo.',
              photo: 'https://picsum.photos/seed/note-coffee-postit-hanoi/200/200',
              description: 'Paredes cubiertas de millones de mensajes en post-its de colores de viajeros de todos los países.',
              tips: 'Lương Văn Can nº 64. 7:30-22:30.' }
          ],
          transport: [],
          hotel: { name: 'Embrace Boutique Hanoi Hotel', address: 'Old Quarter, Hanói', phone: '', checkIn: '', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't4', text: 'Confirmar bus Cat Ba para mañana (128 Tran Nhat Duat, salida 8:00)', done: false },
            { id: 't5', text: 'Comprar entradas Teatro Marionetas de Agua (taquilla o día antes)', done: false }
          ],
          notes: '⚠️ Mausoleo cierra lunes y viernes — si es uno de esos días, ajustar el plan. Train Street: S-D tiene más horarios diurnos.'
        },
        {
          date: '2026-11-09', city: 'Cat Ba', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Traslado a Cat Ba en bus+ferry (~3h). Tarde libre para explorar el pueblo, las playas y el atardecer desde el Canon Fort.',
          places: [
            { name: 'Canon Fort (mirador atardecer)', type: 'nature',
              notes: 'El mejor mirador de Cat Ba. Vistas al archipiélago kárstico al atardecer.',
              photo: 'https://picsum.photos/seed/cat-ba-cannon-fort-viewpoint/200/200',
              description: 'El antiguo fuerte con cañones en lo alto de la isla ofrece las mejores vistas panorámicas del archipiélago kárstico de Cat Ba y la bahía de Lan Ha. Impresionante al atardecer.',
              tips: 'Caminando desde el pueblo: 20-40 min. También en taxi o coche eléctrico desde el puerto. A veces cierra según el tiempo. Si está cerrado, ir a la explanada de la antena de transmisión — vistas casi idénticas.' },
            { name: 'Lan Ha Sky Bar — Flamingo Resort', type: 'cafe',
              notes: 'Terraza del piso 17 del Flamingo Cat Ba Resort. No cobran por subir.',
              photo: 'https://picsum.photos/seed/cat-ba-skybar-terrace/200/200',
              description: 'El Hotel Flamingo Cat Ba Resort tiene un rooftop bar en el piso 17 (Lan Ha Sky Bar) con vistas panorámicas a la bahía. No cobran entrada si consumes algo.',
              tips: 'En el sendero de las playas Cat Co. Gratis para subir. Pedir algo para poder quedarse.' },
            { name: 'Ruta de playas Cat Co (1, 2 y 3)', type: 'beach',
              notes: 'Sendero costero de madera entre las tres playas Cat Co.',
              photo: 'https://picsum.photos/seed/cat-ba-beach-limestone/200/200',
              description: 'Un sendero costero de madera conecta las playas Cat Co 1, 2 y 3. La más grande y popular es Cat Co 1. Paisaje de acantilados calizos y agua verde esmeralda.',
              tips: 'A pie desde el hotel (~15-20 min). El sendero pasa por el Flamingo Resort.' },
            { name: 'Playa salvaje de Tung Thu', type: 'beach',
              notes: 'Playa salvaje a 1,5 km del paseo marítimo. 20 min andando desde el puerto.',
              photo: 'https://picsum.photos/seed/cat-ba-wild-beach-hidden/200/200',
              description: 'A 1,5 km del paseo marítimo principal (¼ Road). Mucho menos concurrida que las Cat Co. Paseo plano y agradable.',
              tips: 'Desde el puerto: caminar por la calle Hung Vuong hacia el interior (sube al mercado de Cat Ba), girar a la izquierda en calle Tung Thu y seguir hasta que se abra la bahía. 20 min andando.' },
            { name: 'Hospital Cave (refugio militar subterráneo)', type: 'museum',
              notes: 'Hospital secreto a prueba de bombas durante la guerra. Salas médicas intactas.',
              photo: 'https://picsum.photos/seed/cat-ba-hospital-cave-war/200/200',
              description: 'Sirvió como hospital secreto y refugio militar durante la guerra de Vietnam. Sus salas médicas y habitaciones se conservan intactas. Visita de 1 hora.',
              tips: '8:00-17:00, 40.000-80.000 VND. En Grab: 15 min desde el pueblo (app Xanh SM en Cat Ba, no Grab). También en bus local parada "Hang Quân Y".' },
            { name: 'Cueva Trung Trang', type: 'nature',
              notes: 'La mayor cueva del Parque Nacional de Cat Ba. Estalactitas gigantes y formaciones kársticas.',
              photo: 'https://picsum.photos/seed/trung-trang-cave-cat-ba-stalactites/200/200',
              description: 'La cueva más grande del Parque Nacional de Cat Ba, con más de 300 metros de recorrido accesible. Su interior alberga formaciones kársticas de estalactitas y estalagmitas de millones de años. Durante la guerra de Vietnam sirvió también como refugio para la población local.',
              tips: 'En el interior del Parque Nacional de Cat Ba. Acceso en taxi o Xanh SM desde el pueblo (~20 min). Llevar linterna propia para explorar mejor los rincones. Combinar con la visita al Hospital Cave en el mismo trayecto.' },
            { name: 'Ngu Lam Peak (mirador alternativo)', type: 'nature',
              notes: 'Mirador del Parque Nacional. Vistas al archipiélago. Sin las masas del Canon Fort.',
              photo: 'https://picsum.photos/seed/ngu-lam-peak-cat-ba-jungle/200/200',
              description: 'El pico Ngu Lam dentro del Parque Nacional de Cat Ba ofrece vistas panorámicas al archipiélago kárstico similares al Canon Fort pero sin la afluencia turística. El sendero sube entre vegetación subtropical densa con avistamiento de monos langur dorados — el mamífero más amenazado del mundo, con menos de 70 individuos en libertad, exclusivo de Cat Ba.',
              tips: 'Entrada al Parque Nacional: 85.000 VND. Subida: 1-2 horas por sendero marcado. Llevar agua y calzado cerrado. El parque cierra a las 16:00. Guía local recomendado para no perderse en la selva.' }
          ],
          restaurants: [
            { name: 'Mariscos frescos del puerto de Cat Ba', type: 'restaurant',
              notes: 'Langostinos tigre, cangrejos y calamar a la parrilla. Del barco al plato.',
              photo: 'https://picsum.photos/seed/catba-seafood-tiger-prawn/200/200',
              description: 'El puerto de Cat Ba Town tiene restaurantes donde los mariscos se eligen vivos del tanque: tôm hùm (bogavante), cua (cangrejo de mar), ngao (almeja) y mực (calamar) — preparados a la parrilla, al vapor con jengibre o salteados con ajo. La frescura es absoluta.',
              tips: 'Restaurantes en la calle 1-4 junto al puerto, precios más razonables. Negociar precio por kg antes de pedir. Evitar los del Paseo Marítimo principal. Precio: 150.000-300.000 VND/persona.' },
            { name: 'Chả Mực (tortilla de calamar Cat Ba)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD LOCAL. Calamar fresco picado, especias y frito en sartén. Textura única.',
              photo: 'https://picsum.photos/seed/cha-muc-squid-catba/200/200',
              description: 'El Chả Mực es el plato más característico de la isla de Cat Ba y de la bahía de Ha Long: calamar fresco picado con especias y frito formando una torta. Se come con arroz o como aperitivo con salsa de pescado y chile. Sabor intenso a mar.',
              tips: 'Disponible en los mercados y restaurantes de Cat Ba Town. Precio: 80.000-120.000 VND. También existe en versión a la brasa (nướng) con más aroma ahumado.' }
          ],
          transport: [
            { type: 'bus+ferry', icon: '🚐', details: 'Bus + ferry Hanói → Cat Ba (~3h, ~10€)', from: 'Hanói', to: 'Isla de Cat Ba', time: '08:00',
              pickup: 'Salida: 128 Trần Nhật Duật, Old Quarter, Hanói. Horarios: 8:00 / 10:30 / 11:30 / 12:30 / 14:30. Llegada: Good Morning Cat Ba Office, Dao Cat Ba. ~3h de trayecto. Precio: ~10€. ⚠️ En Cat Ba la app de taxis es Xanh SM, NO Grab.' }
          ],
          hotel: { name: 'The Oversleep Catba Hostel & Pool Bar', address: 'Cat Ba Town', phone: '', checkIn: '14:00', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't6', text: 'Check-in The Oversleep Catba Hostel', done: false },
            { id: 't7', text: 'Confirmar crucero Lan Ha Bay para mañana', done: false }
          ],
          notes: '⚠️ En Cat Ba la app de taxis es Xanh SM, NO Grab. Decidir crucero 1 día (21€) o 2D/1N (107€ desde Cat Ba / 130€ desde Hanói).'
        },
        {
          date: '2026-11-10', city: 'Lan Ha Bay', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Crucero 2D/1N por la Bahía de Lan Ha. Kayak entre cuevas, aldea flotante, baños en aguas esmeralda, pesca nocturna de calamares y amanecer en el barco.',
          places: [
            { name: 'Bahía de Lan Ha — crucero 2D/1N', type: 'nature',
              notes: 'La hermana menos turística de Ha Long. +300 islotes kársticos. Kayak, cuevas, playas desiertas.',
              photo: 'https://picsum.photos/seed/lan-ha-bay-limestone-cruise/200/200',
              description: 'Más de 300 islotes calizos de aguas esmeralda. El crucero 2D/1N incluye: pueblo pesquero flotante (uno de los 10 más antiguos de Vietnam), kayak por las Cuevas Brillante, Oscura y de los Murciélagos, baño en las playas Ba Trai Dao, clase de cocina vietnamita y pesca de calamares nocturna. Día 2: desayuno viendo el amanecer desde la cubierta + visita en bici a la aldea de Viet Hai.',
              tips: 'Precio: ~107€ desde Cat Ba / ~130€ desde Hanói. Excursión de 1 día: ~21€. El crucero sale a las 11:30 del hotel. Llevar crema solar biodegradable para proteger el ecosistema. El langur de Cat Ba (el mamífero más amenazado del mundo) vive en los islotes.' },
            { name: 'Kayak en cuevas de Lan Ha', type: 'nature',
              notes: 'Entrar remando por túneles de roca caliza a lagunas interiores en silencio absoluto.',
              photo: 'https://picsum.photos/seed/kayak-cave-vietnam-limestone/200/200',
              description: 'A través de túneles de roca caliza inundados se accede a lagunas interiores: Cueva Brillante, Cueva Oscura y Cueva de los Murciélagos. Con marea baja hay que agacharse para entrar — la sensación es increíble.',
              tips: 'El momento ideal es con marea baja. Proteger la cámara de la humedad. Llevar zapatos de agua o sandalias.' },
            { name: 'Aldea de Viet Hai (día 2)', type: 'nature',
              notes: 'Pueblo enclavado en un valle del parque nacional. Paseo en bici por campos de arroz.',
              photo: 'https://picsum.photos/seed/viet-hai-village-rice-fields/200/200',
              description: 'Al segundo día del crucero (8:00 AM) se va en lancha auxiliar a la aldea de Viet Hai, escondida en un valle del parque nacional. Visita en bici (o coche eléctrico) por un túnel de selva tropical hasta un pueblo con casas tradicionales y masaje de peces.',
              tips: 'Duración: ~1h30 la aldea. Regreso al crucero para trámites de salida. Almuerzo a las 10:45 durante el crucero de vuelta. Llegada al muelle sur a las 12:00.' }
          ],
          restaurants: [
            { name: 'Banquete a bordo del crucero (incluido)', type: 'restaurant',
              notes: 'Almuerzo y cena incluidos. Mariscos, rollitos de papel de arroz y clase de cocina.',
              photo: 'https://picsum.photos/seed/cruise-banquet-lan-ha-bay/200/200',
              description: 'El crucero incluye todas las comidas: almuerzo en cubierta con vistas a los islotes kársticos (calamares a la plancha, gambas al vapor, sopa de tofu y verduras salteadas), clase de cocina de tarde (rollitos Gỏi Cuốn de papel de arroz) y cena a bordo al atardecer entre formaciones de roca caliza.',
              tips: 'Llevar algo de snacks por si se tiene hambre entre actividades. La pesca de calamares nocturna suele ir acompañada de cerveza y lo que se pesque se cocina enseguida. Hidratarse bien durante las actividades de kayak.' }
          ],
          transport: [
            { type: 'boat', icon: '🛳️', details: 'Crucero 2D/1N — salida 11:30 h desde puerto de Cat Ba', from: 'Cat Ba', to: 'Bahía de Lan Ha', time: '11:30',
              pickup: 'Recogida en el hotel a las 11:30 en minibús. 10 min al Puerto de Beo. Embarque y bienvenida a las 12:00.' }
          ],
          hotel: { name: 'Camarote del crucero', address: 'Bahía de Lan Ha', phone: '', checkIn: '12:00', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't8', text: 'Llevar crema solar biodegradable', done: false },
            { id: 't9', text: 'Llevar zapatos de agua para kayak', done: false }
          ],
          notes: 'Uno de los días más especiales del viaje. El amanecer desde la cubierta del barco es espectacular.'
        },
        {
          date: '2026-11-11', city: 'Ninh Binh', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Fin del crucero a las 12:00 y traslado a Ninh Binh en ferry+bus (~4h30). Llegada tarde al homestay rural.',
          places: [
            { name: 'Llegada a Tam Coc — primer paseo en bici', type: 'nature',
              notes: 'Tam Coc al atardecer desde la bicicleta. Arrozales, búfalos y montañas kársticas.',
              photo: 'https://picsum.photos/seed/tam-coc-rice-fields-karst/200/200',
              description: 'El pueblo de Tam Coc, junto al embarcadero, es la base perfecta para explorar Ninh Binh. Al llegar, si hay luz, un paseo en bici por los arrozales revela un paisaje de montañas kársticas que recuerda a Ha Long pero sobre tierra — razón por la que Ninh Binh se conoce como "Ha Long en tierra".',
              tips: 'El hotel Tam Coc Serenity tiene bicicletas disponibles. El embarcadero de Tam Coc (Van Lam Wharf) está a pocos metros.' }
          ],
          restaurants: [
            { name: 'Thịt Dê Nướng (cabra a la parrilla)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE NINH BINH. Cabra de montaña asada con sésamo. El plato de la región.',
              photo: 'https://picsum.photos/seed/ninh-binh-goat-grilled-sesame/200/200',
              description: 'Ninh Binh es famosa en todo Vietnam por su cabra de montaña: criada en las laderas calizas, la carne tiene sabor más salvaje y tierno. Se sirve a la parrilla (nướng), en sopa (tái dê) o salteada. Siempre acompañado de hojas de higo silvestre y pasta de sésamo para envolver.',
              tips: 'Cena sencilla al llegar si la cocina del hotel sigue abierta. Los mejores restaurantes de cabra están en Ninh Binh Town (calle Hoàng Sơn), a 3 km de Tam Coc. Precio: 120.000-180.000 VND/ración.' },
            { name: 'Cơm Cháy (arroz tostado crujiente)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE NINH BINH. Socarrat frito en láminas crujientes con salsa de carne.',
              photo: 'https://picsum.photos/seed/com-chay-crispy-rice-ninh-binh/200/200',
              description: 'El otro plato estrella de Ninh Binh: el fondo tostado del arrocero se fríe hasta quedar en grandes láminas doradas y crujientes. Se sirven en piezas que se rompen sobre la mesa y se mojan en salsa espesa de carne de cerdo, setas y verduras.',
              tips: 'La combinación perfecta de Ninh Binh: Thịt Dê + Cơm Cháy. Restaurante Nhà Hàng Cơm Cháy Ninh Hải (calle Hoang Son). Precio: 60.000-100.000 VND.' }
          ],
          transport: [
            { type: 'ferry+minivan', icon: '⛴️', details: 'Ferry + bus Cat Ba → Ninh Binh (~4h30, ~12€)', from: 'Cat Ba', to: 'Tam Coc (Ninh Binh)', time: '08:30',
              pickup: 'Salida: Good Morning Cat Ba Office, Dao Cat Ba. Horarios: 8:30 / 12:30 / 15:30. Llegada: Ben Do Tam Coc (embarcadero). ~4h30 de trayecto. Precio: ~12€.' }
          ],
          hotel: { name: 'Tam Coc Serenity Hotel & Bungalow', address: 'Tam Coc, Ninh Binh', phone: '', checkIn: '17:00', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't10', text: 'Check-in Tam Coc Serenity Hotel', done: false },
            { id: 't11', text: 'Planificar los 2 días de Ninh Binh', done: false }
          ],
          notes: 'Llegada tarde. Cena sencilla cerca del hotel y descanso.'
        },
        {
          date: '2026-11-12', city: 'Ninh Binh', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Día completo en Ninh Binh: Hang Mua al amanecer, sampán por Tam Coc entre 3 cuevas, Pagoda Bich Dong y bici por los arrozales.',
          places: [
            { name: 'Hang Mua (Monte Mua)', type: 'nature',
              notes: 'Escaleras estilo Gran Muralla China. Arriba: dragón de piedra y vistas a todo el valle. Timo del parking.',
              photo: 'https://picsum.photos/seed/hang-mua-dragon-peak-ninh-binh/200/200',
              description: 'La subida imita la arquitectura de la Gran Muralla China con escalones de piedra irregular. Se bifurca en dos picos: izquierda (Pico del Dragón — el más alto, con enorme dragón de piedra y vistas al río Ngô Đồng con los botes de Tam Coc); derecha (Mini Pagoda — menos masificado). Al bajar no te pierdas el puente de madera sobre el estanque de lotos.',
              tips: '6:00-19:00, 100.000 VND (se paga arriba). En bici desde el pueblo: 20 min. En Grab/Xanh SM: ~70.000 VND. ⚠️ TIMO DEL PARKING: al quedar 500m para llegar, locales te bloqueará en la carretera obligándote a aparcar. IGNORARLOS y continuar hasta el fondo — el parking oficial cuesta solo 10.000 VND.' },
            { name: 'Sampán por Tam Coc (3 cuevas)', type: 'nature',
              notes: 'Barca de madera remada con los pies. 3 cuevas naturales a través de las montañas. 1h30.',
              photo: 'https://picsum.photos/seed/tam-coc-boat-cave-river/200/200',
              description: 'Desde el embarcadero de Van Lam, barca de madera (sampán) por el río a través de 3 cuevas naturales esculpidas en la roca: Cueva Ca (127m, la más grande), Cueva Hai (60m) y Cueva Ba (50m, la más estrecha). El paisaje de arrozales flanqueando el río es el más fotografiado de Ninh Binh.',
              tips: '7:00-17:00, 250.000 VND/persona. Recorrido lineal de 1h30, ida y vuelta. Ir a primera hora (7:30-8:00) para menos turistas. El remero usa los pies — es auténtico.' },
            { name: 'Pagoda Bich Dong', type: 'temple',
              notes: 'Pagoda de 3 niveles construida dentro de un acantilado. A 2 km en bici de Tam Coc.',
              photo: 'https://picsum.photos/seed/bich-dong-pagoda-cliff/200/200',
              description: 'Pagoda de tres niveles construida literalmente dentro del acantilado de una montaña. La entrada tiene un fotogénico puente de piedra sobre un estanque.',
              tips: 'A 2 km en bici desde Tam Coc. Visitar temprano, antes de las excursiones del día.' },
            { name: 'Trang An (barca y cuevas UNESCO)', type: 'nature',
              notes: 'Patrimonio UNESCO. Barca por cuevas y templos flotantes. Escenario de Kong: Skull Island.',
              photo: 'https://picsum.photos/seed/trang-an-boat-cave-temple/200/200',
              description: 'A 10 km de Tam Coc (en bici). Tres rutas diferentes en barca (4 personas). La Ruta 2 (recomendada, 2h30) incluye el Palacio Real de Vu Lam (pabellón flotante) y el set original de Kong: Skull Island. La Ruta 1 (3h30) es la más larga con más tiempo bajo tierra.',
              tips: '7:00-17:00, 300.000 VND/persona. Mejor antes de las 8:00 o a partir de las 15:30 para menos turistas. La barca es para 4 personas. Llevar ropa cubriendo hombros y rodillas para los templos.' },
            { name: 'Ciudadela de Hoa Lu (antigua capital)', type: 'monument',
              notes: 'Antigua capital de Vietnam del s.X. A 10 km en bici. Templos del s.XVII.',
              photo: 'https://picsum.photos/seed/hoa-lu-ancient-capital-temple/200/200',
              description: 'La primera capital unificada de Vietnam (s.X). Los palacios reales de madera desaparecieron pero quedan reconstrucciones del s.XVII: Templo de Dinh Tien Hoang (patio con lecho de dragón de piedra) y Templo de Le Dai Hanh (estatuas y tambores de bronce). La Puerta Oriental sobre el río es la postal del lugar.',
              tips: 'A 10 km de Tam Coc, en bici (paisaje precioso). 7:00-17:00, 20.000 VND.' }
          ],
          restaurants: [
            { name: 'Thịt Dê Nướng (cabra a la parrilla)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE NINH BINH. Cabra de montaña criada en las laderas calizas, a la brasa.',
              photo: 'https://picsum.photos/seed/ninh-binh-goat-grilled/200/200',
              description: 'El plato icónico de Ninh Binh: cabra criada en las montañas calizas, con sabor más intenso que la de granja. A la parrilla (nướng), servida con hojas de higo silvestre y pasta de sésamo para envolver. También existe en sopa (tái dê) o salteada con jengibre.',
              tips: 'Nhà Hàng Cơm Cháy Ninh Hải (calle Hoang Son, Ninh Binh Town). Combinar con Cơm Cháy para la cena perfecta de la zona. Precio: 120.000-180.000 VND por ración.' },
            { name: 'Cơm Cháy (arroz tostado crujiente)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE NINH BINH. Láminas de socarrat frito con salsa de cerdo y setas.',
              photo: 'https://picsum.photos/seed/com-chay-ninh-binh-crispy/200/200',
              description: 'El fondo tostado del arrocero (equivalente al socarrat español) se fríe hasta quedar en grandes láminas doradas y crujientes. Se presentan enteras, se rompen sobre la mesa y se mojan en salsa espesa de carne de cerdo, setas y verduras.',
              tips: 'Precio: 60.000-100.000 VND. Disponible en la mayoría de restaurantes de Tam Coc. El hotel también puede prepararlo si se avisa. Mejor como cena después de un día intenso de bici.' }
          ],
          transport: [],
          hotel: { name: 'Tam Coc Serenity Hotel & Bungalow', address: 'Tam Coc, Ninh Binh', phone: '', checkIn: '', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't12', text: 'Alquilar bicicleta en el hotel', done: false }
          ],
          notes: 'Plan sugerido: Bich Dong Pagoda → sampán Tam Coc → atardecer en Hang Mua (llegando 1h antes del ocaso).'
        },
        {
          date: '2026-11-13', city: 'Ninh Binh → Hue', country: '🇻🇳 Vietnam', block: 'El Norte',
          summary: 'Segunda mañana en Ninh Binh: Trang An o Pagoda Bai Dinh. Por la noche, sleeper bus a Hue.',
          places: [
            { name: 'Pagoda Bai Dinh', type: 'temple',
              notes: 'El complejo budista más grande de Vietnam. 5 récords nacionales. Torre Bao Thien de 100m.',
              photo: 'https://picsum.photos/seed/bai-dinh-pagoda-buddha-tower/200/200',
              description: 'A 15 km de Trang An. El complejo más grande de Vietnam (500 hectáreas). Torre de la Campana octogonal, Palacio de Avalokitesvara (estatua de 80 toneladas con mil ojos y mil manos), el Gran Buda de 100 toneladas y la Torre Bao Thien de 100m (13 pisos, se puede subir en ascensor).',
              tips: '7:00-18:00, 60.000 VND (100.000 con coche eléctrico). 3-4 horas de visita. El coche eléctrico (40.000 VND) ahorra mucho con el calor. La pagoda antigua al fondo (Hang Sang y Dong Toi) son cuevas naturales convertidas en templos.' },
            { name: 'Parque Nacional de Cuc Phuong (opcional)', type: 'nature',
              notes: 'A 45 km. Centro de rescate de primates en peligro. Árbol milenario de 45m. Solo si hay día extra.',
              photo: 'https://picsum.photos/seed/cuc-phuong-primate-rescue/200/200',
              description: 'El parque nacional más antiguo de Vietnam. Cerca de la entrada: centro de rescate de gibones y langures, centro de conservación de tortugas, y rescate de pangolines. En el interior: Cueva del Hombre Prehistórico (7.500 años de antigüedad) y el Árbol Milenario (45m de altura, 20 personas para rodearlo).',
              tips: 'A 45 km de Tam Coc. Conductor privado o excursión ~40€. 6:00-18:00, 60.000 VND. Negociar que el conductor entre hasta el 2º parking (Bong Station) — no quedarse en la entrada.' }
          ],
          restaurants: [
            { name: 'Cena ligera antes del bus nocturno', type: 'restaurant',
              notes: 'Cena temprana antes de las 20:00. Phở o Com Rang (arroz frito) cerca del hotel.',
              photo: 'https://picsum.photos/seed/ninh-binh-dinner-before-bus/200/200',
              description: 'Antes del sleeper bus de las 21:00-22:30, cena ligera y temprana: los locales junto al embarcadero de Tam Coc sirven Phở, Cơm Rang (arroz frito con verduras) y Nem Cuốn (rollitos frescos) hasta las 20:00. No comer en exceso — el movimiento del bus puede marear.',
              tips: 'Cenar antes de las 19:30. Llevar agua y algún snack para la noche. Los asientos del sleeper bus son literas reclinables — quitar los zapatos y usar el mismo sitio como cama.' }
          ],
          transport: [
            { type: 'sleeper-bus', icon: '🚌', details: 'Sleeper bus nocturno Ninh Binh → Hue (25-28€)', from: 'Ninh Binh', to: 'Hue', time: '21:00',
              pickup: 'Salida: Tam Coc Boat Station, Ninh Binh. Horarios: 21:00 / 21:15 / 21:30 / 22:00 / 22:30. Llegada a Hue: 6:15-7:45 (Hue Railway Station o 45 Le Loi, Hue). Precio: 25-28€ (hay opciones de 15€ pero de menor calidad). Reservar con antelación.' }
          ],
          hotel: { name: 'Tam Coc Serenity Hotel & Bungalow', address: 'Tam Coc, Ninh Binh', phone: '', checkIn: '', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't13', text: 'Check-out hotel Tam Coc (guardar maletas hasta el bus)', done: false },
            { id: 't14', text: 'Confirmar reserva hotel Hue (glory Legacy o Sweethouse)', done: false }
          ],
          notes: 'Bus nocturno: llegar al punto de salida 15-20 min antes. La llegada a Hue es de madrugada/madrugada temprana.'
        },
        {
          date: '2026-11-14', city: 'Hue', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Llegada temprana a Hue en sleeper bus. Ciudad Imperial, Pagoda Thien Mu y el Río Perfume al atardecer.',
          places: [
            { name: 'Ciudad Imperial de Hue', type: 'monument',
              notes: 'Enorme complejo amurallado inspirado en la Ciudad Prohibida de Pekín. Patrimonio UNESCO.',
              photo: 'https://picsum.photos/seed/hue-imperial-city-nguyen/200/200',
              description: 'El corazón del Imperio Nguyen (1802-1945), la última dinastía imperial de Vietnam. Tres recintos amurallados: Puerta Ngo Mon (sube al 2º piso para vistas de la plaza), Palacio Thai Hoa (trono imperial original de oro), Ciudad Púrpura Prohibida (área exclusiva de la familia real, parcialmente reconstruida), Teatro Real Duyet Thi Duong (a veces con música tradicional en vivo) y Pabellón Hien Lam con las Nueve Urnas Dinásticas de bronce.',
              tips: '8:00-17:30, 200.000 VND. TICKET COMBINADO con las tumbas imperiales: 420.000 VND, válido 2 días consecutivos. Visita: 2-3 horas. Bus hop-on hop-off incluye parada aquí.' },
            { name: 'Pagoda Thien Mu', type: 'temple',
              notes: 'Símbolo no oficial de Hue. Torre de 7 pisos. El coche en el que el monje Thich Quang Duc fue a quemarse en 1963.',
              photo: 'https://picsum.photos/seed/thien-mu-pagoda-hue-tower/200/200',
              description: 'A 5 km al oeste, sobre una colina con vistas al Río Perfume. La Torre Phuoc Duyen (7 pisos, 21m, cada piso = una reencarnación de Buda) es la postal de Hue. En el garaje acristalado de los jardines traseros: el Austin de color azul claro en el que el monje Thich Quang Duc viajó a Saigón en 1963 para quemarse vivo en protesta — la fotografía dio la vuelta al mundo.',
              tips: '8:00-18:00. Entrada gratuita. Monasterio activo: descalzarse si se entra al templo. Los jardines traseros tienen un estanque de peces y el cementerio de los monjes.' },
            { name: 'Río Perfume + Dragon Boat', type: 'nature',
              notes: 'Paseo en barco tradicional al atardecer. Puente Truong Tien (diseñado por Eiffel) con luces de noche.',
              photo: 'https://picsum.photos/seed/hue-perfume-river-dragon-boat/200/200',
              description: 'El paseo arbolado a lo largo del Río Perfume entre el Puente Phu Xuan y el Truong Tien (diseñado por Eiffel, con juego de luces LED por la noche). Desde el Muelle de Toa Kham se alquilan barcos privados (Dragon Boat) para el atardecer o para el espectáculo nocturno de Canto Ca Hue (músicos con Ao Dai y linternas de papel flotantes).',
              tips: 'Barco privado atardecer (1h): 150.000-200.000 VND, regatear. Espectáculo Ca Hue nocturno (>19:00): músicos y cantantes tradicionales + linternas de papel. Muelle Toa Kham = Parada 1 del bus hop-on hop-off.' },
            { name: 'Mercado Dong Ba', type: 'market',
              notes: 'El mercado más antiguo e importante de Hue. Puestos interiores 6-18h. Nocturno 18-5h.',
              photo: 'https://picsum.photos/seed/dong-ba-market-hue-night/200/200',
              description: 'El mercado más grande de Hue, ideal para comida callejera local, artesanías y souvenirs. Los puestos interiores abren de 6:00-18:00. El mercado nocturno exterior funciona de 18:00-5:00.',
              tips: 'Parada 2 del bus hop-on hop-off. Ideal para probar la gastronomía local de Hue: Bún Bò Huế (sopa de fideos picante), Bánh Bèo (pastelitos de arroz con gambas), Cơm Hến (arroz con almejas).' },
            { name: 'Cementerio City of Ghosts (Đàn Nam Giao)', type: 'monument',
              notes: 'El cementerio más fotogénico de Asia. Lápidas de colores entre la vegetación. Ángulo opuesto al turístico.',
              photo: 'https://picsum.photos/seed/hue-city-of-ghosts-cemetery/200/200',
              description: 'El vasto cementerio en los alrededores de Hue, conocido popularmente como "Ciudad de los Fantasmas", es uno de los más grandes y visualmente impactantes de Asia. Las tumbas de cerámica pintadas en tonos turquesa, rojo y dorado se extienden entre la vegetación subtropical durante kilómetros. Muchas siguen el estilo imperial en miniatura, con puertas de entrada, jardines y estanques diminutos.',
              tips: 'Al sur de la ciudad, en los alrededores de la zona de tumbas imperiales. Se puede recorrer en bici desde el centro (~8 km). Sin entrada. No hay carteles turísticos — es un cementerio activo. Respetar el espacio. Mejor al atardecer para la luz dorada sobre las cerámicas de colores.' },
            { name: 'Puente Thanh Toan (el Puente Japonés de Hue)', type: 'monument',
              notes: 'Puente cubierto del s.XVIII menos conocido que el de Hoi An. Aldea de Thanh Toan a 8 km.',
              photo: 'https://picsum.photos/seed/thanh-toan-bridge-hue-covered/200/200',
              description: 'Construido en 1776 por la nieta de un mandarín imperial, este puente cubierto de estilo japonés sobre el canal de la aldea de Thanh Toan es el primo más tranquilo del Puente Japonés de Hoi An. En el interior del puente hay un pequeño altar y bancos de madera donde los aldeanos se sientan a charlar. La aldea alrededor mantiene el ritmo de vida rural vietnamita intacto.',
              tips: 'A 8 km al este del centro de Hue. En bici: 30-40 min por carretera rural entre arrozales. En Grab: 10 min. Entrada: 20.000 VND. Si vas a Hue 2 días, es una excursión perfecta para la tarde del segundo día.' }
          ],
          restaurants: [
            { name: 'Bún Bò Huế (sopa picante de Hue)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE HUE. Sopa de fideos con res, lemongrass y pasta de camarón. Más picante que el Phở.',
              photo: 'https://picsum.photos/seed/bun-bo-hue-spicy-noodle/200/200',
              description: 'El plato más famoso de Hue: fideos gruesos (bún) en caldo intenso de res con lemongrass y pasta de camarón fermentada (mắm ruốc), mucho más especiado y aromático que el Phở del norte. Se sirve con rodajas de res, morcilla de cerdo (huyết), hierbas y lima.',
              tips: 'Desayuno: 6-10 AM. Mejor en el Mercado Dong Ba. Pedir "không cay" si no se tolera el picante. Precio: 40.000-70.000 VND.' },
            { name: 'Bánh Khoái (crepe crujiente de Hue)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE HUE. Crep de arroz crujiente con gambas, brotes y salsa de maní-hígado.',
              photo: 'https://picsum.photos/seed/banh-khoai-hue-crispy-crepe/200/200',
              description: 'Crepe de harina de arroz frito en abundante aceite caliente, relleno de gambas, cerdo y brotes de soja. Se envuelve en hojas de lechuga y mostaza, y se moja en una salsa única de hoisin con cacahuetes y hígado de cerdo en dados.',
              tips: 'Callejón de Bánh Khoái cerca del Mercado Dong Ba. Precio: 30.000-50.000 VND. Probar también el Bánh Bèo de postre.' },
            { name: 'Bánh Bèo + Bánh Nậm + Bánh Lọc (trío imperial)', type: 'restaurant',
              notes: '⭐ COCINA IMPERIAL DE HUE. Tres pastelitos de arroz: sobre platito, en hoja y transparente.',
              photo: 'https://picsum.photos/seed/banh-beo-hue-rice-cakes/200/200',
              description: 'Los tres pastelitos más emblemáticos de la cocina de los emperadores Nguyen: Bánh Bèo (tortitas de arroz en platito con gambas deshidratadas y chicharrón), Bánh Nậm (masa rectangulares con carne en hoja de platanero) y Bánh Lọc (transparentes de tapioca con gambas y cerdo).',
              tips: 'Bánh Bèo Bà Đỏ (Nguyễn Bỉnh Khiêm). Precio: 25.000-35.000 VND por ración de 5-10 platitos. La cena perfecta del primer día en Hue junto al Mercado Dong Ba.' },
            { name: 'Cơm Hến (arroz con almejas de Hue)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DE HUE. Arroz frío con almejas, cacahuetes, chicharrón y hierbas. Muy especiado.',
              photo: 'https://picsum.photos/seed/com-hen-hue-clam-rice/200/200',
              description: 'El plato más curioso de Hue: arroz frío mezclado con almejas diminutas (hến) del río Perfume, cacahuetes tostados, chicharrón, hierbas frescas y pasta de camarón muy picante. Contraste de temperaturas y texturas muy particular.',
              tips: 'Solo se encuentra en puestos callejeros locales, no en restaurantes turísticos. Disponible como desayuno o almuerzo. Precio: 20.000-40.000 VND. Se pide junto al Bún Bò Huế.' }
          ],
          transport: [
            { type: 'sleeper-bus', icon: '🚌', details: 'Llegada en sleeper bus desde Ninh Binh (~6-7 AM)', from: 'Ninh Binh', to: 'Hue', time: '06:00',
              pickup: 'Llegada a Hue Railway Station o 45 Le Loi. Esperar a que abra el hotel (check-in normalmente a las 14:00 — pedir guardar maletas).' }
          ],
          hotel: { name: 'Por confirmar (Hue Glory Legacy / Hue Sweethouse 2)', address: 'Hue', phone: '', checkIn: '14:00', checkOut: '12:00', breakfast: true },
          tasks: [
            { id: 't15', text: 'Check-in hotel Hue (o guardar maletas hasta las 14:00)', done: false },
            { id: 't16', text: 'Comprar ticket combinado Ciudad Imperial + Tumbas (420.000 VND, válido 2 días)', done: false }
          ],
          notes: 'Opciones hotel: Hue Glory Legacy Homestay (34€) o Hue Sweethouse 2 Homestay (43€, balcón). Cancelación gratuita hasta 8 de noviembre.'
        },
        {
          date: '2026-11-15', city: 'Hue → Da Nang', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Tumbas imperiales por la mañana, calle del incienso y el parque abandonado. Tren panorámico HD3 (14:25) a Da Nang cruzando el Hai Van Pass — asientos a la IZQUIERDA.',
          places: [
            { name: 'Tumba Imperial de Minh Mang', type: 'monument',
              notes: 'La más bella y equilibrada. Jardines, estanques y estatuas de guerreros. A 12 km del centro.',
              photo: 'https://picsum.photos/seed/minh-mang-tomb-hue-gardens/200/200',
              description: 'Diseño simétrico clásico con jardines, estanques y estatuas de guerreros de piedra. La más alejada del centro (12 km). La más tranquila y fotogénica de las tres grandes.',
              tips: '7:00-17:30. Incluida en el ticket combinado (420.000 VND). Mejor en taxi/bus hop-on hop-off.' },
            { name: 'Tumba Imperial de Khai Dinh', type: 'monument',
              notes: 'Espectacular mezcla de arquitectura vietnamita y art déco europeo. Mosaicos de cerámica increíbles. En una colina.',
              photo: 'https://picsum.photos/seed/khai-dinh-tomb-mosaic-hue/200/200',
              description: 'Situada en una colina, mezcla única de arquitectura tradicional vietnamita y art déco europeo. El interior está cubierto de mosaicos de cerámica y vidrio de colores de altísima calidad.',
              tips: '7:00-17:30. Incluida en el ticket combinado. A 10 min de la Tumba Minh Mang. La visita tarda ~40 min.' },
            { name: 'Tumba Imperial de Tu Duc', type: 'monument',
              notes: 'La más cercana al centro. Diseñada por el propio emperador-poeta. Gran lago de lirios y pabellones flotantes.',
              photo: 'https://picsum.photos/seed/tu-duc-tomb-lotus-lake/200/200',
              description: 'Diseñada por el emperador Tu Duc, que era poeta y artista. Perfectamente integrada con la naturaleza: un gran lago de lirios con pabellones de madera flotante donde el emperador compuso versos. La más cercana al centro.',
              tips: '7:00-17:30. Incluida en el ticket combinado. La visita tarda ~1 hora.' },
            { name: 'Calle del Incienso de Thuy Xuan', type: 'monument',
              notes: 'Puestos fabricando varillas de incienso de colores artesanales. Entre la Tumba Tu Duc y Khai Dinh.',
              photo: 'https://picsum.photos/seed/thuy-xuan-incense-street-hue/200/200',
              description: 'Calle llena de puestos artesanales donde fabrican varillas de incienso de todos los colores. Las flores de incienso extendidas en aros de bambú son la foto más característica de Hue.',
              tips: '7:00-18:00. Entre la Tumba Tu Duc (5 min en taxi) y la Tumba Khai Dinh. ⚠️ Evitar si llueve — no sacan el incienso a la calle.' },
            { name: 'Ho Thuy Tien (parque acuático abandonado)', type: 'monument',
              notes: 'Dragón gigante emergiendo de un lago, toboganes oxidados y vegetación devorando todo. 8 km de Hue.',
              photo: 'https://picsum.photos/seed/abandoned-water-park-hue-dragon/200/200',
              description: 'Parque acuático abandonado con un dragón gigante de tres cabezas emergiendo de un lago cubierto de vegetación. Toboganes oxidados y estructuras cubiertas por la selva. Este año parece que han rehabilitado alguna zona.',
              tips: 'A 8 km de Hue. En taxi: 10 min desde Khai Dinh, 10 min de Minh Mang. Alquilar una bici local para recorrer el parque: ~1€. La visita dura ~1 hora.' }
          ],
          restaurants: [
            { name: 'Mì Quảng (fideos de cúrcuma, plato del Centro)', type: 'restaurant',
              notes: '⭐ ESPECIALIDAD DEL CENTRO. Fideos anchos amarillos con gambas, cerdo y crujientes de arroz.',
              photo: 'https://picsum.photos/seed/mi-quang-danang-turmeric-noodle/200/200',
              description: 'El plato más representativo del centro de Vietnam: fideos anchos teñidos de amarillo con cúrcuma, servidos con muy poco caldo (más seco que el Phở). Se acompaña de gambas, carne de cerdo, cacahuetes tostados, hierbas frescas y bánh tráng crujientes. El contraste de texturas es adictivo.',
              tips: 'Lo encontrarás tanto en Hue como en Da Nang. Mì Quảng 1A (Hải Phòng 1, Da Nang) es el más famoso de la región. Precio: 40.000-70.000 VND.' },
            { name: 'Bánh Mì de viaje en tren', type: 'restaurant',
              notes: 'Compra un Bánh Mì antes de subir al tren HD3. El snack perfecto para el Hai Van Pass.',
              photo: 'https://picsum.photos/seed/banh-mi-train-hue-danang/200/200',
              description: 'La baguette vietnamita (Bánh Mì) con paté, jamón vietnamita, pepino, cilantro y chile es el snack perfecto para comer mientras el tren panorámico cruza el espectacular Paso Hai Van con el mar a la izquierda.',
              tips: 'Comprar en puestos callejeros de Hue antes de subir al tren. Precio: 20.000-35.000 VND. Llevar agua para el trayecto de 3h15 min.' }
          ],
          transport: [
            { type: 'train', icon: '🚆', details: 'Tren HD3 panorámico Hue → Da Nang (14:25 → 17:40)', from: 'Hue', to: 'Da Nang', time: '14:25',
              pickup: 'Estación de Hue (Ga Huế), calle Bùi Thị Xuân. ⭐ ASIENTOS DEL LADO IZQUIERDO (sentido Da Nang) para ver el Mar de China del Sur cruzando el Hai Van Pass. También: HD1 07:45→10:35 si se prefiere ir de mañana. Reservar con antelación en 12go.asia o en la estación.' }
          ],
          hotel: { name: 'Por confirmar', address: 'Da Nang', phone: '', checkIn: '18:00', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't17', text: 'Comprar billete tren Hue→Da Nang (HD3 14:25)', done: false },
            { id: 't18', text: 'Check-out hotel Hue', done: false }
          ],
          notes: 'El tren panorámico atravesando el Hai Van Pass con el mar a la izquierda es uno de los trayectos en tren más espectaculares del mundo.'
        },
        {
          date: '2026-11-16', city: 'Da Nang → Hoi An', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Mañana: Marble Mountains de camino. Tarde: llegada a Hoi An. Noche: Puente del Dragón (21:00, escupe fuego y agua).',
          places: [
            { name: 'Marble Mountains (Ngũ Hành Sơn)', type: 'nature',
              notes: '5 montañas de mármol con cuevas, santuarios y miradores. La Cueva Huyen Khong tiene un rayo de sol vertical sobre el Buda.',
              photo: 'https://picsum.photos/seed/marble-mountains-danang-cave/200/200',
              description: 'Cinco montañas de mármol llenas de senderos, santuarios y cuevas. Ruta recomendada: ascensor (pagar el extra), Torre Xa Loi, Pagoda Linh Ung, Cueva Tang Chon y la gran joya, la Cueva Huyen Khong — el techo colapsó naturalmente y los rayos de sol entran en vertical iluminando el Buda de piedra. Bajar a pie por 156 escalones de piedra. Extra: Cueva Am Phu (20.000 VND) recreando el infierno budista.',
              tips: '7:00-17:30, 40.000 VND. Ascensor: 60.000 VND extra (muy recomendable). Cueva Am Phu: 20.000 VND adicionales. En bus LK-02 desde Da Nang (~20 min). Se puede visitar de camino a Hoi An con las maletas y dejárselas a un tendero de souvenirs.' },
            { name: 'Puente del Dragón de Da Nang', type: 'monument',
              notes: 'Sábados y domingos a las 21:00: 15 min escupiendo fuego y luego agua. Ver desde el Muelle Bach Dang.',
              photo: 'https://picsum.photos/seed/dragon-bridge-danang-fire/200/200',
              description: 'El puente con forma de dragón dorado de Da Nang escupe fuego por la boca los sábados y domingos a las 21:00 durante 15 minutos (primero fuego, luego agua). Uno de los espectáculos nocturnos más vistosos de Vietnam.',
              tips: '⚠️ SOLO sábados y domingos a las 21:00. Duración: ~15 min. Mejor desde el paseo marítimo Muelle Bach Dang o las terrazas de las cafeterías cercanas. El Love Lock Bridge (faroles rojos y dragones-pez) está justo al lado.' },
            { name: 'Hoi An Old Town — primera noche', type: 'monument',
              notes: 'El casco antiguo iluminado de noche con faroles de seda. La primera noche es mágica.',
              photo: 'https://picsum.photos/seed/hoi-an-lanterns-night-river/200/200',
              description: 'El casco antiguo peatonal de Hoi An, declarado Patrimonio de la Humanidad, se ilumina de noche con miles de faroles de seda de todos los colores. La primera noche vale solo pasear y empaparse del ambiente. Noches de luna llena: espectáculo de faroles en el río.',
              tips: 'Llegar antes de que oscurezca para ver el check-in y conocer la zona. La primera noche no hace falta el bono de monumentos — solo pasear.' }
          ],
          restaurants: [
            { name: 'Bánh Mì Phượng (el mejor Bánh Mì del mundo, en Hoi An)', type: 'restaurant',
              notes: '⭐ IMPRESCINDIBLE. Anthony Bourdain lo llamó "la comida más deliciosa del mundo".',
              photo: 'https://picsum.photos/seed/banh-mi-phuong-hoi-an-famous/200/200',
              description: 'La baguette vietnamita más famosa del planeta: paté casero, jamón vietnamita, carne de cerdo asada, pepino, cilantro, chile y salsa de soja en una baguette recién horneada y crujiente. Anthony Bourdain probó este local en 2009 en la CNN y lo convirtió en leyenda.',
              tips: 'Bánh Mì Phượng: calle Phan Châu Trinh 2B, Hoi An. Cola habitual de 5-15 min. Precio: 20.000-35.000 VND. Cómelo caminando por el Old Town la primera noche.' },
            { name: 'Mì Quảng o Cao Lầu (primer plato de Hoi An)', type: 'restaurant',
              notes: 'Los dos platos estrella de Hoi An para probar en la primera noche.',
              photo: 'https://picsum.photos/seed/hoi-an-first-night-food/200/200',
              description: 'La primera noche en Hoi An es perfecta para probar los dos platos locales más famosos: Cao Lầu (fideos gruesos con cerdo asado y cortezas crujientes, agua del pozo Cham) y Mì Quảng (fideos de cúrcuma con gambas). El Night Market callejero también ofrece los dos por menos de 50.000 VND cada uno.',
              tips: 'Night Market de Hoi An: An Hội Đảo (isla de An Hoi), desde las 17:00. Todo a precios locales: 30.000-60.000 VND. La primera noche es para pasear y comer sin prisas.' }
          ],
          transport: [
            { type: 'bus', icon: '🚌', details: 'Bus LK-02 Da Nang → Hoi An (cada 20-30 min, 1h)', from: 'Da Nang / Marble Mountains', to: 'Hoi An', time: '14:00',
              pickup: 'Bus LK-02 desde Da Nang (o desde las Marble Mountains). Sale cada 20-30 min, tarda ~1h. También van compartida o Grab. Se puede ir directamente desde las Marble Mountains a Hoi An (están a 20 km).' }
          ],
          hotel: { name: 'Por confirmar (Maichi Villa / Volar Hoi An)', address: 'Hoi An', phone: '', checkIn: '16:00', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't19', text: 'Check-in hotel Hoi An', done: false },
            { id: 't20', text: 'Comprar bono Old Quarter 5€ (casetas amarillas)', done: false }
          ],
          notes: 'Opciones hotel: Maichi Villa Hoi An (76€, sin desayuno) o Volar Hoi An (60€, balcón + desayuno). Cancelación gratuita hasta 10 de noviembre. ⚠️ Consultar app Windy — en noviembre hay riesgo real de inundaciones en Hoi An.'
        },
        {
          date: '2026-11-17', city: 'Hoi An', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Día en el casco antiguo UNESCO. Puente Japonés, casas antiguas, salones chinos, mercados y el espectáculo Hoi An Memories por la noche.',
          places: [
            { name: 'Casco Antiguo — Bono Old Quarter', type: 'monument',
              notes: 'Bono 5€ = acceso a 5 de los 22 monumentos. Casetas amarillas junto al río.',
              photo: 'https://picsum.photos/seed/hoi-an-old-town-yellow-walls/200/200',
              description: 'El bono (5€, efectivo) da acceso a 5 de los 22 monumentos: casas antiguas y capillas familiares (Casa Tan Ky — 7 generaciones, Casa Phung Hung, Casa Quan Thang), salones de asambleas chinos (Salón Fujian — el más espectacular, dedicado a la diosa del mar; Salón Cantonés con dragón de cerámica rota), museos, el Puente Cubierto Japonés y el Teatro de Arte Tradicional.',
              tips: 'Comprar en casetas amarillas de la "Hoi An Traditional Art Performance and Ticket Office" junto al río. Solo efectivo. Llevar ropa que cubra hombros y rodillas para los templos. El Puente Japonés (Chua Cau, s.XVII) es el símbolo de la ciudad — imprescindible.' },
            { name: 'Puente Cubierto Japonés (Chua Cau)', type: 'monument',
              notes: 'El símbolo de Hoi An. Siglo XVII. Conectaba el barrio japonés con el chino. Incluido en el bono.',
              photo: 'https://picsum.photos/seed/japanese-covered-bridge-hoi-an/200/200',
              description: 'Construido en el s.XVII para unir los barrios japonés y chino, con una pequeña pagoda de madera en su interior. Es el monumento más emblemático de Hoi An y aparece en los billetes de 20.000 VND.',
              tips: 'Incluido en el bono de monumentos. Mejor fotografiarlo desde el río al atardecer. Calle Trần Phú.' },
            { name: 'Calle Trần Phú — azoteas y Mot Hoi An', type: 'cafe',
              notes: 'Corazón del Old Quarter. Azoteas de Faifo Coffee. Mot Hoi An: té helado en vaso de bambú con pétalo de loto.',
              photo: 'https://picsum.photos/seed/hoi-an-tran-phu-rooftop/200/200',
              description: 'La calle principal del casco antiguo tiene azoteas fotogénicas: Faifo Coffee y 92 Station Restaurant & Cafe. Mot Hoi An es famoso por el té helado servido en un vaso de bambú con un pétalo de loto flotando.',
              tips: 'Faifo Coffee y 92 Station: azoteas con vistas al casco antiguo. Mot Hoi An: calle Trần Phú, famoso por el té de bambú.' },
            { name: 'Mercados de Hoi An', type: 'market',
              notes: 'Night Market (6-22h), Mercado Ba Le (5-19h), Mercado de pescado de Thanh Ha (3-7 AM).',
              photo: 'https://picsum.photos/seed/hoi-an-market-lanterns/200/200',
              description: 'El Night Market nocturno abre de 6:00-22:00. El Mercado central Chợ Hội An abre a las 6:00 (entre las 5-7 llegan los pescadores para la puja). Mercado Ba Le (5:00-19:00). Mercado de pescado de Thanh Ha (3:00-7:00, junto a la aldea de cerámica, se ve la puja).',
              tips: 'El Night Market está en el casco antiguo. El Mercado de Thanh Ha solo vale si madrugas mucho.' },
            { name: 'Hoi An Memories Show', type: 'monument',
              notes: 'Gran espectáculo en la isla Hen. 500 actores. 20:00-21:00. Eco 22€ / HI 28€ / VIP 45€.',
              photo: 'https://picsum.photos/seed/hoi-an-memories-show/200/200',
              description: 'El espectáculo de luz y sonido más grande de Vietnam, en el parque temático Hoi An Impression de la isla Hen. El parque abre a las 17:00 con mini shows cada 20 min. El gran espectáculo es de 20:00-21:00 (500 actores, escenografía épica sobre la historia de Hoi An). Tres categorías de asiento: Eco (laterales, 22€), HI (zona media, 28€), VIP (planta superior, totalmente techado, 45€).',
              tips: 'Comprar en klook.com/en-US/activity/17514 con antelación (10% descuento). La categoría HI ofrece buena relación calidad-precio.' }
          ],
          restaurants: [
            { name: 'Cao Lau (Quán Cao Lầu Thanh)', type: 'restaurant',
              notes: 'Los fideos solo auténticos de Hoi An. Agua del único pozo Cham de la ciudad.',
              photo: 'https://picsum.photos/seed/cao-lau-noodles-hoi-an/200/200',
              description: 'El Cao Lau es el plato más característico de Hoi An: fideos gruesos con cerdo asado, hierbas y cortezas crujientes. La tradición dice que los fideos auténticos solo pueden hacerse con agua del único pozo Cham de la ciudad.',
              tips: 'Quán Cao Lầu Thanh es uno de los más auténticos. Evitar los del casco antiguo con precio para turistas.' },
            { name: 'White Rose (Bánh Bao Vạc)', type: 'restaurant',
              notes: 'Dumplings con forma de rosa blanca. Solo se venden en el restaurante familiar que los fabrica.',
              photo: 'https://picsum.photos/seed/white-rose-dumpling-hoi-an/200/200',
              description: 'Los White Rose son dumplings de arroz transparentes con forma de rosa, rellenos de gambas. Son el snack más característico de Hoi An y solo los fabrica y vende una única familia.',
              tips: 'Se encuentran en muchos restaurantes del casco antiguo pero todos los compran al mismo fabricante. Pedir con salsa de pescado picante.' },
            { name: 'Cơm Gà Bà Buội (arroz con pollo)', type: 'restaurant',
              notes: 'El Cơm Gà (arroz con pollo y cúrcuma) es el otro plato estrella de Hoi An.',
              photo: 'https://picsum.photos/seed/com-ga-rice-chicken-hoi-an/200/200',
              description: 'Arroz con pollo desmenuzado, hierbas frescas y salsa especial — es el plato local más popular junto al Cao Lau. El humilde local Bà Buội es el más famoso de la ciudad.',
              tips: 'Buscar locales solo con clientes vietnamitas. Precio: ~40.000-60.000 VND.' }
          ],
          transport: [],
          hotel: { name: 'Por confirmar (Maichi Villa / Volar Hoi An)', address: 'Hoi An', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't21', text: 'Comprar entradas Hoi An Memories Show (klook.com, 10% descuento)', done: false }
          ],
          notes: 'El Night Market y el casco antiguo por la noche son lo más especial de Hoi An. No perder el Puente Japonés iluminado.'
        },
        {
          date: '2026-11-18', city: 'Hoi An', country: '🇻🇳 Vietnam', block: 'El Centro',
          summary: 'Día de bicicleta: aldea de cerámica, playa An Bang, isla Cam Kim o clase de cocina. Ba Na Hills si queda energía.',
          places: [
            { name: 'Aldea de cerámica de Thanh Ha', type: 'monument',
              notes: 'A 3 km en bici. Demostración de alfarería y souvenir de arcilla incluido con la entrada.',
              photo: 'https://picsum.photos/seed/thanh-ha-pottery-village/200/200',
              description: 'Aldea artesanal a 3 km del casco antiguo en bici. La entrada (35.000 VND) incluye acceso a las calles de la aldea, ver las demostraciones de alfarería en torno y un souvenir de arcilla. Pegada a la aldea está el mercado de pescado de Thanh Ha (si se va de madrugada).',
              tips: '8:00-17:30, 35.000 VND. Museo de Terracota aparte: 50.000 VND. En bici desde el casco antiguo: ~15 min.' },
            { name: 'Ruta en bici a la playa An Bang', type: 'beach',
              notes: '4-5 km en bici por Hai Bà Trưng. Pasando por la aldea de Trà Quế (hierbas aromáticas).',
              photo: 'https://picsum.photos/seed/an-bang-beach-hoi-an-bike/200/200',
              description: 'El paseo en bici más popular de Hoi An. Desde la calle Hai Bà Trưng hasta la playa de An Bang (4-5 km). De camino se pasa por la aldea de Trà Quế (desvío a la derecha), famosa por sus cultivos de hierbas aromáticas.',
              tips: 'Punto de partida: calle Hai Bà Trưng. ~20-25 min en bici. Parar en la aldea de Trà Quế de camino.' },
            { name: 'Ruta en bici isla de Cam Kim', type: 'nature',
              notes: 'Vietnam rural a 5 min del casco antiguo. Los artesanos que tallaron los palacios imperiales de Hue.',
              photo: 'https://picsum.photos/seed/cam-kim-island-rural-vietnam/200/200',
              description: 'Justo enfrente del casco antiguo. Sus artesanos en madera tallaron los palacios de Hue y las casas de Hoi An. Ruta circular cruzando por el Puente Cầu Cẩm Kim y volviendo por Cầu sắt Cẩm Kim, que está junto a la aldea de cerámica.',
              tips: 'Cruzar en bici por el puente Cầu Cẩm Kim (junto al Old Town). Ruta circular de ~1,5h. Sin turistas.' },
            { name: 'Ba Na Hills (opcional)', type: 'nature',
              notes: 'El famoso Puente Dorado sostenido por manos gigantes. Teleférico más largo del mundo. A 40 km.',
              photo: 'https://picsum.photos/seed/golden-bridge-ba-na-hills/200/200',
              description: 'Parque temático en la cima de una montaña a 1.500m de altitud, a 40 km de Hoi An. El Puente Dorado (Golden Bridge/Cầu Vàng), sostenido por dos manos gigantes de piedra, es uno de los puentes más fotografiados del mundo. El teleférico tiene 5 km de longitud. También incluye el Pueblo Francés (villa medieval europea), Fantasy Park y la Pagoda Linh Ung.',
              tips: '8:00-22:00, ~35€. Tarjeta de transporte incluida para el teleférico. También accesible desde Da Nang.' },
            { name: 'Clase de cocina en isla Thuan Tinh', type: 'monument',
              notes: 'Mercado + barca + cocina al aire libre + paseo en cocoteros. 8:30-11:30, 35€.',
              photo: 'https://picsum.photos/seed/hoi-an-cooking-class-boat/200/200',
              description: 'Combinación de visita al mercado local, paseo en barca por el río Thu Bon hasta una cocina al aire libre, preparación de platos tradicionales y paseo por el bosque de cocoteros de Cam Thanh.',
              tips: '8:30-11:30, ~35€. Otra opción: Cocina Tradicional 9:30-13:00, ~34€ (incluye hierbas en huerto + elaboración de leche de arroz y papel de arroz para nems).' }
          ],
          restaurants: [
            { name: 'Bánh Xèo (crepe crocante vietnamita)', type: 'restaurant',
              notes: 'Gran crepe de arroz y cúrcuma crujiente relleno de gambas, cerdo y brotes. Comer envuelto en lechuga.',
              photo: 'https://picsum.photos/seed/banh-xeo-crispy-crepe-vietnam/200/200',
              description: 'El Bánh Xèo (pronunciado "bán séo" = sonido del aceite al freír) es una enorme crepe de harina de arroz y cúrcuma, frita hasta quedar muy crujiente, rellena de gambas, cerdo y brotes de soja. Se parte, se envuelve en hojas de lechuga y mostaza y se moja en salsa nước chấm.',
              tips: 'Disponible en toda la zona del centro de Vietnam. Precio: 40.000-70.000 VND. Plato compartido para dos personas.' },
            { name: 'Bánh Mì Phượng (para el camino a la playa)', type: 'restaurant',
              notes: 'Llevar un Bánh Mì Phượng de snack para la jornada de playa y bicicleta.',
              photo: 'https://picsum.photos/seed/banh-mi-phuong-beach-snack/200/200',
              description: 'El Bánh Mì Phượng (Phan Châu Trinh 2B) también es perfecto para llevar en la bici hacia la playa de An Bang: ligero, nutritivo y delicioso frío. Coger dos antes de salir a pedalear.',
              tips: 'Abre desde las 6:30 AM. Pedir para llevar ("mang về"). La playa An Bang está a 3-4 km del centro en bici.' }
          ],
          transport: [],
          hotel: { name: 'Por confirmar (Maichi Villa / Volar Hoi An)', address: 'Hoi An', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't22', text: 'Alquilar bicis en el hotel para el día', done: false }
          ],
          notes: 'Día de bicis y playa. Ba Na Hills es una excursión de día completo; combinarlo con la ruta de playa es difícil.'
        },
        {
          date: '2026-11-19', city: 'Hoi An → Siem Reap', country: '🇻🇳 Vietnam / 🇰🇭 Camboya', block: 'Angkor',
          summary: 'Última mañana en Hoi An. Vuelo desde Da Nang a Siem Reap (16:35-18:40). Llegada a Camboya.',
          places: [
            { name: 'Última mañana en el Old Town', type: 'monument',
              notes: 'Última oportunidad: café en azotea, compras de farolillos y despedida de Hoi An.',
              photo: 'https://picsum.photos/seed/hoi-an-morning-last-day/200/200',
              description: 'Las mañanas en el casco antiguo de Hoi An tienen una luz especial: las fachadas ocres se iluminan con el sol bajo y los cafés abren temprano. Última oportunidad para farolillos de seda, sastre a medida o un café en azotea.',
              tips: 'Los talleres artesanales de farolillos de cera cuestan ~5€. Reaching Out Vietnam (Nguyễn Thái Học 103): artesanías de artesanos con discapacidades.' }
          ],
          restaurants: [
            { name: 'Último desayuno vietnamita (Hoi An)', type: 'restaurant',
              notes: 'Bánh Mì Phượng o Xôi (arroz glutinoso) para llevar. La última comida de Vietnam.',
              photo: 'https://picsum.photos/seed/hoi-an-last-vietnam-breakfast/200/200',
              description: 'La última mañana en Vietnam antes de volar a Camboya. Desayuno obligatorio: Bánh Mì Phượng (Phan Châu Trinh 2B) recién horneado o Xôi (arroz glutinoso con cerdo, huevo y cebolla frita) envuelto en hoja de platanero para llevar mientras se pasea por el Old Quarter por última vez.',
              tips: 'El vuelo sale a las 16:35 desde Da Nang — check-out del hotel a las 12:00 y Grab al aeropuerto. Desayunar temprano y pasear el Old Quarter hasta las 11:00. Precio desayuno: 20.000-50.000 VND.' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo Da Nang (DAD) → Siem Reap (REP) — 16:35-18:40', from: 'Da Nang', to: 'Siem Reap', time: '16:35',
              pickup: 'Aeropuerto de Da Nang (DAD). Salida: 16:35. Llegada Siem Reap (REP): 18:40. Traslado al hotel en tuk-tuk desde el aeropuerto (~15-20 min, ~7 USD).' }
          ],
          hotel: { name: 'Por confirmar', address: 'Siem Reap', phone: '', checkIn: '20:00', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't23', text: 'Check-out hotel Hoi An', done: false },
            { id: 't24', text: 'Comprar pase Angkor 3 días ($62) al llegar a Siem Reap o mañana temprano', done: false }
          ],
          notes: 'Bienvenidos a Camboya. Primera noche: paseo por Pub Street y primera Angkor Beer.'
        },
        {
          date: '2026-11-20', city: 'Siem Reap', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Primer día en Siem Reap. Orientación, Wat Preah Prom Rath, Pub Street y preparación para Angkor.',
          places: [
            { name: 'Wat Preah Prom Rath', type: 'temple',
              notes: 'Templo budista activo en el centro de Siem Reap. Buda reclinado de 1500. Entrada gratuita.',
              photo: 'https://picsum.photos/seed/wat-preah-prom-rath-buddha/200/200',
              description: 'Uno de los templos budistas más hermosos del centro de Siem Reap. A diferencia de las ruinas grises de Angkor, este complejo destaca por sus tejados dorados y ser un monasterio vivo donde residen monjes. En el interior: Buda reclinado histórico de ~1500, jardines con estatuas coloridas narrando la vida de Buda y murales pintados a mano.',
              tips: 'En la orilla occidental del río de Siem Reap, a pocos pasos de Pub Street y Old Market. Entrada gratuita (dejar donativo). Mejor a primera hora o al atardecer para coincidir con los rezos de los monjes.' },
            { name: 'Pub Street y Old Market', type: 'monument',
              notes: 'El corazón del ocio de Siem Reap. Desde las 18:00 se corta al tráfico. Angkor Beer a 0,50 USD.',
              photo: 'https://picsum.photos/seed/pub-street-siem-reap-night/200/200',
              description: 'Pub Street (Street 08) se corta al tráfico a las 18:00 y se llena de viajeros. Precios bajos: jarras de cerveza local desde 0,50-1 USD. Amok (curry jemer) y barbacoa camboyana. El bar más famoso: The Red Piano (donde Angelina Jolie tomaba cócteles durante el rodaje de Tomb Raider).',
              tips: 'Old Market (Phsar Chas) justo al lado: artesanías, kramas (pañuelos camboyanos) y souvenirs. Le Pain Du Coeur: panadería a la vuelta que a partir de las 18:00 pone todo a mitad de precio.' }
          ],
          restaurants: [
            { name: 'Le Pain Du Coeur', type: 'cafe',
              notes: 'Panadería cerca de Pub Street. A partir de las 18:00 todo a mitad de precio.',
              photo: 'https://picsum.photos/seed/bakery-siem-reap-bread/200/200',
              description: 'Panadería artesanal en Siem Reap con bollería y pan casero. A partir de las 18:00 toda la pastelería del día baja a la mitad de precio.',
              tips: 'Ideal para un desayuno al día siguiente o snack de tarde. Cerca de Pub Street.' }
          ],
          transport: [],
          hotel: { name: 'Por confirmar', address: 'Siem Reap', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't25', text: 'Comprar pase Angkor 3 días: $62 (angkorenterprise.gov.kh)', done: false },
            { id: 't26', text: 'Alquilar tuk-tuk para mañana (amanecer en Angkor Wat + circuito largo)', done: false }
          ],
          notes: 'Código de vestimenta ESTRICTO en Angkor: hombros Y rodillas cubiertas. Sin tirantes ni pantalón corto aunque te tapes con pañuelo — NO te dejarán entrar.'
        },
        {
          date: '2026-11-21', city: 'Siem Reap', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Angkor en bicicleta: circuito corto. Angkor Wat, la gran ciudad de Angkor Thom con el Bayon y el místico Ta Prohm.',
          places: [
            { name: 'Angkor Wat', type: 'monument',
              notes: 'El monumento religioso más grande del mundo. 162 hectáreas. 2.000 apsaras talladas. Ver también a media mañana cuando se van los grupos del amanecer.',
              photo: 'https://picsum.photos/seed/angkor-wat-sunrise-reflection/200/200',
              description: 'El mayor monumento religioso jamás construido (162 hectáreas). Símbolo nacional de Camboya (aparece en su bandera). Cinco torres centrales (la mayor de 65m) representan el Monte Meru. Sus galerías tienen más de 2.000 apsaras únicas y relieves épicos: Batalla de Kurukshetra y el Batido del Océano de Leche. Construido en el s.XII por Suryavarman II para Vishnú, luego adaptado al budismo.',
              tips: 'Abre a las 5:00 para el amanecer. El mejor punto del amanecer: estanque frontal DERECHO (mirando al templo de frente). Para el amanecer: llegar 1h antes del sol con el pase ya comprado. La estrategia clave: ver el amanecer, ir a explorar Angkor Thom o Ta Prohm mientras todos hacen cola, y REGRESAR a Angkor Wat a media mañana para recorrerlo con tranquilidad. Visita: 2-3 horas mínimo.' },
            { name: 'Angkor Thom — Bayon y la Gran Ciudad', type: 'monument',
              notes: '9 km² de ciudad amurallada. Bayon: 54 torres con 216 caras sonrientes. Terraza de los Elefantes.',
              photo: 'https://picsum.photos/seed/bayon-temple-faces-angkor/200/200',
              description: 'La última gran capital del Imperio Jemer (s.XII). Murallas de 8m y foso de 100m. Las cinco puertas tienen torres con cuatro caras gigantes de Avalokiteshvara. Dentro: el Bayon (54 torres con 216 caras enigmáticas — ¿Avalokiteshvara o el rey?), el Baphuon (templo-montaña con Buda reclinado gigante), la Terraza de los Elefantes (plataforma ceremonial con esculturas de elefantes) y la Terraza del Rey Leproso.',
              tips: 'Medio día como mínimo. Para evitar aglomeraciones en el Bayon: entrar a primera hora de la mañana. ⚠️ Hay una comunidad de monos que viven libres en la zona — se han vuelto agresivos, buscan comida en las mochilas, NO alimentarlos.' },
            { name: 'Ta Prohm (Templo Tomb Raider)', type: 'monument',
              notes: 'Las raíces de las ceibas devoran literalmente la piedra. Escenario de Lara Croft. Visitar temprano.',
              photo: 'https://picsum.photos/seed/ta-prohm-tree-roots-stone/200/200',
              description: 'Mundialmente famoso porque las raíces de enormes ceibas e higueras abrazan y estrangulan los muros de piedra, creando una atmósfera mística. Los exploradores franceses del s.XIX lo dejaron casi como lo encontraron. Hay un curioso relieve que parece mostrar un estegosaurio (debatido). Mandado construir por Jayavarman VII como monasterio en memoria de su madre.',
              tips: 'Ir a primera hora de la mañana para recorrerlo con tranquilidad y escuchar los sonidos de la selva sin multitudes. No saltarse las zonas restringidas para una foto. Visita: ~1 hora.' }
          ],
          restaurants: [
            { name: 'Fish Amok (curry jemer en hoja de coco)', type: 'restaurant',
              notes: '⭐ PLATO NACIONAL DE CAMBOYA. Mousse de curry de pescado al vapor. Suave y perfumado.',
              photo: 'https://picsum.photos/seed/fish-amok-cambodia-coconut-leaf/200/200',
              description: 'El plato más emblemático de la cocina camboyana: mousse de curry (kroeung) de pescado de río al vapor en hoja de palmera, perfumada con lemongrass, galangal, cúrcuma y hojas de kaffir lime. Textura cremosa y sabor dulce sin el picante del curry tailandés.',
              tips: 'Disponible en todos los restaurantes de Pub Street y Old Market. Precio: $4-8. Acompañar con arroz jazmín. Evitar los turísticos con menú plastificado — los más auténticos tienen carta en jemer.' },
            { name: 'Lok Lak (ternera salteada camboyana)', type: 'restaurant',
              notes: 'Dados de ternera marinada salteada con pimienta negra de Kampot. La pimienta más famosa del mundo.',
              photo: 'https://picsum.photos/seed/lok-lak-cambodia-beef-pepper/200/200',
              description: 'Dados de ternera marinados en salsa de ostras y soja, salteados a fuego vivo y servidos sobre lechuga fresca con tomate y cebolla. La salsa de lima con pimienta de Kampot (la más valorada del mundo, cultivada en el sur de Camboya) es el toque distintivo.',
              tips: 'Con huevo frito encima (versión clásica). La pimienta de Kampot es el ingrediente clave — preguntar si la tienen. Precio: $4-7. También existe en versión de langostinos.' },
            { name: 'Kuy Teav (sopa de fideos jemer del desayuno)', type: 'restaurant',
              notes: 'La sopa del desayuno de Camboya. Caldo de hueso de cerdo, fideos de arroz y ajo frito.',
              photo: 'https://picsum.photos/seed/kuy-teav-cambodia-breakfast/200/200',
              description: 'El equivalente camboyano del Phở vietnamita: fideos de arroz finos en un caldo limpio de hueso de cerdo con ajo frito, brotes de soja y hierbas. Se añade lima, sal y azúcar al gusto. Los puestos callejeros abren desde las 5 AM — perfecto antes de salir a Angkor al amanecer.',
              tips: 'Old Market (Phsar Chas) a las 5 AM. Precio: $1-2. Pedir para llevar en vaso y tomar en el tuk-tuk de camino a Angkor.' }
          ],
          transport: [
            { type: 'bike', icon: '🚲', details: 'Bicicleta — circuito corto de Angkor', from: 'Siem Reap', to: 'Angkor', time: '05:00',
              pickup: 'Alquilar bici en el hotel o en Pub Street: $1-3/día. El circuito corto desde el hotel dura ~10 min hasta la entrada principal de Angkor.' }
          ],
          hotel: { name: 'Por confirmar', address: 'Siem Reap', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't27', text: 'Llevar ropa con hombros y rodillas cubiertos (obligatorio en todos los templos)', done: false }
          ],
          notes: 'El pase de 3 días ($62) incluye todos los templos excepto Koh Ker ($5), Beng Mealea ($10) y Kbal Spean ($5). El recinto abre de 5:00 a 17:30.'
        },
        {
          date: '2026-11-22', city: 'Siem Reap', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Angkor en tuk-tuk: circuito largo. Amanecer en Angkor Wat, Preah Khan, Neak Pean, Banteay Srei (la joya de piedra rosa) y atardecer en Pre Rup.',
          places: [
            { name: 'Amanecer en Angkor Wat (2º día)', type: 'monument',
              notes: 'Segundo amanecer. Luego explorar mientras el resto hace cola.',
              photo: 'https://picsum.photos/seed/angkor-wat-sunrise-golden/200/200',
              description: 'El segundo amanecer en Angkor Wat es igual de mágico. La estrategia: ver salir el sol desde el estanque derecho, luego partir a los templos del circuito largo mientras el grueso de turistas invade Angkor Wat.',
              tips: 'Llegar 1h antes del amanecer. Tener el pase del día anterior.' },
            { name: 'Preah Khan (La Espada Sagrada)', type: 'monument',
              notes: 'Uno de los más grandes y menos masificados. 60 min. Raíces de higueras como en Ta Prohm pero en silencio.',
              photo: 'https://picsum.photos/seed/preah-khan-temple-jungle/200/200',
              description: 'Su nombre significa "Espada Sagrada". Uno de los templos más grandes de Angkor pero mucho menos concurrido que Ta Prohm. Raíces de higueras fusionadas con la piedra, galerías concéntricas y un ambiente laberíntico. Construido por Jayavarman VII en el lugar donde derrotó a los invasores cham.',
              tips: 'Visita: ~60 min. Tomarse el tiempo para los rincones laberínticos. Muy cercano a Neak Pean.' },
            { name: 'Neak Pean (Templo-Isla)', type: 'monument',
              notes: 'Santuario de purificación en isla central rodeado de 4 estanques. Pasarela de madera sobre el baray.',
              photo: 'https://picsum.photos/seed/neak-pean-water-temple/200/200',
              description: 'Santuario de purificación en el centro de un gran estanque cuadrado, rodeado de cuatro estanques menores en forma de cruz. El acceso es por una preciosa pasarela de madera que cruza el baray. En noviembre, los estanques están llenos tras el monzón.',
              tips: 'Visita: ~30 min. La pasarela de madera sobre el agua es muy fotogénica. Combinarlo con Preah Khan.' },
            { name: 'Banteay Srei (La Joya de Angkor)', type: 'monument',
              notes: 'La "Ciudadela de las Mujeres". Piedra arenisca ROSA. Los relieves más finos y detallados de todo el arte jemer.',
              photo: 'https://picsum.photos/seed/banteay-srei-pink-sandstone/200/200',
              description: 'Considerado el punto culminante del arte decorativo jemer. Construido en piedra arenisca de color rosado (único en Angkor). Sus relieves en piedra roja son los más finos y detallados de todo el complejo: escenas del Ramayana con un nivel de detalle asombroso. Construido en 967 d.C. por un sacerdote (no por un rey), consagrado a Shiva.',
              tips: 'A 25 km del núcleo principal. Requiere ~1h de trayecto. En tuk-tuk o coche privado. Visita: 45-60 min. Imprescindible incluirlo. La piedra rosa al atardecer es espectacular.' },
            { name: 'Pre Rup (atardecer)', type: 'monument',
              notes: 'Templo-montaña del s.X. Las mejores vistas al atardecer desde la cima.',
              photo: 'https://picsum.photos/seed/pre-rup-sunset-pyramid/200/200',
              description: 'Imponente templo-montaña piramidal de tres niveles construido en 961 d.C. Desde su cima hay vistas espectaculares de los alrededores, especialmente hermosas durante el atardecer. Cinco torres en la cima dispuestas como los puntos de un dado.',
              tips: 'Visita: 30-45 min. Llegar 30-40 min antes del ocaso para asegurar un buen sitio en la cima.' },
            { name: 'Ta Som', type: 'monument',
              notes: 'Como Ta Prohm pero sin turistas. La puerta este envuelta en raíces de higuera es icónica.',
              photo: 'https://picsum.photos/seed/ta-som-east-gate-fig-tree/200/200',
              description: 'Templo con gopuras decoradas con caras de piedra al estilo Bayon. Su punto más fotogénico es la puerta este envuelta por raíces de higuera gigante. Mucho más tranquilo que Ta Prohm.',
              tips: 'Visita: 30 min. Imprescindible caminar hasta la puerta este — es la estampa más bonita del recinto. Casi sin turistas.' },
            { name: 'Srah Srang (El Estanque Real)', type: 'monument',
              notes: 'Estanque real del s.X frente a Banteay Kdei. Amanecer desde las escalinatas de nagas.',
              photo: 'https://picsum.photos/seed/srah-srang-royal-pool-angkor/200/200',
              description: 'Enorme estanque artificial construido en el s.X para los rituales de purificación de los reyes jemer. Sus escalinatas de piedra con nagas (serpientes sagradas) y garuda bajan al agua. Frente a él se encuentra Banteay Kdei. En la orilla este, al amanecer, el reflejo de los árboles en el agua es extraordinariamente tranquilo y fotogénico.',
              tips: 'Entre Banteay Kdei y Ta Prohm. Gratis, incluido en el pase de Angkor. Amanecer aquí es una alternativa más íntima al de Angkor Wat — casi sin turistas. 5 min en bici desde Ta Prohm.' },
            { name: 'Banteay Kdei (El Monasterio de las Celdas)', type: 'monument',
              notes: 'Monasterio budista del s.XII. Raíces, gárgolas y galerías laberínticas. Prácticamente sin turistas.',
              photo: 'https://picsum.photos/seed/banteay-kdei-monastery-jungle/200/200',
              description: 'Monasterio budista construido por Jayavarman VII en el s.XII, coetáneo de Ta Prohm pero mucho menos visitado. Sus cuatro niveles de murallas alojan galerías con gárgolas grotescas, imágenes de apsaras bailarinas y raíces de higuera que emergen entre las piedras. Queda justo frente al Estanque Srah Srang.',
              tips: 'Visita: 30-40 min. Prácticamente sin colas. A 5 min en bici de Ta Prohm. Perfecto para combinarlo con Srah Srang al amanecer antes de ir a los templos principales.' },
            { name: 'Banteay Samré (El Templo del Rey Sambor)', type: 'monument',
              notes: 'Templo del s.XII en perfecto estado. Estilo angkoriano puro. A 15 km del centro, sin masas.',
              photo: 'https://picsum.photos/seed/banteay-samre-temple-moat/200/200',
              description: 'Construido en el s.XII en honor a Vishnú, Banteay Samré destaca por ser uno de los templos mejor conservados de todo el complejo de Angkor. Su foso exterior todavía retiene agua, creando reflejos preciosos. El estilo es angkoriano clásico con torres en forma de mazorca de maíz (prasat) y galerías cruciformes.',
              tips: 'A 15 km al este del núcleo principal (30 min en tuk-tuk). Entrada incluida en el pase de Angkor. Visita: 45 min. Sin apenas turistas. Impresionante combinado con el Mebon Oriental al ser de camino.' },
            { name: 'El Mebon Oriental (Los Elefantes en el Islote)', type: 'monument',
              notes: 'Templo-isla del s.X con elefantes de piedra en cada esquina. El baray seco lo rodea como un fantasma.',
              photo: 'https://picsum.photos/seed/east-mebon-elephant-temple/200/200',
              description: 'Construido en el año 952 en el centro de un enorme embalse artificial (baray oriental), hoy seco. El templo de tres niveles está custodiado por elefantes de piedra a tamaño natural en las esquinas de cada plataforma. Las cuatro torres centrales representan las cumbres del Monte Meru. Es la pareja arquitectónica del Pre Rup, construido poco después con el mismo patrón.',
              tips: 'Entre Banteay Srei y el núcleo central de Angkor. Entrada incluida en el pase. Visita: 30-40 min. Combinar con Pre Rup (justo al sur) para un recorrido de tarde. Los elefantes de las esquinas son muy fotogénicos.' }
          ],
          restaurants: [
            { name: 'Num Banh Chok (fideos jemer al amanecer)', type: 'restaurant',
              notes: '⭐ EL DESAYUNO MÁS JEMER. Fideos de arroz fermentados con curry verde fresco de pescado.',
              photo: 'https://picsum.photos/seed/nom-banh-chok-khmer-breakfast/200/200',
              description: 'El desayuno más auténtico de Camboya: fideos de arroz fermentados (Num Banh Chok) con curry verde fresco de pescado, lemongrass y galangal, coronados con pepino, flor de plátano verde, hierbas y brotes. Solo se encuentra en puestos callejeros — nunca en restaurantes turísticos.',
              tips: 'Vendedoras ambulantes con cesto en los aledaños del templo de Angkor entre las 5:30-7:30 AM. Precio: $0.50-1. Si no se encuentra, sustituir por Kuy Teav en el Old Market.' },
            { name: 'Amok de pollo o verduras (cena en Pub Street)', type: 'restaurant',
              notes: 'Cena tras el largo día de Angkor. Fish Amok o versión de pollo/vegana con arroz jazmín.',
              photo: 'https://picsum.photos/seed/angkor-pub-street-amok-dinner/200/200',
              description: 'Tras un día largo visitando Banteay Srei, Pre Rup y el circuito largo, la cena en Pub Street es la recompensa: Amok de pollo al vapor con arroz jazmín y una Angkor Beer helada a $0.50. Los restaurantes de Pub Street sirven hasta las 23:00.',
              tips: 'The Red Piano (donde Angelina Jolie comía en el rodaje de Tomb Raider): calle Street 8. Precio: $5-10 con bebida incluida. El ambiente nocturno de Pub Street es muy animado.' }
          ],
          transport: [
            { type: 'bike', icon: '🛺', details: 'Tuk-tuk con conductor — circuito largo de Angkor', from: 'Siem Reap', to: 'Angkor', time: '04:30',
              pickup: 'Tuk-tuk con conductor: $15-25/día dependiendo de la ruta. El conductor espera en la puerta de cada templo con agua fría. Acordar precio la noche anterior incluyendo el amanecer.' }
          ],
          hotel: { name: 'Por confirmar', address: 'Siem Reap', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [],
          notes: 'Banteay Srei está bastante alejado — dedicarle tiempo y no combinarlo con demasiadas cosas ese día.'
        },
        {
          date: '2026-11-23', city: 'Siem Reap → Costa', country: '🇰🇭 Camboya', block: 'Angkor',
          summary: 'Tercer día en Angkor: Beng Mealea (templo devorado por la selva) o Grupo Roluos. Tarde: bus nocturno a Sihanoukville.',
          places: [
            { name: 'Beng Mealea (templo devorado por la selva)', type: 'monument',
              notes: 'A 40 km. El templo más selvático de Angkor. La selva lo devora sin restauración. $10 fuera del pase.',
              photo: 'https://picsum.photos/seed/beng-mealea-jungle-temple/200/200',
              description: 'A 40 km del núcleo principal. A diferencia de los templos del circuito principal, Beng Mealea ha sido prácticamente dejado a la selva: raíces gigantescas, piedras derrumbadas y pasillos que se hunden bajo la vegetación crean una atmósfera de exploración auténtica.',
              tips: 'A 40 km: en tuk-tuk ~1,5h, en coche 45 min. Entrada: $10 (no incluida en el pase). Combinar con los Roluos de camino de vuelta.' },
            { name: 'Grupo Roluos (orígenes de Angkor)', type: 'monument',
              notes: 'La cuna del estilo jemer. s.IX. Bakong, Preah Ko y Lolei. Muy tranquilos, sin masas.',
              photo: 'https://picsum.photos/seed/bakong-roluos-group-brick/200/200',
              description: 'Los templos más antiguos del complejo (s.IX), situados a 13 km al sureste de Siem Reap. Pertenecieron a la primera gran capital del Imperio Jemer. Bakong (el primer templo-montaña, modelo para Angkor Wat), Preah Ko (el Buey Sagrado) y Lolei (construido en una isla artificial). Todos en ladrillo y estuco, mucho menos concurridos.',
              tips: 'A 13 km al sureste de Siem Reap. En bici o tuk-tuk. Visita: ~2 horas. Sin apenas turistas. Combinarlo con Beng Mealea si se tiene coche.' }
          ],
          restaurants: [
            { name: 'Khmer BBQ (última noche en Siem Reap)', type: 'restaurant',
              notes: 'Hornillo de carbón en la mesa: cocodrilo, jabalí, canguro y ternera a la brasa. Experiencia única.',
              photo: 'https://picsum.photos/seed/khmer-bbq-siem-reap-grill/200/200',
              description: 'La despedida perfecta de Siem Reap: pequeños hornillos de carbón sobre la mesa donde se asan carnes exóticas — cocodrilo, canguro, jabalí, serpiente y ternera. Se moja en salsas de ajo y jengibre. La última Angkor Beer ($0.50) de la noche antes del bus nocturno.',
              tips: 'Zona de Pub Street y Street 8. Precio: $8-15 todo lo que puedas comer. El cocodrilo tiene textura de pollo-pescado. El jabalí y el ternera son las opciones más seguras si no te atreves con lo exótico. Cenar a las 18:00 para coger el bus de las 21:00.' }
          ],
          transport: [
            { type: 'sleeper-bus', icon: '🚌', details: 'Bus nocturno Siem Reap → Sihanoukville (para el ferry a Koh Rong)', from: 'Siem Reap', to: 'Sihanoukville', time: '21:00',
              pickup: 'Bus nocturno desde Siem Reap hacia Sihanoukville. Algunos servicios ya incluyen el ferry. Reservar con antelación. Llegada a Sihanoukville de madrugada/mañana temprana.' }
          ],
          hotel: { name: 'Por confirmar', address: 'Siem Reap', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't28', text: 'Check-out hotel Siem Reap (guardar maletas)', done: false },
            { id: 't29', text: 'Confirmar ferry Koh Rong Sanloem desde Ochheuteal Pier', done: false }
          ],
          notes: 'Último día en tierra firme camboyana. Bus nocturno al mar.'
        },
        {
          date: '2026-11-24', city: 'Koh Rong Sanloem', country: '🇰🇭 Camboya', block: 'Koh Rong',
          summary: 'Ferry desde Sihanoukville a Koh Rong Sanloem. Día de descanso absoluto en Saracen Bay.',
          places: [
            { name: 'Saracen Bay', type: 'beach',
              notes: 'La playa principal de la isla. 3 km de media luna. Piscina natural sin olas. Arena blanca.',
              photo: 'https://picsum.photos/seed/saracen-bay-koh-rong-beach/200/200',
              description: 'La playa principal de Koh Rong Sanloem: una enorme bahía en forma de media luna de 3 km. El agua es una piscina natural — prácticamente sin olas, cristalina, cubre muy poco y se puede caminar decenas de metros hacia adentro con el agua por la cintura. Aquí se concentran la mayoría de hoteles, resorts de bungalows y restaurantes.',
              tips: 'A pesar de ser la más concurrida, nunca se siente masificada. Perfecta para caminar por la orilla, cenar a la luz de las velas y tomar algo.' },
            { name: 'Sunset Beach', type: 'beach',
              notes: 'La mejor puesta de sol de la isla. Cruzando la selva 40-50 min (con cuerdas). Snorkel.',
              photo: 'https://picsum.photos/seed/sunset-beach-koh-rong-jungle/200/200',
              description: 'En la costa oeste, accesible cruzando la isla por un sendero con tramos empinados y cuerdas instaladas en los árboles. El oleaje la hace perfecta para nadar y hacer snorkel. Como su nombre indica, los mejores atardeceres de la isla.',
              tips: 'Trekking: 40-50 min por trayecto, sendero empinado con cuerdas en algunos tramos. Ver el atardecer con una cerveza es un ritual. Hay una pequeña escuela de buceo.' },
            { name: 'Lazy Beach', type: 'beach',
              notes: 'Playa privada accesible a pie. 30 min por sendero plano. Arena dorada y hamacas en silencio.',
              photo: 'https://picsum.photos/seed/lazy-beach-koh-rong-golden/200/200',
              description: 'Playa semiprivada (libre acceso a pie) en el suroeste. Arena dorada —diferente al blanco de Saracen— enmarcada por pinos tropicales. Solo hay un complejo de bungalows con restaurante. Sin música alta ni ruidos.',
              tips: 'Sendero desde el centro de Saracen Bay: 25-30 min, bastante plano. El lugar más silencioso de la isla. Ideal para leer en hamaca.' },
            { name: "M'Pai Bay (pueblo local)", type: 'beach',
              notes: 'Extremo norte. Pueblo de pescadores. Coral para snorkel desde la orilla. Más barato.',
              photo: 'https://picsum.photos/seed/mpai-bay-fishing-village/200/200',
              description: "En el extremo norte de la isla. Pequeña bahía con un pueblo de pescadores locales. No tan espectacular como Saracen pero tiene arrecife de coral cerca de la orilla para snorkel. La zona más barata y con más ambiente mochilero.",
              tips: 'La zona más económica de la isla. Hostales, bares con música en vivo y restaurantes de marisco fresco barato.' }
          ],
          restaurants: [
            { name: 'Mariscos frescos a la brasa (Saracen Bay)', type: 'restaurant',
              notes: 'Langostinos tigre, barracuda y calamar del día. A la parrilla con ajo y coco. Todo en USD.',
              photo: 'https://picsum.photos/seed/koh-rong-seafood-bbq-beach/200/200',
              description: 'Los restaurantes de bungalows en Saracen Bay sirven mariscos recién pescados: langostinos tigre (tôm hùm), barracuda a la sal, calamar a la brasa y cangrejo al coco. La isla tiene acceso directo a pescadores locales — producto fresquísimo a precios razonables.',
              tips: 'Pagar todo en dólares americanos (USD) — es la moneda de la isla. Precio: $8-15 por persona con bebida. Pedir el marisco con antelación (1-2h) para que lo tengan listo. El restaurante del propio bungalow es la opción más cómoda.' },
            { name: 'Cena a la luz de las velas en la playa', type: 'restaurant',
              notes: 'Cenar con los pies en la arena, mar en calma y faroles. La experiencia isla completa.',
              photo: 'https://picsum.photos/seed/koh-rong-candle-dinner-beach/200/200',
              description: 'Varios bares-restaurante en Saracen Bay ponen mesas con velas directamente en la playa al atardecer. Ambiente tranquilo, sin música alta, con el sonido del mar. Carta sencilla: hamburguesas, pasta, mariscos y cocktails tropicales.',
              tips: 'Los bares de M\'Pai Bay (norte de la isla, 20 min en barca) tienen los precios más económicos. Los de Saracen Bay son algo más caros pero muy bien situados. Precio cocktail: $3-5.' }
          ],
          transport: [
            { type: 'ferry', icon: '⛴️', details: 'Ferry Sihanoukville → Koh Rong Sanloem (~45 min)', from: 'Sihanoukville', to: 'Koh Rong Sanloem', time: '09:00',
              pickup: 'Ochheuteal Pier, Sihanoukville. Varios horarios disponibles. El ferry llega a Saracen Bay (muelle principal de Koh Rong Sanloem).' }
          ],
          hotel: { name: 'Por confirmar', address: 'Koh Rong Sanloem', phone: '', checkIn: '14:00', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't30', text: 'Check-in bungalow en Koh Rong Sanloem', done: false }
          ],
          notes: 'Día de descanso absoluto. Sin plan, sin rutas. Isla, hamaca y mar.'
        },
        {
          date: '2026-11-25', city: 'Koh Rong Sanloem', country: '🇰🇭 Camboya', block: 'Koh Rong',
          summary: 'Jungla, trekking al faro militar y plancton bioluminiscente por la noche.',
          places: [
            { name: 'Trekking al Faro Militar (la más épica)', type: 'nature',
              notes: 'Desde Saracen Bay hasta el faro en la punta sur. 4h ida/vuelta. Vistas panorámicas de toda la isla.',
              photo: 'https://picsum.photos/seed/lighthouse-koh-rong-trek/200/200',
              description: 'La ruta más larga y épica de la isla. Desde el sur de Saracen Bay hasta el viejo faro militar en la punta sur. 4 horas en total (ida y vuelta) por sendero de tierra y rocas bajo densa jungla tropical. Al llegar, pagar ~1 USD de propina al guarda para subir por la escalera de caracol del faro. Las vistas panorámicas de la isla y el Golfo de Tailandia desde arriba valen cada gota de sudor.',
              tips: 'Llevar agua suficiente (al menos 2L), protector solar y calzado de trekking. El sol en la selva es intenso aunque no se vea.' },
            { name: 'Plancton Bioluminiscente (noche)', type: 'nature',
              notes: 'El agua brilla de azul en la oscuridad. Nadar de noche entre plancton bioluminiscente.',
              photo: 'https://picsum.photos/seed/bioluminescent-plankton-sea/200/200',
              description: 'Koh Rong Sanloem es uno de los mejores lugares del mundo para ver plancton bioluminiscente. De noche, al mover el agua, aparecen destellos azulados mágicos. Se puede ver desde el muelle o nadando en la bahía oscura.',
              tips: 'Las noches sin luna son las mejores (luna nueva). Alejarse de las luces de los bares para que la oscuridad sea total. Far East Beach es otro punto conocido para verlo.' }
          ],
          restaurants: [
            { name: 'Comida post-trekking (bar de playa)', type: 'restaurant',
              notes: 'Después del faro: ensalada de papaya verde, brochetas de gambas y zumo de coco fresco.',
              photo: 'https://picsum.photos/seed/koh-rong-post-trek-salad/200/200',
              description: 'Tras las 4 horas de trekking al faro, el cuerpo pide algo fresco y ligero: ensalada de papaya verde (Bok L\'hong) con gambas, brochetas de gambas a la brasa con arroz de coco, o un gran zumo de coco fresco directamente de la cáscara.',
              tips: 'Los bares de la playa principal sirven comida todo el día. Cena ligera antes del baño de plancton — mejor no estar demasiado lleno. En USD. Precio: $5-10.' }
          ],
          transport: [],
          hotel: { name: 'Por confirmar', address: 'Koh Rong Sanloem', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't31', text: 'Confirmar ferry a Sihanoukville para mañana + miniván a Phnom Penh', done: false }
          ],
          notes: 'Una de las noches más especiales del viaje: nadar entre plancton bioluminiscente en la oscuridad.'
        },
        {
          date: '2026-11-26', city: 'Phnom Penh', country: '🇰🇭 Camboya', block: 'Phnom Penh',
          summary: 'Ferry + miniván a Phnom Penh. Llegada a la capital. Paseo nocturno por el Riverside junto al Mekong.',
          places: [
            { name: 'Riverside (Siskiwath Quay)', type: 'monument',
              notes: 'Avenida peatonal al atardecer junto al río Tonlé Sap. Crucero Mekong al anochecer ($5).',
              photo: 'https://picsum.photos/seed/phnom-penh-riverside-mekong/200/200',
              description: 'La avenida principal de Phnom Penh bordea el río Tonlé Sap. Al atardecer se llena de locales paseando, haciendo ejercicio y cenando frente al agua. Desde aquí salen pequeños barcos de madera para cruceros de 1 hora por el Mekong ($5 USD) viendo el skyline iluminado.',
              tips: 'Crucero al atardecer: ~5 USD por persona, ~1 hora. Los barcos salen desde el mismo Riverside. El mejor momento: a partir de las 17:00.' },
            { name: 'Central Market (Phsar Thmei)', type: 'market',
              notes: 'Art Déco 1937. Cúpula amarilla de 26m sin columnas. Joyería, ropa y mercado de comida.',
              photo: 'https://picsum.photos/seed/phnom-penh-central-market-dome/200/200',
              description: 'Obra maestra del Art Déco colonial construida en 1937. Cúpula central de 26m de altura sin columnas de soporte (ventilación natural excelente). Bajo la cúpula: joyería, relojes y oro. En los cuatro brazos: ropa, electrónica, telas camboyanas (kramas) y souvenirs. En los pasillos exteriores: mercado de comida fresca.',
              tips: 'L-D 7:00-17:00. Mejor 9:30-11:30 o 14:30-16:00. Regatear con educación: se puede conseguir un 20-40% de descuento. Pagar solo en efectivo (USD o KHR), billetes sin romper.' }
          ],
          restaurants: [
            { name: 'Bai Sach Chrouk (cerdo a la brasa, desayuno de Phnom Penh)', type: 'restaurant',
              notes: '⭐ EL DESAYUNO DE PHNOM PENH. Cerdo marinado en coco y ajo, a la brasa sobre arroz blanco.',
              photo: 'https://picsum.photos/seed/bai-sach-chrouk-cambodia-rice/200/200',
              description: 'El desayuno más popular de Phnom Penh: lonchas finas de cerdo marinadas en leche de coco, azúcar de palma y ajo, asadas sobre brasa de carbón y servidas sobre arroz blanco con encurtido de papaya verde y caldo suave de huesos. Simple, nutritivo y delicioso.',
              tips: 'Puestos en el Central Market desde las 6 AM. Precio: $1-2. Los mejores puestos desaparecen antes de las 9:30 AM — madrugar. Acompañar con té de jazmín camboyano.' },
            { name: 'Lap Khmer (ceviche camboyano de ternera)', type: 'restaurant',
              notes: 'Ternera cruda marinada en lima con lemongrass y pimienta de Kampot. El ceviche de Camboya.',
              photo: 'https://picsum.photos/seed/lap-khmer-beef-lime-cambodia/200/200',
              description: 'El "ceviche" camboyano: lonchas muy finas de ternera cruda que se "cocinan" en zumo de lima, mezcladas con lemongrass, galangal, hojas de kaffir lime, chalotes y pimienta de Kampot. La textura es tierna y el sabor intensamente aromático.',
              tips: 'Solo en restaurantes de confianza del Riverside. Precio: $5-9. Acompañar con arroz jazmín. La primera noche es perfecta para pasear el Riverside mientras se cena.' }
          ],
          transport: [
            { type: 'ferry+minivan', icon: '⛴️', details: 'Ferry + miniván Koh Rong → Phnom Penh (~4h total, ~27€)', from: 'Koh Rong Sanloem', to: 'Phnom Penh', time: '08:00',
              pickup: 'Ferry desde Koh Rong Sanloem a Sihanoukville (~45 min) + miniván exprés Sihanoukville → Phnom Penh (~3h). Precio total: ~27€. Reservar con antelación en la isla.' }
          ],
          hotel: { name: 'Por confirmar', address: 'Phnom Penh', phone: '', checkIn: '15:00', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't32', text: 'Check-in hotel Phnom Penh', done: false }
          ],
          notes: 'Llegada a Phnom Penh a media tarde. Paseo nocturno junto al Mekong para ambientarse en la capital.'
        },
        {
          date: '2026-11-27', city: 'Phnom Penh → Hanói', country: '🇰🇭 Camboya / 🇻🇳 Vietnam', block: 'Phnom Penh',
          summary: 'Historia y regreso a Vietnam. S-21 y los Killing Fields por la mañana. Palacio Real. Vuelo nocturno a Hanói (20:00-21:55). Reserva XCWJ9H.',
          places: [
            { name: 'Tuol Sleng S-21 (Museo del Genocidio)', type: 'museum',
              notes: 'Antigua escuela convertida en cámara de tortura del régimen de Pol Pot. Audioguía en español imprescindible.',
              photo: 'https://picsum.photos/seed/tuol-sleng-s21-prison-museum/200/200',
              description: 'Una antigua escuela secundaria (Tuol Svay Prey) convertida por Pol Pot en prisión de alta seguridad. Más de 18.000 prisioneros. Solo un puñado de supervivientes conocidos. Cuatro bloques: A (celdas con instrumentos de tortura originales), B (galerías con miles de fotos en blanco y negro de los prisioneros — la parte más sobrecogedora), C (diminutas celdas de aislamiento) y D (reglas de seguridad y documentación del régimen). A veces hay supervivientes que firman sus libros.',
              tips: 'Calle 113. 8:00-17:00. Entrada: $5. CON AUDIOGUÍA EN ESPAÑOL: $10 — totalmente imprescindible, con testimonios desgarradores de supervivientes. En Grab: 10-15 min al sur del Palacio Real, $2-3 USD. Necesitas 2-3 horas.' },
            { name: 'Choeung Ek (The Killing Fields)', type: 'museum',
              notes: 'A 15 km del centro. Estupa con 9.000 cráneos. Audioguía con el Árbol de los Niños y los Altavoces.',
              photo: 'https://picsum.photos/seed/killing-fields-choeung-ek-stupa/200/200',
              description: 'A donde trasladaban a los prisioneros de la S-21 para ser ejecutados. El punto central es una gran estupa de cristal de 17 pisos con más de 9.000 cráneos clasificados por sexo y edad. El Árbol de los Niños (pulseras de colores de homenaje), el Árbol de los Altavoces (con música para amortiguar los gritos) y las fosas comunes donde la lluvia sigue haciendo emerger restos.',
              tips: '8:00-17:30. $6 (incluye audioguía obligatoria en español). En Grab: 40-50 min, $5-7 ida. La mejor opción: negociar un tuk-tuk por $15-20 que te lleve, espere y te traiga de vuelta (2h visita). Con S-21 forman un día de historia muy intenso emocionalmente.' },
            { name: 'Palacio Real y Pagoda de Plata', type: 'monument',
              notes: '5.329 baldosas de plata pura. Buda de oro macizo de 90 kg con 9.584 diamantes. Sala del Trono.',
              photo: 'https://picsum.photos/seed/royal-palace-phnom-penh-golden/200/200',
              description: 'Complejo edificado en 1866, residencia oficial del monarca. La Pagoda de Plata (Wat Preah Keo Morakot): suelo con 5.329 baldosas de plata pura de ~1 kg cada una. Altar: Buda de oro macizo de 90 kg decorado con 9.584 diamantes (el mayor de 25 quilates corona su frente). También: el pequeño Buda de Esmeralda del s.XVII y los murales exteriores del Reamker (versión camboyana del Ramayana).',
              tips: 'Turnos: 8:00-11:00 y 14:00-17:00. $10 (solo efectivo). Guía oficial en español: $10 adicionales por grupo. Cubrir hombros y rodillas obligatorio. Puede cerrar sin previo aviso si hay acto oficial de la monarquía. Entrar a las 8:00 para esquivar el calor extremo en los jardines.' },
            { name: 'Mercado Ruso (Tuol Tom Poung)', type: 'market',
              notes: 'Más laberíntico y local que el Central Market. Excedentes de fábrica de Nike, Adidas, Levi\'s a precios ridículos.',
              photo: 'https://picsum.photos/seed/russian-market-phnom-penh/200/200',
              description: 'El mercado más caótico, oscuro y auténtico de Phnom Penh. Camboya es uno de los grandes fabricantes de ropa para marcas internacionales. En los pasillos: excedentes de fábrica de Nike, Adidas, Levi\'s, Zara a $3-10. También artesanías, figuras de Buda, kramas, sedas y monedas antiguas.',
              tips: 'L-D 6:00-16:30. Mejor 8:30-10:30 (el calor bajo el techo de hojalata al mediodía es insoportable). A 5 min del Museo S-21 en Grab. Regatear firmemente en los souvenirs (30-40% de descuento).' },
            { name: 'Wat Phnom', type: 'temple',
              notes: 'El templo que da nombre a la ciudad. En la única colina de Phnom Penh. Nagas en las escalinatas.',
              photo: 'https://picsum.photos/seed/wat-phnom-hill-temple/200/200',
              description: 'El templo budista situado en la única colina de la capital da nombre a la ciudad (Phnom Penh = Colina de Penh). Escalinatas decoradas con serpientes mitológicas (nagas) y guardianes. Ambiente tranquilo con monjes y devotos.',
              tips: '7:00-18:00, $1 USD para extranjeros. En la gran rotonda de la avenida Norodom Boulevard y Calle 96, accesible andando desde el Riverside.' },
            { name: 'Museo Nacional de Camboya', type: 'museum',
              notes: 'La mayor colección de arte jemer del mundo. El Shiva bailarín y el Jayavarman VII de los ojos cerrados.',
              photo: 'https://picsum.photos/seed/national-museum-cambodia-khmer/200/200',
              description: 'El museo más importante de Camboya, con más de 14.000 piezas de arte jemer. Construido en 1920 con arquitectura jemer moderna en terracota, sus cuatro galerías rodean un jardín interior con estanque. Las piezas estelares: el Shiva bailarín de Koh Ker (una de las cumbres de la escultura mundial), el busto de Jayavarman VII con los ojos semientornados (considerado el gran retrato de la historia jemer) y el enorme Vishnú del Mebon Occidental.',
              tips: '8:00-17:00. $10 USD, audioguía incluida. A 5 min a pie del Palacio Real — visitar ambos en el mismo tramo de mañana o tarde. Sin fotografía con flash. La librería del museo tiene los mejores libros de arte jemer.' },
            { name: 'Monumento a la Independencia', type: 'monument',
              notes: 'La Torre de la Independencia de 1958. Estilo jemer moderno. Centro neurálgico del Riverside.',
              photo: 'https://picsum.photos/seed/independence-monument-phnom-penh/200/200',
              description: 'Construido en 1958 para conmemorar la independencia de Francia, este monumento de 37 metros diseñado por el arquitecto Vann Molyvann es una obra maestra del estilo jemer moderno: cinco torres escalonadas con escamas de naga en terracota roja. Por la noche se ilumina en los colores de la bandera camboyana. Situado en el cruce de los bulevares Norodom y Sihanouk, es el epicentro del Riverside y el Parque de la Independencia.',
              tips: 'Gratis, 24h. En el cruce de Norodom y Sihanouk Boulevard. Rodear a pie da buenas fotos desde todos los ángulos. El Parque de la Independencia alrededor es agradable al atardecer. A 10 min a pie del Palacio Real.' }
          ],
          restaurants: [
            { name: 'Nom Banh Chok (desayuno ligero antes del S-21)', type: 'restaurant',
              notes: 'Desayuno muy ligero antes de las visitas duras de hoy. Fideos con curry verde de pescado.',
              photo: 'https://picsum.photos/seed/nom-banh-chok-phnom-penh-morning/200/200',
              description: 'Antes de visitar el S-21 y los Killing Fields (emocionalmente muy duro), lo mejor es desayunar algo ligero: Nom Banh Chok, fideos de arroz con curry verde fresco de pescado, pepino y hierbas. Puestos en cualquier mercado de Phnom Penh antes de las 8 AM.',
              tips: 'Precio: $1. La visita a S-21 y Killing Fields es larga y emocionalmente intensa — reservar energía para la tarde. No saltarse el almuerzo aunque el apetito no acompañe.' },
            { name: 'Cena jemer junto al Mekong (última en Camboya)', type: 'restaurant',
              notes: '⚠️ VUELO 20:00 — cenar a las 17:30, salir al aeropuerto a las 17:30.',
              photo: 'https://picsum.photos/seed/phnom-penh-mekong-last-dinner/200/200',
              description: 'La última cena camboyana: sentarse frente al Mekong en el Riverside y pedir un Fish Amok al vapor con arroz y una Angkor Beer. Los restaurantes de Sisowath Quay tienen cocina hasta las 22:00 pero el vuelo sale a las 20:00.',
              tips: '⚠️ IMPORTANTE: el vuelo sale a las 20:00. Cenar ANTES de las 17:00 (en el almuerzo) y salir al aeropuerto a las 17:30 como máximo. El trayecto al aeropuerto son 40-60 min con tráfico.' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo Phnom Penh (PNH) → Hanói (HAN) — 20:00-21:55. Reserva: XCWJ9H', from: 'Phnom Penh', to: 'Hanói', time: '20:00',
              pickup: 'Aeropuerto Internacional de Phnom Penh (KIA). Salir del hotel con 2h de antelación (tráfico denso). En Grab/tuk-tuk: 40-60 min, $7-15. Airport Express Bus (0,40€): cada 10-15 min de 5:30-23:30, desde Kouch Kanong Circle Bus Station por Monivong Boulevard.' }
          ],
          hotel: { name: 'Por confirmar', address: 'Phnom Penh', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't33', text: 'Check-out hotel Phnom Penh', done: false },
            { id: 't34', text: 'Vuelo Phnom Penh → Hanói 20:00 (reserva XCWJ9H) — salir al aeropuerto a las 17:30', done: false }
          ],
          notes: 'Día emocionalmente intenso. S-21 y Killing Fields son visitas muy duras pero fundamentales para entender Camboya. Tomarse el tiempo que necesite cada uno.'
        },
        {
          date: '2026-11-28', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Cierre',
          summary: 'Último día completo. Hanói sin agenda: compras en el Old Quarter, masajes, café vietnamita y la última ruta de street food.',
          places: [
            { name: 'Compras en el Old Quarter', type: 'market',
              notes: 'Último día para seda, lacas, recuerdos y farolillos. Hàng Gai es la calle principal.',
              photo: 'https://picsum.photos/seed/hanoi-silk-shopping-market/200/200',
              description: 'El Old Quarter tiene las mejores tiendas para souvenirs de calidad: Hàng Gai (Calle de la Seda) para telas y ropa, Hàng Bạc para joyería y plata, y los alrededores del Lago Hoan Kiem para lacas, pinturas y artesanías.',
              tips: 'Regatear con calma. Evitar las tiendas directamente en frente del lago (precios turísticos). Las mejores tiendas de seda están al norte del lago en Hàng Gai.' },
            { name: 'Masajes en Hanói', type: 'monument',
              notes: 'Masajes de cuerpo entero o de pies por 10-15€. Barrios alrededor del lago.',
              photo: 'https://picsum.photos/seed/hanoi-massage-spa/200/200',
              description: 'Hanói tiene docenas de masajes de calidad a precios muy asequibles. El masaje de cuerpo entero de 60 minutos suele costar entre 200.000-350.000 VND. Los mejores spas están en los callejones alrededor del Lago Hoan Kiem.',
              tips: 'Pedir precio antes de entrar. Los masajes de pies (reflexología) son especialmente populares. Evitar los que llaman desde la puerta de forma agresiva.' },
            { name: 'Café de azotea sobre el Lago Hoan Kiem', type: 'cafe',
              notes: 'Última tarde viendo el lago desde las alturas con un cà phê sữa đá.',
              photo: 'https://picsum.photos/seed/hanoi-cafe-last-day/200/200',
              description: 'La tarde del último día en Hanói merece un café en altura con vistas al lago. Café Phố Cổ (Hàng Gai 11, subir 4 pisos) o la terraza del Café Giảng son los dos favoritos.',
              tips: 'Café Phố Cổ: entrar por la tienda de sedas del nº 11 Hàng Gai. Café Giảng: nº 39 Nguyễn Hữu Huân (pasillo estrecho). Pedir el cà phê sữa đá (café con leche condensada sobre hielo) — el más refrescante.' },
            { name: 'Última ruta de street food', type: 'restaurant',
              notes: 'Phở o Bún Chả de despedida en el Old Quarter. Bún Chả Hương Liên (Obama): Lê Văn Hưu 24.',
              photo: 'https://picsum.photos/seed/hanoi-street-food-farewell/200/200',
              description: 'La última cena en Vietnam merece un Bún Chả o un Phở en los mejores locales del Old Quarter. Bún Chả Hương Liên (Obama, Lê Văn Hưu 24) o los puestos nocturnos de la Bia Hoi Corner.',
              tips: 'Bún Chả Hương Liên: Lê Văn Hưu 24, 8:00-20:30, Combo Obama 120.000 VND. Bia Hoi Corner: esquina Lương Ngọc Quyến y Tạ Hiện — la última bia hơi de 0,30 USD.' }
          ],
          restaurants: [
            { name: 'Phở Gà o Phở Bò (desayuno de reencuentro con Vietnam)', type: 'restaurant',
              notes: 'El primer desayuno de vuelta en Hanói. Phở Gia Truyền (Bát Đàn 49): el mejor caldo del Old Quarter.',
              photo: 'https://picsum.photos/seed/hanoi-pho-gia-truyen-return/200/200',
              description: 'El regreso a Hanói merece el mejor Phở de la ciudad: Phở Gia Truyền (Bát Đàn 49). Dos opciones: Phở Bò (res) o Phở Gà (pollo, caldo más dorado y delicado). Caldo cocinado 12 horas, fideos de arroz, hierbas, lima y chile. La cola da la vuelta a la esquina pero vale la espera.',
              tips: 'Phở Gia Truyền: calle Bát Đàn 49. Abre de 6-11 AM y 18-21 PM. Solo dos opciones: con o sin tuétano. Sin menú inglés. Precio: 60.000-80.000 VND. Llegar antes de las 7:30 AM.' },
            { name: 'Chả Cá Lã Vọng (el único plato del restaurante más antiguo de Hanói)', type: 'restaurant',
              notes: '⭐ EXPERIENCIA ÚNICA. Desde 1871, solo sirven este plato: pescado con cúrcuma y eneldo.',
              photo: 'https://picsum.photos/seed/cha-ca-la-vong-dill-fish/200/200',
              description: 'El restaurante familiar más antiguo del Old Quarter (desde 1871) que solo sirve un único plato en toda su historia: pescado de río (thịt) a la cúrcuma frito en sartén ante el cliente, con eneldo fresco y cebolleta, servido sobre fideos de arroz con cacahuetes tostados y pasta de gambas.',
              tips: 'Chả Cá Lã Vọng: Chả Cá 14. Solo este plato. Precio: ~200.000 VND. Toda la calle Chả Cá está especializada en este plato pero este local es el original. La última cena en Vietnam merece algo especial.' }
          ],
          transport: [],
          hotel: { name: 'Por confirmar', address: 'Old Quarter, Hanói', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't35', text: 'Confirmar vuelo de regreso del día 29', done: false }
          ],
          notes: 'Día sin horarios. Despedida lenta de Vietnam.'
        },
        {
          date: '2026-11-29', city: 'Hanói', country: '🇻🇳 Vietnam', block: 'El Cierre',
          summary: 'Última mañana. Paseo nostálgico por el Old Quarter. Vuelo de regreso a las 19:00. Bus 86 al aeropuerto desde Hang Tre 23.',
          places: [
            { name: 'Último paseo — Old Quarter al amanecer', type: 'monument',
              notes: 'La mañana final en el Old Quarter. Sin planes, solo caminar y recordar.',
              photo: 'https://picsum.photos/seed/hanoi-morning-last-walk/200/200',
              description: 'La última mañana en Hanói merece un paseo tranquilo por el Old Quarter y el lago Hoan Kiem antes de coger el vuelo. A primera hora hay menos motos y los vendedores ambulantes de flores empiezan su jornada.',
              tips: 'Llegar al lago a las 6:30-7:00 para ver el Tai Chi matutino. Desayuno con Phở o Bánh Mì callejero. Pagar el hotel y salir al aeropuerto con tiempo.' }
          ],
          restaurants: [
            { name: 'Último Phở o Bánh Mì antes del vuelo', type: 'restaurant',
              notes: 'La última comida en Vietnam. Bánh Mì callejero o Phở de despedida en el Old Quarter.',
              photo: 'https://picsum.photos/seed/hanoi-last-pho-farewell/200/200',
              description: 'La última mañana en Vietnam. Si el vuelo es a las 19:00: tiempo de sobra para un desayuno tranquilo de Phở (Phở Gia Truyền, Bát Đàn 49) y un último Café Trứng (café de huevo, Nguyễn Hữu Huân 39) antes de hacer el check-out y coger el Bus 86 al aeropuerto.',
              tips: 'Bus 86 al aeropuerto sale desde Hang Tre 23 — salir del hotel no más tarde de las 16:00 para el vuelo de las 19:00. Último Bánh Mì en algún puesto callejero del Old Quarter para el camino.' }
          ],
          transport: [
            { type: 'flight', icon: '✈️', details: 'Vuelo de regreso desde Hanói — 19:00 h', from: 'Hanói (HAN)', to: 'España', time: '19:00',
              pickup: 'Bus 86 DIRECCIÓN AEROPUERTO desde la calle Hang Tre nº 23 (Old Quarter, a pocos min de cualquier hotel del Barrio Antiguo), 50.000 VND. Primer bus: 5:05 AM. Frecuencia: cada 25-30 min. El bus te deja en el piso de salidas de T1 (vuelos nacionales) y T2 (internacionales). Salir del hotel al menos 3h antes del vuelo (tráfico + check-in + seguridad). Otras paradas: frente al Hanoi Post Office (junto al lago Hoan Kiem) o frente al Hotel Melia.' }
          ],
          hotel: { name: '', address: '', phone: '', checkIn: '', checkOut: '12:00', breakfast: false },
          tasks: [
            { id: 't36', text: 'Check-out hotel Hanói', done: false },
            { id: 't37', text: 'Bus 86 al aeropuerto desde Hang Tre 23 (50.000 VND)', done: false }
          ],
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

const DATA_VERSION = 22;
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
