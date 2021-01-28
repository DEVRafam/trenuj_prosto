export default {
    methods: {
        generateSlugName: word => {
            const letters = {
                ą: "a",
                ę: "e",
                ż: "z",
                ź: "z",
                ó: "o",
                ł: "l",
                ć: "c",
                ń: "n",
                ś: "s"
            };
            //
            let result = word.toLowerCase().split("");
            result.forEach((letter, index) => {
                if (letter == " ") result[index] = "-";
                else if (Object.keys(letters).includes(letter)) {
                    result[index] = letters[letter];
                }
            });
            //
            return result.join("");
        }
    }
};
