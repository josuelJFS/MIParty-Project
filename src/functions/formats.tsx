const dataFormatBR = (e: Date) => {
  const date = new Date(e.toString());
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();

  return (d <= 9 ? "0" + d : d) + "/" + (m <= 9 ? "0" + m : m) + "/" + y;
};

const time = (e: Date) => {
  const date = new Date(e.toString());
  const hour = date.getHours();
  const min = date.getMinutes();
  console.log(e);
  return hour + ":" + min;
};

const dateOnly = (e: string) => {
  const date = e.replace(/\//g, "");
  return date.replace(/(\d{2})(\d{2})(\d{4}).*/g, "$1/$2/$3");
};

const timeOnly = (e: string) => {
  const date = e.replace(/\//g, "");
  return date.replace(/(\d{2})(\d{2})(\d{4})(.*)/g, "$4");
};
// const dinheiroBr = (value:any) =>
// new Intl.NumberFormat('en-IN', {
//   style: 'currency',
//   currency: 'INR'
// }).format(value);

const formatNumber = (amount: any, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    const i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    const j = i.length > 3 ? i.length % 3 : 0;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

const dateDaysRest = (end: any) => {
  if (!end) return;
  const now = new Date(); // Data de hoje
  const past = new Date(end); // Outra data no passado
  const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
  const sec = Math.ceil(diff / (1000 * 60));
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
  if (days < 2) {
    return Math.floor(sec / 60) + "H " + String(sec % 60).padStart(2, "0") + " Min";
  } else {
    return days + " dias";
  }
  // Mostra a diferença em dias
};

export { dataFormatBR, formatNumber, time, dateOnly, timeOnly, dateDaysRest };
