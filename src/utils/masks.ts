import createNumberMask from "text-mask-addons/dist/createNumberMask";
import emailMask from "text-mask-addons/dist/emailMask";


//Personal masks

export const cnpjMask = [/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/];

export const cpfMask = [/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]

export const rgMask = Array(15).fill(/[A-Z0-9]/i);

export const homeNumberMask = Array(6).fill(/\d/);

export const telephoneMask = ["+",/\d/,/\d/," ","(",/\d/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/];

export const eMailMask = emailMask;

//Places masks

export const zipcodeBrazilMask = [/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/];

export const zipcodeElsewhereMask = Array(5).fill(/\d/).concat(Array(10).fill(/\d?/));

export const nifMask = Array(20).fill(/\d?/);

export const code3LettersMask = [/[A-Z]/i, /[A-Z]/i, /[A-Z]/i];

export const code10LettersMask = Array(10).fill(/[A-Z]/i);

export const code3NumbersMask = Array(3).fill(/\d/);

export const ibgeCodeMask = Array(7).fill(/\d/);

//Prices masks

export const priceMask = createNumberMask({
    prefix: "",
    suffix: "",
    thousandsSeparatorSymbol: ".",
    decimalSymbol: ",",
    allowDecimal: true,
    allowLeadingZeroes: false,
    allowNegative: false,
    decimalLimit: 6,
    integerLimit: 4,
  });

//Measures masks

export const cmMask = createNumberMask({
    prefix: "",
    suffix: " cm",
    thousandsSeparatorSymbol: ".",
    decimalSymbol: ",",
    allowDecimal: true,
    decimalLimit: 3,
    integerLimit: 7,
  });

export const kgMask = createNumberMask({
    prefix: "",
    suffix: " kg",
    thousandsSeparatorSymbol: ".",
    decimalSymbol: ",",
    allowDecimal: true,
    decimalLimit: 3,
    integerLimit: 7,
  });

