export type MapEntry = {
  name: string;
  width: number;
  height: number;
  id: number;
  tileset: string;
  borderBlock: number;
};

export const MAPS: Record<string, MapEntry> = {
  // ── Towns & Cities ────────────────────────────────────────────────
  PALLET_TOWN:    { name: "PalletTown",    width: 10, height: 9,  id: 0,  tileset: "overworld",  borderBlock: 11 },
  VIRIDIAN_CITY:  { name: "ViridianCity",  width: 20, height: 18, id: 1,  tileset: "overworld",  borderBlock: 15 },
  PEWTER_CITY:    { name: "PewterCity",    width: 20, height: 18, id: 2,  tileset: "overworld",  borderBlock: 10 },
  CERULEAN_CITY:  { name: "CeruleanCity",  width: 20, height: 18, id: 3,  tileset: "overworld",  borderBlock: 15 },
  LAVENDER_TOWN:  { name: "LavenderTown",  width: 10, height: 9,  id: 4,  tileset: "overworld",  borderBlock: 44 },
  VERMILION_CITY: { name: "VermilionCity", width: 20, height: 18, id: 5,  tileset: "overworld",  borderBlock: 67 },
  CELADON_CITY:   { name: "CeladonCity",   width: 25, height: 18, id: 6,  tileset: "overworld",  borderBlock: 15 },
  FUCHSIA_CITY:   { name: "FuchsiaCity",   width: 20, height: 18, id: 7,  tileset: "overworld",  borderBlock: 15 },
  CINNABAR_ISLAND:{ name: "CinnabarIsland",width: 10, height: 9,  id: 8,  tileset: "overworld",  borderBlock: 67 },
  INDIGO_PLATEAU: { name: "IndigoPlateau", width: 10, height: 9,  id: 9,  tileset: "plateau",    borderBlock: 14 },
  SAFFRON_CITY:   { name: "SaffronCity",   width: 20, height: 18, id: 10, tileset: "overworld",  borderBlock: 15 },
  UNUSED_MAP_0B:  { name: "UnusedMap0B",   width: 0,  height: 0,  id: 11, tileset: "overworld",  borderBlock: 0  },

  // ── Routes ────────────────────────────────────────────────────────
  ROUTE_1:  { name: "Route1",  width: 10, height: 18, id: 12, tileset: "overworld", borderBlock: 11 },
  ROUTE_2:  { name: "Route2",  width: 10, height: 36, id: 13, tileset: "overworld", borderBlock: 15 },
  ROUTE_3:  { name: "Route3",  width: 35, height: 9,  id: 14, tileset: "overworld", borderBlock: 44 },
  ROUTE_4:  { name: "Route4",  width: 45, height: 9,  id: 15, tileset: "overworld", borderBlock: 44 },
  ROUTE_5:  { name: "Route5",  width: 10, height: 18, id: 16, tileset: "overworld", borderBlock: 10 },
  ROUTE_6:  { name: "Route6",  width: 10, height: 18, id: 17, tileset: "overworld", borderBlock: 15 },
  ROUTE_7:  { name: "Route7",  width: 10, height: 9,  id: 18, tileset: "overworld", borderBlock: 15 },
  ROUTE_8:  { name: "Route8",  width: 30, height: 9,  id: 19, tileset: "overworld", borderBlock: 44 },
  ROUTE_9:  { name: "Route9",  width: 30, height: 9,  id: 20, tileset: "overworld", borderBlock: 44 },
  ROUTE_10: { name: "Route10", width: 10, height: 36, id: 21, tileset: "overworld", borderBlock: 44 },
  ROUTE_11: { name: "Route11", width: 30, height: 9,  id: 22, tileset: "overworld", borderBlock: 15 },
  ROUTE_12: { name: "Route12", width: 10, height: 54, id: 23, tileset: "overworld", borderBlock: 67 },
  ROUTE_13: { name: "Route13", width: 30, height: 9,  id: 24, tileset: "overworld", borderBlock: 67 },
  ROUTE_14: { name: "Route14", width: 10, height: 27, id: 25, tileset: "overworld", borderBlock: 67 },
  ROUTE_15: { name: "Route15", width: 30, height: 9,  id: 26, tileset: "overworld", borderBlock: 67 },
  ROUTE_16: { name: "Route16", width: 20, height: 9,  id: 27, tileset: "overworld", borderBlock: 15 },
  ROUTE_17: { name: "Route17", width: 10, height: 72, id: 28, tileset: "overworld", borderBlock: 67 },
  ROUTE_18: { name: "Route18", width: 25, height: 9,  id: 29, tileset: "overworld", borderBlock: 67 },
  ROUTE_19: { name: "Route19", width: 10, height: 27, id: 30, tileset: "overworld", borderBlock: 67 },
  ROUTE_20: { name: "Route20", width: 50, height: 9,  id: 31, tileset: "overworld", borderBlock: 67 },
  ROUTE_21: { name: "Route21", width: 10, height: 45, id: 32, tileset: "overworld", borderBlock: 67 },
  ROUTE_22: { name: "Route22", width: 20, height: 9,  id: 33, tileset: "overworld", borderBlock: 44 },
  ROUTE_23: { name: "Route23", width: 10, height: 72, id: 34, tileset: "plateau",   borderBlock: 15 },
  ROUTE_24: { name: "Route24", width: 10, height: 18, id: 35, tileset: "overworld", borderBlock: 44 },
  ROUTE_25: { name: "Route25", width: 30, height: 9,  id: 36, tileset: "overworld", borderBlock: 44 },

  // ── Pallet Town Buildings ─────────────────────────────────────────
  REDS_HOUSE_1F: { name: "RedsHouse1F", width: 4, height: 4, id: 37, tileset: "reds_house", borderBlock: 10 },
  REDS_HOUSE_2F: { name: "RedsHouse2F", width: 4, height: 4, id: 38, tileset: "reds_house", borderBlock: 10 },
  BLUES_HOUSE:   { name: "BluesHouse",  width: 4, height: 4, id: 39, tileset: "house",      borderBlock: 10 },
  OAKS_LAB:      { name: "OaksLab",     width: 5, height: 6, id: 40, tileset: "gym",         borderBlock: 3  },

  // ── Viridian City Buildings ───────────────────────────────────────
  VIRIDIAN_POKECENTER:    { name: "ViridianPokecenter",   width: 7,  height: 4, id: 41, tileset: "pokecenter", borderBlock: 0  },
  VIRIDIAN_MART:          { name: "ViridianMart",         width: 4,  height: 4, id: 42, tileset: "pokecenter", borderBlock: 0  },
  VIRIDIAN_SCHOOL_HOUSE:  { name: "ViridianSchoolHouse",  width: 4,  height: 4, id: 43, tileset: "house",      borderBlock: 10 },
  VIRIDIAN_NICKNAME_HOUSE:{ name: "ViridianNicknameHouse",width: 4,  height: 4, id: 44, tileset: "house",      borderBlock: 10 },
  VIRIDIAN_GYM:           { name: "ViridianGym",          width: 10, height: 9, id: 45, tileset: "gym",        borderBlock: 3  },

  // ── Route 2 / Viridian Forest Area ────────────────────────────────
  DIGLETTS_CAVE_ROUTE_2:     { name: "DiglettsCaveRoute2",     width: 4,  height: 4,  id: 46, tileset: "cavern",  borderBlock: 125 },
  VIRIDIAN_FOREST_NORTH_GATE:{ name: "ViridianForestNorthGate",width: 5,  height: 4,  id: 47, tileset: "gate",    borderBlock: 10  },
  ROUTE_2_TRADE_HOUSE:       { name: "Route2TradeHouse",       width: 4,  height: 4,  id: 48, tileset: "house",   borderBlock: 10  },
  ROUTE_2_GATE:              { name: "Route2Gate",             width: 5,  height: 4,  id: 49, tileset: "gate",    borderBlock: 10  },
  VIRIDIAN_FOREST_SOUTH_GATE:{ name: "ViridianForestSouthGate",width: 5,  height: 4,  id: 50, tileset: "gate",    borderBlock: 10  },
  VIRIDIAN_FOREST:           { name: "ViridianForest",         width: 17, height: 24, id: 51, tileset: "forest",  borderBlock: 3   },

  // ── Pewter City Buildings ─────────────────────────────────────────
  MUSEUM_1F:            { name: "Museum1F",           width: 10, height: 4, id: 52, tileset: "pokecenter", borderBlock: 10 },
  MUSEUM_2F:            { name: "Museum2F",           width: 7,  height: 4, id: 53, tileset: "pokecenter", borderBlock: 10 },
  PEWTER_GYM:           { name: "PewterGym",          width: 5,  height: 7, id: 54, tileset: "gym",        borderBlock: 3  },
  PEWTER_NIDORAN_HOUSE: { name: "PewterNidoranHouse", width: 4,  height: 4, id: 55, tileset: "house",      borderBlock: 10 },
  PEWTER_MART:          { name: "PewterMart",         width: 4,  height: 4, id: 56, tileset: "pokecenter", borderBlock: 0  },
  PEWTER_SPEECH_HOUSE:  { name: "PewterSpeechHouse",  width: 4,  height: 4, id: 57, tileset: "house",      borderBlock: 10 },
  PEWTER_POKECENTER:    { name: "PewterPokecenter",   width: 7,  height: 4, id: 58, tileset: "pokecenter", borderBlock: 0  },

  // ── Mt. Moon ──────────────────────────────────────────────────────
  MT_MOON_1F:  { name: "MtMoon1F",  width: 20, height: 18, id: 59, tileset: "cavern", borderBlock: 3 },
  MT_MOON_B1F: { name: "MtMoonB1F", width: 20, height: 18, id: 60, tileset: "cavern", borderBlock: 3 },
  MT_MOON_B2F: { name: "MtMoonB2F", width: 14, height: 14, id: 61, tileset: "cavern", borderBlock: 3 },

  // ── Cerulean City Buildings ───────────────────────────────────────
  CERULEAN_TRASHED_HOUSE:      { name: "CeruleanTrashedHouse",     width: 4, height: 4, id: 62, tileset: "house",      borderBlock: 10 },
  CERULEAN_TRADE_HOUSE:        { name: "CeruleanTradeHouse",       width: 4, height: 4, id: 63, tileset: "house",      borderBlock: 10 },
  CERULEAN_POKECENTER:         { name: "CeruleanPokecenter",       width: 7, height: 4, id: 64, tileset: "pokecenter", borderBlock: 0  },
  CERULEAN_GYM:                { name: "CeruleanGym",              width: 5, height: 7, id: 65, tileset: "gym",        borderBlock: 3  },
  BIKE_SHOP:                   { name: "BikeShop",                 width: 4, height: 4, id: 66, tileset: "club",       borderBlock: 14 },
  CERULEAN_MART:               { name: "CeruleanMart",             width: 4, height: 4, id: 67, tileset: "pokecenter", borderBlock: 0  },
  MT_MOON_POKECENTER:          { name: "MtMoonPokecenter",         width: 7, height: 4, id: 68, tileset: "pokecenter", borderBlock: 0  },


  // ── Route Gates & Underground ─────────────────────────────────────
  ROUTE_5_GATE:                  { name: "Route5Gate",                width: 4,  height: 3, id: 70, tileset: "gate", borderBlock: 10 },
  UNDERGROUND_PATH_ROUTE_5:      { name: "UndergroundPathRoute5",    width: 4,  height: 4, id: 71, tileset: "gate", borderBlock: 10 },
  DAYCARE:                       { name: "Daycare",                  width: 4,  height: 4, id: 72, tileset: "house", borderBlock: 10 },
  ROUTE_6_GATE:                  { name: "Route6Gate",                width: 4,  height: 3, id: 73, tileset: "gate", borderBlock: 10 },
  UNDERGROUND_PATH_ROUTE_6:      { name: "UndergroundPathRoute6",    width: 4,  height: 4, id: 74, tileset: "gate", borderBlock: 10 },

  // ── Rock Tunnel / Power Plant ─────────────────────────────────────
  ROCK_TUNNEL_POKECENTER: { name: "RockTunnelPokecenter", width: 7,  height: 4,  id: 81, tileset: "pokecenter", borderBlock: 0   },
  ROCK_TUNNEL_1F:         { name: "RockTunnel1F",         width: 20, height: 18, id: 82, tileset: "cavern",     borderBlock: 3   },
  POWER_PLANT:            { name: "PowerPlant",           width: 20, height: 18, id: 83, tileset: "facility",   borderBlock: 46  },

  // ── Route 11 / 12 Gates ───────────────────────────────────────────
  ROUTE_11_GATE_1F:       { name: "Route11Gate1F",       width: 4, height: 5, id: 84, tileset: "gate",   borderBlock: 10  },
  DIGLETTS_CAVE_ROUTE_11: { name: "DiglettsCaveRoute11", width: 4, height: 4, id: 85, tileset: "cavern", borderBlock: 125 },
  ROUTE_11_GATE_2F:       { name: "Route11Gate2F",       width: 4, height: 4, id: 86, tileset: "gate",   borderBlock: 10  },
  ROUTE_12_GATE_1F:       { name: "Route12Gate1F",       width: 5, height: 4, id: 87, tileset: "gate",   borderBlock: 10  },
  BILLS_HOUSE:            { name: "BillsHouse",          width: 4, height: 4, id: 88, tileset: "interior",borderBlock: 13  },

  // ── Vermilion City Buildings ──────────────────────────────────────
  VERMILION_POKECENTER:  { name: "VermilionPokecenter",  width: 7, height: 4, id: 89,  tileset: "pokecenter", borderBlock: 0  },
  POKEMON_FAN_CLUB:      { name: "PokemonFanClub",      width: 4, height: 4, id: 90,  tileset: "interior",   borderBlock: 13 },
  VERMILION_MART:        { name: "VermilionMart",        width: 4, height: 4, id: 91,  tileset: "pokecenter", borderBlock: 0  },
  VERMILION_GYM:         { name: "VermilionGym",         width: 5, height: 9, id: 92,  tileset: "gym",        borderBlock: 3  },
  VERMILION_PIDGEY_HOUSE:{ name: "VermilionPidgeyHouse", width: 4, height: 4, id: 93,  tileset: "house",      borderBlock: 10 },
  VERMILION_DOCK:        { name: "VermilionDock",        width: 14,height: 6, id: 94,  tileset: "ship_port",  borderBlock: 15 },

  // ── SS Anne ───────────────────────────────────────────────────────
  SS_ANNE_1F:            { name: "SSAnne1F",           width: 20, height: 9, id: 95,  tileset: "ship", borderBlock: 12 },
  SS_ANNE_2F:            { name: "SSAnne2F",           width: 20, height: 9, id: 96,  tileset: "ship", borderBlock: 12 },
  SS_ANNE_3F:            { name: "SSAnne3F",           width: 10, height: 3, id: 97,  tileset: "ship", borderBlock: 12 },
  SS_ANNE_B1F:           { name: "SSAnneB1F",          width: 15, height: 4, id: 98,  tileset: "ship", borderBlock: 12 },
  SS_ANNE_BOW:           { name: "SSAnneBow",          width: 10, height: 7, id: 99,  tileset: "ship", borderBlock: 35 },
  SS_ANNE_KITCHEN:       { name: "SSAnneKitchen",      width: 7,  height: 8, id: 100, tileset: "ship", borderBlock: 12 },
  SS_ANNE_CAPTAINS_ROOM: { name: "SSAnneCaptainsRoom", width: 3,  height: 4, id: 101, tileset: "ship", borderBlock: 12 },
  SS_ANNE_1F_ROOMS:      { name: "SSAnne1FRooms",      width: 12, height: 8, id: 102, tileset: "ship", borderBlock: 12 },
  SS_ANNE_2F_ROOMS:      { name: "SSAnne2FRooms",      width: 12, height: 8, id: 103, tileset: "ship", borderBlock: 12 },
  SS_ANNE_B1F_ROOMS:     { name: "SSAnneB1FRooms",     width: 12, height: 8, id: 104, tileset: "ship", borderBlock: 12 },

  // ── Unused Maps & Victory Road ────────────────────────────────────
  UNUSED_MAP_69: { name: "UnusedMap69", width: 0,  height: 0, id: 105, tileset: "overworld", borderBlock: 0   },
  UNUSED_MAP_6A: { name: "UnusedMap6A", width: 0,  height: 0, id: 106, tileset: "overworld", borderBlock: 0   },
  UNUSED_MAP_6B: { name: "UnusedMap6B", width: 0,  height: 0, id: 107, tileset: "overworld", borderBlock: 0   },
  VICTORY_ROAD_1F:{ name: "VictoryRoad1F", width: 10, height: 9, id: 108, tileset: "cavern", borderBlock: 125 },
  UNUSED_MAP_6D: { name: "UnusedMap6D", width: 0, height: 0, id: 109, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_6E: { name: "UnusedMap6E", width: 0, height: 0, id: 110, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_6F: { name: "UnusedMap6F", width: 0, height: 0, id: 111, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_70: { name: "UnusedMap70", width: 0, height: 0, id: 112, tileset: "overworld", borderBlock: 0 },
  LANCES_ROOM:   { name: "LancesRoom",  width: 13, height: 13, id: 113, tileset: "gym",    borderBlock: 3 },
  UNUSED_MAP_72: { name: "UnusedMap72", width: 0, height: 0, id: 114, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_73: { name: "UnusedMap73", width: 0, height: 0, id: 115, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_74: { name: "UnusedMap74", width: 0, height: 0, id: 116, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_75: { name: "UnusedMap75", width: 0, height: 0, id: 117, tileset: "overworld", borderBlock: 0 },
  HALL_OF_FAME:  { name: "HallOfFame",  width: 5, height: 4, id: 118, tileset: "gym",      borderBlock: 3 },

  // ── Underground Paths ─────────────────────────────────────────────
  UNDERGROUND_PATH_NORTH_SOUTH: { name: "UndergroundPathNorthSouth", width: 4,  height: 24, id: 119, tileset: "underground", borderBlock: 1 },
  CHAMPIONS_ROOM:               { name: "ChampionsRoom",            width: 4,  height: 4,  id: 120, tileset: "gym",         borderBlock: 3 },
  UNDERGROUND_PATH_WEST_EAST:   { name: "UndergroundPathWestEast",  width: 25, height: 4,  id: 121, tileset: "underground", borderBlock: 1 },
  ROUTE_7_GATE:                  { name: "Route7Gate",                width: 3,  height: 4, id: 76, tileset: "gate", borderBlock: 10 },

  // ── Celadon City Buildings ────────────────────────────────────────
  CELADON_MANSION_1F:         { name: "CeladonMansion1F",        width: 4,  height: 6, id: 122, tileset: "mansion",    borderBlock: 15 },
  CELADON_MANSION_2F:         { name: "CeladonMansion2F",        width: 4,  height: 6, id: 123, tileset: "mansion",    borderBlock: 15 },
  CELADON_MANSION_3F:         { name: "CeladonMansion3F",        width: 4,  height: 6, id: 124, tileset: "mansion",    borderBlock: 15 },
  CELADON_MANSION_ROOF:       { name: "CeladonMansionRoof",      width: 4,  height: 6, id: 125, tileset: "mansion",    borderBlock: 9  },
  CELADON_MANSION_ROOF_HOUSE: { name: "CeladonMansionRoofHouse", width: 4,  height: 4, id: 126, tileset: "house",      borderBlock: 10 },
  CELADON_POKECENTER:         { name: "CeladonPokecenter",       width: 7,  height: 4, id: 127, tileset: "pokecenter", borderBlock: 0  },
  CELADON_GYM:                { name: "CeladonGym",              width: 5,  height: 9, id: 128, tileset: "gym",        borderBlock: 3  },
  GAME_CORNER:                { name: "GameCorner",              width: 10, height: 9, id: 129, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_1F:            { name: "CeladonMart1F",           width: 10, height: 4, id: 130, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_2F:            { name: "CeladonMart2F",           width: 10, height: 4, id: 131, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_3F:            { name: "CeladonMart3F",           width: 10, height: 4, id: 132, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_4F:            { name: "CeladonMart4F",           width: 10, height: 4, id: 133, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_5F:            { name: "CeladonMart5F",           width: 10, height: 4, id: 134, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_ELEVATOR:      { name: "CeladonMartElevator",     width: 2,  height: 2, id: 135, tileset: "lobby",      borderBlock: 15 },
  CELADON_MART_ROOF:          { name: "CeladonMartRoof",         width: 10, height: 4, id: 136, tileset: "lobby",      borderBlock: 66 },
  GAME_CORNER_PRIZE_ROOM:     { name: "GameCornerPrizeRoom",     width: 5,  height: 4, id: 137, tileset: "lobby",      borderBlock: 15 },
  CELADON_DINER:              { name: "CeladonDiner",            width: 5,  height: 4, id: 138, tileset: "lobby",      borderBlock: 15 },
  CELADON_CHIEF_HOUSE:        { name: "CeladonChiefHouse",       width: 4,  height: 4, id: 139, tileset: "mansion",    borderBlock: 15 },
  CELADON_HOTEL:              { name: "CeladonHotel",            width: 7,  height: 4, id: 140, tileset: "pokecenter", borderBlock: 0  },

  // ── Lavender Town Buildings ───────────────────────────────────────
  LAVENDER_POKECENTER:  { name: "LavenderPokecenter", width: 7, height: 4, id: 141, tileset: "pokecenter", borderBlock: 0  },
  POKEMON_TOWER_1F:     { name: "PokemonTower1F",     width: 10, height: 9, id: 142, tileset: "cemetery",   borderBlock: 1  },
  POKEMON_TOWER_2F:     { name: "PokemonTower2F",     width: 10, height: 9, id: 143, tileset: "cemetery",   borderBlock: 1  },
  POKEMON_TOWER_3F:     { name: "PokemonTower3F",     width: 10, height: 9, id: 144, tileset: "cemetery",   borderBlock: 1  },
  POKEMON_TOWER_4F:     { name: "PokemonTower4F",     width: 10, height: 9, id: 145, tileset: "cemetery",   borderBlock: 1  },
  POKEMON_TOWER_5F:     { name: "PokemonTower5F",     width: 10, height: 9, id: 146, tileset: "cemetery",   borderBlock: 1  },
  POKEMON_TOWER_6F:     { name: "PokemonTower6F",     width: 10, height: 9, id: 147, tileset: "cemetery",   borderBlock: 1  },
  POKEMON_TOWER_7F:     { name: "PokemonTower7F",     width: 10, height: 9, id: 148, tileset: "cemetery",   borderBlock: 1  },
  MR_FUJIS_HOUSE:       { name: "MrFujisHouse",       width: 4,  height: 4, id: 149, tileset: "house",      borderBlock: 10 },
  LAVENDER_MART:        { name: "LavenderMart",       width: 4,  height: 4, id: 150, tileset: "pokecenter", borderBlock: 0  },
  LAVENDER_CUBONE_HOUSE:{ name: "LavenderCuboneHouse", width: 4, height: 4, id: 151, tileset: "house",      borderBlock: 10 },

  // ── Fuchsia City Buildings ────────────────────────────────────────
  FUCHSIA_MART:                { name: "FuchsiaMart",               width: 4,  height: 4, id: 152, tileset: "pokecenter", borderBlock: 0  },
  FUCHSIA_BILLS_GRANDPAS_HOUSE:{ name: "FuchsiaBillsGrandpasHouse", width: 4,  height: 4, id: 153, tileset: "house",      borderBlock: 10 },
  FUCHSIA_POKECENTER:          { name: "FuchsiaPokecenter",         width: 7,  height: 4, id: 154, tileset: "pokecenter", borderBlock: 0  },
  WARDENS_HOUSE:               { name: "WardensHouse",             width: 5,  height: 4, id: 155, tileset: "lab",        borderBlock: 23 },
  SAFARI_ZONE_GATE:            { name: "SafariZoneGate",           width: 4,  height: 3, id: 156, tileset: "gate",       borderBlock: 10 },
  FUCHSIA_GYM:                 { name: "FuchsiaGym",               width: 5,  height: 9, id: 157, tileset: "gym",        borderBlock: 3  },
  FUCHSIA_MEETING_ROOM:        { name: "FuchsiaMeetingRoom",       width: 7,  height: 4, id: 158, tileset: "lab",        borderBlock: 23 },

  // ── Seafoam Islands ───────────────────────────────────────────────
  SEAFOAM_ISLANDS_B1F: { name: "SeafoamIslandsB1F", width: 15, height: 9, id: 159, tileset: "cavern", borderBlock: 125 },
  SEAFOAM_ISLANDS_B2F: { name: "SeafoamIslandsB2F", width: 15, height: 9, id: 160, tileset: "cavern", borderBlock: 125 },
  SEAFOAM_ISLANDS_B3F: { name: "SeafoamIslandsB3F", width: 15, height: 9, id: 161, tileset: "cavern", borderBlock: 125 },
  SEAFOAM_ISLANDS_B4F: { name: "SeafoamIslandsB4F", width: 15, height: 9, id: 162, tileset: "cavern", borderBlock: 125 },

  // ── Misc Houses ───────────────────────────────────────────────────
  VERMILION_OLD_ROD_HOUSE: { name: "VermilionOldRodHouse", width: 4, height: 4, id: 163, tileset: "house", borderBlock: 10 },
  FUCHSIA_GOOD_ROD_HOUSE:  { name: "FuchsiaGoodRodHouse",  width: 4, height: 4, id: 164, tileset: "ship", borderBlock: 12 },

  // ── Pokemon Mansion ───────────────────────────────────────────────
  POKEMON_MANSION_1F:  { name: "PokemonMansion1F",  width: 15, height: 14, id: 165, tileset: "facility", borderBlock: 46 },
  POKEMON_MANSION_2F:  { name: "PokemonMansion2F",  width: 15, height: 14, id: 166, tileset: "facility", borderBlock: 1  },
  POKEMON_MANSION_3F:  { name: "PokemonMansion3F",  width: 15, height: 14, id: 167, tileset: "facility", borderBlock: 1  },
  POKEMON_MANSION_B1F: { name: "PokemonMansionB1F", width: 15, height: 9,  id: 168, tileset: "facility", borderBlock: 1  },

  // ── Cinnabar Island Buildings ─────────────────────────────────────
  CINNABAR_GYM:                  { name: "CinnabarGym",               width: 10, height: 9, id: 169, tileset: "facility",   borderBlock: 46 },
  CINNABAR_POKECENTER:           { name: "CinnabarPokecenter",        width: 7,  height: 4, id: 170, tileset: "pokecenter", borderBlock: 0  },
  CINNABAR_MART:                 { name: "CinnabarMart",              width: 4,  height: 4, id: 171, tileset: "pokecenter", borderBlock: 0  },

  CINNABAR_LAB:                  { name: "CinnabarLab",               width: 10, height: 4, id: 173, tileset: "lab",        borderBlock: 23 },
  CINNABAR_LAB_TRADE_ROOM:       { name: "CinnabarLabTradeRoom",      width: 4,  height: 4, id: 174, tileset: "lab",        borderBlock: 23 },
  CINNABAR_LAB_METRONOME_ROOM:   { name: "CinnabarLabMetronomeRoom",  width: 4,  height: 4, id: 175, tileset: "lab",        borderBlock: 23 },
  CINNABAR_LAB_FOSSIL_ROOM:      { name: "CinnabarLabFossilRoom",     width: 4,  height: 4, id: 176, tileset: "lab",        borderBlock: 23 },

  // ── Indigo Plateau ────────────────────────────────────────────────
  INDIGO_PLATEAU_LOBBY: { name: "IndigoPlateauLobby", width: 8, height: 6, id: 177, tileset: "pokecenter", borderBlock: 0 },

  // ── Saffron City Buildings ────────────────────────────────────────
  COPYCATS_HOUSE_1F:  { name: "CopycatsHouse1F",  width: 4,  height: 4, id: 178, tileset: "reds_house", borderBlock: 10 },
  COPYCATS_HOUSE_2F:  { name: "CopycatsHouse2F",  width: 4,  height: 4, id: 179, tileset: "reds_house", borderBlock: 10 },
  FIGHTING_DOJO:      { name: "FightingDojo",      width: 5,  height: 6, id: 180, tileset: "gym",        borderBlock: 3  },
  SAFFRON_GYM:        { name: "SaffronGym",        width: 10, height: 9, id: 181, tileset: "facility",   borderBlock: 46 },
  SAFFRON_PIDGEY_HOUSE:{ name: "SaffronPidgeyHouse",width: 4, height: 4, id: 182, tileset: "house",      borderBlock: 10 },
  SAFFRON_MART:       { name: "SaffronMart",       width: 4,  height: 4, id: 183, tileset: "pokecenter", borderBlock: 0  },
  SILPH_CO_1F:        { name: "SilphCo1F",         width: 15, height: 9, id: 184, tileset: "facility",   borderBlock: 46 },
  SAFFRON_POKECENTER: { name: "SaffronPokecenter", width: 7,  height: 4, id: 185, tileset: "pokecenter", borderBlock: 0  },
  MR_PSYCHICS_HOUSE:  { name: "MrPsychicsHouse",   width: 4,  height: 4, id: 186, tileset: "house",      borderBlock: 10 },

  // ── Route Gates (continued) ───────────────────────────────────────
  ROUTE_15_GATE_1F:  { name: "Route15Gate1F",  width: 4, height: 5, id: 187, tileset: "gate", borderBlock: 10 },
  ROUTE_15_GATE_2F:  { name: "Route15Gate2F",  width: 4, height: 4, id: 188, tileset: "gate", borderBlock: 10 },
  ROUTE_16_GATE_1F:  { name: "Route16Gate1F",  width: 4, height: 7, id: 189, tileset: "gate", borderBlock: 10 },
  ROUTE_16_GATE_2F:  { name: "Route16Gate2F",  width: 4, height: 4, id: 190, tileset: "gate", borderBlock: 10 },
  ROUTE_16_FLY_HOUSE:{ name: "Route16FlyHouse",width: 4, height: 4, id: 191, tileset: "house",borderBlock: 10 },
  ROUTE_12_SUPER_ROD_HOUSE: { name: "Route12SuperRodHouse", width: 4, height: 4, id: 192, tileset: "house", borderBlock: 10 },
  ROUTE_18_GATE_1F:  { name: "Route18Gate1F",  width: 4, height: 5, id: 193, tileset: "gate", borderBlock: 10 },
  ROUTE_18_GATE_2F:  { name: "Route18Gate2F",  width: 4, height: 4, id: 194, tileset: "gate", borderBlock: 10 },
  SEAFOAM_ISLANDS_1F:{ name: "SeafoamIslands1F",width: 15, height: 9, id: 195, tileset: "cavern", borderBlock: 125 },
  ROUTE_22_GATE:     { name: "Route22Gate",     width: 5, height: 4, id: 196, tileset: "gate",   borderBlock: 10  },
  VICTORY_ROAD_2F:   { name: "VictoryRoad2F",   width: 15, height: 9, id: 197, tileset: "cavern", borderBlock: 125 },
  ROUTE_12_GATE_2F:  { name: "Route12Gate2F",   width: 4, height: 4, id: 198, tileset: "gate",   borderBlock: 10  },
  VERMILION_TRADE_HOUSE: { name: "VermilionTradeHouse", width: 4, height: 4, id: 199, tileset: "house", borderBlock: 10 },
  DIGLETTS_CAVE:     { name: "DiglettsCave",    width: 20, height: 18, id: 200, tileset: "cavern", borderBlock: 25  },
  VICTORY_ROAD_3F:   { name: "VictoryRoad3F",   width: 15, height: 9,  id: 201, tileset: "cavern", borderBlock: 125 },

  // ── Rocket Hideout ────────────────────────────────────────────────
  ROCKET_HIDEOUT_B1F:      { name: "RocketHideoutB1F",      width: 15, height: 14, id: 202, tileset: "facility", borderBlock: 46 },
  ROCKET_HIDEOUT_B2F:      { name: "RocketHideoutB2F",      width: 15, height: 14, id: 203, tileset: "facility", borderBlock: 46 },
  ROCKET_HIDEOUT_B3F:      { name: "RocketHideoutB3F",      width: 15, height: 14, id: 204, tileset: "facility", borderBlock: 46 },
  ROCKET_HIDEOUT_B4F:      { name: "RocketHideoutB4F",      width: 15, height: 12, id: 205, tileset: "facility", borderBlock: 46 },
  ROCKET_HIDEOUT_ELEVATOR: { name: "RocketHideoutElevator", width: 3,  height: 4,  id: 206, tileset: "lobby",    borderBlock: 15 },
  UNUSED_MAP_CC: { name: "UnusedMapCC", width: 0, height: 0, id: 207, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_CD: { name: "UnusedMapCD", width: 0, height: 0, id: 208, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_CE: { name: "UnusedMapCE", width: 0, height: 0, id: 209, tileset: "overworld", borderBlock: 0 },

  // ── Silph Co ──────────────────────────────────────────────────────
  SILPH_CO_2F:       { name: "SilphCo2F",       width: 15, height: 9, id: 210, tileset: "facility", borderBlock: 46 },
  SILPH_CO_3F:       { name: "SilphCo3F",       width: 15, height: 9, id: 211, tileset: "facility", borderBlock: 46 },
  SILPH_CO_4F:       { name: "SilphCo4F",       width: 15, height: 9, id: 212, tileset: "facility", borderBlock: 46 },
  SILPH_CO_5F:       { name: "SilphCo5F",       width: 15, height: 9, id: 213, tileset: "facility", borderBlock: 46 },
  SILPH_CO_6F:       { name: "SilphCo6F",       width: 13, height: 9, id: 214, tileset: "facility", borderBlock: 46 },
  SILPH_CO_7F:       { name: "SilphCo7F",       width: 13, height: 9, id: 215, tileset: "facility", borderBlock: 46 },
  SILPH_CO_8F:       { name: "SilphCo8F",       width: 13, height: 9, id: 216, tileset: "facility", borderBlock: 46 },

  // ── Safari Zone ───────────────────────────────────────────────────
  SAFARI_ZONE_EAST:              { name: "SafariZoneEast",            width: 15, height: 13, id: 217, tileset: "forest", borderBlock: 0  },
  SAFARI_ZONE_NORTH:             { name: "SafariZoneNorth",           width: 20, height: 18, id: 218, tileset: "forest", borderBlock: 0  },
  SAFARI_ZONE_WEST:              { name: "SafariZoneWest",            width: 15, height: 13, id: 219, tileset: "forest", borderBlock: 0  },
  SAFARI_ZONE_CENTER:            { name: "SafariZoneCenter",          width: 15, height: 13, id: 220, tileset: "forest", borderBlock: 0  },
  SAFARI_ZONE_CENTER_REST_HOUSE: { name: "SafariZoneCenterRestHouse", width: 4,  height: 4,  id: 221, tileset: "gate",   borderBlock: 10 },
  SAFARI_ZONE_SECRET_HOUSE:      { name: "SafariZoneSecretHouse",     width: 4,  height: 4,  id: 222, tileset: "lab",    borderBlock: 23 },
  SAFARI_ZONE_WEST_REST_HOUSE:   { name: "SafariZoneWestRestHouse",   width: 4,  height: 4,  id: 223, tileset: "gate",   borderBlock: 10 },
  SAFARI_ZONE_EAST_REST_HOUSE:   { name: "SafariZoneEastRestHouse",   width: 4,  height: 4,  id: 224, tileset: "gate",   borderBlock: 10 },
  SAFARI_ZONE_NORTH_REST_HOUSE:  { name: "SafariZoneNorthRestHouse",  width: 4,  height: 4,  id: 225, tileset: "gate",   borderBlock: 10 },

  // ── Cerulean Cave ─────────────────────────────────────────────────
  CERULEAN_CAVE_2F:   { name: "CeruleanCave2F",   width: 15, height: 14, id: 226, tileset: "cavern", borderBlock: 125 },
  CERULEAN_CAVE_B1F:  { name: "CeruleanCaveB1F",  width: 15, height: 14, id: 227, tileset: "cavern", borderBlock: 125 },
  CERULEAN_CAVE_1F:   { name: "CeruleanCave1F",   width: 20, height: 18, id: 228, tileset: "cavern", borderBlock: 125 },
  CERULEAN_BADGE_HOUSE:{ name: "CeruleanBadgeHouse",width: 4, height: 4, id: 229, tileset: "ship",   borderBlock: 12  },
  NAME_RATERS_HOUSE:  { name: "NameRatersHouse",   width: 4,  height: 4, id: 230, tileset: "house",  borderBlock: 10  },
  UNUSED_MAP_E7: { name: "UnusedMapE7", width: 0, height: 0, id: 231, tileset: "overworld", borderBlock: 0 },
  ROCK_TUNNEL_B1F: { name: "RockTunnelB1F", width: 20, height: 18, id: 232, tileset: "cavern", borderBlock: 3 },

  // ── Silph Co (continued) ──────────────────────────────────────────
  SILPH_CO_9F:       { name: "SilphCo9F",       width: 13, height: 9, id: 233, tileset: "facility",  borderBlock: 46 },
  SILPH_CO_10F:      { name: "SilphCo10F",      width: 8,  height: 9, id: 234, tileset: "facility",  borderBlock: 46 },
  SILPH_CO_11F:      { name: "SilphCo11F",      width: 9,  height: 9, id: 235, tileset: "interior",  borderBlock: 13 },
  SILPH_CO_ELEVATOR: { name: "SilphCoElevator", width: 2,  height: 2, id: 236, tileset: "lobby",     borderBlock: 15 },

  // ── Final Unused & Elite Four ─────────────────────────────────────
  UNUSED_MAP_ED: { name: "UnusedMapED", width: 0, height: 0, id: 237, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_EE: { name: "UnusedMapEE", width: 0, height: 0, id: 238, tileset: "overworld", borderBlock: 0 },
  TRADE_CENTER:  { name: "TradeCenter",  width: 5, height: 4, id: 239, tileset: "club", borderBlock: 14 },
  COLOSSEUM:     { name: "Colosseum",    width: 5, height: 4, id: 240, tileset: "club", borderBlock: 14 },
  UNUSED_MAP_F1: { name: "UnusedMapF1", width: 0, height: 0, id: 241, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_F2: { name: "UnusedMapF2", width: 0, height: 0, id: 242, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_F3: { name: "UnusedMapF3", width: 0, height: 0, id: 243, tileset: "overworld", borderBlock: 0 },
  UNUSED_MAP_F4: { name: "UnusedMapF4", width: 0, height: 0, id: 244, tileset: "overworld", borderBlock: 0 },
  LORELEIS_ROOM: { name: "LoreleisRoom", width: 5, height: 6, id: 245, tileset: "gym",      borderBlock: 3 },
  BRUNOS_ROOM:   { name: "BrunosRoom",   width: 5, height: 6, id: 246, tileset: "gym",      borderBlock: 3 },
  AGATHAS_ROOM:  { name: "AgathasRoom",  width: 5, height: 6, id: 247, tileset: "cemetery", borderBlock: 0 },
};

