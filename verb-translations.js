// Display-only translations of the built-in list, in the canonical DEFAULTS.verbs order.
// Custom lists are never machine-translated or rewritten. Original source attribution remains in THIRD_PARTY.md.
const words = text => Object.freeze(text.trim().split('|').map(word => word.trim()));
export const SPINNER_VERBS = {
  pt: words(`
Mergulhando fundo|Concluindo|Agindo|Concretizando|Arquitetando|Assando|Irradiando|Dançando bebop|Intrigando|Ondulando|
Escaldando|Discursando|Dançando|Inventando moda|Dando um toque|Preparando a base|Preparando a mistura|Fazendo pãezinhos|Escavando|Calculando|
Fazendo carinho|Caramelizando|Fluindo em cascata|Catapultando|Raciocinando|Canalizando|Sintonizando|Coreografando|Agitando|Criando ideias|
Convergindo|Refletindo|Organizando as ideias|Compondo|Computando|Elaborando|Considerando|Contemplando|Cozinhando|Dando forma|
Criando|Processando os números|Cristalizando|Cultivando|Decifrando|Ponderando|Determinando|Enrolando um pouquinho|Desarrumando as ideias|Fazendo|
Rabiscando|Chuviscando|Recuando|Produzindo efeito|Esclarecendo|Embelezando|Encantando|Visualizando|Evaporando|Fermentando|
Mexendo aqui e ali|Dando um jeitinho|Flambando|Tagarelando|Fluindo|Quebrando a cabeça|Esvoaçando|Forjando|Formando|Brincando|
Colocando cobertura|Passeando por aí|Galopando|Decorando|Gerando|Gesticulando|Germinando|Versionando|Entrando no ritmo|Soprando|
Harmonizando|Calculando hashes|Chocando ideias|Reunindo o rebanho|Buzinando|Fazendo alvoroço|Cruzando o hiperespaço|Tendo ideias|Imaginando|Improvisando|
Incubando|Inferindo|Infundindo|Ionizando|Dançando swing|Levitando|Curtindo sem pressa|Manifestando|Marinando|Serpenteando|
Metamorfoseando|Formando névoa|Dançando de costas|Caminhando sem pressa|Matutando|Reunindo forças|Meditando|Nebulizando|Fazendo um ninho|Folheando o jornal|
Explorando ideias|Formando um núcleo|Orbitando|Orquestrando|Absorvendo por osmose|Dando uma volta|Filtrando|Examinando|Filosofando|Fazendo fotossíntese|
Polinizando|Pensando com calma|Discorrendo|Dando o bote|Precipitando|Fazendo mágica|Processando|Revisando|Propagando|Fazendo pequenos ajustes|
Desvendando o enigma|Explorando o mundo quântico|Fazendo brilhar|Dando um toque especial|Reorganizando as ideias|Tecendo conexões|Pousando no poleiro|Ruminando|Salteando|Correndo de leve|
Carregando as coisas|Correndo de um lado para o outro|Esboçando|Deslizando|Amassando|Dançando no salão|Explorando cavernas|Girando|Brotando|Cozinhando em fogo baixo|
Sublimando|Rodopiando|Mergulhando em voo|Criando simbiose|Sintetizando|Temperando|Pensando|Trovejando|Experimentando|Fazendo travessuras|
Virando tudo de ponta-cabeça|Transfigurando|Transmutando|Retorcendo|Oscilando|Desenrolando|Desembaraçando|Curtindo o clima|Caminhando como um pato|Vagando|
Dobrando o espaço|Mexendo no tal negócio|Formando um redemoinho|Zumbindo|Batendo a mistura|Balançando|Trabalhando|Domando a confusão|Dando mais sabor|Ziguezagueando
`),
  zh: words(`
深入探索|完成任务|付诸行动|实现构想|设计架构|烘焙中|绽放光芒|跳着爵士舞|琢磨难题|翻涌中|
焯煮中|畅谈中|舞动中|忙着新花样|轻轻一点|搭建基础|酝酿中|制作小面包|挖掘中|计算中|
亲切互动|熬制焦糖|倾泻而下|蓄势弹射|动脑思考|引导思路|调频共鸣|编排舞步|搅动中|激发灵感|
汇聚中|深入思索|理清思路|创作中|运算中|构思方案|斟酌中|静心思考|烹饪中|精心打磨|
创造中|处理数据|凝结成形|培育中|解读中|仔细权衡|确定方向|稍作盘桓|打乱思路|执行中|
随手涂画|细雨飘落|渐渐退潮|推动变化|阐明中|润饰中|施展魅力|描绘愿景|蒸发中|发酵中|
摆弄细节|巧妙周旋|焰烤中|轻快闲谈|流动中|破解困惑|翩然振翅|锻造中|塑形中|欢快嬉戏|
铺上糖霜|四处游逛|奔腾中|点缀中|生成中|比划中|萌芽中|整理版本|跟随节奏|阵风吹拂|
协调中|计算哈希|孵化点子|聚拢队伍|鸣笛中|热闹一番|穿越超空间|激发创意|想象中|即兴发挥|
孵育中|推断中|注入活力|电离中|跳着摇摆舞|悬浮中|悠闲小憩|显现中|腌渍中|蜿蜒前行|
蜕变中|薄雾升起|滑着太空步|从容漫步|反复琢磨|集结力量|沉思中|雾化中|筑巢中|翻阅报纸|
探索想法|凝聚核心|环绕运行|统筹编排|慢慢吸收|漫步中|渗滤中|细细研读|探讨哲理|进行光合作用|
传播花粉|仔细思量|畅论观点|伺机跃起|凝结降落|施展魔术|处理中|校对中|传播中|细心修整|
解开谜题|探索量子世界|绚丽呈现|增添亮点|重新梳理|编织网络|栖息中|反复推敲|翻炒中|轻快奔跑|
搬运中|匆匆穿梭|绘制草图|滑行中|揉合中|跳着舞步|探索洞穴|旋转中|破土萌发|小火慢炖|
升华中|回旋中|俯冲中|协同共生|综合整理|调和中|思考中|雷声滚滚|动手试验|俏皮尝试|
翻转思路|改头换面|转化中|扭转中|起伏中|徐徐展开|解开线索|感受氛围|摇摆迈步|随意探索|
弯曲空间|摆弄小玩意|形成漩涡|轻轻嗡鸣|搅打中|轻轻晃动|工作中|理顺纷乱|增添风味|曲折前行
`),
  ja: words(`
深く探究中|仕上げ中|行動中|実現中|構造を設計中|焼き上げ中|輝いています|ビバップを踊っています|謎について考えています|波立っています|
湯通し中|熱弁中|軽快に踊っています|ひと工夫中|そっとひと押し|土台づくり中|仕込み中|丸パンづくり中|掘り進めています|計算中|
仲よく交流中|キャラメルづくり中|流れ落ちています|勢いをためています|頭を働かせています|流れを導いています|周波数を合わせています|振り付け中|かき混ぜ中|発想を練っています|
ひとつに集約中|思索中|考えを整理中|構成中|演算中|案を練っています|検討中|じっくり考えています|料理中|丁寧に仕上げ中|
創作中|数値を処理中|結晶化中|育成中|読み解き中|吟味中|方針を決定中|少し寄り道中|考えを揺さぶっています|実行中|
落書き中|霧雨を降らせています|引き潮の途中|変化を生み出しています|解き明かしています|飾り付け中|魔法をかけています|未来を描いています|蒸発中|発酵中|
あれこれ調整中|うまく工夫中|フランベ中|おしゃべり中|流れに乗っています|難問と格闘中|羽ばたいています|鍛造中|形づくり中|楽しく遊んでいます|
糖衣をかけています|気ままに散策中|駆け足中|彩りを添えています|生成中|身振りで表現中|芽吹いています|バージョンを整理中|リズムに乗っています|風を起こしています|
調和中|ハッシュを計算中|アイデアを育てています|仲間をまとめています|クラクションを鳴らしています|にぎやかに活動中|超空間を移動中|発想中|想像中|即興で対応中|
温め中|推論中|活力を注入中|イオン化中|スイングを踊っています|浮遊中|のんびり休憩中|姿を現しています|漬け込み中|曲がりくねって進んでいます|
変身中|霧をつくっています|ムーンウォーク中|ゆっくり歩いています|考えを巡らせています|力を集めています|思いにふけっています|霧状に加工中|巣づくり中|新聞をめくっています|
アイデアを探っています|核をつくっています|周回中|全体を指揮中|じわじわ吸収中|散歩中|ろ過中|熟読中|哲学を語っています|光合成中|
花粉を運んでいます|じっくり検討中|意見を述べています|飛びかかっています|降り注いでいます|手品中|処理中|校正中|広めています|細かく手入れ中|
パズルを解いています|量子の世界を探究中|きらびやかに演出中|華やかさを追加中|考えをまとめ直しています|つながりを編んでいます|止まり木で待機中|熟考中|炒め中|軽快に走っています|
荷物を運んでいます|忙しく動き回っています|下描き中|滑るように移動中|こね合わせ中|ダンスを楽しんでいます|洞窟を探検中|回転中|発芽中|じっくり煮込み中|
昇華中|渦巻き中|急降下中|共生中|統合中|調整中|思考中|雷鳴を響かせています|試行錯誤中|おどけながら試しています|
ひっくり返しています|姿を変えています|性質を変換中|ねじり中|うねっています|広げています|絡まりを解いています|雰囲気を楽しんでいます|よちよち歩き中|気ままに探究中|
空間を曲げています|あれこれいじっています|渦をつくっています|軽くうなっています|泡立て中|ゆらゆら揺れています|作業中|混乱を整理中|風味を加えています|ジグザグに進んでいます
`),
  es: words(`
Explorando a fondo|Completando|Actuando|Haciendo realidad|Diseñando la estructura|Horneando|Resplandeciendo|Bailando bebop|Desconcertando|Ondeando|
Escaldando|Discurseando|Bailando|Inventando algo nuevo|Dando un toquecito|Preparando la base|Preparando la mezcla|Haciendo panecillos|Excavando|Calculando|
Mimando|Caramelizando|Fluyendo en cascada|Catapultando|Razonando|Canalizando|Sintonizando|Coreografiando|Agitando|Dando forma a ideas|
Convergiendo|Reflexionando|Ordenando las ideas|Componiendo|Computando|Elaborando|Considerando|Contemplando|Cocinando|Dando forma|
Creando|Procesando números|Cristalizando|Cultivando|Descifrando|Deliberando|Determinando|Tomándose un momento|Revolviendo las ideas|Haciendo|
Garabateando|Lloviznando|Retrocediendo|Produciendo cambios|Aclarando|Embelleciendo|Encantando|Imaginando el futuro|Evaporando|Fermentando|
Retocando detalles|Buscando un truco|Flambeando|Charloteando|Fluyendo|Resolviendo una confusión|Revoloteando|Forjando|Formando|Jugando alegremente|
Añadiendo glaseado|Paseando por ahí|Galopando|Adornando|Generando|Gesticulando|Germinando|Organizando versiones|Siguiendo el ritmo|Soplando|
Armonizando|Calculando hashes|Incubando ideas|Reuniendo al grupo|Tocando la bocina|Alborotando|Cruzando el hiperespacio|Ideando|Imaginando|Improvisando|
Incubando|Infiriendo|Infundiendo|Ionizando|Bailando swing|Levitando|Descansando sin prisa|Manifestando|Marinando|Serpenteando|
Metamorfoseando|Formando neblina|Bailando hacia atrás|Andando sin prisa|Dándole vueltas|Reuniendo fuerzas|Meditando|Nebulizando|Haciendo un nido|Hojeando el periódico|
Explorando ideas|Formando un núcleo|Orbitando|Orquestando|Absorbiendo por ósmosis|Dando un paseo|Filtrando|Examinando|Filosofando|Haciendo fotosíntesis|
Polinizando|Pensando con calma|Exponiendo ideas|Lanzándose al ataque|Precipitando|Haciendo magia|Procesando|Revisando|Propagando|Haciendo pequeños ajustes|
Resolviendo el acertijo|Explorando lo cuántico|Deslumbrando|Dando un toque especial|Reorganizando las ideas|Tejiendo conexiones|Posándose|Rumiando|Salteando|Correteando|
Cargando cosas|Corriendo de un lado a otro|Esbozando|Deslizándose|Amasando|Bailando en la pista|Explorando cuevas|Girando|Brotando|Cociendo a fuego lento|
Sublimando|Arremolinando|Lanzándose en picado|Creando simbiosis|Sintetizando|Templando|Pensando|Tronando|Experimentando|Haciendo travesuras|
Dándole la vuelta a todo|Transfigurando|Transmutando|Retorciendo|Ondulando|Desplegando|Desenredando|Disfrutando el ambiente|Andando como un pato|Vagando|
Curvando el espacio|Trasteando con algo|Formando un remolino|Zumbando|Batiendo|Balanceándose|Trabajando|Domando el caos|Añadiendo sabor|Zigzagueando
`),
  fr: words(`
Exploration en profondeur|Accomplissement|Passage à l’action|Concrétisation|Conception de la structure|Cuisson au four|Rayonnement|Danse bebop|Questionnement|Ondoiement|
Blanchiment|Grand discours|Danse entraînante|Petite invention|Petite impulsion|Mise en place des bases|Préparation du mélange|Fabrication de petits pains|Creusement|Calcul|
Échange affectueux|Caramélisation|Écoulement en cascade|Catapultage|Réflexion active|Canalisation|Mise au diapason|Chorégraphie|Agitation|Créativité en cours|
Convergence|Cogitation|Organisation des idées|Composition|Calcul informatique|Élaboration|Examen|Contemplation|Cuisine|Façonnage|
Création|Traitement des chiffres|Cristallisation|Culture|Déchiffrage|Délibération|Détermination|Petite pause|Bousculement des idées|Réalisation|
Gribouillage|Bruine|Reflux|Mise en œuvre|Éclaircissement|Embellissement|Enchantement|Projection dans l’avenir|Évaporation|Fermentation|
Petits ajustements|Recherche d’une astuce|Flambage|Bavardage|Écoulement|Résolution d’une énigme|Battement d’ailes|Forge|Formation|Jeu joyeux|
Ajout de glaçage|Promenade insouciante|Galop|Décoration|Génération|Gestuelle|Germination|Organisation des versions|Mise en rythme|Souffle de vent|
Harmonisation|Calcul de hachages|Éclosion d’idées|Rassemblement|Coup de klaxon|Remue-ménage|Traversée de l’hyperespace|Recherche d’idées|Imagination|Improvisation|
Incubation|Déduction|Infusion|Ionisation|Danse swing|Lévitation|Flânerie|Manifestation|Marinade|Cheminement sinueux|
Métamorphose|Formation de brume|Pas de lune|Marche tranquille|Mûrissement des idées|Mobilisation|Méditation|Nébulisation|Construction d’un nid|Lecture du journal|
Exploration d’idées|Formation d’un noyau|Mise en orbite|Orchestration|Absorption par osmose|Petite balade|Percolation|Lecture attentive|Philosophie|Photosynthèse|
Pollinisation|Réflexion posée|Exposé d’idées|Bond en avant|Précipitation|Tour de magie|Traitement|Relecture|Propagation|Petits bricolages|
Résolution du puzzle|Exploration quantique|Éblouissement|Ajout d’éclat|Réorganisation des idées|Tissage de liens|Installation au perchoir|Rumination|Cuisson sautée|Course légère|
Transport des affaires|Va-et-vient affairé|Esquisse|Glissement|Malaxage|Danse sur la piste|Exploration de grottes|Rotation|Éclosion|Mijotage|
Sublimation|Tourbillonnement|Plongeon en vol|Symbiose|Synthèse|Affinage|Réflexion|Tonnerre|Expérimentation|Petite espièglerie|
Renversement des perspectives|Transfiguration|Transmutation|Torsion|Ondulation|Déploiement|Démêlage|Immersion dans l’ambiance|Démarche de canard|Vagabondage|
Courbure de l’espace|Bricolage du machin|Formation d’un vortex|Bourdonnement|Fouettage|Balancement|Travail en cours|Maîtrise du chaos|Ajout de saveur|Zigzag
`),
  de: words(`
Tief eintauchen|Abschließen|Handeln|Verwirklichen|Struktur entwerfen|Backen|Strahlen|Bebop tanzen|Rätseln|Aufwallen|
Blanchieren|Eine Rede halten|Tanzen|Etwas Neues aushecken|Leicht anstupsen|Grundlagen schaffen|Eine Mischung ansetzen|Brötchen backen|Graben|Berechnen|
Zuwendung zeigen|Karamellisieren|Kaskaden bilden|Katapultieren|Nachdenken|In Bahnen lenken|Sich einstimmen|Choreografieren|Umrühren|Kreativ gestalten|
Zusammenführen|Grübeln|Gedanken ordnen|Komponieren|Daten berechnen|Ausarbeiten|Abwägen|In Betracht ziehen|Kochen|Gestalten|
Erschaffen|Zahlen verarbeiten|Kristallisieren|Kultivieren|Entschlüsseln|Beratschlagen|Bestimmen|Kurz verweilen|Gedanken durcheinanderwirbeln|Machen|
Kritzeln|Nieseln|Zurückweichen|Wirkung entfalten|Erläutern|Verschönern|Verzaubern|Die Zukunft entwerfen|Verdampfen|Fermentieren|
An Kleinigkeiten feilen|Einen Kniff finden|Flambieren|Plaudern|Fließen|Ein Rätsel knacken|Flattern|Schmieden|Formen|Herumtollen|
Glasur auftragen|Umherstreifen|Galoppieren|Garnieren|Erzeugen|Gestikulieren|Keimen|Versionen ordnen|In Schwung kommen|Böen erzeugen|
Harmonisieren|Hashes berechnen|Ideen ausbrüten|Zusammentreiben|Hupen|Trubel machen|Den Hyperraum durchqueren|Ideen entwickeln|Sich etwas vorstellen|Improvisieren|
Ausbrüten|Schlussfolgern|Durchdringen|Ionisieren|Swing tanzen|Schweben|Gemütlich verweilen|Zum Vorschein bringen|Marinieren|Sich durchschlängeln|
Sich verwandeln|Nebel bilden|Rückwärts gleiten|Gemächlich gehen|Gedanken kreisen lassen|Kräfte sammeln|Sinnieren|Vernebeln|Ein Nest bauen|In der Zeitung blättern|
Ideen erkunden|Einen Kern bilden|Umkreisen|Orchestrieren|Durch Osmose aufnehmen|Spazieren gehen|Filtern|Genau durchlesen|Philosophieren|Fotosynthese betreiben|
Bestäuben|In Ruhe überlegen|Gedanken ausführen|Zum Sprung ansetzen|Ausfällen|Zaubern|Verarbeiten|Korrektur lesen|Verbreiten|Kleine Dinge ausbessern|
Ein Puzzle lösen|Quanten erkunden|Glanz entfalten|Schwung hineinbringen|Gedanken neu ordnen|Verbindungen knüpfen|Sich niederlassen|Gedanken wiederkäuen|Sautieren|Leichtfüßig laufen|
Sachen schleppen|Geschäftig umherlaufen|Skizzieren|Gleiten|Zusammenkneten|Auf der Tanzfläche tanzen|Höhlen erkunden|Drehen|Sprießen|Schmoren|
Sublimieren|Wirbeln|Im Flug herabstoßen|In Symbiose arbeiten|Synthetisieren|Verfeinern|Denken|Donnern|Tüfteln|Schabernack treiben|
Alles auf den Kopf stellen|Umgestalten|Umwandeln|Verdrehen|Wogen|Entfalten|Entwirren|Die Stimmung genießen|Watscheln|Umherwandern|
Den Raum krümmen|Am Dingsbums basteln|Einen Strudel bilden|Surren|Aufschlagen|Hin und her wackeln|Arbeiten|Das Durcheinander bändigen|Würze hinzufügen|Im Zickzack gehen
`),
  ru: words(`
Глубоко исследуем|Завершаем|Действуем|Воплощаем|Проектируем структуру|Выпекаем|Сияем|Танцуем бибоп|Разгадываем|Клубимся|
Бланшируем|Произносим речь|Танцуем|Придумываем затею|Слегка подталкиваем|Закладываем основу|Готовим смесь|Печём булочки|Копаем|Вычисляем|
Проявляем заботу|Карамелизируем|Струимся каскадом|Катапультируем|Размышляем|Направляем поток|Настраиваемся на волну|Ставим хореографию|Перемешиваем|Творчески подходим|
Объединяем|Обдумываем|Упорядочиваем мысли|Сочиняем|Считаем|Разрабатываем|Рассматриваем|Созерцаем|Готовим|Придаём форму|
Создаём|Обрабатываем числа|Кристаллизуем|Выращиваем|Расшифровываем|Взвешиваем варианты|Определяем|Делаем небольшую паузу|Встряхиваем мысли|Делаем|
Рисуем каракули|Моросим|Отступаем|Добиваемся изменений|Проясняем|Украшаем|Очаровываем|Представляем будущее|Испаряем|Заквашиваем|
Подправляем мелочи|Ищем хитрый ход|Фламбируем|Болтаем|Течём|Распутываем загадку|Порхаем|Куём|Формируем|Резвимся|
Наносим глазурь|Гуляем без забот|Скачем галопом|Добавляем украшения|Генерируем|Жестикулируем|Прорастаем|Упорядочиваем версии|Входим в ритм|Создаём порывы ветра|
Гармонизируем|Вычисляем хеши|Высиживаем идеи|Собираем вместе|Гудим|Устраиваем переполох|Пересекаем гиперпространство|Ищем идеи|Воображаем|Импровизируем|
Инкубируем|Делаем выводы|Наполняем|Ионизируем|Танцуем свинг|Левитируем|Отдыхаем без спешки|Проявляем|Маринуем|Петляем|
Преображаемся|Создаём дымку|Танцуем лунную походку|Идём не спеша|Прокручиваем в голове|Собираемся с силами|Погружаемся в раздумья|Распыляем|Строим гнездо|Листаем газету|
Исследуем идеи|Формируем ядро|Движемся по орбите|Дирижируем|Впитываем постепенно|Прогуливаемся|Фильтруем|Внимательно изучаем|Философствуем|Занимаемся фотосинтезом|
Опыляем|Неторопливо думаем|Излагаем мысли|Бросаемся вперёд|Осаждаем|Показываем фокус|Обрабатываем|Вычитываем|Распространяем|Занимаемся мелкой починкой|
Решаем головоломку|Исследуем квантовый мир|Ослепляем блеском|Добавляем яркости|Заново собираем мысли|Сплетаем связи|Усаживаемся на насест|Пережёвываем мысли|Пассеруем|Легко бежим|
Тащим вещи|Снуём туда-сюда|Набрасываем эскиз|Скользим|Разминаем|Танцуем на площадке|Исследуем пещеры|Вращаемся|Даём ростки|Томим на огне|
Сублимируем|Кружимся|Пикируем|Работаем в симбиозе|Синтезируем|Закаляем|Думаем|Гремим|Экспериментируем|Озорничаем|
Переворачиваем всё вверх дном|Меняем облик|Преобразуем|Скручиваем|Колышемся|Разворачиваем|Распутываем|Наслаждаемся атмосферой|Переваливаемся при ходьбе|Бродим|
Искривляем пространство|Возимся со штуковиной|Создаём водоворот|Жужжим|Взбиваем|Покачиваемся|Работаем|Укрощаем хаос|Добавляем изюминку|Идём зигзагом
`)
};
