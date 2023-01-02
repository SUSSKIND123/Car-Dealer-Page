import getters from "./getters.js";
export default {
  state() {
    return {
      carros: [
        {
          img: "vwSaveiro.png",
          Modelo: "2021 VOLKSWAGEN SAVEIRO TRENDLINE 1.6",
          Marca: "Volkswagen",
          Preço: "84.990",
          Concessionária: "Volkswagen Carrera (Rua Henri Bouchard, 127)",
          Telefone: "(11) 4590-0500",
          price: 84990,
        },
        {
          img: "fordRanger.webp",
          Modelo: "2018 FORD RANGER XLS 2.2",
          Marca: "Ford",
          Preço: "154.990",
          Concessionária: "Parco Foreste Casentinesi",
          Telefone: "79-99523-8975",
          price: 154990,
        },
        {
          img: "fordTerritory.webp",
          Modelo: "2022 FORD TERRITORY 1.5",
          Marca: "Ford",
          Preço: "189.990",
          Concessionária: "Parco Foreste Casentinesi",
          Telefone: "79-99523-8975",
          price: 189990,
        },
        {
          img: "fordBronco2.png",
          Modelo: "2022 FORD BRONCO SPORT 2.0",
          Marca: "Ford",
          Preço: "239.600",
          Concessionária: "Ford Caoa(Av. Ibirapuera, 2400)",
          Telefone: "(11) 5053-3000",
          price: 239600,
        },
        {
          img: "evoque.jpeg",
          Modelo: "2015 LAND ROVER RANGE ROVER EVOQUE",
          Marca: "Land Rover",
          Preço: "170.000",
          Concessionária: "Parco Foreste Casentinesi",
          Telefone: "79-99523-8975",
          price: 170000,
        },
        {
          img: "onix.webp",
          Modelo: "2020 CHEVROLET ONIX",
          Marca: "Chevrolet",
          Preço: "75.000",
          Concessionária:
            "Chevrolet Absoluta Imirim(Av. Direitos Humanos, 770)",
          Telefone: "(11) 3959-7000",
          price: 75000,
        },
        {
          img: "landRoverFreelander2.png",
          Modelo: "2013 LAND ROVER FREELANDER 2",
          Marca: "Land Rover",
          Preço: "80.900",
          Concessionária: "Parco Foreste Casentinesi",
          Telefone: "79-99523-8975",
          price: 80900,
        },
        {
          img: "bmwX62.png",
          Modelo: "2012 BMW X6",
          Marca: "Ford",
          Preço: "155.900",
          Concessionária: "Parco Foreste Casentinesi",
          Telefone: "79-99523-8975",
          price: 155900,
        },
        {
          img: "jeepCompass3.png",
          Modelo: "2018 JEEP COMPASS",
          Marca: "Ford",
          Preço: "149.990",
          Concessionária: "Jeep Osten Brás(Av. Alcântara Machado, 2105)",
          Telefone: "(11) 3192-2966",
          price: 149990,
        },
        {
          img: "jeepCommander3.png",
          Modelo: "2022 JEEP COMMANDER",
          Marca: "Ford",
          Preço: "262.000",
          Concessionária: "Alta Braz Leme(Av. Braz Leme, 2885)",
          Telefone: "(11) 2990-4200",
          price: 262000,
        },
        {
          img: "elantra.png",
          Modelo: "2018 Hyundai Elantra SE",
          Marca: "Ford",
          Preço: "86.990",
          Concessionária: "Viamais Autos(Av. Nazaré, 1953)",
          Telefone: "(11) 5061-7100",
          price: 86990,
        },
        {
          img: "bmwx1.png",
          Modelo: "2022 BMW X1",
          Marca: "Ford",
          Preço: "327.950",
          Concessionária: "Santa Paula Veículos(Av. São Miguel, 8760)",
          Telefone: "(11) 2058-7070",
          price: 327950,
        },
        {
          img: "MercedesGLB.jpeg",
          Modelo: "2021 MERCEDES-BENZ GLB 200",
          Marca: "Ford",
          Preço: "299.900",
          Concessionária:
            "Comark Mercedes-Benz Showroom Jardins(R. Colômbia, 785)",
          Telefone: "(11) 2122-0900",
          price: 299900,
        },
        {
          img: "fordEdge2.png",
          Modelo: "2013 FORD EDGE",
          Marca: "Ford",
          Preço: "138.990",
          Concessionária: "Ford Caoa(Av. Ibirapuera, 2400)",
          Telefone: "(11) 5053-3000",
          price: 138990,
        },
        {
          img: "cruze.webp",
          Modelo: "2018 CHEVROLET CRUZE",
          Marca: "Chevrolet",
          Preço: "87.900",
          Concessionária: "Chevrolet Carrera(Av. Rebouças, 2259)",
          Telefone: "(11) 3087-1700",
          price: 87900,
        },
        {
          img: "vwPolo.png",
          Modelo: "2018 VOLKSWAGEN POLO",
          Marca: "Ford",
          Preço: "239.600",
          Concessionária: "Volkswagen Carrera (Rua Henri Bouchard, 127)",
          Telefone: "(11) 4590-0500",
          price: 239600,
        },
      ],
    };
  },
  getters: getters,
};
