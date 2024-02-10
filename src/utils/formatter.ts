const Formatter = {
    date(date: Date | string) {
        const newDate = new Date(date);
        if (!(newDate instanceof Date)) {
            return false;
        }
        return newDate.toLocaleDateString("pt-BR");
    },
    cpfOrCnpj(str: string) {
        const numeros = str.replace(/\D/g, "");
        if (numeros.length >= 11) {
            const cpfFormatado = `${numeros.slice(0, 3)}.${numeros.slice(
                3,
                6,
            )}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
            return cpfFormatado;
        }
        if (numeros.length >= 14) {
            const cnpjFormatado = `${numeros.slice(0, 2)}.${numeros.slice(
                2,
                5,
            )}.${numeros.slice(5, 8)}/${numeros.slice(8, 12)}-${numeros.slice(
                12,
            )}`;
            return cnpjFormatado;
        }
        return str;
    },
    zero(number: number) {
        return number < 10 ? "0" + number : number;
    },
    formatarDataPorExtenso(data: Date) {
        const meses = [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ];

        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();

        return `${dia < 10 ? "0" + dia : dia} de ${mes} de ${ano}`;
    },
};

export default Formatter;
